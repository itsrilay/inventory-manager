import { body } from 'express-validator';
import handleValidationErrors from '../utils/handleValidationErrors';
import * as db from '../db/queries';
import isDemo from '../utils/isDemo';
import { Request, Response } from 'express';

export const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters.'),
];

export const getCategories = async (req: Request, res: Response) => {
  const categories = await db.getAllCategories();
  res.json(categories);
};

export const getCategoryDetails = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await db.getCategory(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(category);
};

export const categoryCreate = [
  ...validateCategory,
  handleValidationErrors('json', (req: Request) => ({
    category: req.body,
  })),
  async (req: Request, res: Response) => {
    const category = req.body;

    if (isDemo()) {
      return res.status(403).json({ message: 'Demo: Skipping action' });
    }

    const newCategory = await db.insertCategory(category);

    res.status(201).json(newCategory);
  },
];

export const categoryUpdate = [
  ...validateCategory,
  handleValidationErrors('json', (req: Request) => ({
    category: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const updatedCategoryData = req.body;

    if (isDemo()) {
      return res.status(403).json({ message: 'Demo: Skipping action' });
    }

    const updatedCategory = await db.updateCategory(id, updatedCategoryData);

    res.json(updatedCategory);
  },
];

export const categoryDelete = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (isDemo()) {
    return res.status(403).json({ message: 'Demo: Skipping action' });
  }

  await db.deleteCategory(id);

  res.status(204).send();
};
