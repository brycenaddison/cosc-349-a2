import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { cognito } from "./auth";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/", cognito, (req, res) => {
      return res.status(200).send(res.locals.payload);
    })
    .post("/", cognito, (req, res) => {
      return res.locals.payload;
    })
    .get("/status", (_, res) => {
      return res.status(200).json({ ok: true });
    });

  return app;
};
