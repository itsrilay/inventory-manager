import * as db from '../db/queries';
import { Request, Response } from 'express';

export const getIndex = async (req: Request, res: Response) => {
  const products = await db.getAllProducts();
  const categories = await db.getAllCategories();

  res.render('index', {
    title: 'Dashboard',
    productCount: products.length,
    categoryCount: categories.length,
    stylesheet: 'index.css',
  });
};