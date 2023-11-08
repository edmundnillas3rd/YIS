import express, { Express, Request, Response } from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

const main = async () => {

    let db = null;

    if (process.env.NODE_ENV !== "production") {
        db = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }

    db?.connect((err) => {
        if (err) {
            console.error(err);
        }

        console.log("[server]: MySQL Connected");
    });

    app.listen(process.env.PORT || 3000, () => {
        console.info(`[server]: Listening on port ${process.env.PORT}`);
    });
};

main().catch(error => console.error(error));