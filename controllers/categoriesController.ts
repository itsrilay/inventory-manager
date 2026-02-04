import { body } from 'express-validator';
import handleValidationErrors from '../utils/handleValidationErrors';
import * as db from '../db/queries';
import isDemo from '../utils/isDemo';
import { Request, Response } from 'express';

const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters.'),
];

export const getCategories = async (req: Request, res: Response) => {
  const categories = await db.getAllCategories();

  res.render('category/categoryList', {
    title: 'Category List',
    categories: categories,
    stylesheet: 'lists.css',
  });
};

export const getCategoryDetails = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await db.getCategory(id);

  if (!category) res.render('404', { layout: false });

  res.render('category/categoryDetails', {
    title: 'Category Details',
    category: category,
    stylesheet: 'details.css',
  });
};

export const getCreateCategoryForm = (req: Request, res: Response) => {
  res.render('category/categoryForm', {
    title: 'Create Category',
    category: {},
    stylesheet: 'forms.css',
  });
};

export const categoryCreate = [
  validateCategory,
  handleValidationErrors('category/categoryForm', (req) => ({
    title: 'Create Category',
    category: req.body,
  })),
  async (req: Request, res: Response) => {
    const category = req.body;

    if (isDemo()) {
      // req.flash('info', 'Demo: Skipping action');
      return res.redirect('/categories');
    }

    await db.insertCategory(category);

    // req.flash('success', 'Category created successfully.');
    res.redirect('/categories');
  },
];

export const getCategoryUpdateForm = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await db.getCategory(id);

  if (!category) return res.status(404).render('404', { layout: false });

  res.render('category/categoryForm', {
    title: 'Update Category',
    category: category,
    stylesheet: 'forms.css',
  });
};

export const categoryUpdate = [
  ...validateCategory,
  handleValidationErrors('category/categoryForm', (req) => ({
    title: 'Update Category',
    category: {
      id: req.params.id,
      ...req.body,
    },
  })),
  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const updatedCategory = req.body;

    if (isDemo()) {
      // req.flash('info', 'Demo: Skipping action');
      return res.redirect('/categories');
    }

    await db.updateCategory(id, updatedCategory);

    // req.flash('success', 'Category updated successfully.');
    res.redirect('/categories');
  },
];

export const categoryDelete = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (isDemo()) {
    // req.flash('info', 'Demo: Skipping action');
    return res.redirect('/categories');
  }

  await db.deleteCategory(id);

  // req.flash('success', 'Category deleted successfully.');
  res.redirect('/categories');
};