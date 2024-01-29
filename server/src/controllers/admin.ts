import * as XLSX from 'xlsx';

import * as fs from 'fs';
XLSX.set_fs(fs);

import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

import { query } from "../services/mysqldb";
import { Request, Response } from "express";

import { Document, Paragraph, TextRun, Packer, PageBreak, HeadingLevel } from "docx";

export async function downloadSolicitation(req: Request, res: Response) {
    const students = await query(`
        SELECT
        sfr.full_name AS 'NAME OF STUDENT',
        COALESCE(c.course_abbreviation, '') AS COURSE,
        soli_numbers AS "SOLI #'s",
        CONCAT(COALESCE(care_of, ''), ' ', COALESCE(care_of_relation, '')) AS 'CARE OF',
        CONCAT(COALESCE('RETURNED: ', returned_solis, ''), ' ', 'UNRETURNED: ', COALESCE(unreturned_solis, '')) AS 'RETURNED ALL / UNRETURNED SOLI',
        COALESCE(lost_or_number, '') AS 'LOST OR #',
        COALESCE(date_returned, '') AS 'DATE RETURNED',
        COALESCE(yearbook_payment, '') AS 'YEARBOOK PAYMENT',
        COALESCE(or_number, '') AS 'OR #',
        COALESCE(full_payment, '') AS 'FULL PAYMENT'
        FROM solicitation_form_raw sfr
        LEFT JOIN course c
        ON sfr.course = c.course_id
        LEFT JOIN college coll
        ON c.college_id = coll.college_id
        LEFT JOIN solicitation_returned_status srs
        ON sfr.solicitation_returned_status_id = srs.solicitation_returned_status_id
        LEFT JOIN solicitation_payment_status sps
        ON sfr.solicitation_payment_status_id = sps.solicitation_payment_status_id
    `);

    console.log(students);

    const solicitationWorkbook = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(students.rows);
    XLSX.utils.book_append_sheet(
        solicitationWorkbook,
        sheet,
        "ALL"
    );

    const buf = XLSX.write(solicitationWorkbook, {
        type: "buffer",
        bookType: "xlsx"
    });

    res.attachment("solicitation-backup.xlsx");
    res.status(200).end(buf);

    res.status(200).end();

}

export async function downloadYearbookReleased(req: Request, res: Response) {
    const yearbook = await query(`
        SELECT 
        *,
        yb.yearbook_id AS id, 
        CONCAT(COALESCE(u.user_first_name, ''), ' ', COALESCE(u.user_middle_name, ''), ' ', COALESCE(u.user_family_name, '')) AS fullName,
        COALESCE(course_id, 'N/A') AS course,
        yb.yearbook_full_payment AS fullPayment,
        yps.status_name AS paymentStatus,
        ybs.yearbook_status_name AS yearbookStatus,
        COALESCE(yb.yearbook_date_released, 'N/A') AS dateReleased,
        COALESCE(yb.yearbook_care_of, 'N/A') as careOf,
        COALESCE(yb.yearbook_care_of_relation, 'N/A') careOfRelation,
        u.user_year_graduated AS yearGraduated
        FROM yearbook yb
        LEFT JOIN user u
        ON yb.yearbook_id = u.user_id
        LEFT JOIN yearbook_status ybs
        ON yb.yearbook_status_id = ybs.yearbook_status_id
        LEFT JOIN yearbook_payment_status yps
        ON yb.yearbook_payment_status_id = yps.yearbook_payment_status_id
    `);

    console.log(yearbook);

    const yearbookWorkbook = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(yearbook.rows);
    XLSX.utils.book_append_sheet(
        yearbookWorkbook,
        sheet,
        "ALL"
    );

    const buf = XLSX.write(yearbookWorkbook, {
        type: "buffer",
        bookType: "xlsx"
    });

    res.attachment("yearbook-released-backup.xlsx");
    res.status(200).end(buf);
}

export async function downloadYearbookPhotos(req: Request, res: Response) {
    const yearbookPhotos = await query(`
        SELECT 
        *,
        ybp.yearbook_photos_id AS id, 
        ybp.yearbook_photos_full_name AS fullName,
        ybp.yearbook_photos_full_payment as fullPayment,
        yps.status_name AS paymentStatus,
        ybs.yearbook_status_name AS yearbookStatus,
        yps.status_name AS paymentStatus,
        COALESCE(DATE_FORMAT(ybp.yearbook_photos_date_released, '%m-%d-%Y'), 'N/A') AS dateReleased
        FROM yearbook_photos ybp
        LEFT JOIN yearbook_status ybs
        ON ybp.yearbook_photos_status_id = ybs.yearbook_status_id
        LEFT JOIN yearbook_payment_status yps
        ON ybp.yearbook_photos_payment_status_id = yps.yearbook_payment_status_id
    `);

    console.log(yearbookPhotos);

    const yearbookPhotosWorkbook = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(yearbookPhotos.rows);
    XLSX.utils.book_append_sheet(
        yearbookPhotosWorkbook,
        sheet,
        "ALL"
    );

    const buf = XLSX.write(yearbookPhotosWorkbook, {
        type: "buffer",
        bookType: "xlsx"
    });

    res.attachment("yearbook-released-backup.xlsx");
    res.status(200).end(buf);
}

