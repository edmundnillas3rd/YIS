import { Request, Response } from "express";
import { query } from "../services/mysqldb";

// GET
export async function index(req: Request, res: Response) {
    const organizations = await query("SELECT club_organization_id AS id, club_organization_name AS name FROM club_organization");
    const positions = await query("SELECT club_position_id AS id, club_position_name AS name FROM club_position");

    res.status(200).json({
        positions: positions.rows,
        organizations: organizations.rows
    });
}

export async function userClub(req: Request, res: Response) {
    const { userID } = req.session;

    const { rows } = await query(`
        SELECT DISTINCT co.club_organization_id AS id, co.club_organization_name AS organization FROM user u
        INNER JOIN club c
        ON c.user_id = u.user_id
        INNER JOIN club_organization co
        ON c.club_organization_id = co.club_organization_id
        INNER JOIN club_position cpos
        ON c.club_position_id = cpos.club_position_id
        WHERE u.user_id = ?;
    `, [userID]);

    res.status(200).json({
        clubs: rows
    });
}

export async function userClubInfo(req: Request, res: Response) {
    const { userID } = req.session;
    const { clubID } = req.params;

    const { rows } = await query(`
        SELECT c.club_id as id, cpos.club_position_id AS position, c.club_started AS yearStarted, c.club_ended AS yearEnded FROM club c
        INNER JOIN club_position cpos
        ON c.club_position_id = cpos.club_position_id
        WHERE c.user_id = ? AND c.club_organization_id = ?
    `, [userID, clubID]);

    res.status(200).json({
        userClubPositions: rows
    });
}

export async function userPreview(req: Request, res: Response) {
    const { userID } = req.session;

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

    const organization = await query(sql, [userID]);

    let clubRecognitions = organization.rows.reduce((accumulator: any, currentValue: any) => {

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

    const awards = await query("SELECT a.award_participation_name AS awardAttendedName, a.award_name AS awardName, a.award_received AS awardReceived FROM award a WHERE a.user_id = ?", [userID]);
    let awardRecognitions = awards.rows.reduce((accumulator: string, currentValue: any) => {
        const { awardAttendedName, awardName, awardReceived } = currentValue;
        if (accumulator.length === 0) {
            return `'${awardAttendedName}', '${awardName}', ${awardReceived}`;
        } else {
            return `, '${awardAttendedName}', '${awardName}', ${awardReceived}`;
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
        SELECT a.award_id AS id, a.award_participation_name AS awardAttendedName, a.award_name AS awardName, a.award_received AS awardReceived FROM award a
        WHERE a.user_id = ?;
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
        SELECT u.user_id FROM user u
        INNER JOIN club c
        ON u.user_id = c.user_id
        INNER JOIN club_organization co
        ON c.club_organization_id = co.club_organization_id
        WHERE u.user_id = ? AND co.club_organization_id = ?
    `, [userID, club]);

    if (foundClub.rows.length > 0) {
        return res.status(400).json({ error: "Entry already exist!" });
    }
    const ClubUUID = await query("SELECT UUID()");
    const { rows } = await query("INSERT INTO club VALUES (?, ?, ?, ?, ?, ?)", [
        ClubUUID.rows[0]['UUID()'],
        userID,
        club,
        position,
        yearStarted,
        yearEnded
    ]);

    res.status(200).end();
}

export async function clubUserPositionAdd(req: Request, res: Response) {
    const { userID } = req.session;
    const { club, position, yearStarted, yearEnded } = req.body;

    const foundClubBelongTo = await query(`
        SELECT cpos.club_position_id, cpos.club_position_name, u.user_id , CONCAT(u.user_first_name, " ", u.user_family_name, " ", u.user_middle_name) AS full_name FROM user u
        INNER JOIN club c
        ON u.user_id = c.user_id
        INNER JOIN club_position cpos
        ON c.club_position_id = cpos.club_position_id
        WHERE u.user_id = ? AND c.club_id = ? AND c.club_position_id = ?;
    `, [userID, club, position]);


    if (foundClubBelongTo.rows.length > 0) {
        return res.status(400).json({ error: "Another entry already exist " });
    }

    const genClubUUID = await query("SELECT UUID()");
    const ClubUUID = genClubUUID.rows[0]['UUID()'];
    await query("INSERT INTO club VALUES (?, ?, ?, ?, ?, ?)", [ClubUUID, userID, club, position, yearStarted, yearEnded]);

    res.status(200).end();

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


// PUT
export async function clubUserPositionUpdate(req: Request, res: Response) {
    const {
        club,
        position,
        yearStarted,
        yearEnded
    } = req.body;
    const { userID } = req.session;

    const positionExist = await query("SELECT cpos.club_position_id AS position FROM club_position cpos WHERE cpos.club_position_id = ?", [position]);

    if (positionExist.rows === 0) {
        return res.status(404).end();
    }

    const clubPositionSQL = "UPDATE club SET club.club_position_id = ?, club.club_started = ?, club.club_ended = ? WHERE club.user_id = ? AND club.club_id = ?";
    const result = await query(clubPositionSQL, [position, yearStarted, yearEnded, userID, club]);
    res.status(200).end();
}

export async function clubUserAwardUpdate(req: Request, res: Response) {
    const { userID } = req.session;
    const { id } = req.params;
    const { awardAttendedName, awardName, awardReceived } = req.body;

    await query(`
        UPDATE award
        SET award_participation_name = ?,
        award_name = ?,
        award_received = ?
        WHERE user_id = ? AND award_id = ?
    `, [awardAttendedName, awardName, awardReceived, userID, id]);
    res.status(200).end();
}

// DELETE
export async function clubUserRemove(req: Request, res: Response) {
    const { userID } = req.session;
    const { id } = req.params;
    const rows = await query("DELETE FROM club WHERE user_id = ? AND club_id = ?", [userID, id]);
    res.status(200).end();
}

export async function awardUserRemove(req: Request, res: Response) {
    const { userID } = req.session;
    const { id } = req.params;


    const { rows } = await query("DELETE FROM award WHERE user_id = ? AND award_id = ?", [userID, id]);
    res.status(200).end();
}