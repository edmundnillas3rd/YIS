import { Request, Response } from "express";

import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = `
    SELECT solicitation_form.user_id AS id,
        course.course_abbreviation AS course, 
        CONCAT(user.user_first_name, " ", user.user_middle_name, " ", user.user_family_name, " ", user.user_suffix) AS fullName,
        solicitation_form.solicitation_number AS soliNumber,
        COALESCE(CONCAT(care_of.first_name, " ", care_of.middle_name, " ", care_of.family_name, " ", care_of.suffix), 'N/A') AS careOfFullName,
        COALESCE(care_of.relation_status, 'N/A') AS relationStatus,
        solicitation_returned_status.status_name AS returnedStatus, 
        COALESCE(solicitation_form.solicitation_date_returned, 'N/A') AS dateReturned,
        solicitation_payment_status.status_name AS paymentStatus,
        solicitation_form.solicitation_yearbook_payment AS paymentAmount,
        solicitation_form.solicitation_or_number AS ORnumber
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

    const statusResults = await query(`
        SELECT solicitation_returned_status_id AS id, status_name AS name FROM solicitation_returned_status
    `);

    res.status(200).json({
        solis: rows,
        statuses: statusResults.rows
    });
}

export async function getUserSolicitation(req: Request, res: Response) {
    const { id } = req.params;

    const sql = `
    SELECT solicitation_form.user_id AS id,
        course.course_abbreviation AS course, 
        CONCAT(user.user_first_name, " ", user.user_middle_name, " ", user.user_family_name, " ", user.user_suffix) AS fullName,
        solicitation_form.solicitation_number AS soliNumber,
        CONCAT(care_of.first_name, " ", care_of.middle_name, " ", care_of.family_name, " ", care_of.suffix) AS careOfFullName,
        solicitation_returned_status.status_name AS returnedStatus, 
        DATE_FORMAT(solicitation_form.solicitation_date_returned, '%m-%d-%Y') AS dateReturned,
        solicitation_form.solicitation_yearbook_payment AS paymentAmount,
        solicitation_form.solicitation_or_number AS ORnumber,
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
    const {
        careOf,
        firstName,
        lastName,
        middleName,
        suffix,
        course,
        soliNum
    } = req.body;

    if (!req.session.authenticated) {
        return res.status(401).json({
            error: "Permission Not Granted"
        });
    }

    const userResults = await query(`
        SELECT solicitation_form.user_id AS id FROM solicitation_form
        WHERE solicitation_form.solicitation_number = ?
    `, [soliNum]);


    let userID = null;
    if (userResults.rows.length > 0) {
        userID = userResults.rows[0]['id'];
    } else {
        return res.status(404).json({
            error: "No student found"
        });
    }

    let CareOfUUID = "";

    if (careOf) {
        const genCareOfUUID = await query("SELECT UUID()");
        CareOfUUID = genCareOfUUID.rows[0]['UUID()'];
        const CareOfValues = Object.values(careOf);
        await query("INSERT INTO care_of VALUES (?, ?, ?, ?, ?, ?, ?)", [
            CareOfUUID,
            userID,
            ...CareOfValues
        ]);
    }

    let result = null;

    const statusResult = await query(`
        SELECT solicitation_returned_status_id AS id FROM solicitation_returned_status
        WHERE solicitation_returned_status.status_name = 'RETURNED'
    `);

    if (CareOfUUID) {
        result = await query(`
            UPDATE solicitation_form
            INNER JOIN user
            ON solicitation_form.user_id = user.user_id
            SET solicitation_form.solicitation_care_of = ?,
            solicitation_form.solicitation_returned_status_id = ?
            WHERE user.user_first_name = ? AND user.user_family_name = ? AND user.user_middle_name = ? AND user.user_suffix = ? AND user.course_id = ? AND user.solicitation_form.solicitation_number = ?
    `, [CareOfUUID, statusResult.rows[0]['id'], firstName, lastName, middleName, suffix, course, soliNum]);
    } else {
        result = await query(`
            UPDATE solicitation_form
            INNER JOIN user
            ON solicitation_form.user_id = user.user_id
            SET solicitation_form.solicitation_returned_status_id = ?,
            solicitation_form.solicitation_yearbook_payment = 400
            WHERE user.user_first_name = ? AND user.user_family_name = ? AND user.user_middle_name = ? AND user.user_suffix = ? AND user.course_id = ? AND solicitation_form.solicitation_number = ?
        `, [statusResult.rows[0]['id'], firstName, lastName, middleName, suffix, course, soliNum]);
    }

    if (result) {
       return res.status(200).end();
    } else {
       return res.status(400).end();
    }
    // const genSolicitationUUID = await query("SELECT UUID()");
    // const SolicitationUUID = genSolicitationUUID.rows[0]['UUID()'];
    // const SolicitationValues = Object.values(attr);
    // await query("INSERT INTO solicitation_form VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
    //     SolicitationUUID,
    //     id,
    //     CareOfUUID,
    //     ...SolicitationValues
    // ]);
}

