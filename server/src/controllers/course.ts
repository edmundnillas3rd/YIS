import { Request, Response } from "express";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const { rows } = await query("SELECT course_id AS id, course_name AS name FROM course");
    res.status(200).json({
        courses: rows
    });
}