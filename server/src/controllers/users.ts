import * as XLSX from 'xlsx';

import * as fs from 'fs';
XLSX.set_fs(fs);

import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { Award, type Club } from "../models/user";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = `
        SELECT 
        u.user_id AS id, 
        u.user_first_name AS firstName,
        u.user_middle_name AS middleName,
        u.user_family_name AS familyName,
        COALESCE(u.user_suffix, 'N/A') AS suffix,
        COALESCE(u.user_school_year, 'N/A') AS schoolYear,
        COALESCE(c.course_abbreviation, 'N/A') AS course,
        COALESCE(u.user_school_id, 'N/A') AS schoolID
        FROM user u
        INNER JOIN role
        ON u.role_id = role.role_id
        LEFT JOIN course c
        ON u.course_id = c.course_id
        WHERE role.role_name = 'STUDENT'
    `;
    const student = await query(sql);

    const coadmin = await query(`
        SELECT 
        u.user_id AS id, 
        u.user_first_name AS firstName,
        u.user_middle_name AS middleName,
        u.user_family_name AS familyName,
        u.user_suffix AS suffix,
        u.user_email AS email
        FROM user u
        INNER JOIN role
        ON u.role_id = role.role_id
        WHERE role.role_name = 'CO-ADMIN'
    `);

    res.status(200).json({
        studentUsers: student.rows,
        coadminUsers: coadmin.rows
    });
}

export async function getStudentUnreturned(req: Request, res: Response) {
    const { rows } = await query(`
        SELECT DISTINCT user.user_id AS id, course.course_abbreviation AS courseName, CONCAT(user.user_first_name, " ", user.user_family_name, " ", user.user_middle_name, " ", user.user_suffix) AS fullName, solicitation_returned_status.status_name FROM solicitation_form
        INNER JOIN user
        ON solicitation_form.user_id = user.user_id
        INNER JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id 
        INNER JOIN course
        ON course.course_id = user.course_id
        WHERE solicitation_returned_status.status_name = 'UNRETURNED'
    `);

    res.status(200).json({
        rows
    });
}

export async function getCurrentLogUser(req: Request, res: Response) {
    if (!req.session.authenticated) {
        return res.status(404).json({
            error: "Not authenticated!"
        });
    }

    const { userID } = req.session;
    const { rows } = await query(`
        SELECT 
        user.user_first_name AS firstName, 
        user.user_family_name AS familyName, 
        user.user_middle_name AS middleName, 
        user.user_suffix AS suffix, 
        role.role_name AS role, 
        COALESCE(course_id, '') AS course,
        COALESCE(solicitation_returned_status.status_name, "UNCLAIMED") AS claimStatus,
        user.user_email as email
        FROM user 
        INNER JOIN role
        ON user.role_id = role.role_id
        LEFT JOIN solicitation_form
        ON user.user_id = solicitation_form.user_id
        LEFT JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
        WHERE user.user_id = ?
    `, [userID]);
    res.status(200).json({ id: userID, userData: rows[0] });
}

// TODO: to receive only the id of the student instead of getting all of
// information again
export async function submitInfo(req: Request, res: Response) {
    const { id, clubs, awards } = req.body;

    const { rows } = await query("SELECT * FROM user WHERE user_id = ?", [id]);
    // const {
    //     firstName,
    //     familyName,
    //     middleName,
    //     suffix,
    //     clubs,
    //     awards
    // } = req.body;

    // const sql = `
    //     INSERT INTO user (user_id, user_first_name, user_family_name, user_middle_name, user_suffix)
    //     VALUES (UUID(), ?, ?, ?, ?)
    // `;

    // const values = [
    //     firstName,
    //     familyName,
    //     middleName,
    //     suffix,
    // ];

    // await query(sql, values);

    Array.from(clubs).forEach(async (club) => {
        const c = club as Club;

        const UUID = await query("SELECT UUID()");
        await query(`
            INSERT INTO club VALUES (?, ?, ?, ?, ?, ?)
        `, [
            UUID.rows[0]['UUID()'],
            id,
            c.organizationID,
            c.positionID,
            c.clubStarted,
            c.clubEnded
        ]);
    });

    Array.from(awards).forEach(async (award) => {
        const a = award as Award;

        const UUID = await query("SELECT UUID()");
        await query(`
            INSERT INTO award VALUES (?, ?, ?, ?, ?)
        `, [
            UUID.rows[0]['UUID()'],
            id,
            a.awardAttendedName,
            a.awardName,
            a.awardReceived
        ]);
    });

    res.status(200).json({
        submission_success: true
    });
}

