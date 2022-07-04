-- create daatabase

CREATE DATABASE gila_practice;

-- using the database

USE gila_practice;

-- creating table category

CREATE TABLE IF NOT EXISTS `category` (
    `category_id` INT(6) UNSIGNED AUTO_INCREMENT,
    `category_name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`category_id`),
    UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET=utf8;

-- creating table product

CREATE TABLE IF NOT EXISTS `product` (
    `product_id` INT(6) UNSIGNED AUTO_INCREMENT,
    `product_name` VARCHAR(50) NOT NULL,
    `product_sku` VARCHAR(10) NOT NULL,
    `product_brand` VARCHAR(50) NOT NULL,
    `product_cost` DOUBLE UNSIGNED NOT NULL,
    `fk_category` INT(6) UNSIGNED NOT NULL,
    PRIMARY KEY (`product_id`),
    UNIQUE KEY `product_id_UNIQUE` (`product_id`),
    UNIQUE KEY `product_sku_UNIQUE` (`product_sku`),
    CONSTRAINT `fk_category_product_id` FOREIGN KEY (`fk_category`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET=utf8;

-- creating table attributes

CREATE TABLE IF NOT EXISTS `attributes` (
    `attributes_id` INT(6) UNSIGNED AUTO_INCREMENT,
    `attribute_category` JSON NOT NULL,
    `fk_product` INT(6) UNSIGNED NOT NULL,
    PRIMARY KEY (`attributes_id`),
    UNIQUE KEY `attributes_id_UNIQUE` (`attributes_id`),
    CONSTRAINT `fk_product_id` FOREIGN KEY (`fk_product`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT= 1 DEFAULT CHARSET=utf8;


-- inserting categories

INSERT INTO `category` (`category_name`) VALUES
  ('TV'),
  ('laptop'),
  ('Shoes');

-- inserting test products

INSERT INTO `product` (`product_name`, `product_sku`,`product_brand`,`product_cost`,`fk_category`) VALUES 
('Samsung 4k','3A','Samsung','8000.00','1'),
('Samsung 8k','32A','Samsung','12000.00','1'),
('Laptop DELL','32SF','DELL','10000.00','2'),
('Nike Shoes','33D','NIKE','3000.00','3'),
('Laptop HP','32SA3','HP','500.00','2'),
('Adidas Shoes','3S3D','Adidas','3000.00','3'),
('Sony Bravia 4k','33A','Sony','600.00','1'),
('LG 8k','32SSA','Samsung','1000.00','1');

-- inserting test attributes

INSERT INTO `attributes` ( `attribute_category`, `fk_product`) VALUES
  ('{"screen": "LED", "size": "40"}', '1'),
  ('{"screen": "LCD", "size": "60"}', '2'),
  ('{"CPU": "AMD", "RAM": "8GB"}', '3'),
  ('{"material": "Leather", "number": "27"}', '4'),
  ('{"CPU": "Intel", "RAM": "16GB"}', '5'),
  ('{"material": "Plastic", "number": "23"}', '6'),
  ('{"screen": "OLED", "size": "80"}', '7'),
  ('{"screen": "LED", "size": "50"}', '8');


