import { createLog } from "../services/logs.service.js";

export async function ingestLog(req, res, next) {
  try {
    await createLog(req.body);
    res.status(201).json({ status: "ok" });
  } catch (err) {
    next(err);
  }
}
