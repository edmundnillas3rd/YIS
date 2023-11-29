import { Request, Response } from "express";
import { query } from "../services/mysqldb";

// GET
export async function index(req: Request, res: Response) {
    const organizations = await query("SELECT club_organization_id, club_organization_name FROM club_organization");
    const positions = await query("SELECT club_position_id, club_position_name FROM club_position");

    res.status(200).json({
        positions: positions.rows,
        organizations: organizations.rows
    });
}

export async function userClub(req: Request, res: Response) {
    const { userID } = req.session;

    const { rows } = await query(`
        SELECT DISTINCT club_organization.club_organization_id as clubID, club_organization.club_organization_name as organization FROM user
        INNER JOIN club
        ON club.user_id = user.user_id
        INNER JOIN club_organization
        ON club.club_organization_id = club_organization.club_organization_id
        INNER JOIN club_position
        ON club.club_position_id = club_position.club_position_id
        WHERE user.user_id = ?;
    `, [userID]);

    res.status(200).json({
        rows
    });
}

export async function userClubInfo(req: Request, res: Response) {
    const { userID } = req.session;
    const { clubID } = req.params;

    const { rows } = await query(`
        SELECT club_position.club_position_name AS clubPositionName, club.club_started AS clubStarted, club.club_ended AS clubEnded FROM club
        INNER JOIN club_position
        ON club.club_position_id = club_position.club_position_id
        WHERE club.user_id = ? AND club.club_organization_id = ?
    `, [userID, clubID]);

    res.status(200).json({
        userClubPositions: rows
    });
}

export async function userPreview(req: Request, res: Response) {
    const { userID } = req.session;

    const sql = `
        SELECT DISTINCT club_organization.club_organization_name AS organizationName, club_position.club_position_name AS clubPosition, club.club_started AS yearStarted, club.club_ended as yearEnded FROM club
		INNER JOIN user
		ON club.user_id = user.user_id
		INNER JOIN club_organization
		ON club.club_organization_id = club_organization.club_organization_id
		INNER JOIN club_position
		ON club.club_position_id = club_position.club_position_id
		WHERE club.user_id = ?
    `;

    const organization = await query(sql, [userID]);

    let clubRecognitions = organization.rows.reduce((accumulator: any, currentValue: any) => {
        console.log(accumulator);

        if (accumulator[currentValue.organizationName as string] !== undefined) {
            const removedComma = (accumulator[currentValue.organizationName as string]).slice(0, -1);
            return {
                ...accumulator,
                [currentValue.organizationName as string]: removedComma.concat(` '${currentValue.clubPosition}', ${currentValue.yearStarted}-${currentValue.yearEnded}`),
            };
        }

        return {
            ...accumulator,
            [currentValue.organizationName as string]: `'${currentValue.organizationName}', '${currentValue.clubPosition}', ${currentValue.yearStarted}-${currentValue.yearEnded},`,
        };
    }, {});

    clubRecognitions = Object.entries(clubRecognitions).map(([key, value]) => {
        const organization: string = clubRecognitions[key] as string;
        if (organization.charAt(organization.length - 1) === ',') {
            return organization.slice(0, -1);
        }

        return organization;
    });

    const awards = await query("SELECT award.award_attended_name AS awardAttendedName, award.award_name AS awardName, DATE_FORMAT(award.award_received, '%Y') AS awardReceived FROM award WHERE award.user_id = ?", [userID]);
    let awardRecognitions = awards.rows.reduce((accumulator: string, currentValue: any) => {
        const { awardAttendedName, awardName, awardReceived } = currentValue;
        if (accumulator.length === 0) {
            return `${awardAttendedName}, ${awardName}, ${awardReceived}`;
        } else {
            return `, ${awardAttendedName}, ${awardName}, ${awardReceived}`;
        }
    }, "");

    const formatData = [...clubRecognitions, awardRecognitions];

    const dataPreview = formatData.reduce((accumulator: string, currentValue: any) => {
        if (accumulator.length === 0) {
            return `${currentValue}`;
        } else {
            return `${accumulator}, ${currentValue}`;
        }
    }, "");

    res.status(200).json({
        dataPreview
    });
}

export async function userAward(req: Request, res: Response) {
    const { userID } = req.session;

    const { rows } = await query(`
        SELECT award.award_id AS id, award.award_attended_name AS awardAttendedName, award.award_name AS awardName, award.award_received AS awardReceived FROM award
        WHERE award.user_id = ?;
    `, [userID]);

    res.status(200).json({
        awards: rows
    });
}

