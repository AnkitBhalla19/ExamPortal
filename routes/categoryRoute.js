import categoryController from '../controllers/categoryController.js';
import express from 'express';
import verifyToken from '../middleware/auth.js';
import bodyParser from 'body-parser';

const categoryRoute = express();

categoryRoute.use(bodyParser.json());
categoryRoute.use(bodyParser.urlencoded({ extended: true }));


categoryRoute.post('/addCategory', verifyToken, categoryController.addCategory);
categoryRoute.get('/categories', verifyToken, categoryController.getCategory);
categoryRoute.get('/category/:code', verifyToken, categoryController.getCategoryBycode);
categoryRoute.patch('/category/:code', verifyToken, categoryController.updateCategory);
categoryRoute.delete('/category/:code', verifyToken, categoryController.deleteCategory);
export default { categoryRoute };





