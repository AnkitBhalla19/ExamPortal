import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import userController from '../controllers/userController.js';
import verifyToken from '../middleware/auth.js';

const userRoute = express();

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));


userRoute.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/userUploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

userRoute.post('/register', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), userController.registerUser);
userRoute.post('/login', userController.loginUser);
userRoute.patch('/updatePassword', verifyToken,userController.updatePassword);
userRoute.patch('/forgotPassword', userController.forgotPassword);
userRoute.post('/resetPassword', userController.resetPassword);


export default { userRoute };
