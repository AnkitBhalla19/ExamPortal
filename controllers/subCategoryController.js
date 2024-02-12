import subCategory from '../models/subCategoryModel.js';


const addSubCategory = async (req, res) => {
    try {

        const { name, category_code,subcategory_code } = req.body;
        const newSubCategory = await subCategory.create({
            name,
            category_code,
            subcategory_code
        });
        if (!newSubCategory) {
            return res.status(400).json({ message: `SubCategory not created` });
        }
        res.status(201).json(newSubCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getSubCategoriesfromCategory = async (req, res) => {
    try {
        const { category_code } = req.params;
        const subCategories = await subCategory.findAll({
            where: {
                category_code
            }
        });
        if(subCategories.length === 0) return res.status(404).json({ message: `No subcategories found for category code ${category_code}` }
        );

        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const { subCategory_code } = req.params;
        const { name, category_code, subcategory_code } = req.body;
        const updatedSubCategory = await subCategory.update({
            name,
            category_code,
            subcategory_code
        }, {
            where: {
                subcategory_code: subCategory_code
            }
        });
        if (!updatedSubCategory) {
            return res.status(400).json({ message: `SubCategory with id ${subCategory_code} not updated` });
        }
        res.status(200).json({ message: `SubCategory with id ${subCategory_code} updated` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const deleteSubCategory = async (req, res) => {
    try {
        const { subCategory_code } = req.params;
        const deletedSubCategory = await subCategory.destroy({
            where: {
                subcategory_code: subCategory_code
            }
        });
        if (!deletedSubCategory) {
            return res.status(400).json({ message: `SubCategory with subCategory_code ${subCategory_code} does not exist` });
        }
        res.status(200).json({ message: `SubCategory with subCategory_code ${subCategory_code} deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export default { addSubCategory, getSubCategoriesfromCategory, updateSubCategory, deleteSubCategory };