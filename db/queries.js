const pool = require('./pool');
const {
  handleSnakeToCamel,
  camelizeRow,
} = require('../utils/handleSnakeToCamel.js');

// Products

async function getAllProducts() {
  const { rows } = await pool.query('SELECT * FROM product ORDER BY id');
  const products = handleSnakeToCamel(rows);

  return products;
}

async function getProduct(id) {
  const { rows } = await pool.query('SELECT * FROM product WHERE id = $1', [
    id,
  ]);

  if (!rows[0]) {
    return null;
  }

  const product = camelizeRow(rows[0]);

  return product;
}

async function insertProduct(product) {
  await pool.query(
    'INSERT INTO product (name, description, stock_quantity, price, is_active, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
    [
      product.name,
      product.description,
      product.stockQuantity,
      product.price,
      product.isActive,
      product.categoryId,
    ]
  );
}

async function updateProduct(id, updatedProduct) {
  await pool.query(
    'UPDATE product SET name = $1, description = $2, stock_quantity = $3, price = $4, is_active = $5, category_id = $6 WHERE id = $7',
    [
      updatedProduct.name,
      updatedProduct.description,
      updatedProduct.stockQuantity,
      updatedProduct.price,
      updatedProduct.isActive,
      updatedProduct.categoryId,
      id,
    ]
  );
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM product WHERE id = $1', [id]);
}

// Categories

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM category ORDER BY id');
  const categories = handleSnakeToCamel(rows);

  return categories;
}

async function getCategory(id) {
  const { rows } = await pool.query('SELECT * FROM category WHERE id = $1', [
    id,
  ]);

  if (!rows[0]) {
    return null;
  }

  const category = camelizeRow(rows[0]);

  return category;
}

async function insertCategory(category) {
  await pool.query('INSERT INTO category (name) VALUES ($1)', [category.name]);
}

async function updateCategory(id, updatedCategory) {
  await pool.query('UPDATE category SET name = $1 WHERE id = $2', [
    updatedCategory.name,
    id,
  ]);
}

async function deleteCategory(id) {
  await pool.query('DELETE FROM category WHERE id = $1', [id]);
}

module.exports = {
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
};
