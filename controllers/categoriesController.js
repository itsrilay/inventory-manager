const { body, validationResult } = require('express-validator');
const handleValidationErrors = require('../utils/handleValidationErrors');
const db = require('../db/queries');
const isDemo = require('../utils/isDemo');

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
    stylesheet: 'lists.css',
  });
};

exports.getCategoryDetails = async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategory(id);

  if (!category) res.render('404', { layout: false });

  res.render('category/categoryDetails', {
    title: 'Category Details',
    category: category,
    stylesheet: 'details.css',
  });
};

exports.getCreateCategoryForm = (req, res) => {
  res.render('category/categoryForm', {
    title: 'Create Category',
    category: {},
    stylesheet: 'forms.css',
  });
};

exports.categoryCreate = [
  validateCategory,
  handleValidationErrors('category/categoryForm', (req) => ({
    title: 'Create Category',
    category: req.body,
  })),
  async (req, res) => {
    const category = req.body;

    if (isDemo()) {
      req.flash('info', 'Demo: Skipping action');
      return res.redirect('/categories');
    }

    await db.insertCategory(category);

    req.flash('success', 'Category created successfully.');
    res.redirect('/categories');
  },
];

exports.getCategoryUpdateForm = async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategory(id);

  if (!category) return res.status(404).render('404', { layout: false });

  res.render('category/categoryForm', {
    title: 'Update Category',
    category: category,
    stylesheet: 'forms.css',
  });
};

exports.categoryUpdate = [
  validateCategory,
  handleValidationErrors('category/categoryForm', (req) => ({
    title: 'Update Category',
    category: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req, res) => {
    const id = req.params.id;
    const updatedCategory = req.body;

    if (isDemo()) {
      req.flash('info', 'Demo: Skipping action');
      return res.redirect('/categories');
    }

    await db.updateCategory(id, updatedCategory);

    req.flash('success', 'Category updated successfully.');
    res.redirect('/categories');
  },
];

exports.categoryDelete = async (req, res) => {
  const id = req.params.id;
  await db.deleteCategory(id);

  if (isDemo()) {
    req.flash('info', 'Demo: Skipping action');
    return res.redirect('/categories');
  }

  req.flash('success', 'Category deleted successfully.');
  res.redirect('/categories');
};
