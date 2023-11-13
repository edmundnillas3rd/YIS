import express, { Express } from "express";
import session from "express-session";
import expressMySqlSession from "express-mysql-session";
import cookieParser from "cookie-parser";
import { MemoryStore } from "express-session";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

import initializeDB from "./services/mysqldb";
import userRoute from "./routes/userRoute";
import solicitationRoute from "./routes/solicitationRoute";
import clubRoute from "./routes/clubRoute";
import { config } from "./services/mysqldb";

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
                maxAge: 600000
            },
            resave: false,
            saveUninitialized: false
        })
    );

    app.use("/users", userRoute);
    app.use("/solicitation", solicitationRoute);
    app.use("/clubs", clubRoute);

    app.listen(process.env.PORT || 3000, () => {
        console.info(`[server]: Listening on port ${process.env.PORT}`);
    });
};

main().catch(error => console.error(error));