import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { cognito } from "./auth";
import pg from "./pg";
import { initialMessage } from "./config.json";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/", cognito, async (req, res) => {
      const username = res.locals.payload.username;
      try {
        const query = await pg.query("select text from notes where uid = $1", [
          username,
        ]);

        const result = query.rows[0].text ?? initialMessage;

        return res.status(200).send(result);
      } catch (e) {
        console.error(e);

        return res.status(500).send({ message: e });
      }
    })
    .post("/", cognito, async (req, res) => {
      const username = res.locals.payload.username;

      const text = req.body.text;

      try {
        const query = await pg.query(
          "insert into notes (uid, text) values ($1, $2) on conflict (uid) do update set text = $2, modified_at = default returning cast(extract(epoch from modified_at) as integer) modified_at",
          [username, text]
        );
        return res.status(200).send({ timestamp: query.rows[0].modified_at });
      } catch (e) {
        console.error(e);

        return res.status(500).send({ message: e });
      }
    })
    .get("/status", (_, res) => {
      return res.status(200).json({ ok: true });
    });

  return app;
};
