import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { Award, type Club } from "../models/user";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = "SELECT * FROM user";
    const { rows } = await query(sql);

    res.status(200).json({
        rows
    });
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

    const { email, password, ...attr } = req.body;

    const queriedRole = await query("SELECT role_id FROM role WHERE role.role_name = 'USER'");

    let roleUUID: QueryRow;
    // if no 'USER' roles exist
    if (queriedRole.rows.length === 0) {
        roleUUID = await query("SELECT UUID()");
        await query("INSERT INTO role VALUES (?, 'USER')", [roleUUID]);
    }

    const existingUser = await query("SELECT CONCAT(user_first_name, ' ', user_middle_name, ' ', user_family_name) as user_full_name, user_email FROM user");

    if (existingUser.rows[0]?.email !== undefined && existingUser.rows[0].email === email) {
        return res.status(400).json({ error: "User already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    roleUUID = queriedRole.rows[0].role_id;
    const userUUID = await query("SELECT UUID()");
    const userValues = Object.values(attr);
    const { rows } = await query("INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [userUUID.rows[0]['UUID()'], ...userValues, email, hashedPassword, roleUUID]);

    res.status(200).json({ message: "User successfully registerd!" });
}

export async function loginUserStudent(req: Request, res: Response) {
    const { email, password } = req.body;

    if (req.session.authenticated) {
        return res.status(200).end();
    }

    const user = await query(`
        SELECT user.user_id as id, user.user_first_name, user.user_middle_name, user.user_family_name, user.user_email as email, user.user_password as password, role.role_name as role FROM user 
        INNER JOIN role
        ON user.role_id = role.role_id
        WHERE user.user_email = ? AND role.role_name = 'USER'
    `, [email]);

    if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid user email and password" });
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