// POST
export async function signupUserStudent(req: Request, res: Response) {

    const {
        firstName,
        middleName,
        familyName,
        suffix,
        schoolID,
        password,
        schoolYear,
        course
    } = req.body;

    const queriedRole = await query("SELECT role_id FROM role WHERE role.role_name = 'STUDENT'");

    let roleUUID: any;
    // if no 'USER' roles exist
    if (queriedRole.rows.length === 0) {
        roleUUID = await query("SELECT UUID() AS id");
        await query("INSERT INTO role VALUES (?, 'STUDENT')", [roleUUID[0]['id']]);
    }

    const existingUser = await query("SELECT CONCAT(user_first_name, ' ', user_middle_name, ' ', user_family_name) AS user_full_name, user_school_year AS schoolYear FROM user");

    if (existingUser.rows[0].schoolYear !== undefined && existingUser.rows[0].schoolYear === schoolID) {
        return res.status(400).json({ error: "User already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    roleUUID = queriedRole.rows[0].role_id;
    const userUUID = await query("SELECT UUID()");
    const { rows } = await query(`
        INSERT INTO user (
            user_id, 
            user_first_name, 
            user_family_name, 
            user_middle_name, 
            user_suffix, 
            course_id,
            user_school_year,
            user_school_id, 
            user_password, 
            role_id
        ) VALUES (
            ?,
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?,
            ?
        )
    `, [
        userUUID.rows[0]['UUID()'],
        firstName,
        familyName,
        middleName,
        suffix,
        course,
        schoolYear,
        schoolID,
        hashedPassword,
        roleUUID
    ]);

    res.status(200).json({ message: "User successfully registerd!" });
}

export async function loginUserStudent(req: Request, res: Response) {
    const { email, password } = req.body;

    if (req.session.authenticated) {
        return res.status(200).end();
    }

    const parseEmail = (email as string);
    const emailParts = parseEmail.split('@');

    let userRole = "";


    if (emailParts.length !== 2) {

        const studentSchoolID = parseEmail.split("-");

        if (studentSchoolID.length !== 3) {
            return res.status(404).json({
                error: "Invalid user email and password"
            });
        }

        if (studentSchoolID[0].length !== 4 || studentSchoolID[1].length !== 4 || studentSchoolID[2].length !== 1) {
            return res.status(404).json({
                error: "Invalid user email and password"
            });
        }

        const data = await query(`SELECT role_id AS id, role_name AS name FROM role WHERE role_name = 'STUDENT'`);
        userRole = data.rows[0].name;

    } else {
        const account = emailParts[0];
        const address = emailParts[1];

        let parts = address.split(".");

        let data: any;

        if (parts[0] === "admin") {
            data = await query(`SELECT role_id AS id, role_name AS name FROM role WHERE role_name = 'ADMIN'`);

        } else if (parts[0] === "coadmin") {
            data = await query(`SELECT role_id AS id, role_name AS name FROM role WHERE role_name = 'CO-ADMIN'`);
        } else if (parts[0] === "cjc") {
            data = await query(`SELECT role_id AS id, role_name AS name FROM role WHERE role_name = 'STUDENT'`);
        } else {
            return res.status(404).json({
                error: "Invalid user email and password"
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                error: "Unable to determine role status"
            });
        }

        userRole = data.rows[0].name;

    }

    const user = await query(`
        SELECT user.user_id AS id, user.user_first_name, user.user_middle_name, user.user_family_name, user.user_email AS email, user.user_password AS password, role.role_name AS role FROM user 
        INNER JOIN role
        ON user.role_id = role.role_id
        WHERE (user.user_email = ? OR user.user_school_id = ?) AND role.role_name = ?
    `, [email, email, userRole]);

    if (user.rows.length === 0) {
        return res.status(401).json({ error: "Invalid user email and password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid user email and password" });
    }

    req.session.authenticated = true;
    req.session.userID = user.rows[0].id;
    req.session.role = user.rows[0].role;

    res.status(200).end();
}

export async function logoutUser(req: Request, res: Response) {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
        }
    });
    res.status(200).json({ url: '/' });
}

