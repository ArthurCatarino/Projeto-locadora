CREATE DATABASE  IF NOT EXISTS `locadora_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `locadora_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: locadora_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `cargos_nome_unique` (`Nome`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargosdeusuarios`
--

DROP TABLE IF EXISTS `cargosdeusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargosdeusuarios` (
  `Usuarios_ID` int unsigned NOT NULL,
  `Cargos_ID` int unsigned NOT NULL,
  PRIMARY KEY (`Usuarios_ID`,`Cargos_ID`),
  KEY `cargosDeUsuaruis_cargos_FK` (`Cargos_ID`),
  CONSTRAINT `cargosDeUsuaruis_cargos_FK` FOREIGN KEY (`Cargos_ID`) REFERENCES `cargos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cargosDeUsuaruis_usuarios_FK` FOREIGN KEY (`Usuarios_ID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargosdeusuarios`
--

LOCK TABLES `cargosdeusuarios` WRITE;
/*!40000 ALTER TABLE `cargosdeusuarios` DISABLE KEYS */;
INSERT INTO `cargosdeusuarios` VALUES (24,1),(27,1),(29,1),(23,2),(25,2),(26,2);
/*!40000 ALTER TABLE `cargosdeusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimos`
--

DROP TABLE IF EXISTS `emprestimos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimos` (
  `ID_USER` int unsigned NOT NULL,
  `ID_FILME` int unsigned NOT NULL,
  `Data_do_emprestimo` date NOT NULL,
  `Data_da_devolucao` date NOT NULL,
  PRIMARY KEY (`ID_USER`,`ID_FILME`),
  KEY `emprestimos_filmes_FK` (`ID_FILME`),
  CONSTRAINT `emprestimos_filmes_FK` FOREIGN KEY (`ID_FILME`) REFERENCES `filmes` (`ID`),
  CONSTRAINT `emprestimos_usuarios_FK` FOREIGN KEY (`ID_USER`) REFERENCES `usuarios` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimos`
--

LOCK TABLES `emprestimos` WRITE;
/*!40000 ALTER TABLE `emprestimos` DISABLE KEYS */;
INSERT INTO `emprestimos` VALUES (23,9,'2024-05-30','2024-06-06'),(23,24,'2024-05-28','2024-06-04'),(23,26,'2024-05-30','2024-06-06');
/*!40000 ALTER TABLE `emprestimos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `set_datas_emprestimos` BEFORE INSERT ON `emprestimos` FOR EACH ROW BEGIN

    IF NEW.Data_do_emprestimo IS NULL THEN

        SET NEW.Data_do_emprestimo = CURRENT_DATE;

    END IF;

    SET NEW.Data_da_devolucao = DATE_ADD(NEW.Data_do_emprestimo, INTERVAL 1 WEEK);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `decrementa_estoque_filme` BEFORE INSERT ON `emprestimos` FOR EACH ROW BEGIN

    UPDATE locadora_db.filmes

    SET QuantidadeEmEstoque = QuantidadeEmEstoque - 1

    WHERE ID = NEW.ID_FILME;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `incrementa_estoque_filme` BEFORE DELETE ON `emprestimos` FOR EACH ROW BEGIN

    UPDATE locadora_db.filmes

    SET QuantidadeEmEstoque = QuantidadeEmEstoque + 1

    WHERE ID = OLD.ID_FILME;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `filmes`
--

DROP TABLE IF EXISTS `filmes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filmes` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Diretor` varchar(100) NOT NULL,
  `QuantidadeEmEstoque` tinyint unsigned NOT NULL,
  `Estudio` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filmes`
--

LOCK TABLES `filmes` WRITE;
/*!40000 ALTER TABLE `filmes` DISABLE KEYS */;
INSERT INTO `filmes` VALUES (9,'BeatBoxBR','Mc Beat Box',1,'Beat Box musics'),(10,'Seringueiros Loucos','Tcheguevara',3,'Paje do norte'),(11,'Pantanal do medo','Saci',5,'Saci.INC'),(12,'Ipanema','Portuga',1,'Havaianas'),(13,'Mineirinho x Paulitinha','Ronaldinho Gaucho',4,'BrasilGamesEDU'),(14,'A jornada do saci','Troy Fox',12,'Tincidunt Limited'),(15,'Trainees em açao 2','Luis Inacio',4,'Comp.jr'),(16,'Xaulin pig slayer','Xing-Lau',6,'China.INC'),(17,'Xaulin pig slayer 2','Xing-Lau',6,'China.INC'),(18,'Xaulin pig slayer 3','Xing-Lau',6,'China.INC'),(23,'Uruguai X Esparta','Uruguense',4,'Filmes.INC'),(24,'teste','TESTE',5,'TESTE'),(26,'Gingado do samba prime','Oswaldo papa mikey',3,'Filmes.INC'),(28,'Guris Radicais >X','Bah Tche',3,'Chimas studio');
/*!40000 ALTER TABLE `filmes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Sobrenome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Usuarios_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (23,'Arthur','catarino','arthur@gmail.com','$2b$08$nCIPuBBKwLr2I0kkFlE/POD6XNFFQj0L4Y3zwkUmtgM3sbA4tiWqe'),(24,'Robson','catarino','robson@gmail.com','$2b$08$8ZUnqgBPOQyCKh0AyR0pVu9sbtfP8BZGwFcMH7B3M..nrsleV4auO'),(25,'Helena','catarino','helena@gmail.com','$2b$08$K6I7ViEvr77Tk6mrVWfXDeq.ttR5Nn6HgveqC4PG8kMbRhsvg3tuW'),(26,'Cassia','Oliveira','cassia@gmail.com','$2b$08$Yg47VXA4mQWE02FD8buFtOwQtRAg3OW3OOsgQf5Ew6j344S7J/ZGe'),(27,'Marcela','Calegario','marcela@gmail.com','$2b$08$jEim9puVKE5UEL6blZiutuO92zx28gZkkBjHrRFj3GdHrDIHBV8d2'),(29,'Jorge','teste','JorgeTeste@gmail.com','$2b$08$WaxPOhAj1YOgmNM27qwiYO7rIyrCQ9ArnckCJUJBQegnim9MvDqU2');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Sincroniza com  as chaves estrangeiras` AFTER INSERT ON `usuarios` FOR EACH ROW BEGIN
    INSERT INTO cargosdeusuarios (Usuarios_ID,Cargos_ID)
    VALUES (NEW.id, 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'locadora_db'
--

--
-- Dumping routines for database 'locadora_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31 17:27:56
