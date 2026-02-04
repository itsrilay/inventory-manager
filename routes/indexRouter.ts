import { Router } from 'express';
import * as indexController from '../controllers/indexController';

const indexRouter = Router();

indexRouter.get('/', indexController.getIndex);

export default indexRouter;