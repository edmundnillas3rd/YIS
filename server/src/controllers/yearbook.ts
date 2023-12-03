import { Request, Response } from "express";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const yearbookStatus = await query(`
        SELECT yearbook_status_id AS id, yearbook_status_name AS name FROM yearbook_status
    `);

    const yearbooks = await query(`
        SELECT yearbook_photos.yearbook_photos_id AS id, CONCAT(user.user_first_name, ' ', user.user_family_name, ' ', user.user_middle_name, ' ', user.user_suffix) AS fullName, yearbook_status.yearbook_status_name AS yearbookStatus, COALESCE(yearbook_photos.yearbook_photos_date_released, 'N/A') AS dateReleased FROM yearbook_photos
        INNER JOIN user
        ON yearbook_photos.user_id = user.user_id
        INNER JOIN yearbook_status
        ON yearbook_photos.yearbook_status_id = yearbook_status.yearbook_status_id
    `);

    res.status(200).json({
        yearbookStatuses: yearbookStatus.rows,
        yearbooks: yearbooks.rows
    });
}

// PUT
export async function statusUpdate(req: Request, res: Response) {
    const { status, user_id } = req.params;

    const results = await query(`
        UPDATE yearbook_photos
        SET yearbook_photos.yearbook_status_id = ?
        WHERE yearbook_photos.yearbook_photos_id = ?
    `, [status, user_id]);

    res.status(200).end();
}