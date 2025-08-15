const { body, validationResult } = require('express-validator');
const handleValidationErrors = require('../utils/handleValidationErrors');
const db = require('../db/queries');

const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters.'),
];

exports.getCategories = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render('category/categoryList', {
    title: 'Category List',
    categories: categories,
  });
};

exports.getCategoryDetails = async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategory(id);

  if (!category) res.render('404');

  res.render('category/categoryDetails', {
    title: 'Category Details',
    category: category,
  });
};

exports.getCreateCategoryForm = (req, res) => {
  res.render('category/categoryCreate', {
    title: 'Create Category',
    category: {},
  });
};

exports.categoryCreate = [
  validateCategory,
  handleValidationErrors('category/categoryCreate', (req) => ({
    title: 'Create Category',
    category: req.body,
  })),
  async (req, res) => {
    const category = req.body;

    await db.insertCategory(category);

    res.redirect('/categories');
  },
];

exports.getCategoryUpdateForm = async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategory(id);

  if (!category) return res.status(404).render('404');

  res.render('category/categoryCreate', {
    title: 'Update Category',
    category: category,
  });
};

exports.categoryUpdate = [
  validateCategory,
  handleValidationErrors('category/categoryCreate', (req) => ({
    title: 'Update Category',
    category: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req, res) => {
    const id = req.params.id;
    const updatedCategory = req.body;

    await db.updateCategory(id, updatedCategory);

    res.redirect('/categories');
  },
];

exports.categoryDelete = async (req, res) => {
  const id = req.params.id;
  await db.deleteCategory(id);

  res.redirect('/categories');
};
