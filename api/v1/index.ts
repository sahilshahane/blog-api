import "dotenv/config";
import express from "express";
import { route as PriavteAPIRoute } from "@/api/v1/private";
import { route as PublicAPIRoute } from "@/api/v1/public";

export const route = express.Router();

route.use("/", PublicAPIRoute);
route.use("/", PriavteAPIRoute);