export async function searchRegisteredStudent(req: Request, res: Response) {

    const { fullName } = req.body;

    const { rows } = await query(`
        SELECT 
        u.user_id AS id, 
        u.user_first_name AS firstName,
        u.user_middle_name AS middleName,
        u.user_family_name AS familyName,
        COALESCE(u.user_suffix, 'N/A') AS suffix,
        COALESCE(u.user_school_year, 'N/A') AS schoolYear,
        COALESCE(c.course_abbreviation, 'N/A') AS course,
        COALESCE(u.user_school_id, 'N/A') AS schoolID
        FROM user u
        INNER JOIN role
        ON u.role_id = role.role_id
        LEFT JOIN course c
        ON u.course_id = c.course_id
        WHERE role.role_name = 'STUDENT' AND (REGEXP_LIKE(u.user_first_name, ?) OR REGEXP_LIKE(u.user_middle_name, ?) OR REGEXP_LIKE(u.user_family_name, ?) OR REGEXP_LIKE(u.user_suffix, ?))
    `, [
        fullName,
        fullName,
        fullName,
        fullName
    ])


    res.status(200).json({
        rows
    });
}

export async function searchStudent(req: Request, res: Response) {
    const { fullName } = req.body;
    const { rows } = await query(`
        SELECT user.user_id AS id, college.college_name AS collegeName, CONCAT(user.user_first_name, " ", user.user_family_name, " ", user.user_middle_name, " ", user.user_suffix) AS fullName, COALESCE(solicitation_payment_status.status_name, "UNCLAIMED") AS paymentStatus, COALESCE(solicitation_returned_status.status_name, "UNCLAIMED") AS returnStatus, solicitation_form.solicitation_number AS solicNum, solicitation_form.solicitation_or_number AS OrNum FROM user
        INNER JOIN college
        ON user.user_college = college.college_id
		INNER JOIN role
		ON user.role_id = role.role_id 
		LEFT JOIN solicitation_form
		ON user.user_id = solicitation_form.user_id
		LEFT JOIN solicitation_payment_status
		ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id 
		LEFT JOIN solicitation_returned_status
		ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
     	WHERE SOUNDEX(?) LIKE SOUNDEX(user.user_first_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_middle_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_family_name)
    `, [fullName, fullName, fullName]);

    if (rows.length === 0) {
        return res.status(400).end();
    }

    res.status(200).json({
        results: rows
    });
}

