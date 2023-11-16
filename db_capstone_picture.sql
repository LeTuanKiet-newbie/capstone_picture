/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `img_id` int DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `comment_create_date` timestamp NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `img_create_date` timestamp NOT NULL,
  `img_title` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) NOT NULL,
  `img_description` varchar(255) NOT NULL,
  PRIMARY KEY (`img_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `save_image`;
CREATE TABLE `save_image` (
  `save_img_id` int NOT NULL AUTO_INCREMENT,
  `save_img_date` timestamp NOT NULL,
  `img_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`save_img_id`),
  KEY `user_id` (`user_id`),
  KEY `img_id` (`img_id`),
  CONSTRAINT `save_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `save_image_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `images` (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_fullname` varchar(100) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_phone` varchar(150) NOT NULL,
  `age` int NOT NULL,
  `user_password` varchar(150) NOT NULL,
  `user_avatar` varchar(255) NOT NULL,
  `user_role` varchar(50) NOT NULL DEFAULT (_utf8mb4'user'),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_id`, `user_id`, `img_id`, `content`, `comment_create_date`) VALUES
(1, 2, 5, 'test comment', '2023-11-15 09:02:01');
INSERT INTO `comments` (`comment_id`, `user_id`, `img_id`, `content`, `comment_create_date`) VALUES
(2, 2, 5, 'this is a test comment', '2023-11-15 14:05:17');
INSERT INTO `comments` (`comment_id`, `user_id`, `img_id`, `content`, `comment_create_date`) VALUES
(6, 2, 4, 'tested', '2023-11-16 07:58:48');
INSERT INTO `comments` (`comment_id`, `user_id`, `img_id`, `content`, `comment_create_date`) VALUES
(7, 2, 4, 'tested', '2023-11-16 12:49:48'),
(8, 2, 4, 'tested', '2023-11-16 13:21:45');

INSERT INTO `images` (`img_id`, `user_id`, `img_create_date`, `img_title`, `img_url`, `img_description`) VALUES
(4, 2, '2023-11-11 13:09:28', 'test', 'abcxsacsa', 'can this be successful');
INSERT INTO `images` (`img_id`, `user_id`, `img_create_date`, `img_title`, `img_url`, `img_description`) VALUES
(5, 2, '2023-11-11 17:14:53', 'test', 'abcxsacsa', 'can this be successful');
INSERT INTO `images` (`img_id`, `user_id`, `img_create_date`, `img_title`, `img_url`, `img_description`) VALUES
(6, 2, '2023-11-13 09:39:20', 'test', 'abcxsacsa', 'can this be successful');
INSERT INTO `images` (`img_id`, `user_id`, `img_create_date`, `img_title`, `img_url`, `img_description`) VALUES
(8, 2, '2023-11-16 13:16:51', 'test', 'C:\\Users\\kuuha\\Desktop\\Cybersoft\\back-end\\baiTap\\capstone_picture\\public\\img\\1700140610853_avatar_the_way_of_water.jpg', 'day la buoc test');



INSERT INTO `users` (`user_id`, `user_fullname`, `user_email`, `user_phone`, `age`, `user_password`, `user_avatar`, `user_role`) VALUES
(2, 'le tuan kiet', 'kietle9a7@gmail.com', '08321312321321', 24, '$2b$10$SEpMVYMb9xd.6uLefvCrduM4UOxMTBFOnmg5Nm4159iL0Z2NLSJ5e', 'text', 'user');
INSERT INTO `users` (`user_id`, `user_fullname`, `user_email`, `user_phone`, `age`, `user_password`, `user_avatar`, `user_role`) VALUES
(3, 'KIEt', 'kietle9a78@gmail.com', '08321312321321', 24, '$2b$10$iDDQyfTnQ8McBFGBMdJY7eKlbn9iD7paLDqu2mKqBW.wOfLqjcLKu', 'text', 'user');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;