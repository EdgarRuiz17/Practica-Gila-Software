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
    `product_sku` INT(6) UNSIGNED NOT NULL,
    `product_brand` VARCHAR(50) NOT NULL,
    `product_cost` FLOAT(6,5) UNSIGNED NOT NULL,
    `fk_category` INT(6) UNSIGNED NOT NULL,
    PRIMARY KEY (`product_id`),
    UNIQUE KEY `product_id_UNIQUE` (`product_id`),
    CONSTRAINT `fk_category_product_id` FOREIGN KEY (`fk_category`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT= 2 DEFAULT CHARSET=utf8;

-- creating table attributes

CREATE TABLE IF NOT EXISTS `attributes` (
    `attributes_id` INT(6) UNSIGNED AUTO_INCREMENT,
    `attribute_name` VARCHAR(30) NOT NULL,
    `attribute_units` VARCHAR(20) NOT NULL,
    `fk_category` INT(6) UNSIGNED NOT NULL,
    PRIMARY KEY (`attributes_id`),
    UNIQUE KEY `attributes_id_UNIQUE` (`attributes_id`),
    CONSTRAINT `fk_category_attributes_id` FOREIGN KEY (`fk_category`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT= 3 DEFAULT CHARSET=utf8;

-- creating table attributes_product

CREATE TABLE IF NOT EXISTS `attributes_product` (
    `att_prod_id` INT(6) UNSIGNED AUTO_INCREMENT,
    `fk_product` INT(6) UNSIGNED NOT NULL,
    `fk_attributes` INT(6) UNSIGNED NOT NULL,
    `value` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`att_prod_id`),
    UNIQUE KEY `att_prod_id_UNIQUE` (`att_prod_id`),
    CONSTRAINT `fk_product_id` FOREIGN KEY (`fk_product`) REFERENCES `product` (`product_id`),
    CONSTRAINT `fk_attributes_id` FOREIGN KEY (`fk_attributes`) REFERENCES `attributes` (`attributes_id`)
) ENGINE=InnoDB AUTO_INCREMENT= 4 DEFAULT CHARSET=utf8;