import questionController from '../controllers/questionController.js';
import express from 'express';
import verifyToken from '../middleware/auth.js';
import bodyParser from 'body-parser';

const questionRoute = express();

questionRoute.use(bodyParser.json());
questionRoute.use(bodyParser.urlencoded({ extended: true }));

questionRoute.post('/addQuestion', verifyToken, questionController.addQuestion);
questionRoute.patch('/updateQuestion/:code', verifyToken, questionController.updateQuestion);
questionRoute.get('/questions/:code', verifyToken, questionController.getQuestionByTestcode);
questionRoute.get('/questions/:code/:qcode', verifyToken, questionController.getQuestion);
questionRoute.delete('/questions/:code', verifyToken, questionController.deleteQuestion);

export default { questionRoute };