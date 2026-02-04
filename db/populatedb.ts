import prisma from './prisma';

async function main() {
  console.log('Seeding...');

  // Clear existing data
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // Create categories
  const laptops = await prisma.category.create({ data: { name: 'Laptops' } });
  const desktops = await prisma.category.create({ data: { name: 'Desktops' } });
  const monitors = await prisma.category.create({ data: { name: 'Monitors' } });
  const keyboards = await prisma.category.create({ data: { name: 'Keyboards & Mice' } });
  const storage = await prisma.category.create({ data: { name: 'Storage Devices' } });
  const components = await prisma.category.create({ data: { name: 'PC Components' } });
  const networking = await prisma.category.create({ data: { name: 'Networking' } });
  const software = await prisma.category.create({ data: { name: 'Software' } });
  const accessories = await prisma.category.create({ data: { name: 'Accessories' } });

  // Create products
  await prisma.product.createMany({
    data: [
      // Laptops
      { name: 'ThinkPad X1 Carbon Gen 11', description: '14" business ultrabook with Intel i7, 16GB RAM, and 1TB SSD.', stockQuantity: 15, price: 1899.99, categoryId: laptops.id, isActive: true },
      { name: 'MacBook Pro 14"', description: 'Apple M3 Pro chip, 16GB RAM, 512GB SSD. Space Gray.', stockQuantity: 10, price: 2199.00, categoryId: laptops.id, isActive: true },
      { name: 'ASUS ROG Zephyrus G14', description: 'Gaming laptop with AMD Ryzen 9 and RTX 4060 GPU.', stockQuantity: 8, price: 1599.50, categoryId: laptops.id, isActive: true },

      // Desktops
      { name: 'Dell OptiPlex 7000', description: 'Compact business desktop with Intel i5 and 512GB SSD.', stockQuantity: 20, price: 849.00, categoryId: desktops.id, isActive: true },
      { name: 'Custom Gaming PC', description: 'Built with AMD Ryzen 7, RTX 4070, 32GB RAM, 1TB NVMe.', stockQuantity: 5, price: 1999.99, categoryId: desktops.id, isActive: true },

      // Monitors
      { name: 'Dell UltraSharp U2723QE', description: '27" 4K IPS monitor with USB-C hub and 99% sRGB.', stockQuantity: 25, price: 579.00, categoryId: monitors.id, isActive: true },
      { name: 'LG UltraGear 32GN650', description: '32" QHD gaming monitor with 165Hz refresh rate.', stockQuantity: 18, price: 399.95, categoryId: monitors.id, isActive: true },
      
      // Inactive product
      { name: 'Intel i9-10900K', description: '10-core processor for LGA1200 platform (discontinued).', stockQuantity: 0, price: 399.99, categoryId: components.id, isActive: false },
    ],
  });

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
