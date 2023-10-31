import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

const main = async () => {
    app.listen(process.env.PORT || 3000, () => {
        console.info(`[server]: Listening on port ${process.env.PORT}`)
    });
};

main().catch(error => console.error(error));