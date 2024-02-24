CREATE TABLE `college` (
  `college_id` varchar(36) NOT NULL,
  `college_name` varchar(100) NOT NULL,
  `college_acronym` varchar(100) NOT NULL,
  PRIMARY KEY (`college_id`),
  UNIQUE KEY `college_id_UNIQUE` (`college_id`)
);

CREATE TABLE `course` (
  `course_id` varchar(36) NOT NULL,
  `college_id` varchar(36),
  `course_name` varchar(45) NOT NULL,
  `course_abbreviation` varchar(45) NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_id_UNIQUE` (`course_id`),
  KEY `course_college_fk_idx` (`college_id`),
  CONSTRAINT `course_college_fk` FOREIGN KEY (`college_id`) REFERENCES `college` (`college_id`)
);

CREATE TABLE `role` (
  `role_id` varchar(36) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id_UNIQUE` (`role_id`)
);

CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `user_first_name` varchar(45) NULL,
  `user_family_name` varchar(45) NULL,
  `user_middle_name` varchar(45) NULL,
  `user_suffix` varchar(45) NULL,
  `user_email` varchar(45),
  `user_password` char(60),
  `user_school_year` smallint NULL,
  `user_school_id` varchar(45) NULL,
  `role_id` varchar(36) NOT NULL,
  `course_id` varchar(36) NULL,
  `is_csp` int,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_FK` (`role_id`),
  KEY `user_FK_1` (`course_id`)
);

CREATE TABLE `award` (
  `award_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `award_participation_name` varchar(45) NOT NULL,
  `award_name` varchar(45) NOT NULL,
  `award_received` smallint NOT NULL,
  PRIMARY KEY (`award_id`),
  UNIQUE KEY `award_id_UNIQUE` (`award_id`),
  KEY `user_award_fk_idx` (`user_id`),
  CONSTRAINT `award_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `club_organization` (
  `club_organization_id` varchar(36) NOT NULL,
  `club_organization_name` varchar(45) NOT NULL,
  PRIMARY KEY (`club_organization_id`)
);

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
);



CREATE TABLE `club_position` (
  `club_position_id` varchar(36) NOT NULL,
  `club_position_name` varchar(45) NOT NULL,
  PRIMARY KEY (`club_position_id`)
);

CREATE TABLE `seminar` (
  `seminar_id` varchar(36),
  `seminar_name` varchar(45),
  `seminar_date_attended` date NULL,
  `seminar_role` varchar(45),
  `user_id` varchar(36),
  PRIMARY KEY (`seminar_id`),
  KEY `user_idx` (`user_id`),
  CONSTRAINT `user_seminar_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext,
  PRIMARY KEY (`session_id`)
);

CREATE TABLE `solicitation_payment_status` (
  `solicitation_payment_status_id` varchar(36) NOT NULL,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`solicitation_payment_status_id`)
);

CREATE TABLE `solicitation_returned_status` (
  `solicitation_returned_status_id` varchar(36) NOT NULL,
  `status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`solicitation_returned_status_id`),
  UNIQUE KEY `solicitation_returned_status_id_UNIQUE` (`solicitation_returned_status_id`)
);

CREATE TABLE `solicitation_form_raw` (
  `solicitation_form_raw_id` varchar(36) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `course` varchar(45) DEFAULT NULL,
  `soli_numbers` varchar(45) DEFAULT NULL,
  `care_of` varchar(45) DEFAULT NULL,
  `care_of_relation` varchar(45) DEFAULT NULL,
  `solicitation_returned_status` varchar(45) DEFAULT NULL,
  `lost_or_number` varchar(45) DEFAULT NULL,
  `date_returned` date DEFAULT NULL,
  `yearbook_payment` varchar(45) DEFAULT NULL,
  `or_number` varchar(45) DEFAULT NULL,
  `full_payment` varchar(45) DEFAULT NULL,
  `solicitation_payment_status_id` varchar(36) DEFAULT NULL,
  `solicitation_returned_status_id` varchar(36) DEFAULT NULL,
  `returned_solis` varchar(45) DEFAULT NULL,
  `unreturned_solis` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`solicitation_form_raw_id`),
  UNIQUE KEY `idsolicitatoin_form_raw_id_UNIQUE` (`solicitation_form_raw_id`),
  KEY `soli_returned_status_idx` (`solicitation_returned_status_id`),
  KEY `soli_payment_status_idx` (`solicitation_payment_status_id`),
  CONSTRAINT `soli_payment_status` FOREIGN KEY (`solicitation_payment_status_id`) REFERENCES `solicitation_payment_status` (`solicitation_payment_status_id`),
  CONSTRAINT `soli_returned_status` FOREIGN KEY (`solicitation_returned_status_id`) REFERENCES `solicitation_returned_status` (`solicitation_returned_status_id`)
);

CREATE TABLE `yearbook` (
  `yearbook_id` varchar(36) NOT NULL,
  `yearbook_full_payment` int NOT NULL DEFAULT '0',
  `yearbook_payment_status_id` varchar(36) DEFAULT NULL,
  `yearbook_status_id` varchar(36) DEFAULT NULL,
  `yearbook_care_of` varchar(45) DEFAULT NULL,
  `yearbook_care_of_relation` varchar(45) DEFAULT NULL,
  `yearbook_date_released` date DEFAULT NULL,
  PRIMARY KEY (`yearbook_id`),
  UNIQUE KEY `yearbook_id_UNIQUE` (`yearbook_id`)
);

CREATE TABLE `yearbook_payment_status` (
  `yearbook_payment_status_id` varchar(36) NOT NULL,
  `status_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`yearbook_payment_status_id`)
);

CREATE TABLE `yearbook_photos` (
  `yearbook_photos_id` varchar(36),
  `yearbook_photos_full_name` varchar(45),
  `yearbook_photos_full_payment` varchar(45) NULL,
  `yearbook_photos_payment_status_id` varchar(36) NULL,
  `yearbook_photos_status_id` varchar(36) NULL,
  `yearbook_photos_date_released` date NULL,
  PRIMARY KEY (`yearbook_photos_id`),
  UNIQUE KEY `yearbook_photos_id_UNIQUE` (`yearbook_photos_id`)
);

CREATE TABLE `yearbook_status` (
  `yearbook_status_id` varchar(36) NOT NULL,
  `yearbook_status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`yearbook_status_id`),
  UNIQUE KEY `yearbook_status_id_UNIQUE` (`yearbook_status_id`)
);
