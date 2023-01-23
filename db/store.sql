-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: store
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hearts`
--

DROP TABLE IF EXISTS `hearts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hearts` (
  `user_id` int unsigned NOT NULL,
  `store_id` int unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`store_id`),
  KEY `hearts_store_id_foreign` (`store_id`),
  CONSTRAINT `hearts_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  CONSTRAINT `hearts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hearts`
--

LOCK TABLES `hearts` WRITE;
/*!40000 ALTER TABLE `hearts` DISABLE KEYS */;
INSERT INTO `hearts` VALUES (1,1),(1,3),(3,13);
/*!40000 ALTER TABLE `hearts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (11,'20221125161746_users.js',1,'2023-01-23 04:16:42'),(12,'20230116151140_stores.js',1,'2023-01-23 04:16:45'),(13,'20230116151514_reviews.js',1,'2023-01-23 04:16:50'),(14,'20230116153711_tags.js',1,'2023-01-23 04:16:50'),(15,'20230116153837_stores_tags.js',1,'2023-01-23 04:16:54'),(16,'20230122101711_hearts.js',1,'2023-01-23 04:16:58');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `author` int unsigned NOT NULL,
  `store` int unsigned NOT NULL,
  `text` text NOT NULL,
  `rating` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `reviews_author_foreign` (`author`),
  KEY `reviews_store_foreign` (`store`),
  CONSTRAINT `reviews_author_foreign` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_store_foreign` FOREIGN KEY (`store`) REFERENCES `stores` (`id`),
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text,
  `location_type` varchar(10) DEFAULT 'Point',
  `location_coordinates` point NOT NULL,
  `location_address` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `author` int unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stores_author_foreign` (`author`),
  CONSTRAINT `stores_author_foreign` FOREIGN KEY (`author`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Olive Oil','olive-oil','Friendly atmosphere. Great selection of local brews. ','Point',_binary '\0\0\0\0\0\0\0\í\ô\Þs» E@\ä\ÝG$À\÷SÀ','Hamilton, ON, Canada','a10ca916-af2a-4a98-96a1-3e320df006f9.jpeg',1,NULL,NULL),(2,'Sour on King','sourdough-on-king','Amazing selection of everything sour, fermented and tart. ','Point',_binary '\0\0\0\0\0\0\0„\0ž E@$qE\õ\öSÀ','King William Street, Hamilton, ON, Canada','0d3624fc-78ee-4297-8d15-e191b9775520.jpeg',1,NULL,NULL),(3,'The French','the-french','High end french restaurant on the hippest street in town. ','Point',_binary '\0\0\0\0\0\0\0*\Ä#\ñ\ò E@\ÔW¡’„\÷SÀ','The French, King William Street, Hamilton, ON, Canada','bb7f7d60-9b0c-46b0-a0e4-1422d5752567.jpeg',1,NULL,NULL),(4,'Rust City Brewery','rust-city-brewery','A family run urban coffee house, craft beer pub and brewpub combining our love of coffee, beer and people','Point',_binary '\0\0\0\0\0\0\0;k\\¤\õ E@„c–=‰\÷SÀ','27 King William Street, Hamilton, ON, Canada','6c34119d-b9fd-4051-911e-948a16068229.jpeg',1,NULL,NULL),(5,'Berkeley North','berkeley-north','Set in the revitalized James St. North neighbourhood, Berkeley North is a West Coast inspired restaurant located on historic King William Street in the heart of downtown Hamilton.\r\n','Point',_binary '\0\0\0\0\0\0\0\×I\Ç\æ\ô E@Èwˆ\÷SÀ','31 King William St, Hamilton, ON, Canada','9f2fc898-56b9-47fd-8a78-1d43c1377dc8.jpeg',1,NULL,NULL),(6,'Mezcal Tacos & Tequila','mezcal-tacos--tequila','Familiar Mexican fare with a gourmet twist & housemade margaritas, plus a lively late-night scene.\r\n','Point',_binary '\0\0\0\0\0\0\0]bv`J E@x¨·P\Ã\÷SÀ','150 James St S, Hamilton, ON L8P 3A2, Canada','96a33834-d7aa-4758-b980-fca901ea5956.jpeg',1,NULL,NULL),(7,'Two Black Sheep','two-black-sheep','Intimate, rustic-chic bar providing oysters, charcuterie, cheese plates, wine & craft cocktails.\r\n','Point',_binary '\0\0\0\0\0\0\00Sf9 E@ø~´I\÷SÀ','163 John St S, Hamilton, ON L8N 2C3, Canada','e3c532c9-cb77-4d92-9267-9abedeae2820.jpeg',1,NULL,NULL),(8,'Donut Monster','donut-monster','Small-batch, from-scratch donuts available at select coffee shops on Thursdays, Fridays, and Saturdays.','Point',_binary '\0\0\0\0\0\0\0\Ú\íi=2 E@hX\ÖG\ñ\õSÀ','The Kitchen Collective, King Street East, Hamilton, ON, Canada','a6b38a1d-38c3-47af-ae4c-0ab26d8edec3.jpeg',1,NULL,NULL),(9,'The Harbour Diner','the-harbour-diner','Classic diner eats like eggs Benedict & club sandwiches star at this charming, old-timey nook.\r\n','Point',_binary '\0\0\0\0\0\0\0\Þf;\ð{¢E@\ß\ì @\÷SÀ','The Harbour Diner, James Street North, Hamilton, ON, Canada','b5792f01-41c8-41b7-906d-1bdb411e4a55.jpeg',1,NULL,NULL),(10,'Charred','charred','BBQ chicken prepared Portugese style over an open charcoal pit.','Point',_binary '\0\0\0\0\0\0\0H\ò¦l¢¡E@¨3\÷p\÷SÀ','Charred Rotisserie House, James Street North, Hamilton, ON, Canada','4a5cb791-0140-4fa2-864c-af786640157d.jpeg',1,NULL,NULL),(11,'Green Bar','green-bar','Cheery counter-serve serving organic, health-conscious fare such as smoothies & simple vegan eats.\r\n','Point',_binary '\0\0\0\0\0\0\0ø¯î›¡E@\ã§qo\÷SÀ','Green Bar, James Street North, Hamilton, ON, Canada','7ea7c02c-9054-442a-9126-788bf3471499.jpeg',1,NULL,NULL),(12,'Work','work','Dive bar, unreal nachos and huge selection of beers on both on tap and in bottle. ','Point',_binary '\0\0\0\0\0\0\0_X£\Ã\è¡E@´\Ïc”g\÷SÀ','Work Restaurant, James Street North, Hamilton, ON, Canada','3e143d06-a3df-4e15-86f6-4efc0a3f5fbc.jpeg',1,NULL,NULL),(13,'Born & Raised','born--raised','Wood fired Pizzas, oysters and a modern take on classic Italian dishes. Great collection of locals beers. ','Point',_binary '\0\0\0\0\0\0\0\0V­–¡E@À\È(s\÷SÀ','Born & Raised, James Street North, Hamilton, ON, Canada','6da53d2e-c0e0-4aef-9ec9-9513b79ece15.jpeg',1,NULL,NULL),(14,'The Burnt Tongue','the-burnt-tongue','Counter-serve joint with an ever-changing selection of elevated soups, plus burgers & other fare.\r\n','Point',_binary '\0\0\0\0\0\0\0>\Ð\nY¡E@ pn]{\÷SÀ','The Burnt Tongue, Cannon Street East, Hamilton, ON, Canada','7628c82c-66df-493c-ba5f-9237c6bc3516.jpeg',1,NULL,NULL),(15,'Bar Izakaya','bar-izakaya','Incorporating local meats and produce with the finest Japanese ingredients. The menu consists of Rice bowls and Ramen, while the evening menu is served family style with small & medium sharing plates and house board options. ','Point',_binary '\0\0\0\0\0\0\0ª‹\ÊÂ¡E@8ÿ¯:r\÷SÀ','Bar Izakaya, James Street North, Hamilton, ON, Canada','c589ef95-b942-4e8a-a63e-cab74c465b9d.jpeg',1,NULL,NULL),(16,'Mulberry Coffee','mulberry-coffee','Chill cafe in the former lobby of an 1880s hotel serving coffee, sweets & panini, plus cocktails.\r\n','Point',_binary '\0\0\0\0\0\0\0½\íøå‚¡E@ž1‚|\÷SÀ','Mulberry Street Coffeehouse, James Street North, Hamilton, ON, Canada','1b7870df-e238-4104-be4c-a267bd5f6257.jpeg',1,NULL,NULL);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores_tags`
--

DROP TABLE IF EXISTS `stores_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores_tags` (
  `store_id` int unsigned NOT NULL,
  `tag_id` int unsigned NOT NULL,
  PRIMARY KEY (`store_id`,`tag_id`),
  KEY `stores_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `stores_tags_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  CONSTRAINT `stores_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores_tags`
--

LOCK TABLES `stores_tags` WRITE;
/*!40000 ALTER TABLE `stores_tags` DISABLE KEYS */;
INSERT INTO `stores_tags` VALUES (1,1),(4,1),(11,1),(16,1),(1,2),(3,2),(4,2),(6,2),(7,2),(10,2),(12,2),(13,2),(4,3),(10,3),(14,3),(15,3),(16,3),(1,4),(2,4),(5,4),(8,4),(11,4),(14,4),(1,5),(3,5),(4,5),(5,5),(6,5),(7,5),(10,5),(12,5),(13,5),(14,5);
/*!40000 ALTER TABLE `stores_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Wifi'),(2,'Open Late'),(3,'Family Friendly'),(4,'Vega'),(5,'Licensed');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(90) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` timestamp NULL DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wes@example.com','Wes Bos','$2b$10$Xet3m3bD6yko138bMXwzbuLRG4g5s1Iiga/EHbiCF11YHV6ev1u3O',NULL,NULL,NULL,NULL),(2,'debbie@example.com','Debbie Downer','$2b$10$Zyb8lUn4cInwKh7t1BkAVu93982LFRA4l9u.fD.J1w/VpHq8ynS0S',NULL,NULL,NULL,NULL),(3,'beau@example.com','Beau','$2b$10$8kqjVMaKdEFpwtnbR3CLn.lTT98woDcAqTJkoWFedAEXxEJ7QqUz.',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-23 15:39:36
