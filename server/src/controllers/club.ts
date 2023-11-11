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
    const { id } = req.params;

    const { rows } = await query(`
        SELECT club_organization.club_organization_name as organization, club_position.club_position_name as position, YEAR(club.club_started) as 'Year Started', YEAR(club.club_ended) as 'Year Ended' FROM user
        INNER JOIN club
        ON club.user_id = user.user_id
        INNER JOIN club_organization
        ON club.club_organization_id = club_organization.club_organization_id
        INNER JOIN club_position
        ON club.club_position_id = club_position.club_position_id
        WHERE user.user_id = ?;
    `, [id]);

    res.status(200).json({
        rows
    });
}