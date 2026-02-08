import express from "express";
import { generateSummary } from "../controllers/errorGroups.controller.js";

const router = express.Router();

router.post("/:id/summarize", generateSummary);

export default router;