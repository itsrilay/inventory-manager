const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const categoriesRouter = Router();

categoriesRouter.get('/create', categoriesController.getCreateCategoryForm);
categoriesRouter.post('/create', categoriesController.categoryCreate);
categoriesRouter.get('/:id/update', categoriesController.getCategoryUpdateForm);
categoriesRouter.post('/:id/update', categoriesController.categoryUpdate);
categoriesRouter.post('/:id/delete', categoriesController.categoryDelete);
categoriesRouter.get('/:id', categoriesController.getCategoryDetails);
categoriesRouter.get('/', categoriesController.getCategories);

module.exports = categoriesRouter;
