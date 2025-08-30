const { body } = require('express-validator');
const handleValidationErrors = require('../utils/handleValidationErrors');
const db = require('../db/queries');
const isDemo = require('../utils/isDemo');

const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters.'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required.')
    .isLength({ max: 1000 })
    .withMessage('Description must be under 1000 characters.'),

  body('stockQuantity')
    .isInt({ min: 0 })
    .withMessage('Stock Quantity must be a non-negative integer.')
    .toInt(),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number.')
    .toFloat(),

  body('isActive')
    .notEmpty()
    .withMessage('A status must be selected.')
    .isIn(['true', 'false'])
    .withMessage('Invalid status value.')
    .customSanitizer((value) => value === 'true'),
];

exports.getProducts = async (req, res) => {
  const products = await db.getAllProducts();
  res.render('product/productList', {
    title: 'Product List',
    products: products,
    stylesheet: 'lists.css',
  });
};

exports.getProductDetails = async (req, res) => {
  const id = req.params.id;
  const product = await db.getProduct(id);

  if (!product) res.status(404).render('404', { layout: false });

  res.render('product/productDetails', {
    title: 'Product Details',
    product: product,
    stylesheet: 'details.css',
  });
};

exports.getProductCreateForm = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render('product/productForm', {
    title: 'Create Product',
    product: {},
    categories: categories,
    stylesheet: 'forms.css',
  });
};

exports.productCreate = [
  validateProduct,
  handleValidationErrors('product/productForm', (req) => ({
    title: 'Create Product',
    product: req.body,
  })),
  async (req, res) => {
    const product = req.body;

    if (isDemo()) {
      req.flash('info', 'Demo: Skipping action');
      return res.redirect('/products');
    }

    await db.insertProduct(product);

    req.flash('success', 'Product created successfully.');
    res.redirect('/products');
  },
];

exports.getProductUpdateForm = async (req, res) => {
  const id = req.params.id;
  const product = await db.getProduct(id);
  const categories = await db.getAllCategories();

  if (!product) return res.status(404).render('404', { layout: false });

  res.render('product/productForm', {
    title: 'Update Product',
    product: product,
    categories: categories,
    stylesheet: 'forms.css',
  });
};

exports.productUpdate = [
  validateProduct,
  handleValidationErrors('productForm', (req) => ({
    title: 'Update Product',
    product: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;

    if (isDemo()) {
      req.flash('info', 'Demo: Skipping action');
      return res.redirect('/products');
    }

    await db.updateProduct(id, updatedProduct);

    req.flash('success', 'Product updated successfully.');
    res.redirect('/products');
  },
];

exports.productDelete = async (req, res) => {
  const id = req.params.id;

  if (isDemo()) {
    req.flash('info', 'Demo: Skipping action');
    return res.redirect('/products');
  }

  await db.deleteProduct(id);

  req.flash('success', 'Product deleted successfully.');
  res.redirect('/products');
};
