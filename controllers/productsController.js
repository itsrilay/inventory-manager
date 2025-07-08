let id = 0;

function createId() {
  id = id + 1;
  return id;
}

const products = [
  {
    id: createId(),
    name: 'Product1',
    description: 'Nice product.',
    stockQuantity: 1,
    price: 3.99,
    isActive: true,
  },
  {
    id: createId(),
    name: 'Product2',
    description: 'Nice product.',
    stockQuantity: 1,
    price: 5.99,
    isActive: true,
  },
  {
    id: createId(),
    name: 'Product3',
    description: 'Nice product.',
    stockQuantity: 1,
    price: 10.0,
    isActive: true,
  },
];

module.exports = {
  getProducts: (req, res) => {
    res.render('productList', { title: 'Product List', products: products });
  },

  getProductDetails: (req, res) => {
    const productId = req.params.productId;
    const product = products.find(
      (product) => String(product.id) === productId
    );

    if (!product) res.render('404');

    res.render('productDetails', {
      title: 'Product Details',
      product: product,
    });
  },
};
