CREATE DATABASE IF NOT EXISTS `review_system` DEFAULT CHARACTER SET utf8mb4;

use `review_system`;

CREATE TABLE if not exists `user` (
  `Id` bigint  NOT NULL auto_increment,
  `EmailAddress` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `review` (
  `Id` bigint  NOT NULL auto_increment,
  `UserId` bigint  NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Address` varchar(400) NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Status` int NOT NULL,
  `Type` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `invatation` (
  `Id` bigint  NOT NULL auto_increment,
  `ReviewId` bigint  NOT NULL,
  `UserId` bigint NOT NULL,
  `IsRead` boolean NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `contact_group` (
  `Id` bigint  NOT NULL auto_increment,
  `UserId` bigint NOT NULL,
  `GroupName` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `doc_position` (
  `Id` bigint  NOT NULL auto_increment,
  `Line` int NOT NULL,
  `page` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `code_position` (
  `Id` bigint  NOT NULL auto_increment,
  `Line` int NOT NULL,
  `FileName` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `contact_group_relation` (
  `Id` bigint  NOT NULL auto_increment,
  `GroupId` bigint NOT NULL,
  `ContactId` bigint NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `deficiency` (
  `Id` bigint  NOT NULL auto_increment,
  `ReviewId` bigint NOT NULL,
  `UserId` bigint NOT NULL,
  `PostionId` bigint NOT NULL,
  `Status` int NOT NULL,
  `Content` varchar(400) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE if not exists `deficiency_combination_record` (
  `Id` bigint  NOT NULL auto_increment,
  `DeficiencyId` bigint NOT NULL,
  `CombinedId` bigint NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

