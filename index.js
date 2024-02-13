import express from 'express';
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import subCategoryRoute from './routes/subCategoryRoute.js';
import testRoute from './routes/testRoute.js';
import questionRoute from './routes/questionRoute.js';

const port = 3000;
const user_routes=userRoute;
const app = express();


app.use('/api',user_routes.userRoute);
app.use('/api',categoryRoute.categoryRoute);
app.use('/api',subCategoryRoute.subCategoryRoute);
app.use('/api',testRoute.testRoute);
app.use('/api',questionRoute.questionRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });






















// const app = express();
// app.use(bodyParser.json());
// const SaltRounds = 10;
// app.use(express.static('public'));


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public/userUploads",function(err,sucess) {
//             if (err) {
//                 throw err;
//             }
//     });},
//     filename: (req, file, cb) => {
//         cb(null,Date.now()+'-'+file.originalname, function(err,sucess) {
//             if (err) {
//                 throw err;
//             }
//     })
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 1024*1024*5 },
// });

// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });

// app.post('/register', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
//     const { name, email, password, role } = req.body;
  
//     try {
//       const emailExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
//       if (emailExists.rows.length > 0) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }
//       const hashedPassword = await bcrypt.hash(password, SaltRounds);
  
//       const result = await db.query(
//         'INSERT INTO users (name, email, password, image, resume_path, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//         [name, email, hashedPassword, req.files['image'][0].filename, req.files['resume'][0].filename, role]
//       );
  
//       return res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error during registration:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
