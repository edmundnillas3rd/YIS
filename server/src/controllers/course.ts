import { Request, Response } from "express";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const courses = await query(`
        SELECT
        c.course_id AS id, 
        c.course_name AS name,
        c.course_abbreviation AS abbreviation,
        coll.college_acronym AS acronym
        FROM course c
        LEFT JOIN college coll
        ON c.college_id = coll.college_id
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

export async function addCourse(req: Request, res: Response) {

    const {
        name,
        abbreviation,
        deparment
    } = req.body;

    await query(`
        INSERT INTO course (
            course_id,
            college_id,
            course_name,
            course_abbreviation
        ) VALUES (
            UUID(),
            ?,
            ?,
            ?
        )
    `, [
        deparment,
        name,
        abbreviation
    ])

    res.status(200).end();
}

export async function updateCourse(req: Request, res: Response) {
    const {
        id,
        name,
        abbreviation,
        department

    } = req.body;
    await query(`
        UPDATE course
        SET college_id = ?,
        course_name = ?,
        course_abbreviation = ?
        WHERE course_id = ?
    `, [department, name, abbreviation, id])
    res.status(200).end();
}

export async function deleteCourse(req: Request, res: Response) {
    const { id } = req.params;
    await query(`
        DELETE FROM course
        WHERE course_id = ?
    `, [id])
    res.status(200).end();
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
    ]);

    res.status(200).end();
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