import { Category } from "../models/category.models.js";

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory)
      return res.status(409).json({
        message: "Category already exists",
      });

    const newCategory = await Category.create({ name });

    res.json({ message: "New category added!", newCategory });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({ message: "All categories fetched!", categories });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getcategoryById = async (req, res) => {
  try {
    const { slug } = req.params;
    // console.log(slug);
    // console.log(req.params);

    const category = await Category.findOne({ slug });

    // console.log(category);

    if (!category)
      return res.status(404).json({ error: "Category not found!" });

    res.send({ message: "Category fetched successfully!", category });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category no found!" });
    }

    category.name = name || category.name;
    await category.save();

    res.json({
      message: "Category updated successfully!",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.json({ message: "Category deleted!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  addCategory,
  getAllCategories,
  getcategoryById,
  updateCategory,
  deleteCategory,
};