export async function searchStudentRecipient(req: Request, res: Response) {
    const { fullName } = req.body;

    const { rows } = await query(`
        SELECT DISTINCT
        course.course_abbreviation AS course, 
        CONCAT(user.user_first_name, " ", user.user_middle_name, " ", user.user_family_name, " ", user.user_suffix) AS fullName,
        solicitation_form.solicitation_number AS soliNumber,
        CONCAT(care_of.first_name, " ", care_of.middle_name, " ", care_of.family_name, " ", care_of.suffix) AS careOfFullName,
        care_of.relation_status AS relationStatus,
        solicitation_returned_status.status_name AS returnedStatus, 
        DATE_FORMAT(solicitation_form.solicitation_date_returned, '%m-%d-%Y') AS dateReturned,
        solicitation_form.solicitation_yearbook_payment AS paymentAmount,
        solicitation_form.solicitation_or_number AS ORnumber,
        solicitation_payment_status.status_name AS paymentStatus
        FROM user
        INNER JOIN college
        ON user.user_college = college.college_id
        INNER JOIN role
        ON user.role_id = role.role_id
        INNER JOIN course
        ON user.course_id = course.course_id
        LEFT JOIN solicitation_form
        ON user.user_id = solicitation_form.user_id
        LEFT JOIN care_of
        ON solicitation_form.user_id = care_of.user_id
        LEFT JOIN solicitation_payment_status
        ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id 
        LEFT JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
        WHERE (SOUNDEX(?) LIKE SOUNDEX(user.user_first_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_middle_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_family_name)) AND solicitation_payment_status.status_name = 'FULLY PAID'
    `, [fullName, fullName, fullName]);

    if (rows.length === 0) {
        return res.status(400).json({
            error: "Student has not claimed their solicitation form"
        });
    }

    res.status(200).json({
        results: rows
    });
}

export async function searchStudentPaid(req: Request, res: Response) {
    const { fullName } = req.body;

    const { rows } = await query(`
        SELECT user.user_id AS id, college.college_name AS collegeName, CONCAT(user.user_first_name, " ", user.user_family_name, " ", user.user_middle_name, " ", user.user_suffix) AS fullName, COALESCE(solicitation_payment_status.status_name, "UNCLAIMED") AS paymentStatus, COALESCE(solicitation_returned_status.status_name, "UNCLAIMED") AS returnStatus, solicitation_form.solicitation_number AS solicNum, solicitation_form.solicitation_or_number AS OrNum  FROM user
        INNER JOIN college
        ON user.user_college = college.college_id
        INNER JOIN role
        ON user.role_id = role.role_id 
        LEFT JOIN solicitation_form
        ON user.user_id = solicitation_form.user_id
        LEFT JOIN solicitation_payment_status
        ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id 
        LEFT JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
        WHERE (SOUNDEX(?) LIKE SOUNDEX(user.user_first_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_middle_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_family_name)) AND solicitation_payment_status.status_name = 'FULLY PAID'
    `, [fullName, fullName, fullName]);

    if (rows.length === 0) {
        return res.status(400).end();
    }

    res.status(200).json({
        results: rows
    });
}

export async function searchStudentUnreturned(req: Request, res: Response) {
    const { fullName } = req.body;
    const { rows } = await query(`
        SELECT user.user_id AS id, college.college_name AS collegeName, CONCAT(user.user_first_name, " ", user.user_family_name, " ", user.user_middle_name, " ", user.user_suffix) AS fullName, COALESCE(solicitation_payment_status.status_name, "UNCLAIMED") AS paymentStatus, COALESCE(solicitation_returned_status.status_name, "UNCLAIMED") AS returnStatus, solicitation_form.solicitation_number AS solicNum, solicitation_form.solicitation_or_number AS OrNum  FROM user
        INNER JOIN college
        ON user.user_college = college.college_id
        INNER JOIN role
        ON user.role_id = role.role_id 
        LEFT JOIN solicitation_form
        ON user.user_id = solicitation_form.user_id
        LEFT JOIN solicitation_payment_status
        ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id 
        LEFT JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
        WHERE (SOUNDEX(?) LIKE SOUNDEX(user.user_first_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_middle_name) OR SOUNDEX(?) LIKE SOUNDEX(user.user_family_name)) AND solicitation_returned_status.status_name = 'UNRETURNED'
    `, [fullName, fullName, fullName]);

    if (rows.length === 0) {
        return res.status(400).end();
    }

    res.status(200).json({
        results: rows
    });
}

