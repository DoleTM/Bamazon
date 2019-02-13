-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "people" within bamazon_db --
CREATE TABLE products (
  -- Makes a numeric column called "item_id" which cannot contain null --
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(20) NOT NULL,
  -- Makes a string column called "department_name" --
  department_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "price" --
  price INTEGER(5) NOT NULL,
  -- Makes a numeric column called "stock_quantity" --
  stock_quantity INTEGER(2) NOT NULL
);

-- Adds data to the products table in the bamazon database --
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Bells Hopslam", "IPA", 10.45, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("North Coast Old Rasputin", "Stout", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Cigar City Jai Alai", "IPA", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Playalinda Liquid Stupid", "Belgian Strong", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Coppertail Unholy", "Belgian Trippel", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Orange Blossom Pilsner 2", "Pilsner", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Sixpoint Resin", "DIPA", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Brew Bus Hazelnut Spread", "Porter", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Dogfish Head 120 Minute", "IPA", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Cigar City Togobonga", "Ale", 10, 40);

SELECT * FROM products;