import prisma from './prisma';

// Products

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
}

export async function insertProduct(product: any) {
  return prisma.product.create({
    data: product,
  });
}

export async function updateProduct(id: string, updatedProduct: any) {
  return prisma.product.update({
    where: {
      id: parseInt(id, 10),
    },
    data: updatedProduct,
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
}

// Categories

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export async function getCategory(id: string) {
  return prisma.category.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
}

export async function insertCategory(category: any) {
  return prisma.category.create({
    data: category,
  });
}

export async function updateCategory(id: string, updatedCategory: any) {
  return prisma.category.update({
    where: {
      id: parseInt(id, 10),
    },
    data: updatedCategory,
  });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
}