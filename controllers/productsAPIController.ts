import { body } from 'express-validator';
import handleValidationErrors from '../utils/handleValidationErrors';
import * as db from '../db/queries';
import isDemo from '../utils/isDemo';
import { Request, Response } from 'express';

export const validateProduct = [
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
    .isBoolean()
    .withMessage('isActive must be a boolean.'),

  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer.')
    .toInt(),
];

export const getProducts = async (req: Request, res: Response) => {
  const products = await db.getAllProducts();
  res.json(products);
};

export const getProductDetails = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await db.getProduct(id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
};

export const productCreate = [
  validateProduct,
  handleValidationErrors('json', (req: Request) => ({
    product: req.body,
  })),
  async (req: Request, res: Response) => {
    const product = req.body;

    if (isDemo()) {
      return res.status(403).json({ message: 'Demo: Skipping action' });
    }

    const newProduct = await db.insertProduct(product);

    res.status(201).json(newProduct);
  },
];

export const productUpdate = [
  ...validateProduct,
  handleValidationErrors('json', (req: Request) => ({
    product: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const updatedProductData = req.body;

    if (isDemo()) {
      return res.status(403).json({ message: 'Demo: Skipping action' });
    }

    const updatedProduct = await db.updateProduct(id, updatedProductData);

    res.json(updatedProduct);
  },
];

export const productDelete = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (isDemo()) {
    return res.status(403).json({ message: 'Demo: Skipping action' });
  }

  await db.deleteProduct(id);

  res.status(204).send();
};