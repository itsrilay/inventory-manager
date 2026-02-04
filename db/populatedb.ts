import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
-- Create tables
CREATE TABLE IF NOT EXISTS category (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS product (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  description TEXT,
  stock_quantity INT DEFAULT 0,
  price DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT TRUE,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

CREATE INDEX idx_category_id ON product (category_id);

-- Insert categories
INSERT INTO category (name)
VALUES 
  ('Laptops'),
  ('Desktops'),
  ('Monitors'),
  ('Keyboards & Mice'),
  ('Storage Devices'),
  ('PC Components'),
  ('Networking'),
  ('Software'),
  ('Accessories');

-- Insert products

-- Laptops
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('ThinkPad X1 Carbon Gen 11', '14" business ultrabook with Intel i7, 16GB RAM, and 1TB SSD.', 15, 1899.99, 1),
  ('MacBook Pro 14"', 'Apple M3 Pro chip, 16GB RAM, 512GB SSD. Space Gray.', 10, 2199.00, 1),
  ('ASUS ROG Zephyrus G14', 'Gaming laptop with AMD Ryzen 9 and RTX 4060 GPU.', 8, 1599.50, 1);

-- Desktops
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Dell OptiPlex 7000', 'Compact business desktop with Intel i5 and 512GB SSD.', 20, 849.00, 2),
  ('Custom Gaming PC', 'Built with AMD Ryzen 7, RTX 4070, 32GB RAM, 1TB NVMe.', 5, 1999.99, 2);

-- Monitors
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Dell UltraSharp U2723QE', '27" 4K IPS monitor with USB-C hub and 99% sRGB.', 25, 579.00, 3),
  ('LG UltraGear 32GN650', '32" QHD gaming monitor with 165Hz refresh rate.', 18, 399.95, 3);

-- Keyboards & Mice
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Logitech MX Keys', 'Wireless illuminated keyboard for Windows/macOS.', 60, 99.99, 4),
  ('Razer DeathAdder V3', 'Ergonomic gaming mouse with 30,000 DPI sensor.', 45, 69.99, 4),
  ('Keychron K6', 'Compact wireless mechanical keyboard with hot-swappable switches.', 30, 84.50, 4);

-- Storage Devices
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Samsung 980 PRO 1TB', 'PCIe 4.0 NVMe SSD with 7000MB/s read speed.', 40, 129.99, 5),
  ('Seagate Expansion 4TB', 'External USB 3.0 hard drive for backups and media.', 22, 99.00, 5);

-- PC Components
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('NVIDIA GeForce RTX 4070 Ti', 'High-performance GPU with 12GB GDDR6X memory.', 6, 799.99, 6),
  ('Corsair RM850x', '850W modular PSU, 80+ Gold certified.', 15, 139.95, 6),
  ('Noctua NH-D15', 'Premium air CPU cooler with dual 140mm fans.', 10, 99.99, 6);

-- Networking
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Ubiquiti UniFi Dream Machine SE', 'All-in-one gateway, switch, and controller for home/office.', 7, 479.00, 7),
  ('TP-Link AX5400 WiFi 6 Router', 'Dual-band Gigabit router with 6 antennas.', 14, 149.00, 7);

-- Software
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Microsoft 365 Personal', '1-year subscription for 1 user. Includes Word, Excel, Outlook, etc.', 100, 69.99, 8),
  ('Windows 11 Pro OEM Key', 'License key for Windows 11 Professional.', 50, 129.00, 8);

-- Accessories
INSERT INTO product (name, description, stock_quantity, price, category_id)
VALUES 
  ('Anker USB-C Hub', '6-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.', 40, 39.99, 9),
  ('Laptop Stand Aluminum', 'Adjustable ergonomic stand for laptops up to 16".', 35, 29.99, 9),
  ('Webcam Logitech C920', 'Full HD 1080p webcam with stereo mic.', 25, 74.95, 9);

-- Inactive product
INSERT INTO product (name, description, stock_quantity, price, is_active, category_id)
VALUES 
  ('Intel i9-10900K', '10-core processor for LGA1200 platform (discontinued).', 0, 399.99, FALSE, 6);
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done.');
}

main();