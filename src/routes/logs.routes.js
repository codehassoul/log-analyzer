import express from "express";
import { ingestLog } from "../controllers/logs.controller.js";

const router = express.Router();

router.post("/", ingestLog);

export default router;