-- yis.club_organization definition

CREATE TABLE `club_organization` (
  `club_organization_id` varchar(255) NOT NULL,
  `club_organization_name` varchar(45) NOT NULL,
  PRIMARY KEY (`club_organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.club_position definition

CREATE TABLE `club_position` (
  `club_position_id` varchar(255) NOT NULL,
  `club_position_name` varchar(45) NOT NULL,
  PRIMARY KEY (`club_position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.college definition

CREATE TABLE `college` (
  `college_id` varchar(255) NOT NULL,
  `college_name` varchar(100) NOT NULL,
  `college_acronym` varchar(100) NOT NULL,
  PRIMARY KEY (`college_id`),
  UNIQUE KEY `college_id_UNIQUE` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.course definition

CREATE TABLE `course` (
  `course_id` varchar(255) NOT NULL,
  `college_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_name` varchar(45) NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_id_UNIQUE` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.penalty_status_fee definition

CREATE TABLE `penalty_status_fee` (
  `penalty_status_id` varchar(255) NOT NULL,
  `penalty_status_name` varchar(45) NOT NULL,
  UNIQUE KEY `penalty_status_id_UNIQUE` (`penalty_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.`role` definition

CREATE TABLE `role` (
  `role_id` varchar(255) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id_UNIQUE` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.sessions definition

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.solicitation_payment_status definition

CREATE TABLE `solicitation_payment_status` (
  `solicitation_payment_status_id` varchar(255) NOT NULL,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`solicitation_payment_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.solicitation_returned_status definition

CREATE TABLE `solicitation_returned_status` (
  `solicitation_returned_status_id` varchar(255) NOT NULL,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`solicitation_returned_status_id`),
  UNIQUE KEY `solicitation_returned_status_id_UNIQUE` (`solicitation_returned_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.yearbook definition

CREATE TABLE `yearbook` (
  `yearbook_id` varchar(255) NOT NULL,
  `yearbook_status_id` varchar(255) NOT NULL,
  `yearbook_care_of` varchar(255) NOT NULL,
  `yearbook_released_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.yearbook_photos definition

CREATE TABLE `yearbook_photos` (
  `yearbook_photos_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `yearbook_photos_date_released` date DEFAULT NULL,
  `yearbook_status_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.yearbook_status definition

CREATE TABLE `yearbook_status` (
  `yearbook_status_id` varchar(255) NOT NULL,
  `yearbook_status_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.penalty_fee definition

CREATE TABLE `penalty_fee` (
  `penalty_fee_id` varchar(255) NOT NULL,
  `penalty_fee_value` bigint NOT NULL DEFAULT '0',
  `penalty_fee_status_id` varchar(255) NOT NULL,
  PRIMARY KEY (`penalty_fee_id`),
  UNIQUE KEY `penalty_fee_id_UNIQUE` (`penalty_fee_id`),
  UNIQUE KEY `penalty_fee_status_id_UNIQUE` (`penalty_fee_status_id`),
  CONSTRAINT `fk_penalty_fee_1` FOREIGN KEY (`penalty_fee_status_id`) REFERENCES `penalty_status_fee` (`penalty_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.`user` definition

CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `user_first_name` varchar(45) NOT NULL,
  `user_family_name` varchar(45) NOT NULL,
  `user_middle_name` varchar(45) NOT NULL,
  `user_suffix` varchar(45) NOT NULL,
  `user_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_year_graduate` smallint NOT NULL,
  `role_id` varchar(255) NOT NULL,
  `course_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_FK` (`role_id`),
  KEY `user_FK_1` (`course_id`),
  CONSTRAINT `user_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `user_FK_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.award definition

CREATE TABLE `award` (
  `award_id` varchar(255) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `award_attended_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `award_name` varchar(45) NOT NULL,
  `award_received` int NOT NULL,
  PRIMARY KEY (`award_id`),
  KEY `award_FK_1` (`user_id`),
  CONSTRAINT `award_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `award_FK_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.care_of definition

CREATE TABLE `care_of` (
  `care_of_id` varchar(255) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `family_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `middle_name` varchar(45) NOT NULL,
  `suffix` varchar(45) NOT NULL,
  `relation_status` varchar(45) NOT NULL,
  PRIMARY KEY (`care_of_id`),
  UNIQUE KEY `care_of_UNIQUE` (`care_of_id`),
  KEY `care_of_FK` (`user_id`),
  CONSTRAINT `care_of_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.club definition

CREATE TABLE `club` (
  `club_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `club_organization_id` varchar(255) NOT NULL,
  `club_position_id` varchar(255) NOT NULL,
  `club_started` smallint NOT NULL,
  `club_ended` smallint NOT NULL,
  PRIMARY KEY (`club_id`),
  KEY `club_FK` (`user_id`),
  CONSTRAINT `club_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.solicitation_form definition

CREATE TABLE `solicitation_form` (
  `solicitation_form_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_care_of` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_number` bigint NOT NULL AUTO_INCREMENT,
  `solicitation_date_returned` date DEFAULT NULL,
  `solicitation_yearbook_payment` bigint unsigned NOT NULL,
  `solicitation_payment_status_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_returned_status_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `solicitation_or_number` bigint unsigned NOT NULL,
  PRIMARY KEY (`solicitation_number`),
  KEY `solicitation_form_FK` (`user_id`),
  CONSTRAINT `solicitation_form_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- yis.solicitation_status definition

CREATE TABLE `solicitation_status` (
  `solicitation_number` bigint NOT NULL,
  `returned_status_id` varchar(255) NOT NULL,
  PRIMARY KEY (`solicitation_number`),
  UNIQUE KEY `solicitation_status_id_UNIQUE` (`solicitation_number`),
  KEY `fk_solicitation_status_2_idx` (`returned_status_id`),
  CONSTRAINT `fk_solicitation_status_1` FOREIGN KEY (`solicitation_number`) REFERENCES `solicitation_form` (`solicitation_number`),
  CONSTRAINT `fk_solicitation_status_2` FOREIGN KEY (`returned_status_id`) REFERENCES `solicitation_returned_status` (`solicitation_returned_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