export async function uploadUserData(req: Request, res: Response) {

    const { year } = req.body;

    if (!req.file)
        return res.status(404).json({ error: "No file found" });

    const queriedRole = await query("SELECT role_id AS id FROM role WHERE role.role_name = 'STUDENT'");

    let workbook = XLSX.readFile(req.file.path);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false }).forEach(async (student: any) => {

        console.log(student);

        const genUUID = await query(`SELECT UUID()`);
        const UUID = genUUID.rows[0]['UUID()'];

        const fullName: string = `${student['FIRST NAME']}${student['LAST NAME']}`;
        const email = `${fullName.toLowerCase()}@cjc.com`;
        const password = process.env.DEFAULT_PASS as string;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await query(`
            INSERT INTO user (
                user_id,
                user_first_name,
                user_middle_name,
                user_family_name,
                user_email,
                user_password,
                user_school_year,
                role_id
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        `, [
            UUID,
            typeof student["FIRST NAME"] === "undefined" ? null : student["FIRST NAME"],
            typeof student["MIDDLE NAME"] === "undefined" ? null : student["MIDDLE NAME"],
            typeof student["LAST NAME"] === "undefined" ? null : student["LAST NAME"],
            email,
            hashedPassword,
            Number.parseInt(year),
            queriedRole.rows[0]['id']
        ]);

        const paymentStatus = await query(`
            SELECT yearbook_payment_status_id AS id, status_name AS name FROM yearbook_payment_status WHERE status_name = 'UNPAID' 
        `);

        const yearbookStatus = await query(`
            SELECT yearbook_status_id AS id, yearbook_status_name AS name FROM yearbook_status WHERE yearbook_status_name = 'PENDING'
        `);

        await query(`
            INSERT INTO yearbook (
                yearbook_id,
                yearbook_payment_status_id,
                yearbook_status_id
            ) VALUES (
                ?,
                ?,
                ?
            )
        `, [
            UUID,
            paymentStatus.rows[0]['id'],
            yearbookStatus.rows[0]['id']
        ]);
    });

    res.status(200).end();
}

