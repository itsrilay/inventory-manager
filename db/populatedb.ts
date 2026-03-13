import prisma from './prisma';

async function main() {
  console.log('Seeding...');

  // Create categories
  const categoryNames = [
    'Laptops', 'Desktops', 'Monitors', 'Keyboards & Mice', 
    'Storage Devices', 'PC Components', 'Networking', 'Software', 'Accessories'
  ];

  const categories: Record<string, any> = {};
  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name: name },
      update: {}, 
      create: { name },
    });
    categories[name] = category;
  }

  // Create products
  const products = [
    { name: 'ThinkPad X1 Carbon Gen 11', description: '14" business ultrabook with Intel i7, 16GB RAM, and 1TB SSD.', stockQuantity: 15, price: 1899.99, categoryName: 'Laptops', isActive: true },
    { name: 'MacBook Pro 14"', description: 'Apple M3 Pro chip, 16GB RAM, 512GB SSD. Space Gray.', stockQuantity: 10, price: 2199.00, categoryName: 'Laptops', isActive: true },
    { name: 'ASUS ROG Zephyrus G14', description: 'Gaming laptop with AMD Ryzen 9 and RTX 4060 GPU.', stockQuantity: 8, price: 1599.50, categoryName: 'Laptops', isActive: true },
    { name: 'Dell OptiPlex 7000', description: 'Compact business desktop with Intel i5 and 512GB SSD.', stockQuantity: 20, price: 849.00, categoryName: 'Desktops', isActive: true },
    { name: 'Custom Gaming PC', description: 'Built with AMD Ryzen 7, RTX 4070, 32GB RAM, 1TB NVMe.', stockQuantity: 5, price: 1999.99, categoryName: 'Desktops', isActive: true },
    { name: 'Dell UltraSharp U2723QE', description: '27" 4K IPS monitor with USB-C hub and 99% sRGB.', stockQuantity: 25, price: 579.00, categoryName: 'Monitors', isActive: true },
    { name: 'LG UltraGear 32GN650', description: '32" QHD gaming monitor with 165Hz refresh rate.', stockQuantity: 18, price: 399.95, categoryName: 'Monitors', isActive: true },
    { name: 'Intel i9-10900K', description: '10-core processor for LGA1200 platform (discontinued).', stockQuantity: 0, price: 399.99, categoryName: 'PC Components', isActive: false },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {
        description: p.description,
        price: p.price,
        stockQuantity: p.stockQuantity,
        isActive: p.isActive,
        categoryId: categories[p.categoryName].id 
      },
      create: {
        name: p.name,
        description: p.description,
        price: p.price,
        stockQuantity: p.stockQuantity,
        isActive: p.isActive,
        categoryId: categories[p.categoryName].id,
      },
    });
  }

  console.log('Done.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
