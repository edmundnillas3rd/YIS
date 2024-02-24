import MySQLStore from "express-mysql-session";
import mysql from "mysql2";

import { Pool, PoolOptions } from "mysql2/typings/mysql/lib/Pool";

let pool: Pool | null = null;

export const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

export async function query(sql: string, values: any[] = []) {
    try {
        const promisePool = await pool?.promise();
        const [rows, fields]: any = await promisePool?.execute(sql, values);

        return {
            rows,
            fields
        };
    } catch (err) {
        console.error(err);
    }

    return {
        rows: [],
        fields: []
    };

}

export default async function initializeMySQLConnection() {

    let options: PoolOptions = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        dateStrings: true
    };
    
    pool = mysql.createPool(options);

    pool?.getConnection((err, connection) => {
        if (err) {
            console.error(err);
        } else {
            console.log("[server]: MySQL Connected");
        }
        connection.release();
    });
}