// POST
export async function clubUserAdd(req: Request, res: Response) {
    const { userID } = req.session;
    const { club, position, yearStarted, yearEnded } = req.body;

    // find if user already is in a club
    const foundClub = await query(`
        SELECT user.user_id FROM user
        INNER JOIN club
        ON user.user_id = club.user_id
        INNER JOIN club_organization
        ON club.club_organization_id = club_organization.club_organization_id
        WHERE user.user_id = ? AND club_organization.club_organization_name = ?
    `, [userID, club]);

    if (foundClub.rows.length > 0) {
        return res.status(400).json({ error: "Entry already exist!" });
    }

    const clubOrganization = await query("SELECT club_organization_id AS organizationID FROM club_organization WHERE club_organization.club_organization_name = ? OR club_organization.club_organization_id = ?", [club, club]);
    const clubOrganizationID = clubOrganization.rows[0]['organizationID'];
    const clubPosition = await query("SELECT club_position.club_position_id AS positionID FROM club_position WHERE club_position.club_position_name = ?", [position]);
    const clubPositionID = clubPosition.rows[0]['positionID'];

    const ClubUUID = await query("SELECT UUID()");
    const { rows } = await query("INSERT INTO club VALUES (?, ?, ?, ?, ?, ?)", [
        ClubUUID.rows[0]['UUID()'],
        userID,
        clubOrganizationID,
        clubPositionID,
        yearStarted,
        yearEnded
    ]);

    res.status(200).end();
}

export async function clubUserPositionAdd(req: Request, res: Response) {
    const { userID } = req.session;
    const { club, position, yearStarted, yearEnded } = req.body;

    const clubOrganizationRow = await query("SELECT club_organization.club_organization_id as club FROM club_organization WHERE club_organization.club_organization_name = ?", [club]);
    const clubOrganizationID = clubOrganizationRow.rows[0].club;

    // const clubPosition = await query("SELECT club_position.club_position_id AS positionID FROM club_position WHERE club_position.club_position_name = ?", [position]);
    // const clubPositionID = clubPosition.rows[0]['positionID'];

    const foundClubBelongTo = await query(`
        SELECT club_position.club_position_id, club_position.club_position_name, user.user_id , CONCAT(user.user_first_name, " ", user.user_family_name, " ", user.user_middle_name) as full_name FROM user
        INNER JOIN club
        ON user.user_id = club.user_id
        INNER JOIN club_position
        ON club.club_position_id = club_position.club_position_id
        WHERE user.user_id = ? AND club.club_organization_id = ?;
    `, [userID, clubOrganizationID]);


    if (foundClubBelongTo.rows.length > 0) {
        return res.status(400).json({ error: "Another entry already exist " });
    }

    const genClubUUID = await query("SELECT UUID()");
    const ClubUUID = genClubUUID.rows[0]['UUID()'];
    await query("INSERT INTO club (club_id) VALUES (?)", [ClubUUID])

    // await query("INSERT INTO club VALUES (?, ?, ?, ?, ?, ?)", [ClubUUID, userID, clubOrganizationID, clubPositionID, yearStarted, yearEnded]);
    res.status(200).end({
        club: ClubUUID
    });

}

export async function awardUserAdd(req: Request, res: Response) {
    const { awardAttendedName, awardName, awardReceived } = req.body;
    const { userID } = req.session;

    const AwardGenUUID = await query("SELECT UUID()");
    const AwardUUID = AwardGenUUID.rows[0]['UUID()'];
    await query(`
        INSERT INTO award VALUES (?, ?, ?, ?, ?)
    `, [AwardUUID, userID, awardAttendedName, awardName, awardReceived]);
    res.status(200).end();
}

export async function clubUserPositionUpdate(req: Request, res: Response) {
    const {
        club,
        position,
        yearStarted,
        yearEnded
    } = req.body;
    const { userID } = req.session;

    const positionExist = await query("SELECT club_position.club_position_id AS position FROM club_position WHERE club_position.club_position_name = ?", [position]);

    if (positionExist.rows === 0) {
        return res.status(404).end();
    }

    const clubPositionSQL = "UPDATE club SET club.club_position_id = ?, club.club_started = ?, club.club_ended = ? WHERE club.user_id = ? AND club.club_organization_id = ?";
    const result = await query(clubPositionSQL, [positionExist.rows[0].position, yearStarted, yearEnded, userID, club]);
    res.status(200).end();
}

// DELETE
export async function clubUserRemove(req: Request, res: Response) {
    const { userID } = req.session;
    const { id } = req.params;
    const rows = await query("DELETE FROM club WHERE club.user_id = ? AND club.club_organization_id = ?", [userID, id]);
    res.status(200).end();
}

export async function awardUserRemove(req: Request, res: Response) {
    const { userID } = req.session;
    const { id } = req.params;


    const { rows } = await query("DELETE FROM award WHERE award.user_id = ? AND award.award_id = ?", [userID, id]);
    res.status(200).end();
}