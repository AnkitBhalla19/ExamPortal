import testController from '../controllers/testController.js';
import express from 'express';
import verifyToken from '../middleware/auth.js';
import bodyParser from 'body-parser';

const testRoute = express();

testRoute.use(bodyParser.json());
testRoute.use(bodyParser.urlencoded({ extended: true }));

testRoute.post('/addTest', verifyToken, testController.addTest);
testRoute.patch('/updateTest/:code', verifyToken, testController.updateTest);
testRoute.get('/tests', verifyToken, testController.getTest);
testRoute.get('/tests/:code', verifyToken, testController.getTestBycode);
testRoute.delete('/tests/:code', verifyToken, testController.deleteTest);

export default { testRoute };