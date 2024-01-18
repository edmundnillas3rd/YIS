import * as XLSX from 'xlsx';

import * as fs from 'fs';
XLSX.set_fs(fs);

import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

import { Request, Response } from "express";

import { query } from "../services/mysqldb";
import { parseStudentName } from '../utils/student';

export async function index(req: Request, res: Response) {
    // const sql = `
    // SELECT solicitation_form.user_id AS id,
    //     course.course_abbreviation AS course, 
    //     CONCAT(user.user_first_name, " ", COALESCE(user.user_middle_name, ''), " ", user.user_family_name, " ", COALESCE(user.user_suffix, '')) AS fullName,
    //     solicitation_form.solicitation_number AS soliNumber,
    //     COALESCE(CONCAT(care_of.first_name, " ", care_of.middle_name, " ", care_of.family_name, " ", care_of.suffix), 'N/A') AS careOfFullName,
    //     COALESCE(care_of.relation_status, 'N/A') AS relationStatus,
    //     solicitation_returned_status.status_name AS returnedStatus, 
    //     COALESCE(solicitation_form.solicitation_date_returned, 'N/A') AS dateReturned,
    //     solicitation_payment_status.status_name AS paymentStatus,
    //     solicitation_form.solicitation_yearbook_payment AS paymentAmount,
    //     solicitation_form.solicitation_or_number AS ORnumber
    //     FROM solicitation_form
    //     INNER JOIN user
    //     ON solicitation_form.user_id = user.user_id
    //     INNER JOIN solicitation_payment_status
    //     ON solicitation_form.solicitation_payment_status_id = solicitation_payment_status.solicitation_payment_status_id
    //     INNER JOIN solicitation_returned_status
    //     ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id
    //     LEFT JOIN care_of
    //     ON solicitation_form.solicitation_care_of = care_of.care_of_id
    //     INNER JOIN course
    //     ON user.course_id = course.course_id;
    // `;

    const sql = `
        SELECT solicitation_form_raw_id AS id,
            course AS course, 
            student_name AS fullName,
            soli_numbers AS soliNumber,
            care_of AS careOfFullName,
            COALESCE(solicitation_returned_status, 'UNRETURNED') AS returnedStatus, 
            COALESCE(lost_or_number, 'N/A') as lostORNumber,
            COALESCE(date_returned, 'N/A') AS dateReturned,
            COALESCE(yearbook_payment, 'N/A') AS paymentAmount,
            COALESCE(or_number, 'N/A') AS ORnumber,
            COALESCE(full_payment, 0) as fullPayment
            FROM solicitation_form_raw
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
        CONCAT(user.user_first_name, " ", COALESCE(user.user_middle_name, ''), " ", user.user_family_name, " ", COALESCE(user.user_suffix, '')) AS fullName,
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

// POST

export async function searchSolicitationForm(req: Request, res: Response) {
    const { search } = req.body;

    const { rows } = await query(`
        SELECT
        sf.user_id AS id,
        c.course_abbreviation AS course, 
        CONCAT(u.user_first_name, " ", COALESCE(u.user_middle_name, ''), " ", u.user_family_name, " ", COALESCE(u.user_suffix, '')) AS fullName,
        sf.solicitation_number as soliNumber,
        COALESCE(CONCAT(cof.first_name, " ", cof.middle_name, " ", cof.family_name, " ", cof.suffix), 'N/A') AS careOfFullName,
        COALESCE(cof.relation_status, 'N/A') AS relationStatus,
        srs.status_name AS returnedStatus,
        COALESCE(sf.solicitation_date_returned, 'N/A') AS dateReturned,
        sps.status_name AS paymentStatus,
        sf.solicitation_yearbook_payment AS paymentAmount,
        sf.solicitation_or_number AS ORnumber
        FROM solicitation_form sf
        INNER JOIN user u
        ON sf.user_id = u.user_id
        INNER JOIN course c
        ON u.course_id = c.course_id
        LEFT JOIN care_of cof
        ON sf.solicitation_care_of = cof.care_of_id
        INNER JOIN solicitation_returned_status srs
        ON sf.solicitation_returned_status_id = srs.solicitation_returned_status_id
        INNER JOIN solicitation_payment_status sps
        ON sf.solicitation_payment_status_id = sps.solicitation_payment_status_id
        WHERE REGEXP_LIKE(CONCAT(u.user_first_name, ' ', u.user_family_name, ' ', COALESCE(u.user_middle_name, ''), ' ', COALESCE(u.user_suffix, '')), ?)
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
            solicitation_form.solicitation_yearbook_payment = 2200
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
        soliNum,
        firstName,
        familyName,
        middleName,
        suffix,
        careOf,
        relation
    } = req.body;

    // Check if solicitation is already claim
    // const sql = `
    // SELECT solicitation_returned_status.status_name AS returnedStatus  FROM solicitation_form
    // INNER JOIN solicitation_returned_status
    // ON solicitation_form.solicitation_returned_status_id = solicitation_returned_status.solicitation_returned_status_id 
    // WHERE solicitation_form.solicitation_number
    // `;
    // 
    // const { rows } = await query(sql, [solicitationNumber]);
    // 
    // if (rows.length > 0 && rows[0]['returnedStatus'] === "RETURNED") {
    // return res.status(404).json({
    // error: "Solicitation Form already claimed"
    // });
    // }
    // 
    // const genCareOfUUID = await query("SELECT UUID()");
    // const CareOfUUID = genCareOfUUID.rows[0]['UUID()'];
    // await query(`
    // INSERT INTO care_of VALUES (?, ?, ?, ?, ?, ?, ?)
    // `, [CareOfUUID, userID, firstName, receiverFamilyName, middleName, receiverSuffix, relation]);
    // 
    // 
    // const returnStatusResponse = await query("SELECT solicitation_returned_status.solicitation_returned_status_id AS returnedStatusID FROM solicitation_returned_status WHERE solicitation_returned_status.status_name = 'RETURNED' ");
    // const returnStatusID = returnStatusResponse.rows[0]['returnedStatusID'];
    // 
    // 
    // const genSolicitationUUID = await query("SELECT UUID()");
    // const solicitationUUID = genSolicitationUUID.rows[0]['UUID()'];
    // await query(`
    // UPDATE solicitation_form 
    // SET solicitation_form.solicitation_care_of = ?, solicitation_form.solicitation_returned_status_id = ?
    // WHERE solicitation_form.user_id = ? AND solicitation_form.solicitation_number = ?
    // `, [CareOfUUID, returnStatusID, userID, solicitationNumber]);


    const resutls = await query(`
        SELECT solicitation_returned_status
        FROM solicitation_form_raw
        WHERE solicitation_returned_status = ? AND student_name = CONCAT(?, ', ', ?, ' ', ?)
    `, ["RETURNED ALL", familyName, firstName, middleName]);


    if (resutls.rows.length > 0) {
        return res.status(200).json({
            error: "Student already returned the solicitation form"
        });
    }

    if (careOf) {
        const {
            cfFirstName,
            cfLastName,
            cfMiddleName,
            cfSuffix,
            cfRelation
        } = careOf;

        const careOfName = `${cfFirstName} ${cfMiddleName} ${cfLastName} ${cfSuffix}`;
        await query(`
            UPDATE solicitation_form_raw
            SET care_of = ?,
            care_of_relation = ?
            solicitation_returned_status = ?
            WHERE soli_numbers = ? AND student_name = CONCAT(?, ', ', ?, ' ', ?)
        `, [careOfName, cfRelation, "RETURNED ALL", soliNum, familyName, firstName, middleName]);
    } else {
        await query(`
            UPDATE solicitation_form_raw
            SET solicitation_returned_status = ?
            WHERE soli_numbers = ? AND student_name = CONCAT(?, ', ', ?, ' ', ?)
        `, ["RETURNED ALL", soliNum, familyName, firstName, middleName]);
    }

    res.status(200).json({
        success: "Successfully Claimed by Student"
    });
}