export async function downloadStudentInfo(req: Request, res: Response) {

    const { department_id } = req.params;

    const colleges = await query(`
        SELECT
        college_id AS id,
        college_name AS name,
        college_acronym AS acronym
        FROM college
    `);

    const department = colleges.rows.find((college: any) => college['id'] === department_id);

    const students = await query(`
        SELECT 
        u.user_id AS id, 
        u.user_first_name AS firstName,
        u.user_middle_name AS middleName,
        u.user_family_name AS familyName,
        u.user_suffix AS suffix,
        u.user_year_graduated AS yearGraduated,
        c.course_abbreviation AS course,
        coll.college_id AS departmentID,
        u.user_school_id AS schoolID
        FROM user u
        LEFT JOIN role
        ON u.role_id = role.role_id
        LEFT JOIN course c
        ON u.course_id = c.course_id
        LEFT JOIN college coll
        ON c.college_id = coll.college_id
        WHERE role.role_name = 'STUDENT'
    `);

    const studentsDepartment = students.rows.filter((student: any) => student['departmentID'] === department_id);

    console.log(students);
    console.log(department);
    console.log(studentsDepartment);

    // Should process per student, not per each club and accomplishments
    const studentsData = await Promise.all(students.rows.map(async (student: any) => {
        const sql = `
            SELECT DISTINCT co.club_organization_name AS organizationName, cpos.club_position_name AS clubPosition, c.club_started AS yearStarted, c.club_ended AS yearEnded FROM club c
            LEFT JOIN user u
            ON c.user_id = u.user_id
            LEFT JOIN club_organization co
            ON c.club_organization_id = co.club_organization_id
            LEFT JOIN club_position cpos
            ON c.club_position_id = cpos.club_position_id
            WHERE c.user_id = ?
        `;
        const organization = await query(sql, [student['id']]);

        console.log(student, organization);


        let clubRecognitions = organization.rows.reduce((accumulator: any, currentValue: any) => {

            if (accumulator[currentValue.organizationName as string] !== undefined) {
                // const removedComma = (accumulator[currentValue.organizationName as string]).slice(0, -1);
                const previousValue = accumulator[currentValue.organizationName as string];
                return {
                    ...accumulator,
                    [currentValue.organizationName as string]: previousValue.concat(` ${currentValue.clubPosition}, ${currentValue.yearStarted}-${currentValue.yearEnded}`),
                };
            }

            return {
                ...accumulator,
                [currentValue.organizationName as string]: `${currentValue.organizationName}, ${currentValue.clubPosition}, ${currentValue.yearStarted}-${currentValue.yearEnded},`,
            };
        }, {});

        // clubRecognitions = Object.entries(clubRecognitions).map(([key, value]) => {
        //     const organization: string = clubRecognitions[key] as string;
        //     if (organization.charAt(organization.length - 1) === ',') {
        //         return organization.slice(0, -1);
        //     }

        //     return organization;
        // });

        clubRecognitions = Object.entries(clubRecognitions).map(([key, value]) => {
            const organization: string = clubRecognitions[key] as string;
            if (organization.charAt(organization.length - 1) === ',') {
                return new Paragraph({
                    text: organization.slice(0, -1),
                    bullet: {
                        level: 0
                    }
                });
            }

            return new Paragraph({
                text: organization,
                bullet: {
                    level: 0
                }
            });
        });

        const awards = await query(`
            SELECT a.award_participation_name AS awardAttendedName, a.award_name AS awardName, a.award_received AS awardReceived FROM award a WHERE a.user_id = ?
        `, [student['id']]);

        const awardRecognitions = awards.rows.map((award: any) => (
            new Paragraph({
                text: `${award.awardAttendedName}, ${award.awardName}, ${award.awardReceived}`,
                bullet: {
                    level: 0
                }
            })
        ));

        const seminars = await query(`
            SELECT s.seminar_name AS seminarName, s.seminar_date_attended AS seminarDateAttended, s.seminar_role AS role FROM seminar s 
            WHERE s.user_id = ?
        `, [student['id']]);

        const seminarsRecognitions = seminars.rows.map((seminar: any) => (
            new Paragraph({
                text: `${seminar.seminarName}, ${seminar.role}, ${seminar.seminarDateAttended}`,
                bullet: {
                    level: 0
                }
            })
        ));

        return {
            properties: {},
            children: [
                new Paragraph({
                    text: `FIRST NAME: ${student['firstName']}`
                }),
                new Paragraph({
                    text: `MIDDLE NAME: ${student['middleName']}`
                }),
                new Paragraph({
                    text: `FAMILY NAME: ${student['familyName']}`
                }),
                new Paragraph({
                    text: `SUFFIX: ${student['suffix']}`
                }),
                new Paragraph({
                    text: "AFFILIATIONS",
                    heading: HeadingLevel.HEADING_1,
                }),
                ...clubRecognitions,
                new Paragraph({
                    text: "AWARDS",
                    heading: HeadingLevel.HEADING_1,
                }),
                ...awardRecognitions,
                new Paragraph({
                    text: "SEMINARS",
                    heading: HeadingLevel.HEADING_1,
                }),
                ...seminarsRecognitions
            ],
        };

    }));

    console.log(studentsData);

    const doc = new Document({
        sections: studentsData
    });


    const buffer = await Packer.toBuffer(doc);

    res.attachment(`student-yearbook.docx`);

    res.status(200).end(buffer);
}

export async function updateGraduatingYear(req: Request, res: Response) {
    const { year } = req.body;

    await query(`
        UPDATE user
        SET user_year_graduated = ?
    `, [year]);

    res.status(200).end();
}