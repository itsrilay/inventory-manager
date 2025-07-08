const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const categoryRouter = Router();

categoryRouter.get('/', categoriesController.getCategories);
categoryRouter.get('/:categoryId', categoriesController.getCategoryDetails);

module.exports = categoryRouter;