function removeStubs(wb: any) {
    Object.values(wb.Sheets).forEach((ws: any) => {
        Object.values(ws).filter((v: any) => v.t === 'z').forEach((v: any) => Object.assign(v, { t: 's', v: '' }));
    });
    return wb;
}

export async function uploadData(req: Request, res: Response) {
    const { } = req.body;

    if (!req.file)
        return res.status(404).json({ error: "No file found" });

    let workbook = XLSX.readFile(req.file.path);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false }).forEach(async (row: any) => {
        const keys = Object.keys(row);

        console.log(row);

        // keys.forEach(async (key: any) => {
        //     if (key === "NAME OF STUDENT") {
        //         const parsedName: Student = await parseStudentName(row[key]);
        //         rowData[key] = `${parsedName.firstName} ${parsedName.middleName} ${parsedName.familyName}`
        //         return;
        //     }
        //     
        //     if (key === "YEARBOOK PAYMENT") {
        //         if (typeof row[key] === "string") {
        //             rowData[key] = 0;
        //             return;
        //         } else {
        //             rowData[key] = row[key];
        //         }
        //         return;
        //     }
        // 
        //     rowData[key] = row[key];
        // });

        const results = await query(`
            INSERT INTO solicitation_form_raw (
                student_name, 
                course, 
                soli_numbers, 
                care_of, 
                solicitation_returned_status,
                lost_or_number, 
                date_returned, 
                yearbook_payment, 
                or_number, 
                full_payment
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            typeof row["NAME OF STUDENT"] === "undefined" ? null : row["NAME OF STUDENT"],
            typeof row["COURSE"] === "undefined" ? null : row["COURSE"],
            typeof row["SOLI #'s"] === "undefined" ? null : row["SOLI #'s"],
            typeof row["CARE OF"] === "undefined" ? null : row["CARE OF"],
            typeof row["RETURNED ALL / UNRETURNED SOLI"] === "undefined" ? null : row["RETURNED ALL / UNRETURNED SOLI"],
            typeof row["LOST OR #"] === "undefined" ? null : row["LOST OR #"],
            typeof row["DATE RETURNED"] === "undefined" ? null : row["DATE RETURNED"],
            typeof row["YEARBOOK PAYMENT"] === "undefined" ? null : row["YEARBOOK PAYMENT"],
            typeof row["OR #"] === "undefined" ? null : row["OR #"],
            typeof row["FULL PAYMENT"] === "undefined" ? null : row["FULL PAYMENT"],

        ]);
    });

    res.status(200).end();
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