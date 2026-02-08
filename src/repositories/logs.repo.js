import pool from "../config/db.js";

export async function insertLog(log) {
  const query = `
    INSERT INTO logs
      (timestamp, level, service, message, stacktrace, error_group_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  await pool.query(query, [
    new Date(log.timestamp),
    log.level,
    log.service,
    log.message,
    log.stacktrace || null,
    log.error_group_id || null,
  ]);
}