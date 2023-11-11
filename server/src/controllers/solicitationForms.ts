import { Request, Response } from "express";

import { query } from "../services/mysqldb";

export async function index(req: Request, res: Response) {
    const sql = "SELECT * FROM solicitation_form";
    const { rows } = await query(sql);

    res.status(200).json({
        rows
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
    const CareOfValues = Object.values(careOf)
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