export async function signupCoAdmin(req: Request, res: Response) {
    const {
        firstName,
        middleName,
        familyName,
        suffix,
        email,
        password,
    } = req.body;

    const queriedRole = await query("SELECT role_id FROM role WHERE role.role_name = 'CO-ADMIN'");

    let roleUUID: any;
    // if no 'USER' roles exist
    if (queriedRole.rows.length === 0) {
        roleUUID = await query("SELECT UUID() AS id");
        await query("INSERT INTO role VALUES (?, 'CO-ADMIN')", [roleUUID[0]['id']]);
    }

    const existingUser = await query("SELECT CONCAT(user_first_name, ' ', user_middle_name, ' ', user_family_name) AS user_full_name, user_email FROM user");

    if (existingUser.rows[0].email !== undefined && existingUser.rows[0].email === email) {
        return res.status(400).json({ error: "User already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    roleUUID = queriedRole.rows[0].role_id;
    const userUUID = await query("SELECT UUID()");
    const { rows } = await query(`
        INSERT INTO user (
            user_id, 
            user_first_name, 
            user_family_name, 
            user_middle_name, 
            user_suffix, 
            user_email,
            user_password, 
            role_id
        ) VALUES (
            ?,
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?
        )
    `, [
        userUUID.rows[0]['UUID()'],
        firstName,
        familyName,
        middleName,
        suffix,
        email,
        hashedPassword,
        roleUUID
    ]);

    res.status(200).json({ message: "User successfully registerd!" });
}

export async function signupAdmin(req: Request, res: Response) {

    const { email, password, ...attr } = req.body;

    const queriedRole = await query("SELECT role_id FROM role WHERE role.role_name = 'ADMIN'");

    let roleUUID: any;
    // if no 'USER' roles exist
    if (queriedRole.rows.length === 0) {
        roleUUID = await query("SELECT UUID() AS id");
        await query("INSERT INTO role VALUES (?, 'USER')", [roleUUID[0]['id']]);
    }

    const existingUser = await query("SELECT CONCAT(user_first_name, ' ', user_middle_name, ' ', user_family_name) AS user_full_name, user_email FROM user");

    if (existingUser.rows[0]?.email !== undefined && existingUser.rows[0].email === email) {
        return res.status(400).json({ error: "ADMIN already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    roleUUID = queriedRole.rows[0].role_id;
    const userUUID = await query("SELECT UUID()");
    const userValues = Object.values(attr);
    const { rows } = await query("INSERT INTO user (user_id, user_first_name, user_family_name, user_middle_name, user_suffix, course_id, user_email, user_password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [userUUID.rows[0]['UUID()'], ...userValues, email, hashedPassword, roleUUID]);

    res.status(200).json({ message: "admin successfully registered!" });

}

export async function updateAdminInfo(req: Request, res: Response) {
    const { email, password } = req.body;
    const { userID } = req.session;


    if ((password as string).length > 0) {

        await query(`
            UPDATE user
            SET user_email = ?,
            user_password = ?
            WHERE user_id = ?
        `, [email, password, userID]);
    } else {
        await query(`
            UPDATE user
            SET user_email = ?,
            WHERE user_id = ?
        `, [email, userID]);
    }


    res.status(200).end();
}



// PUT
export async function updateUsername(req: Request, res: Response) {
    const { familyName, middleName, firstName, suffix, course } = req.body;
    const { userID } = req.session;

    const results = await query(`
        UPDATE user
        SET user_first_name = ?,
        user_family_name = ?,
        user_middle_name = ?,
        user_suffix = ?,
        course_id = ?
        WHERE user_id = ?
    `, [firstName, familyName, middleName, suffix, course, userID]);

    if (results.rows.affectedRows > 0) {
        return res.status(200).json({ message: "Successfully update student " });
    } else {
        return res.status(404).json({ error: "Unable to find a user with the same name " });
    }

}

export async function updateStudentInfo(req: Request, res: Response) {
    const {
        id,
        firstName,
        familyName,
        middleName,
        suffix,
        schoolID,
        password,
        schoolYear,
        isCsp,
        course
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(`
        UPDATE user
        SET user_first_name = ?,
        user_middle_name = ?,
        user_family_name = ?,
        user_suffix = ?,
        user_school_id = ?,
        user_password = ?,
        user_school_year = ?,
        course_id = ?
        WHERE user_id = ?
    `, [
        firstName,
        familyName,
        middleName,
        suffix,
        schoolID,
        hashedPassword,
        schoolYear,
        course,
        id
    ]);

    res.status(200).end();
}

export async function updatePassword(req: Request, res: Response) {
    const { password } = req.body;
    const { userID } = req.session;

    await query(`
        UPDATE user
        user_password = ?
        WHERE user_id = ?
    `, [password, userID])
    res.status(200).end();
}

export async function updateCoAdminInfo(req: Request, res: Response) {
    const {
        id,
        firstName,
        familyName,
        middleName,
        suffix,
        email,
        password,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(`
        UPDATE user
        SET user_first_name = ?,
        user_middle_name = ?,
        user_family_name = ?,
        user_suffix = ?,
        user_email = ?,
        user_password = ?
        WHERE user_id = ?
    `, [
        firstName,
        familyName,
        middleName,
        suffix,
        email,
        hashedPassword,
        id
    ]);

    res.status(200).end();
}

// DELETE
export async function deleteStudent(req: Request, res: Response) {
    const { id } = req.params;

    await query(`
        DELETE FROM user
        WHERE user_id = ?
    `, [id]);

    res.status(200).end();
}

export async function deleteCoAdmin(req: Request, res: Response) {
    const { id } = req.params;

    await query(`
        DELETE FROM user
        WHERE user_id = ?
    `, [id]);

    res.status(200).end();
}