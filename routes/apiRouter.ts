import { Router } from 'express';
import * as productsController from '../controllers/productsAPIController';
import * as categoriesController from '../controllers/categoriesAPIController';

const apiRouter = Router();

// Product routes
apiRouter.get('/products', productsController.getProducts);
apiRouter.get('/products/:id', productsController.getProductDetails);
apiRouter.post('/products', ...productsController.productCreate);
apiRouter.put('/products/:id', ...productsController.productUpdate);
apiRouter.delete('/products/:id', productsController.productDelete);

// Category routes
apiRouter.get('/categories', categoriesController.getCategories);
apiRouter.get('/categories/:id', categoriesController.getCategoryDetails);
apiRouter.post('/categories', ...categoriesController.categoryCreate);
apiRouter.put('/categories/:id', ...categoriesController.categoryUpdate);
apiRouter.delete('/categories/:id', categoriesController.categoryDelete);

export default apiRouter;