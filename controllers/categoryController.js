import Category from "../models/categoryModel.js";


const addCategory = async (req, res) => {
    try {
        const { name, code, slug } = req.body;
        const newCategory = await Category.create({
        name,
        code,
        slug,
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findAll();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategoryBycode = async (req, res) => {
    try {
        const { code } = req.params;
        const category = await Category.findOne({
            where: { code: code },
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { code } = req.params;
        const [updated] = await Category.update(req.body, {
            where: { code: code },
        });
        if (updated) {
            const updatedCategory = await Category.findOne({ where: { code: code } });
            return res.status(200).json({ category: updatedCategory });
        }
        throw new Error('Category not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { code } = req.params;
        const deleted = await Category.destroy({
            where: { code: code },
        });
        if (deleted) {
            return res.status(200).send('Category deleted');
        }
        throw new Error('Category not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
    


export default { addCategory, getCategory, getCategoryBycode,updateCategory,deleteCategory};









