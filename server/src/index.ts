import express, { Express } from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

import initializeDB from "./services/mysqldb";
import userRoute from "./routes/userRoute";
import solicitationRoute from "./routes/solicitationRoute";

const main = async () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }));

    app.use(
        session({
            secret: process.env.SECRET as string,
            resave: false,
            saveUninitialized: false
        })
    );

    await initializeDB();

    app.use("/users", userRoute);
    app.use("/solicitation", solicitationRoute);

    app.listen(process.env.PORT || 3000, () => {
        console.info(`[server]: Listening on port ${process.env.PORT}`);
    });
};

main().catch(error => console.error(error));