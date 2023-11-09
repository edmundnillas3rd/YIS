import { Request, Response } from "express";

import { Award, type Club } from "../models/user";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = "SELECT * FROM user";
    const { rows } = await query(sql);

    res.status(200).json({
        rows
    });
}

export async function submitInfo(req: Request, res: Response) {
    const {
        firstName,
        familyName,
        middleName,
        suffix,
        clubs,
        awards
    } = req.body;

    const sql = `
        INSERT INTO user (user_id, user_first_name, user_family_name, user_middle_name, user_suffix)
        VALUES (UUID(), ?, ?, ?, ?)
    `;

    const values = [
        firstName,
        familyName,
        middleName,
        suffix,
    ];

    await query(sql, values);

    await Array.from(clubs).map(async (club) => {
        const c = club as Club;
        await query(`
            INSERT INTO club
            VALUES (UUID(), ?, ?, ?, ?)
        `, [
            c.organizationName,
            c.positionName,
            c.clubStarted,
            c.clubEnded
        ]);
    });

    await Array.from(awards).map(async (award) => {
        const a = award as Award;
        await query(`
            INSERT INTO award
            VALUES (UUID(), ?, ?, ?)
        `, [
            a.awardAttendedName,
            a.awardName,
            a.awardReceived
        ]);
    });

    res.status(200).json({
        submission_success: true
    });
}