import { Request, Response } from "express";
import { query } from "../services/mysqldb";

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
        SELECT club_organization.club_organization_id as club_id, club_organization.club_organization_name as organization, club_position.club_position_name as position, club.club_started as 'Year Started', club.club_ended as 'Year Ended' FROM user
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
        SELECT club_position.club_position_name, club.club_started, club.club_ended FROM club
        INNER JOIN club_position
        ON club.club_position_id = club_position.club_position_id
        WHERE club.user_id = ? AND club.club_organization_id = ?
    `, [userID, clubID])

    res.status(200).json({
        userClubPositions: rows
    })
}

export async function clubUserAdd(req: Request, res: Response) {
    const { userID } = req.session;
    const { club } = req.body;

    // find if user already is in a club
    const foundClub = await query(`
        SELECT user.user_id FROM user
        INNER JOIN club
        ON user.user_id = club.user_id
        WHERE user.user_id = ? AND club.club_organization_id = ?
    `, [userID, club]);

    if (foundClub.rows.length > 0) {
        return res.status(400).json({ error: "Entry already exist!" });
    }

    const ClubUUID = await query("SELECT UUID()");
    const { rows } = await query("INSERT INTO club VALUES (?, ?, ?)", [
        ClubUUID.rows[0]['UUID()'],
        userID,
        club,
    ]);

    res.status(200).end();
}

export async function clubUserPositionAdd(req: Request, res: Response) {
    const { userID } = req.session;
    const { club, position, yearStarted, yearEnded } = req.body;

    const clubOrganizationRow = await query("SELECT club_organization.club_organization_id as club FROM club_organization WHERE club_organization.club_organization_name = ?", [club]);
    const clubOrganizationID = clubOrganizationRow.rows[0].club;

    const foundClubBelongTo = await query(`
        SELECT club_position.club_position_id, club_position.club_position_name, user.user_id , CONCAT(user.user_first_name, " ", user.user_family_name, " ", user.user_middle_name) as full_name FROM user
        INNER JOIN club
        ON user.user_id = club.user_id
        INNER JOIN club_position
        ON club.club_position_id = club_position.club_position_id
        WHERE user.user_id = ? AND club.club_organization_id = ?;
    `, [userID, clubOrganizationID]);


    if (foundClubBelongTo.rows.length > 0) {
        return res.status(400).json({ error: "Another entry already exist "});
    }


}