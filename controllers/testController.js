import Test from "../models/testModel.js";

const addTest = async (req, res) => {
    try {
        const { title, code, description, questions, duration_minutes} = req.body;
        const newTest = await Test.create({
        title,
        code,
        description,
        questions,
        duration_minutes,
        });
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateTest = async (req, res) => {
    try {
        const { code } = req.params;
        const [updated] = await Test.update(req.body, {
            where: { code: code },
        });
        if (updated) {
            const updatedTest = await Test.findOne({ where: { code: code } });
            return res.status(200).json({ test: updatedTest });
        }
        throw new Error('Test not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const getTest = async (req, res) => {
    try {
        const test = await Test.findAll();
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTestBycode = async (req, res) => {
    try {
        const { code } = req.params;
        const test = await Test.findOne({
            where: { code: code },
        });
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteTest = async (req, res) => {
    try {
        const { code } = req.params;
        const deleted = await Test.destroy({
            where: { code: code },
        });
        if (deleted) {
            return res.status(200).send('Test deleted');
        }
        throw new Error('Test not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


export default {addTest,updateTest,getTest,getTestBycode,deleteTest};