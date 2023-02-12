CREATE DATABASE  IF NOT EXISTS `salvalink` ;
USE `salvalink`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `links_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


INSERT INTO `users` VALUES (1,'teste','teste@teste.com','$2y$10$goU.lSH8uA8CbRs.Ikiej.MOyUGtOE7aK6NXrcqiDpGiCAoLuVUcC','2023-02-11 21:22:21','2023-02-11 21:22:21');

INSERT INTO `links` VALUES (1,'Trabalhando com arrays em Javascript','https://devgo.com.br/trabalhando-com-arrays-em-javascript',1,'2020-10-29 21:22:21','2020-10-29 21:22:22'),(2,'10 extensões do Visual Studio Code para facilitar o seu dia a dia.','https://devgo.com.br/10-extensoes-do-visual-studio-code-para-facilitar-o-seu-dia-a-dia',1,'2020-10-29 21:22:21','2020-10-29 21:22:22'),(3,'5 exemplos de algoritmos na vida real e na computação','https://blog.betrybe.com/tecnologia/exemplos-de-algoritmos/',1,'2023-02-12 18:10:21','2023-02-12 18:10:21'),(4,'Uma API eficiente e simples','https://devgo.com.br/uma-api-eficiente-e-simples',1,'2023-02-12 18:10:21','2023-02-12 18:10:21');

INSERT INTO `blogs` VALUES (1,'Trybe','2020-10-29 21:22:21','2020-10-29 21:22:22'),(2,'DevGO','2020-10-29 21:22:21','2020-10-29 21:22:22'),(3,'TecnoBlog','2020-10-29 21:22:21','2020-10-29 21:22:22');