import { Request, Response } from "express";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const courses = await query(`
        SELECT 
        course_id AS id, 
        course_name AS name,
        course_abbreviation AS abbreviation
        FROM course
    `);

    const departments = await query(`
        SELECT 
        college_id AS id,
        college_name AS name,
        college_acronym AS acronym
        FROM college
    `);

    res.status(200).json({
        courses: courses.rows,
        departments: departments.rows
    });
}

export async function addDepartment(req: Request, res: Response) {
    const {
        name,
        acronym

    } = req.body;
    await query(`

        INSERT INTO college (
            college_id,
            college_name,
            college_acronym
        ) VALUES (
            UUID(),
            ?,
            ?
        )
    `, [
        name, 
        acronym
    ])
}

export async function updateDepartment(req: Request, res: Response) {
    const {
        id,
        name,
        acronym

    } = req.body;

    await query(`
        UPDATE college
        SET college_name = ?,
        college_acronym = ?
        WHERE college_id = ?
    `, [name, acronym, id])

    res.status(200).end();
}

export async function deleteDepartment(req: Request, res: Response) {
    const { id } = req.params;
    await query(`
        DELETE FROM college
        WHERE college_id = ?
    `, [id])
    res.status(200).end();
}