export async function claimSolicitation(req: Request, res: Response) {
    const { userID } = req.session;
    const {
        solicitationNumber,
        receiverFirstName,
        receiverFamilyName,
        receiverMiddleName,
        receiverSuffix,
        relation
    } = req.body;

    // Check if solicitation is already claim
    const sql = `
    SELECT solicitation_returned_status.status_name AS returnedStatus  FROM solicitation_form
	    INNER JOIN solicitation_returned_status
	    ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id 
	    WHERE solicitation_form.solicitation_number
    `;

    const { rows } = await query(sql, [solicitationNumber]);

    if (rows.length > 0 && rows[0]['returnedStatus'] === "RETURNED") {
        return res.status(404).json({
            error: "Solicitation Form already claimed"
        });
    }

    const genCareOfUUID = await query("SELECT UUID()");
    const CareOfUUID = genCareOfUUID.rows[0]['UUID()'];
    await query(`
        INSERT INTO care_of VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [CareOfUUID, userID, receiverFirstName, receiverFamilyName, receiverMiddleName, receiverSuffix, relation]);


    const returnStatusResponse = await query("SELECT solicitation_returned_status.solicitation_returned_status_id AS returnedStatusID FROM solicitation_returned_status WHERE solicitation_returned_status.status_name = 'RETURNED' ");
    const returnStatusID = returnStatusResponse.rows[0]['returnedStatusID'];


    const genSolicitationUUID = await query("SELECT UUID()");
    const solicitationUUID = genSolicitationUUID.rows[0]['UUID()'];
    await query(`
        UPDATE solicitation_form 
        SET solicitation_form.solicitation_care_of = ?, solicitation_form.solicitation_returned_status_id = ?
        WHERE solicitation_form.user_id = ? AND solicitation_form.solicitation_number = ?
    `, [CareOfUUID, returnStatusID, userID, solicitationNumber]);
    res.status(200).json({
        success: "Successfully Claimed by Student"
    });
}

// PATCH

export async function solicitationUpdate(req: Request, res: Response) {
    const {
        id,
        soliNumber,
        status,
        dateReturned,
        paymentAmount,
        paymentStatus,
        ornumber,
    } = req.body;


    // Payment Status
    // const solicitationPaymentData = await query(`
    //     SELECT status_name AS name FROM solicitation_payment_status
    //     WHERE solicitation_payment_status_id = ?
    // `, [paymentStatus]);

    // const solicitationPaymentStatusName = solicitationPaymentData.rows[0]['name'];
    // if (solicitationPaymentStatusName === "") {

    // }

    let formattedDate = dateReturned;

    if (formattedDate === "N/A") {
        formattedDate = null;
    }

    // Returned Status
    const solicitationStatusData = await query(`
        SELECT status_name AS name FROM solicitation_returned_status
        WHERE solicitation_returned_status_id = ?
    `, [status]);

    const solicitationStatusName = solicitationStatusData.rows[0]['name'];

    let solicitationStatusResults: any;
    if (solicitationStatusName === "UNRETURNED") {
        const unpdaidStatusData = await query(`
            SELECT solicitation_payment_status_id AS id FROM solicitation_payment_status
            WHERE status_name = 'UNPAID'
        `);

        const paymentStatusID = unpdaidStatusData.rows[0]['id'];

        solicitationStatusResults = await query(`
            UPDATE solicitation_form
            SET solicitation_returned_status_id = ?,
            solicitation_date_returned = NULL,
            solicitation_yearbook_payment = 0,
            solicitation_payment_status_id = ?,
            solicitation_or_number = ?
            WHERE solicitation_form.user_id = ? AND solicitation_form.solicitation_number = ?
        `, [status, paymentStatusID, ornumber, id, soliNumber]);
    } else if (solicitationStatusName === "RETURNED") {
        solicitationStatusResults = await query(`
            UPDATE solicitation_form
            SET solicitation_returned_status_id = ?,
            solicitation_date_returned = ?,
            solicitation_yearbook_payment = ?,
            solicitation_payment_status_id = ?,
            solicitation_or_number = ?
            WHERE solicitation_form.user_id = ? AND solicitation_form.solicitation_number = ?
        `, [status, formattedDate, paymentAmount, paymentStatus, ornumber, id, soliNumber]);
    } else if (solicitationStatusName === "LOST") {

        const penaltyData = await query(`
            SELECT solicitation_payment_status_id AS id FROM solicitation_payment_status
            WHERE status_name = 'PENALTY'
        `);

        const penaltyID = penaltyData.rows[0]['id'];

        solicitationStatusResults = await query(`
            UPDATE solicitation_form
            SET solicitation_returned_status_id = ?,
            solicitation_date_returned = NULL,
            solicitation_yearbook_payment = 200,
            solicitation_payment_status_id = ?,
            solicitation_or_number = ?
            WHERE solicitation_form.user_id = ? AND solicitation_number = ?
    `, [status, penaltyID, ornumber, id, soliNumber]);
    }

    res.status(200).end();
}