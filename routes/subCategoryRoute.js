import subCategoryController from '../controllers/subCategoryController.js';
import express from 'express';
import verifyToken from '../middleware/auth.js';
import bodyParser from 'body-parser';

const subCategoryRoute = express();

subCategoryRoute.use(bodyParser.json());
subCategoryRoute.use(bodyParser.urlencoded({ extended: true }));

subCategoryRoute.post('/addSubCategory', verifyToken, subCategoryController.addSubCategory);
subCategoryRoute.get('/getSubCategoriesfromCategory/:category_code', verifyToken, subCategoryController.getSubCategoriesfromCategory);
subCategoryRoute.patch('/updateSubCategory/:subCategory_code', verifyToken, subCategoryController.updateSubCategory);
subCategoryRoute.delete('/deleteSubCategory/:subCategory_code', verifyToken, subCategoryController.deleteSubCategory);


export default { subCategoryRoute };