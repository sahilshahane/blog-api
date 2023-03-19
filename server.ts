import "dotenv/config";
import express from "express";
import { route as APIv1Route } from "@/api/v1";
import { APIErrorHandler } from "@/middleware/APIErrorHandler";
import { dbConnect } from "@/database/connect";
import { morganMiddleware } from "@/middleware/morganHandler";
import { logger } from "@/libs/logger";
import cors from "cors";

logger.info(`NODE_ENV = ${process.env.NODE_ENV}`);

const PORT = process.env.PORT;

if (!PORT) throw new Error("Please add PORT in your .env config");

const app = express();

app.use(cors());
app.use(morganMiddleware);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/api/v1", APIv1Route);

app.use(APIErrorHandler);

app.get("/", (req, res) => {
  res.send("Server is running, send requests to /api/v1/ path");
});

dbConnect()
  .then(() => logger.info("Connected to MongoDB"))
  .then(() =>
    app.listen(PORT, () => {
      logger.info(`Server Started at http://localhost:${PORT}`);
    })
  )
  .catch((err) => logger.error("Something went wrong :", err));
