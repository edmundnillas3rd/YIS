CREATE TABLE `award` (
  `award_id` varchar(36) NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `award_participation_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `award_name` varchar(45) NOT NULL,
  `award_received` smallint NOT NULL,
  PRIMARY KEY (`award_id`),
  UNIQUE KEY `award_id_UNIQUE` (`award_id`),
  KEY `user_award_fk_idx` (`user_id`),
  CONSTRAINT `award_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `care_of` (
  `care_of_id` varchar(36) NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `family_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `middle_name` varchar(45) NOT NULL,
  `suffix` varchar(45) NOT NULL,
  `relation_status` varchar(45) NOT NULL,
  PRIMARY KEY (`care_of_id`),
  UNIQUE KEY `care_of_UNIQUE` (`care_of_id`),
  KEY `user_care_of_idx` (`user_id`),
  CONSTRAINT `care_of_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `club` (
  `club_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `club_organization_id` varchar(36) NOT NULL,
  `club_position_id` varchar(36) NOT NULL,
  `club_started` smallint NOT NULL,
  `club_ended` smallint NOT NULL,
  PRIMARY KEY (`club_id`),
  KEY `user_club_fk_idx` (`user_id`),
  CONSTRAINT `user_club_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `club_organization` (
  `club_organization_id` varchar(36) NOT NULL,
  `club_organization_name` varchar(45) NOT NULL,
  PRIMARY KEY (`club_organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `club_position` (
  `club_position_id` varchar(36) NOT NULL,
  `club_position_name` varchar(45) NOT NULL,
  PRIMARY KEY (`club_position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `college` (
  `college_id` varchar(36) NOT NULL,
  `college_name` varchar(100) NOT NULL,
  `college_acronym` varchar(100) NOT NULL,
  PRIMARY KEY (`college_id`),
  UNIQUE KEY `college_id_UNIQUE` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `course` (
  `course_id` varchar(36) NOT NULL,
  `college_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_name` varchar(45) NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_id_UNIQUE` (`course_id`),
  KEY `course_college_fk_idx` (`college_id`),
  CONSTRAINT `course_college_fk` FOREIGN KEY (`college_id`) REFERENCES `college` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `penalty_fee` (
  `penalty_fee_id` varchar(36) NOT NULL,
  `penalty_fee_value` bigint NOT NULL DEFAULT '0',
  `penalty_status_id` varchar(36) NOT NULL,
  PRIMARY KEY (`penalty_fee_id`),
  UNIQUE KEY `penalty_fee_id_UNIQUE` (`penalty_fee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `penalty_status_fee` (
  `penalty_status_id` varchar(36) NOT NULL,
  `penalty_status_name` varchar(45) NOT NULL,
  UNIQUE KEY `penalty_status_id_UNIQUE` (`penalty_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `role_id` varchar(36) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id_UNIQUE` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `seminar` (
  `seminar_id` varchar(36) NOT NULL,
  `seminar_name` varchar(45) NOT NULL,
  `seminar_date_attended` date DEFAULT NULL,
  `seminar_participation_name` varchar(45) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`seminar_id`),
  KEY `user_idx` (`user_id`),
  CONSTRAINT `user_seminar_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `solicitation_form` (
  `solicitation_form_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_care_of` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `solicitation_number` bigint NOT NULL AUTO_INCREMENT,
  `solicitation_date_returned` date DEFAULT NULL,
  `solicitation_yearbook_payment` bigint unsigned NOT NULL DEFAULT '0',
  `solicitation_payment_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_returned_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_or_number` bigint unsigned NOT NULL,
  PRIMARY KEY (`solicitation_number`),
  KEY `user_solicitation_form_fk_idx` (`user_id`),
  CONSTRAINT `user_solicitation_form_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `solicitation_payment_status` (
  `solicitation_payment_status_id` varchar(36) NOT NULL,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`solicitation_payment_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `solicitation_returned_status` (
  `solicitation_returned_status_id` varchar(36) NOT NULL,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`solicitation_returned_status_id`),
  UNIQUE KEY `solicitation_returned_status_id_UNIQUE` (`solicitation_returned_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `solicitation_status` (
  `solicitation_number` bigint NOT NULL,
  `returned_status_id` varchar(36) NOT NULL,
  PRIMARY KEY (`solicitation_number`),
  UNIQUE KEY `solicitation_status_id_UNIQUE` (`solicitation_number`),
  KEY `fk_solicitation_status_2_idx` (`returned_status_id`),
  CONSTRAINT `fk_solicitation_status_1` FOREIGN KEY (`solicitation_number`) REFERENCES `solicitation_form` (`solicitation_number`),
  CONSTRAINT `fk_solicitation_status_2` FOREIGN KEY (`returned_status_id`) REFERENCES `solicitation_returned_status` (`solicitation_returned_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `user_first_name` varchar(45) NOT NULL,
  `user_family_name` varchar(45) NOT NULL,
  `user_middle_name` varchar(45) NOT NULL,
  `user_suffix` varchar(45) NOT NULL,
  `user_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_password` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_year_graduate` smallint DEFAULT NULL,
  `role_id` varchar(36) NOT NULL,
  `course_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_FK` (`role_id`),
  KEY `user_FK_1` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `yearbook` (
  `yearbook_id` varchar(36) NOT NULL,
  `yearbook_status_id` varchar(36) NOT NULL,
  `yearbook_care_of` varchar(36) DEFAULT '',
  `yearbook_date_released` datetime DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`yearbook_id`),
  UNIQUE KEY `yearbook_id_UNIQUE` (`yearbook_id`),
  KEY `user_idx` (`user_id`),
  CONSTRAINT `yearbook_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `yearbook_photos` (
  `yearbook_photos_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `yearbook_photos_date_released` date DEFAULT NULL,
  `yearbook_status_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`yearbook_photos_id`),
  UNIQUE KEY `yearbook_photos_id_UNIQUE` (`yearbook_photos_id`),
  KEY `yearbook_photos_user_idx` (`user_id`),
  KEY `yearbook_photos_status_idx` (`yearbook_status_id`),
  CONSTRAINT `yearbook_photos_status` FOREIGN KEY (`yearbook_status_id`) REFERENCES `yearbook_status` (`yearbook_status_id`),
  CONSTRAINT `yearbook_photos_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `yearbook_status` (
  `yearbook_status_id` varchar(36) NOT NULL,
  `yearbook_status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`yearbook_status_id`),
  UNIQUE KEY `yearbook_status_id_UNIQUE` (`yearbook_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM yis.club_organization;