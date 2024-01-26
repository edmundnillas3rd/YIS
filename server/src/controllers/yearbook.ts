import * as fs from "fs";

import { Request, Response } from "express";
import { query } from "../services/mysqldb";
import { Document, Paragraph, TextRun, Packer, PageBreak, HeadingLevel } from "docx";

export async function index(req: Request, res: Response) {
    const yearbookStatus = await query(`
        SELECT yearbook_status_id AS id, yearbook_status_name AS name FROM yearbook_status
    `);

    // let yearbookPhotos = await query(`
    // SELECT DISTINCT yearbook_photos.yearbook_photos_id AS id, CONCAT(user.user_first_name, ' ', user.user_family_name, ' ', COALESCE(user.user_middle_name, ''), ' ', COALESCE(user.user_suffix, '')) AS fullName, yearbook_status.yearbook_status_name AS yearbookStatus, COALESCE(DATE_FORMAT(yearbook_photos.yearbook_photos_date_released, '%m-%d-%Y'), 'N/A') AS dateReleased FROM yearbook_photos
    // INNER JOIN user
    // ON yearbook_photos.user_id = user.user_id
    // INNER JOIN yearbook_status
    // ON yearbook_photos.yearbook_status_id = yearbook_status.yearbook_status_id
    // `);

    // const yearbook = await query(`
    // SELECT yb.yearbook_id AS id, 
    // CONCAT(u.user_first_name, ' ', u.user_family_name, ' ', u.user_middle_name, ' ', u.user_suffix) AS fullName, 
    // c.course_abbreviation AS course,
    // COALESCE(u.user_year_graduated, 'N/A') AS yearGraduated,
    // ybs.yearbook_status_name AS yearbookStatus, 
    // COALESCE(yb.yearbook_date_released, 'N/A') AS dateReleased,
    // COALESCE(CONCAT(co.first_name, ' ', co.family_name, ' ', co.middle_name, ' ', co.suffix), 'N/A') AS carefOf
    // FROM yearbook yb
    // INNER JOIN user u
    // ON yb.user_id = u.user_id
    // INNER JOIN course c
    // ON u.course_id = c.course_id
    // LEFT JOIN care_of co
    // ON yb.yearbook_care_of = co.care_of_id
    // INNER JOIN yearbook_status ybs
    // ON yb.yearbook_status_id = ybs.yearbook_status_id
    // `);

    const yearbook = await query(`
        SELECT yb.yearbook_id AS id, 
        CONCAT(COALESCE(sfr.first_name, ''), ' ', COALESCE(sfr.middle_name, ''), ' ', COALESCE(sfr.family_name, '')) AS fullName,
        c.course_abbreviation AS course,
        yb.yearbook_full_payment AS fullPayment,
        yps.status_name AS paymentStatus,
        ybs.yearbook_status_name AS yearbookStatus,
        COALESCE(yb.yearbook_date_released, 'N/A') AS dateReleased,
        COALESCE(yb.yearbook_care_of, 'N/A') as careOf,
        COALESCE(yb.yearbook_care_of_relation, 'N/A') careOfRelation
        FROM yearbook yb
        LEFT JOIN solicitation_form_raw sfr
        ON yb.soli_form_id = sfr.solicitation_form_raw_id
        LEFT JOIN course c
        ON sfr.course = c.course_id
        LEFT JOIN yearbook_status ybs
        ON yb.yearbook_status_id = ybs.yearbook_status_id
        LEFT JOIN yearbook_payment_status yps
        ON yb.yearbook_payment_status_id = yps.yearbook_payment_status_id
    `);

    const yearbookPhotos = await query(`
        SELECT ybp.yearbook_photos_id AS id, 
        CONCAT(sfr.first_name, ' ', sfr.family_name, ' ', COALESCE(sfr.middle_name, ''), ' ', COALESCE(sfr.suffix, '')) AS fullName,
        ybs.yearbook_status_name AS yearbookStatus,
        COALESCE(DATE_FORMAT(ybp.yearbook_photos_date_released, '%m-%d-%Y'), 'N/A') AS dateReleased
        FROM yearbook_photos ybp
        LEFT JOIN solicitation_form_raw sfr
        ON ybp.soli_form_id = sfr.solicitation_form_raw_id
        LEFT JOIN yearbook_status ybs
        ON ybp.yearbook_photos_status_id = ybs.yearbook_status_id
    `);

    const yearbookPaymentStatuses = await query(`
        SELECT yearbook_payment_status_id AS id, status_name AS name FROM yearbook_payment_status
    `);

    res.status(200).json({
        yearbookStatuses: yearbookStatus.rows,
        yearbookPhotos: yearbookPhotos.rows,
        yearbook: yearbook.rows,
        yearbookPaymentStatuses: yearbookPaymentStatuses.rows
    });
}

