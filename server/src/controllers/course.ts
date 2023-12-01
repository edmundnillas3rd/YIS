import { Request, Response } from "express";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const { rows } = await query("SELECT course_id, course_name FROM course");
    res.status(200).json({
        courses: rows
    });
}