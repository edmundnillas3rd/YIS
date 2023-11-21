import { Request, Response } from "express";

import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = `
    SELECT DISTINCT solicitation_form.user_id AS id,
        course.course_name AS course, 
        CONCAT(user.user_first_name, " ", user.user_middle_name, " ", user.user_family_name, " ", user.user_suffix) AS fullName,
        solicitation_form.solicitation_number as soliNumber,
        CONCAT(care_of.first_name, " ", care_of.middle_name, " ", care_of.family_name, " ", care_of.suffix) AS careOfFullName,
        solicitation_returned_status.status_name AS returnedStatus, 
        DATE_FORMAT(solicitation_form.solicitation_date_returned, '%m-%d-%Y') AS dateReturned,
        solicitation_form.solicitation_yearbook_payment as paymentAmount,
        solicitation_form.solicitation_or_number as ORnumber,
        solicitation_payment_status.status_name AS paymentStatus
        FROM solicitation_form
        INNER JOIN user
        ON solicitation_form.user_id = user.user_id
        INNER JOIN solicitation_payment_status
        ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id
        INNER JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
        LEFT JOIN care_of
        ON solicitation_form.solicitation_care_of = care_of.care_of_id
        INNER JOIN course
        ON user.course_id = course.course_id;
    `;
    const { rows } = await query(sql);

    res.status(200).json({
        rows
    });
}

export async function getUserSolicitation(req: Request, res: Response) {
    const { id } = req.params;

    const sql = `
    SELECT solicitation_form.user_id AS id,
        course.course_name AS course, 
        CONCAT(user.user_first_name, " ", user.user_middle_name, " ", user.user_family_name, " ", user.user_suffix) AS fullName,
        solicitation_form.solicitation_number as soliNumber,
        CONCAT(care_of.first_name, " ", care_of.middle_name, " ", care_of.family_name, " ", care_of.suffix) AS careOfFullName,
        solicitation_returned_status.status_name AS returnedStatus, 
        DATE_FORMAT(solicitation_form.solicitation_date_returned, '%m-%d-%Y') AS dateReturned,
        solicitation_form.solicitation_yearbook_payment as paymentAmount,
        solicitation_form.solicitation_or_number as ORnumber,
        solicitation_payment_status.status_name AS paymentStatus
        FROM solicitation_form
        INNER JOIN user
        ON solicitation_form.user_id = user.user_id
        INNER JOIN solicitation_payment_status
        ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id
        INNER JOIN solicitation_returned_status
        ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
        LEFT JOIN care_of
        ON solicitation_form.solicitation_care_of = care_of.care_of_id
        INNER JOIN course
        ON user.course_id = course.course_id
        WHERE solicitation_form.user_id = ?
    `;
    const { rows } = await query(sql, [id]);
    res.status(200).json({
        solicitations: rows
    });
}

export async function returnSolicitation(req: Request, res: Response) {
    // TODO: might have to replace the sql statement where it uses the return status table
    const sql = "SELECT * FROM solicitation_form WHERE solicitation_returned_status = 'RETURNED'";
    const { rows } = await query(sql);
    res.status(200).json({
        rows
    });
}

export async function submitSolicitation(req: Request, res: Response) {
    const { id } = req.params;
    const {
        careOf,
        ...attr
    } = req.body;

    const genCareOfUUID = await query("SELECT UUID()");
    const CareOfUUID = genCareOfUUID.rows[0]['UUID()'];
    const CareOfValues = Object.values(careOf);
    await query("INSERT INTO care_of VALUES (?, ?, ?, ?, ?, ?, ?)", [
        CareOfUUID,
        id,
        ...CareOfValues
    ]);

    const genSolicitationUUID = await query("SELECT UUID()");
    const SolicitationUUID = genSolicitationUUID.rows[0]['UUID()'];
    const SolicitationValues = Object.values(attr);
    await query("INSERT INTO solicitation_form VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        SolicitationUUID,
        id,
        CareOfUUID,
        ...SolicitationValues
    ]);

    res.status(200).end();
}