const { body } = require('express-validator');
const handleValidationErrors = require('../utils/handleValidationErrors');
const db = require('../db/queries');

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
  });
};

exports.getProductDetails = async (req, res) => {
  const id = req.params.id;
  const product = await db.getProduct(id);

  if (!product) res.status(404).render('404');

  res.render('product/productDetails', {
    title: 'Product Details',
    product: product,
  });
};

exports.getProductCreateForm = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render('product/productCreate', {
    title: 'Create Product',
    product: {},
    categories: categories,
  });
};

exports.productCreate = [
  validateProduct,
  handleValidationErrors('product/productCreate', (req) => ({
    title: 'Create Product',
    product: req.body,
  })),
  async (req, res) => {
    const product = req.body;

    await db.insertProduct(product);

    res.redirect('/products');
  },
];

exports.getProductUpdateForm = async (req, res) => {
  const id = req.params.id;
  const product = await db.getProduct(id);
  const categories = await db.getAllCategories();

  if (!product) return res.status(404).render('404');

  res.render('product/productCreate', {
    title: 'Update Product',
    product: product,
    categories: categories,
  });
};

exports.productUpdate = [
  validateProduct,
  handleValidationErrors('productCreate', (req) => ({
    title: 'Update Product',
    product: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;

    await db.updateProduct(id, updatedProduct);

    res.redirect('/products');
  },
];

exports.productDelete = async (req, res) => {
  const id = req.params.id;
  await db.deleteProduct(id);

  res.redirect('/products');
};
