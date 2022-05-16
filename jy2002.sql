-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jy2002
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `erpfunc`
--

DROP TABLE IF EXISTS `erpfunc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `erpfunc` (
  `FuncId` int NOT NULL AUTO_INCREMENT,
  `FuncName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`FuncId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erpfunc`
--

LOCK TABLES `erpfunc` WRITE;
/*!40000 ALTER TABLE `erpfunc` DISABLE KEYS */;
INSERT INTO `erpfunc` VALUES (1,'干膜账套'),(2,'胶膜账套'),(3,'水膜账套'),(4,'锡箔账套'),(5,'铝模账套');
/*!40000 ALTER TABLE `erpfunc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erporgan`
--

DROP TABLE IF EXISTS `erporgan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `erporgan` (
  `fstId` int NOT NULL AUTO_INCREMENT,
  `fstName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `actFlag` int DEFAULT '1',
  `orderNo` int DEFAULT NULL,
  PRIMARY KEY (`fstId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erporgan`
--

LOCK TABLES `erporgan` WRITE;
/*!40000 ALTER TABLE `erporgan` DISABLE KEYS */;
INSERT INTO `erporgan` VALUES (2,'P2(苏州公司)',1,600),(4,'P4(杭州总公司)',1,400);
/*!40000 ALTER TABLE `erporgan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generatenextid`
--

DROP TABLE IF EXISTS `generatenextid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generatenextid` (
  `tableName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tableKeyId` int DEFAULT NULL,
  `tableCode` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`tableName`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generatenextid`
--

LOCK TABLES `generatenextid` WRITE;
/*!40000 ALTER TABLE `generatenextid` DISABLE KEYS */;
INSERT INTO `generatenextid` VALUES ('StorageTray',4,'0004');
/*!40000 ALTER TABLE `generatenextid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packageitems`
--

DROP TABLE IF EXISTS `packageitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packageitems` (
  `trayId` int NOT NULL,
  `sNo` int NOT NULL,
  `proId` int DEFAULT NULL,
  `actFlag` int DEFAULT NULL,
  PRIMARY KEY (`trayId`,`sNo`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT COMMENT='托码明细表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packageitems`
--

LOCK TABLES `packageitems` WRITE;
/*!40000 ALTER TABLE `packageitems` DISABLE KEYS */;
INSERT INTO `packageitems` VALUES (1,1,1,1),(1,2,2,1),(1,3,3,1),(2,1,4,1),(2,2,5,1),(2,3,6,1),(3,1,7,1),(3,2,8,1),(3,3,9,1),(4,1,10,1),(4,2,11,1),(4,3,12,1);
/*!40000 ALTER TABLE `packageitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `trayId` int NOT NULL AUTO_INCREMENT,
  `trayCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fstId` int DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `createPerson` int DEFAULT NULL,
  `actFlag` int DEFAULT NULL,
  `pkStatus` int DEFAULT '1',
  `whId` int DEFAULT '2',
  PRIMARY KEY (`trayId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT COMMENT='托码表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (1,'ZT4C0315001',4,'2022-03-15 09:12:00',1200,1,1,1),(2,'ZT4C0315002',4,'2022-03-15 09:44:12',1200,1,1,1),(3,'ZT4C0315003',4,'2022-03-15 09:44:30',1200,1,1,2),(4,'ZT4C0315004',4,'2022-03-15 09:44:51',1200,1,1,2),(5,'ZT4C0315005',4,'2022-05-11 09:23:49',1200,1,1,2),(6,'ZT4C0315006',4,'2022-05-13 01:03:55',1200,1,1,2),(7,'ZT4C0315007',4,'2022-05-13 01:03:57',1200,1,1,2),(8,'ZT4C0315008',4,'2022-05-13 01:04:09',1200,1,1,2),(9,'ZT4C0315009',4,'2022-05-13 01:03:58',1200,1,1,3),(10,'ZT4C0315010',4,'2022-05-13 01:04:06',1200,1,1,3),(11,'ZT4C0315011',4,'2022-05-13 01:04:04',1200,1,1,3),(12,'ZT4C0315012',4,'2022-05-13 01:04:08',1200,1,1,3),(13,'ZT4C0315013',4,'2022-05-13 01:04:02',1200,1,1,3),(14,'ZT4C0315014',4,'2022-05-13 01:04:00',1200,1,1,3),(15,'ZT4C0315015',4,'2022-05-13 01:04:03',1200,1,1,3),(39,'ZT4C0315017',4,'2022-05-13 17:32:12',1200,1,1,1),(42,'ZT4C0315012',4,'2022-05-14 11:20:07',1200,1,1,1),(43,'ZT4C0315013',4,'2022-05-14 11:20:16',1200,1,1,1),(44,'ZT4C0315014',4,'2022-05-14 11:22:28',1200,1,1,1);
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productitems`
--

DROP TABLE IF EXISTS `productitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productitems` (
  `proId` int NOT NULL AUTO_INCREMENT,
  `fstId` int DEFAULT NULL,
  `whId` int DEFAULT NULL COMMENT '所属仓库ID',
  `trayId` int DEFAULT NULL COMMENT '托ID',
  `barcode` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `reqCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `actFlag` int DEFAULT '1',
  `createdate` datetime DEFAULT NULL,
  `createPerson` int DEFAULT NULL COMMENT '外键，但是目前我们还建表用起来。',
  `inWarehouseDate` datetime DEFAULT NULL,
  `outWarehousePerson` varchar(20) DEFAULT NULL COMMENT '出库人',
  `reWorkData` datetime DEFAULT NULL COMMENT '返工出库时间',
  `outWarehouseDate` datetime DEFAULT NULL COMMENT '出库时间',
  `productStatus` varchar(4) DEFAULT '1001' COMMENT '用来表示不同的产品状态,如1001表示已入库，1002表示已出库，1003表示返工重入库，1004表示已经移库，1005表示待入库等',
  PRIMARY KEY (`proId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productitems`
--

LOCK TABLES `productitems` WRITE;
/*!40000 ALTER TABLE `productitems` DISABLE KEYS */;
INSERT INTO `productitems` VALUES (1,4,1,1,'FD2740SN-597-BM06DCA11A01007A01','BM06DCA',1,'2022-03-15 08:58:34',1200,'2022-05-13 01:10:28','1200',NULL,'2022-05-15 11:40:17','1002'),(2,4,1,1,'FD2740SN-597-BM06DCA11A01007B02','BM06DCA',1,'2022-03-15 09:02:51',1200,'2022-05-13 01:10:29','1200',NULL,'2022-05-15 11:41:25','1002'),(3,4,1,1,'FD2740SN-597-BM06DCA11A01007C03','BM06DCA',1,'2022-03-15 09:03:23',1300,'2022-05-13 01:10:32','1200',NULL,NULL,'1003'),(4,4,1,2,'FD2740SN-597-BM06DCA11A01007A04','BM06DCA',1,'2022-03-15 09:06:42',1200,'2022-05-13 01:10:31',NULL,NULL,NULL,'1001'),(5,4,1,2,'FD2740SN-597-BM06DCA11A01007B05','BM06DCA',1,'2022-03-15 09:07:09',1200,'2022-05-13 01:10:33',NULL,NULL,NULL,'1001'),(6,4,1,2,'FD2740SN-597-BM06DCA11A01007C06','BM06DCA',1,'2022-03-15 09:07:31',1200,'2022-05-13 01:10:34',NULL,NULL,NULL,'1001'),(7,4,1,3,'FD2740SN-597-BM06DCA11A01007A07','BM06DCA',1,'2022-03-15 09:07:52',1200,'2022-05-13 01:10:37',NULL,NULL,NULL,'1001'),(8,4,2,1,'FD2740SN-597-BM06DCA11A01007B08','BM06DCA',1,'2022-03-15 09:08:11',1200,'2022-05-13 01:10:36',NULL,NULL,NULL,'1003'),(9,4,2,1,'FD2740SN-597-BM06DCA11A01007C09','BM06DCA',1,'2022-03-15 09:08:27',1200,'2022-05-13 01:10:39',NULL,NULL,NULL,'1001'),(10,4,2,2,'FD2740SN-597-BM06DCA11A01007A10','BM06DCA',1,'2022-03-15 09:08:40',1200,'2022-05-13 01:10:40',NULL,NULL,NULL,'1001'),(11,4,2,2,'FD2740SN-597-BM06DCA11A01007B11','BM06DCA',1,'2022-03-15 09:09:04',1200,'2022-05-13 01:10:41',NULL,NULL,NULL,'1001'),(12,4,3,1,'FD2740SN-597-BM06DCA11A01007C12','BM06DCA',1,'2022-03-15 09:09:23',1200,'2022-05-13 01:10:42',NULL,NULL,NULL,'1003'),(13,4,3,1,'FD2740SN-597-BM06DCA11A01007C13','BM06DCA',1,'2022-05-12 20:49:24',1200,'2022-05-13 01:10:44',NULL,NULL,NULL,'1003'),(14,4,3,2,'FD2740SN-597-BM06DCA11A01007C14','BM06DCA',1,'2022-05-12 20:51:00',1200,'2022-05-13 01:10:45',NULL,NULL,NULL,'1003'),(15,4,1,2,'FD2740SN-597-BM06DCA11A01007C15','BM06DCA',1,'2022-05-14 10:59:02',1200,'2022-05-14 11:00:08',NULL,NULL,NULL,'1003'),(16,4,1,2,'FD2740SN-597-BM06DCA11A01007C16','BM06DCA',1,'2022-05-14 10:59:03',1200,'2022-05-14 11:00:10',NULL,NULL,NULL,'1001'),(17,4,1,2,'FD2740SN-597-BM06DCA11A01007C17','BM06DCA',1,'2022-05-14 10:59:05',1200,'2022-05-14 11:00:12',NULL,NULL,NULL,'1001'),(18,4,1,2,'FD2740SN-597-BM06DCA11A01007C18','BM06DCA',1,'2022-05-14 10:59:06',1300,'2022-05-14 11:00:13','1200',NULL,NULL,'1003'),(19,4,1,2,'FD2740SN-597-BM06DCA11A01007C19','BM06DCA',1,'2022-05-14 10:59:07',1200,'2022-05-14 11:00:14',NULL,NULL,NULL,'1001'),(20,4,1,2,'FD2740SN-597-BM06DCA11A01007C20','BM06DCA',1,'2022-05-14 10:59:08',1200,'2022-05-14 11:00:17',NULL,NULL,NULL,'1001'),(21,4,1,2,'FD2740SN-597-BM06DCA11A01007C21','BM06DCA',1,'2022-05-14 10:59:09',1200,'2022-05-14 11:00:15','',NULL,NULL,'1003'),(22,4,2,1,'FD2740SN-597-BM06DCA11A01007C22','BM06DCA',1,'2022-05-14 10:59:11',1300,'2022-05-14 11:00:18','1200',NULL,NULL,'1003'),(23,4,2,1,'FD2740SN-597-BM06DCA11A01007C23','BM06DCA',1,'2022-05-14 10:59:12',1300,'2022-05-14 11:00:20','1200',NULL,NULL,'1003'),(24,4,2,1,'FD2740SN-597-BM06DCA11A01007C24','BM06DCA',1,'2022-05-14 10:59:14',1300,'2022-05-14 11:00:21','1200',NULL,NULL,'1003'),(25,4,2,1,'FD2740SN-597-BM06DCA11A01007C25','BM06DCA',1,'2022-05-14 10:59:16',1200,'2022-05-14 11:00:23',NULL,NULL,NULL,'1001'),(26,4,2,3,'FD2740SN-597-BM06DCA11A01007C26','BM06DCA',1,'2022-05-15 00:14:04',1200,'2022-05-15 00:14:37','1200',NULL,'2022-05-14 16:56:10','1002'),(27,4,2,3,'FD2740SN-597-BM06DCA11A01007C27','BM06DCA',1,'2022-05-15 00:14:55',1200,'2022-05-15 00:14:53','1200',NULL,'2022-05-15 10:33:28','1002');
/*!40000 ALTER TABLE `productitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagebar`
--

DROP TABLE IF EXISTS `storagebar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storagebar` (
  `sBarId` int NOT NULL,
  `stId` int DEFAULT NULL,
  `proId` int DEFAULT NULL COMMENT '产品ID',
  `trayId` int DEFAULT NULL COMMENT '托ID 来自packages表的主键',
  `barCode` varchar(38) DEFAULT NULL COMMENT ' 来自产品明细表 产品条码',
  `actFlag` int DEFAULT NULL,
  PRIMARY KEY (`sBarId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT COMMENT='暂存条码表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagebar`
--

LOCK TABLES `storagebar` WRITE;
/*!40000 ALTER TABLE `storagebar` DISABLE KEYS */;
INSERT INTO `storagebar` VALUES (1,1,1,1,'FD2740SN-597-BM06DCA11A01007A07',0);
/*!40000 ALTER TABLE `storagebar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storagetray`
--

DROP TABLE IF EXISTS `storagetray`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storagetray` (
  `stId` int NOT NULL AUTO_INCREMENT,
  `pdaCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `trayId` int DEFAULT NULL,
  `trayCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createPerson` int DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `actFlag` int DEFAULT NULL,
  `whId` int DEFAULT '5',
  `scanId` int DEFAULT NULL,
  PRIMARY KEY (`stId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT COMMENT='暂存托码表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storagetray`
--

LOCK TABLES `storagetray` WRITE;
/*!40000 ALTER TABLE `storagetray` DISABLE KEYS */;
INSERT INTO `storagetray` VALUES (1,'PC:FD',1,'ZT4C0315111',1200,'2022-03-22 10:49:47',0,5,1005),(2,'PC:FD',2,'ZT4C0315112',1200,'2022-03-22 10:50:12',1,5,1005),(3,'PC:FD',3,'ZT4C0315113',1200,'2022-03-22 10:50:33',1,5,1005),(4,'PC:FD',4,'ZT4C0315114',1200,'2022-05-03 11:11:56',1,5,1005),(5,'PC:FD',5,'ZT4C0315115',1200,'2022-05-03 11:11:53',1,5,1005),(6,'PC:FD',4,'ZT4C0315116',1200,'2022-05-03 11:11:51',0,5,1005),(7,'PC:FD',5,'ZT4C0315117',1200,'2022-05-03 11:11:47',0,5,1005);
/*!40000 ALTER TABLE `storagetray` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `usercode` int NOT NULL COMMENT '用户码',
  `pwd` varchar(30) DEFAULT NULL COMMENT '用户登录密码',
  PRIMARY KEY (`usercode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1200,'bytehero');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse` (
  `whId` int NOT NULL AUTO_INCREMENT,
  `whCode` varchar(20) DEFAULT NULL,
  `fstId` int DEFAULT NULL COMMENT '所属公司ID',
  `actFlag` int DEFAULT NULL COMMENT '仓库状态， 0代表已经删除， 1代表正常',
  `createPerson` int DEFAULT NULL COMMENT '仓库创建人',
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`whId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='仓库表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` VALUES (1,'WH:DF',4,1,1200,'2022-05-13 21:45:47'),(2,'WH:DP',4,1,1200,'2022-05-13 21:45:49'),(3,'WH:DU',4,1,1200,'2022-05-13 21:45:50'),(4,'WH:DP',4,1,1200,'2022-05-13 21:45:51'),(5,'WH:DQ',4,1,1200,'2022-05-13 21:45:50'),(6,'WH:DE',4,1,1200,'2022-05-13 13:56:42'),(7,'WH:DG',2,1,1200,'2022-05-13 14:33:17'),(8,'WH:DY',2,1,1200,'2022-05-13 14:35:54'),(9,'WH:DM',2,1,1200,'2022-05-13 14:39:49'),(10,'WH:DL',2,1,1200,'2022-05-13 14:43:12'),(11,'WH:DR',2,1,1200,'2022-05-13 14:46:06'),(13,'WH:ED',2,1,1200,'2022-05-13 17:42:40'),(15,'WH:ED',4,1,1200,'2022-05-13 17:45:59'),(16,'WH:EN',4,1,1200,'2022-05-14 02:32:54'),(17,'DE:BQ',4,1,1200,'2022-05-14 07:41:25'),(18,'BP:DO',4,1,1200,'2022-05-14 08:13:22'),(19,'DF:EC',4,1,1200,'2022-05-14 08:26:32'),(20,'SA:PO',4,1,1200,'2022-05-14 09:49:37'),(21,'RE:TY',4,1,1200,'2022-05-14 12:48:46');
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-15 22:59:16
