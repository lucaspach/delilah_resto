-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `delilah` ;

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `delilah` ;

-- -----------------------------------------------------
-- Table `delilah`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`role` ;

CREATE TABLE IF NOT EXISTS `delilah`.`role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '			';


-- -----------------------------------------------------
-- Table `delilah`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`user` ;

CREATE TABLE IF NOT EXISTS `delilah`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `full_adress` VARCHAR(200) NULL DEFAULT NULL,
  `role_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_role_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `delilah`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '								';


-- -----------------------------------------------------
-- Table `delilah`.`login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`login` ;

CREATE TABLE IF NOT EXISTS `delilah`.`login` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `token` VARCHAR(200) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`idUser`),
  CONSTRAINT `fk_login_user`
    FOREIGN KEY (`idUser`)
    REFERENCES `delilah`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '			';


-- -----------------------------------------------------
-- Table `delilah`.`payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`payment` ;

CREATE TABLE IF NOT EXISTS `delilah`.`payment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `method` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '				';


-- -----------------------------------------------------
-- Table `delilah`.`order_state`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`order_state` ;

CREATE TABLE IF NOT EXISTS `delilah`.`order_state` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `state` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '					';


-- -----------------------------------------------------
-- Table `delilah`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`order` ;

CREATE TABLE IF NOT EXISTS `delilah`.`order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_state` INT(11) NULL DEFAULT NULL,
  `id_payment` INT(11) NULL DEFAULT NULL,
  `id_user` INT(11) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_order_state_idx` (`id_state` ASC) VISIBLE,
  INDEX `fk_order_payment_idx` (`id_payment` ASC) VISIBLE,
  CONSTRAINT `fk_order_payment`
    FOREIGN KEY (`id_payment`)
    REFERENCES `delilah`.`payment` (`id`),
  CONSTRAINT `fk_order_state`
    FOREIGN KEY (`id_state`)
    REFERENCES `delilah`.`order_state` (`id`),
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `delilah`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '																																														';


-- -----------------------------------------------------
-- Table `delilah`.`order_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`order_detail` ;

CREATE TABLE IF NOT EXISTS `delilah`.`order_detail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_order` INT(11) NULL DEFAULT NULL,
  `total` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orderD_order_idx` (`id_order` ASC) VISIBLE,
  CONSTRAINT `fk_orderD_order`
    FOREIGN KEY (`id_order`)
    REFERENCES `delilah`.`order` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '				';


-- -----------------------------------------------------
-- Table `delilah`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`product` ;

CREATE TABLE IF NOT EXISTS `delilah`.`product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `description_img` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilah`.`order_detail_has_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`order_detail_has_product` ;

CREATE TABLE IF NOT EXISTS `delilah`.`order_detail_has_product` (
  `order_detail_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`order_detail_id`, `product_id`),
  INDEX `fk_order_detail_has_product_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_order_detail_has_product_order_detail1_idx` (`order_detail_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_detail_has_product_order_detail1`
    FOREIGN KEY (`order_detail_id`)
    REFERENCES `delilah`.`order_detail` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detail_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `delilah`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO role (id, name) VALUES (1, 'user');
INSERT INTO role (id, name) VALUES (2, 'admin');

