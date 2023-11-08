import { Request, Response } from "express";

import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = "SELECT * FROM solicitation_form";
    const { rows } = await query(sql);

    res.status(200).json({
        rows
    });
}