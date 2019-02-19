-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "people" within bamazon_db --
CREATE TABLE products (
  -- Makes a numeric column called "item_id" which cannot contain null --
  item_id INTEGER(3) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(45) NOT NULL,
  -- Makes a string column called "department_name" --
  department_name VARCHAR(20) NOT NULL,
  -- Makes an numeric column called "price" --
  price FLOAT(5,2) NOT NULL,
  -- Makes a numeric column called "stock_quantity" --
  stock_quantity INTEGER(2) NOT NULL
);

-- Adds data to the products table in the bamazon database --
INSERT INTO products (product_name, department_name, price, stock_quantity) values 
("Bells Hopslam", "IPA", 10.45, 30),
("North Coast Old Rasputin", "Stout", 6.25, 38),
("Cigar City Jai Alai", "IPA", 6, 67),
("Playalinda Liquid Stupid", "Belgian Strong", 10, 22),
("Coppertail Unholy", "Belgian Trippel", 8.50, 50),
("Orange Blossom Pilsner 2", "Pilsner", 6, 80),
("Sixpoint Resin", "DIPA", 5, 40),
("Brew Bus Hazelnut Spread", "Porter", 4, 30),
("Dogfish Head 120 Minute", "IPA", 12, 20),
("Cigar City Togabonga", "Ale", 3, 60);

SELECT * FROM bamazon_db.products;

-- Manager View functions below --
DROP DATABASE IF EXISTS 