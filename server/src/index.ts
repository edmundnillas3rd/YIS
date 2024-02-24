import express, { Express } from "express";
import https from "https";
import session from "express-session";
import expressMySqlSession from "express-mysql-session";
import cookieParser from "cookie-parser";
import { MemoryStore } from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app: Express = express();

import initializeDB from "./services/mysqldb";
import userRoute from "./routes/userRoute";
import solicitationRoute from "./routes/solicitationRoute";
import courseRoute from "./routes/courseRoute";
import clubRoute from "./routes/clubRoute";
import yearbookRoute from "./routes/yearbookRoute";
import { config } from "./services/mysqldb";
import adminRoute from "./routes/adminRoute";

declare module 'express-session' {
    export interface SessionData {
        [key: string]: any;
    }
}

const main = async () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }));

    await initializeDB();
    const MySQLStore = expressMySqlSession(session as any);
    const sessionStore = (process.env.NODE_ENV === "production" ? new MySQLStore(config) : new MemoryStore());

    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.SECRET as string,
            store: sessionStore,
            cookie: {
                secure: true,
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
                maxAge: 2 * 60 * 60 * 1000
            },
            resave: false,
            saveUninitialized: false
        })
    );

    app.use("/users", userRoute);
    app.use("/solicitation", solicitationRoute);
    app.use("/courses", courseRoute);
    app.use("/clubs", clubRoute);
    app.use("/yearbooks", yearbookRoute);
    app.use("/admin", adminRoute);

    https
        .createServer(
            {
                key: fs.readFileSync("server.key"),
                cert: fs.readFileSync("server.cert"),
            },
            app
        ).listen(process.env.PORT || 3000, function () {
            console.info(`[server]: Listening on port ${process.env.PORT}`);
        });

    // app.listen(process.env.PORT || 3000, () => {
    //     console.info(`[server]: Listening on port ${process.env.PORT}`);
    // });
};

main().catch(error => console.error(error));