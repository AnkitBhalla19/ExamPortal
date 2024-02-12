import Question from "../models/questionModel.js";

const addQuestion = async (req, res) => {
    try {
        const { question_id,test_id,question_text,option1,option2,option3,option4,correct_option } = req.body;
        const newQuestion = await Question.create({
        question_id,
        test_id,
        question_text,
        option1,
        option2,
        option3,
        option4,
        correct_option
        });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateQuestion = async (req, res) => {
    try {
        const { code } = req.params;
        const [updated] = await Question.update(req.body, {
            where: { question_id: code },
        });
        if (updated) {
            const updatedQuestion = await Question.findOne({ where: { question_id: code } });
            return res.status(200).json({ question: updatedQuestion });
        }
        throw new Error('Question not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const getQuestion = async (req, res) => {
    try {
        const {code,qcode} = req.params;
        const question = await Question.findOne({
            where: { test_id:code ,question_id:qcode},
        });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuestionByTestcode = async (req, res) => {
    try {
        const { code } = req.params;
        const question = await Question.findAll({
            where: { test_id: code },
        });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteQuestion = async (req, res) => {
    try {
        const { code } = req.params;
        const deleted = await Question.destroy({
            where: { question_id: code },
        });
        if (deleted) {
            return res.status(200).send('Question deleted');
        }
        throw new Error('Question not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


export default {addQuestion,updateQuestion,getQuestion,getQuestionByTestcode,deleteQuestion};