export async function downloadYearbook(req: Request, res: Response) {
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
        INNER JOIN role
        ON u.role_id = role.role_id
        INNER JOIN course c
        ON u.course_id = c.course_id
        INNER JOIN college coll
        ON c.college_id = coll.college_id
        WHERE role.role_name = 'STUDENT'
    `);

    const studentsDepartment = students.rows.filter((student: any) => student['departmentID'] === department_id);

    console.log(students);
    console.log(department);
    console.log(studentsDepartment);

    // Should process per student, not per each club and accomplishments
    const studentsData = await Promise.all(studentsDepartment.map(async (student: any) => {
        const sql = `
            SELECT DISTINCT co.club_organization_name AS organizationName, cpos.club_position_name AS clubPosition, c.club_started AS yearStarted, c.club_ended AS yearEnded FROM club c
            INNER JOIN user u
            ON c.user_id = u.user_id
            INNER JOIN club_organization co
            ON c.club_organization_id = co.club_organization_id
            INNER JOIN club_position cpos
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

    console.log(department['acronym']);
    

    const buffer = await Packer.toBuffer(doc);

    res.attachment(`${department['acronym']}.docx`);

    res.status(200).end(buffer);
}

export async function yearbookReleased(req: Request, res: Response) {
    const {
        careOf,
        firstName,
        lastName,
        middleName,
        suffix,
        course,
        yearGraduated
    } = req.body;

    // User
    const foundUser = await query(`
        SELECT u.user_id AS id FROM yearbook yb
        INNER JOIN user u
        ON yb.user_id = u.user_id
        INNER JOIN yearbook_status ybs
        ON yb.yearbook_status_id = ybs.yearbook_status_id
        WHERE u.user_first_name = ? AND u.user_family_name = ? AND u.user_middle_name = ? AND u.user_suffix = ?
        AND u.course_id = ?
        AND ybs.yearbook_status_name = 'PENDING'
    `, [firstName, lastName, middleName, suffix, course]);


    if (foundUser.rows.length === 0) {
        return res.status(404).json({
            error: "Student entry doesn't exist or yearbook already claimed."
        });
    }

    const userID = foundUser.rows[0]['id'];


    let CareOfUUID;

    const {
        cfFirstName,
        cfLastName,
        cfMiddleName,
        cfRelation
    } = careOf;

    if (
        cfFirstName &&
        cfLastName &&
        cfMiddleName &&
        cfRelation
    ) {
        // Care of
        const genCareOfUUID = await query('SELECT UUID()');
        CareOfUUID = genCareOfUUID.rows[0]['UUID()'];
        const careOfValues = Object.values(careOf);
        const careOfResults = await query(`
                INSERT INTO care_of VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [CareOfUUID, userID, ...careOfValues]);

    }


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

    const yearbookData = await query(`
        SELECT yb.yearbook_id AS id, yb.yearbook_status_id AS statusID FROM yearbook yb
        WHERE yb.user_id = ?
    `, [userID]);

    // If a yearbook already exist
    if (yearbookData.rows.length > 0) {
        const yearbookID = yearbookData.rows[0]['id'];
        const statusID = yearbookData.rows[0]['statusID'];

        const statusData = await query(`
            SELECT ybs.yearbook_status_name AS statusName FROM yearbook_status ybs
            WHERE ybs.yearbook_status_id = ?
        `, [statusID]);

        const statusName = statusData.rows[0]['statusName'];
        if (statusName === "PENDING") {
            const releasedData = await query(`
                SELECT ybs.yearbook_status_id AS id FROM yearbook_status ybs
                WHERE ybs.yearbook_status_name = 'RELEASED'
            `);

            const releasedStatusID = releasedData.rows[0]['id'];
            const yearbookUpdateData = await query(`
                UPDATE yearbook
                INNER JOIN user
                ON yearbook.user_id = user.user_id
                SET yearbook.yearbook_status_id = ?,
                user.user_year_graduated = ?,
                yearbook.yearbook_date_released = CURRENT_TIMESTAMP
                WHERE yearbook.yearbook_id = ?
            `, [releasedStatusID, yearGraduated, yearbookID]);

            if (yearbookUpdateData.rows.length > 0) {
                return res.status(200).json({
                    message: "Succesfully update an entry"
                });
            } else {
                return res.status(404).json({
                    error: "Failed to update an entry"
                });
            }
        }
        // } else if (statusName === "RELEASED") {
        //     const yearbookUpdateData = await query(`
        //         UPDATE yearbook 
        //         INNER JOIN user
        //         ON yearbook.user_id = user.user_id
        //         SET yearbook.yearbook_status_id = ?,
        //         yearbook.yearbook_date_released = NULL
        //         WHERE yearbook.yearbook_id = ?
        //     `, [statusID, yearbookID]);

        //     if (yearbookUpdateData.rows.length > 0) {
        //         return res.status(200).json({
        //             message: "Succesfully update an entry"
        //         });
        //     } else {
        //         return res.status(404).json({
        //             error: "Failed to update an entry"
        //         });
        //     }
        // }

    }

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
    const { id, status, date } = req.body;

    const statusData = await query(`
        SELECT yearbook_status_name AS name FROM yearbook_status WHERE yearbook_status_id = ?
    `, [status]);

    const statusName = statusData.rows[0]['name'];

    let formattedDate: any = date;

    if (formattedDate === "N/A") {
        formattedDate = null;
    }

    let results: any;

    if (statusName === "RELEASED") {
        results = await query(`
            UPDATE yearbook_photos
            SET yearbook_photos_status_id = ?,
            yearbook_photos_date_released = ?
            WHERE yearbook_photos_id = ?
        `, [status, formattedDate, id]);
    } else if (statusName === "PENDING") {
        results = await query(`
            UPDATE yearbook_photos
            SET yearbook_photos_status_id = ?,
            yearbook_photos_date_released = NULL
            WHERE yearbook_photos_id = ?
        `, [status, id]);
    }

    // let formattedDate: any = date;
    // 
    // if (formattedDate === "N/A") {
    // formattedDate = null;
    // }
    // 
    // results = await query(`
    // UPDATE yearbook_photos
    // SET yearbook_photos_status_id = ?,
    // yearbook_photos_date_released = ?
    // WHERE yearbook_photos_id = ?
    // `, [status, formattedDate, id]);

    res.status(200).end();
}

export async function statusYearbookUpdate(req: Request, res: Response) {
    const {
        yearbookID,
        amount,
        status,
        paymentStatus,
        date,
        careOf,
        relation
    } = req.body;

    let results: any;

    const statusData = await query(`
        SELECT yearbook_status_name AS name FROM yearbook_status WHERE yearbook_status_id = ?
    `, [status]);

    const statusName = statusData.rows[0]['name'];

    let formattedDate = date;
    if (date === "N/A") {
        formattedDate = null;
    }

    results = await query(`
        UPDATE yearbook
        SET yearbook_status_id = ?,
        yearbook_full_payment = ?,
        yearbook_payment_status_id = ?,
        yearbook_care_of = ?,
        yearbook_care_of_relation = ?,
        yearbook_date_released = ?
        WHERE yearbook_id = ?
    `, [
        status,
        amount,
        paymentStatus,
        careOf,
        relation,
        formattedDate,
        yearbookID
    ]);

    // if (statusName === "RELEASED") {
    // results = await query(`
    // UPDATE yearbook
    // INNER JOIN user
    // ON yearbook.user_id = user.user_id
    // SET yearbook.yearbook_status_id = ?,
    // user.user_year_graduated = YEAR(CURRENT_TIMESTAMP),
    // yearbook.yearbook_date_released = CURRENT_TIMESTAMP
    // WHERE yearbook.yearbook_id = ?
    // `, [status, yearbookID]);
    // } else if (statusName === "PENDING") {
    // results = await query(`
    // UPDATE yearbook
    // INNER JOIN user
    // ON yearbook.user_id = user.user_id
    // SET yearbook.yearbook_status_id = ?,
    // user.user_year_graduated = NULL,
    // yearbook.yearbook_date_released = NULL
    // WHERE yearbook.yearbook_id = ?
    // `, [status, yearbookID]);
    // }

    res.status(200).end();
}

export async function searchStudentYearbookPhoto(req: Request, res: Response) {
    const { search } = req.body;
    // const { rows } = await query(`
    // SELECT 
    // yp.yearbook_photos_id AS id, 
    // CONCAT(u.user_first_name, ' ', u.user_family_name, ' ', COALESCE(u.user_middle_name, ''), ' ', COALESCE(u.user_suffix, '')) AS fullName, 
    // ys.yearbook_status_name AS yearbookStatus , COALESCE(yp.yearbook_photos_date_released, 'N/A') AS dateReleased 
    // FROM yearbook_photos yp
    // INNER JOIN yearbook_status ys
    // ON yp.yearbook_status_id = ys.yearbook_status_id
    // WHERE REGEXP_LIKE(CONCAT(u.user_first_name, ' ', u.user_family_name, ' ', COALESCE(u.user_middle_name, ''), ' ', COALESCE(u.user_suffix, '')), ?)
    // `, [`^${search}`]);

    const { rows } = await query(`
        SELECT 
        yp.yearbook_photos_id AS id, 
        CONCAT(sfr.first_name, ' ', sfr.family_name, ' ', COALESCE(sfr.middle_name, ''), ' ', COALESCE(sfr.suffix, '')) AS fullName, 
        ys.yearbook_status_name AS yearbookStatus , COALESCE(yp.yearbook_photos_date_released, 'N/A') AS dateReleased 
        FROM yearbook_photos yp
        LEFT JOIN solicitation_form_raw sfr
        ON yp.soli_form_id = sfr.solicitation_form_raw_id
        LEFT JOIN course c
        ON sfr.course = c.course_id
        INNER JOIN yearbook_status ys
        ON yp.yearbook_photos_status_id = ys.yearbook_status_id
        WHERE REGEXP_LIKE(sfr.first_name, ?) OR REGEXP_LIKE(sfr.middle_name, ?) OR REGEXP_LIKE(sfr.family_name, ?) OR REGEXP_LIKE(sfr.suffix, ?)`,
        [
            `^${search}`,
            `^${search}`,
            `^${search}`,
            `^${search}`
        ]
    );



    if (rows.length === 0) {
        return res.status(404).json({
            error: "Student Not Found"
        });
    }

    res.status(200).json({
        searchResults: rows
    });
}

export async function searchStudentYearbook(req: Request, res: Response) {
    const { search } = req.body;
    const { rows } = await query(`
        SELECT yb.yearbook_id AS id, 
        CONCAT(sfr.first_name, ' ', sfr.family_name, ' ', COALESCE(sfr.middle_name, ''), ' ', COALESCE(sfr.suffix, '')) AS fullName, 
        c.course_abbreviation AS course,
        ys.yearbook_status_name AS yearbookStatus, 
        COALESCE(yb.yearbook_date_released, 'N/A') AS dateReleased,
        COALESCE(yb.yearbook_care_of, 'N/A') as careOf,
        COALESCE(yb.yearbook_care_of_relation, 'N/A') as careOfRelation
        FROM yearbook yb
        LEFT JOIN solicitation_form_raw sfr
        ON yb.soli_form_id = sfr.solicitation_form_raw_id
        LEFT JOIN course c
        ON sfr.course = c.course_id
        INNER JOIN yearbook_status ys
        ON yb.yearbook_status_id = ys.yearbook_status_id
        WHERE REGEXP_LIKE(sfr.first_name, ?) OR REGEXP_LIKE(sfr.middle_name, ?) OR REGEXP_LIKE(sfr.family_name, ?) OR REGEXP_LIKE(sfr.suffix, ?)`,
        [
            `^${search}`,
            `^${search}`,
            `^${search}`,
            `^${search}`
        ]
    );



    if (rows.length === 0) {
        return res.status(404).json({
            error: "Student Not Found"
        });
    }

    res.status(200).json({
        searchResults: rows
    });
}