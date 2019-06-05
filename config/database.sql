
SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Auto increment primary key',
  `uuid` varchar(255) NOT NULL COMMENT 'Unique id of a category item',
  `name` varchar(255) NOT NULL COMMENT 'Category name',
  `parent` int(10) UNSIGNED DEFAULT NULL COMMENT 'parent flag to denote the parent category',
  `created` int(11) NOT NULL COMMENT 'Category creation UNIX timestamp',
  `modified` int(11) NOT NULL COMMENT 'Category update UNIX timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories_products`
--

DROP TABLE IF EXISTS `categories_products`;
CREATE TABLE IF NOT EXISTS `categories_products` (
  `category_id` int(10) UNSIGNED NOT NULL COMMENT 'Foreign key, categories.id',
  `product_id` int(10) UNSIGNED NOT NULL COMMENT 'Foreign key, products.id',
  PRIMARY KEY (`category_id`,`product_id`),
  KEY `FK_PROD_ID` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Auto increment primary key',
  `uuid` varchar(255) NOT NULL COMMENT 'Unique id of a product item',
  `name` varchar(255) NOT NULL COMMENT 'Product name',
  `description` text COMMENT 'Product description',
  `sku` varchar(32) NOT NULL COMMENT 'stock keeping unit',
  `price` decimal(9,2) NOT NULL COMMENT 'Product price',
  `quantity` int(10) UNSIGNED DEFAULT NULL COMMENT 'List of quantity available in stock',
  `in_stock` tinyint(1) DEFAULT NULL COMMENT 'Flag to denote if the item available in stock or not.',
  `created` int(10) UNSIGNED NOT NULL COMMENT 'Product creation UNIX timestamp',
  `modified` int(10) UNSIGNED NOT NULL COMMENT 'Product update UNIX timesttamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
