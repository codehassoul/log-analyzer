import { summarizeErrorGroup } from "../services/errorSummary.service.js";

export async function generateSummary(req, res, next) {
  try {
    const summary = await summarizeErrorGroup(req.params.id);
    res.json({ summary });
  } catch (err) {
    next(err);
  }
}
