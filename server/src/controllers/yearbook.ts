import { Request, Response } from "express";
import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const yearbookStatus = await query(`
        SELECT yearbook_status_id AS id, yearbook_status_name AS name FROM yearbook_status
    `);

    const yearbookPhotos = await query(`
        SELECT yearbook_photos.yearbook_photos_id AS id, CONCAT(user.user_first_name, ' ', user.user_family_name, ' ', user.user_middle_name, ' ', user.user_suffix) AS fullName, yearbook_status.yearbook_status_name AS yearbookStatus, COALESCE(DATE_FORMAT(yearbook_photos.yearbook_photos_date_released, '%m-%d-%Y'), 'N/A') AS dateReleased FROM yearbook_photos
        INNER JOIN user
        ON yearbook_photos.user_id = user.user_id
        INNER JOIN yearbook_status
        ON yearbook_photos.yearbook_status_id = yearbook_status.yearbook_status_id
    `);

    const yearbook = await query(`
        SELECT yearbook.yearbook_id AS id, CONCAT(user.user_first_name, ' ', user.user_family_name, ' ', user.user_middle_name, ' ', user.user_suffix) AS fullName, yearbook_status.yearbook_status_name AS yearbookStatus, COALESCE(yearbook.yearbook_date_released, 'N/A') AS dateReleased FROM yearbook
        INNER JOIN user
        ON yearbook.user_id = user.user_id
        INNER JOIN yearbook_status
        ON yearbook.yearbook_status_id = yearbook_status.yearbook_status_id
    `);

    const yearbookPaymentStatuses = await query(`
        SELECT solicitation_payment_status_id AS id, solicitation_payment_status.status_name AS name FROM solicitation_payment_status
    `);

    res.status(200).json({
        yearbookStatuses: yearbookStatus.rows,
        yearbookPhotos: yearbookPhotos.rows,
        yearbook: yearbook.rows,
        yearbookPaymentStatuses: yearbookPaymentStatuses.rows
    });
}

export async function yearbookReleased(req: Request, res: Response) {
    const {
        careOf,
        firstName,
        lastName,
        middleName,
        suffix,
        course
    } = req.body;

    // User
    const foundUser = await query(`
     SELECT user_id AS id FROM user WHERE user_first_name = ? AND user_family_name = ? AND user_middle_name = ? AND user_suffix = ?
 `, [firstName, lastName, middleName, suffix]);


    if (foundUser.rows.length === 0) {
        return res.status(404).json({
            error: "Student not found"
        });
    }

    const userID = foundUser.rows[0]['id'];


    // Care of
    const genCareOfUUID = await query('SELECT UUID()');
    const CareOfUUID = genCareOfUUID.rows[0]['UUID()'];
    const careOfValues = Object.values(careOf);
    const careOfResults = await query(`
        INSERT INTO care_of VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [CareOfUUID, userID, ...careOfValues]);

    // Yearbook Status
    const yearbookStatus = await query(`
        SELECT yearbook_status_id AS id FROM yearbook_status WHERE yearbook_status_name = 'RELEASED'
    `);

    if (yearbookStatus.rows.length === 0) {
        return res.status(404).json({
            error: "Database: Table(yearbook_status) does not have this property"
        });
    }

    const yearbookStatusID = yearbookStatus.rows[0]['id'];

    // Yearbook
    const genYearbookUUID = await query('SELECT UUID()');
    const YearbookUUID = genYearbookUUID.rows[0]['UUID()'];
    const yearbookResults = await query(`
        INSERT INTO yearbook VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)
    `, [YearbookUUID, yearbookStatusID, CareOfUUID, userID]);
    res.status(200).end();
}

// PUT
export async function statusYearbookPhotosUpdate(req: Request, res: Response) {
    const { status, userID } = req.params;

    const statusData = await query(`
        SELECT yearbook_status_name AS name FROM yearbook_status WHERE yearbook_status_id = ?
    `, [status]);

    const statusName = statusData.rows[0]['name'];

    let results: any;

    if (statusName === "RELEASED") {
        results = await query(`
            UPDATE yearbook_photos
            SET yearbook_photos.yearbook_status_id = ?,
            yearbook_photos_date_released = CURRENT_TIMESTAMP
            WHERE yearbook_photos.yearbook_photos_id = ?
        `, [status, userID]);
    } else if (statusName === "PENDING") {
        results = await query(`
            UPDATE yearbook_photos
            SET yearbook_photos.yearbook_status_id = ?,
            yearbook_photos_date_released = NULL
            WHERE yearbook_photos.yearbook_photos_id = ?
        `, [status, userID]);
    }

    res.status(200).end();
}

export async function statusYearbookUpdate(req: Request, res: Response) {
    const {
        firstName,
        lastName,
        middleName,
        course,
        suffix
    } = req.body;
    const { status, userID } = req.params;

    let results: any;

    const statusData = await query(`
        SELECT yearbook_status_name AS name FROM yearbook_status WHERE yearbook_status_id = ?
    `, [status]);

    const statusName = statusData.rows[0]['name'];

    if (statusName === "RELEASED") {
        results = await query(`
            UPDATE yearbook
            INNER JOIN user
            ON yearbook.user_id = user.user_id
            SET yearbook_status_id = ?,
            yearbook_released_date = CURRENT_TIMESTAMP
            WHERE user.user_first_name = ? AND user.user_family_name = ? AND user.user_middle_name = ? AND user.user_suffix AND user.user_id = ?
        `, [status, firstName, lastName, middleName, suffix, userID]);
    } else if (statusName === "PENDING") {
        results = await query(`
            UPDATE yearbook
            INNER JOIN user
            ON yearbook.user_id = user.user_id
            SET yearbook_status_id = ?,
            yearbook_released_date = NULL
            WHERE user.user_first_name = ? AND user.user_family_name = ? AND user.user_middle_name = ? AND user.user_suffix AND user.user_id = ?
    `, [status, firstName, lastName, middleName, suffix, userID]);
    }

    res.status(200).end();
}

export async function searchStudentYearbookPhoto(req: Request, res: Response) {
    const { search } = req.body;
    const { rows } = await query(`
        SELECT yp.yearbook_photos_id AS id, CONCAT(u.user_first_name, ' ', u.user_family_name, ' ', u.user_middle_name, ' ', u.user_suffix) AS fullName, ys.yearbook_status_name AS yearbookStatus , COALESCE(yp.yearbook_photos_date_released, 'N/A') AS dateReleased FROM yearbook_photos yp
        INNER JOIN yearbook_status ys
        ON yp.yearbook_status_id = ys.yearbook_status_id
        INNER JOIN user u
        ON yp.user_id = u.user_id
        WHERE REGEXP_LIKE(CONCAT(u.user_first_name, ' ', u.user_family_name, ' ', u.user_middle_name, ' ', u.user_suffix), ?)
    `, [`^${search}`]);

    if (rows.length === 0) {
        return res.status(404).json({
            error: "Student Not Found"
        });
    }

    res.status(200).json({
        searchResults: rows
    });
}