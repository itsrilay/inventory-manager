import { Router } from 'express';
import * as productsController from '../controllers/productsController';

const productsRouter = Router();

productsRouter.get('/create', productsController.getProductCreateForm);
productsRouter.post('/create', ...productsController.productCreate);
productsRouter.get('/:id/update', productsController.getProductUpdateForm);
productsRouter.post('/:id/update', ...productsController.productUpdate);
productsRouter.post('/:id/delete', productsController.productDelete);
productsRouter.get('/:id', productsController.getProductDetails);
productsRouter.get('/', productsController.getProducts);

export default productsRouter;