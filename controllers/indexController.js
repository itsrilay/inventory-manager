const { getAllProducts, getAllCategories } = require('../db/queries');

exports.getIndex = async (req, res) => {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  res.render('index', {
    title: 'Dashboard',
    productCount: products.length,
    categoryCount: categories.length,
    stylesheet: 'index.css',
  });
};
