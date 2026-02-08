import pool from "../config/db.js";

export async function getErrorGroupById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM error_groups WHERE id = $1`,
    [id],
  );
  return rows[0];
}

/**
 * Fetch recent sample logs for an error group
 * Used for AI context
 */
export async function getSampleLogs(errorGroupId, limit = 3) {
  const { rows } = await pool.query(
    `
    SELECT message, stacktrace
    FROM logs
    WHERE error_group_id = $1
    ORDER BY timestamp DESC
    LIMIT $2
    `,
    [errorGroupId, limit],
  );

  return rows.map((l) => `${l.message}\n${l.stacktrace || ""}`);
}

export async function saveAISummary(groupId, summary) {
  await pool.query(
    `
    UPDATE error_groups
    SET ai_summary = $1
    WHERE id = $2
    `,
    [summary, groupId],
  );
}

/**
 * Insert or update an error group and RETURN its id
 */
export async function upsertErrorGroup(service, errorSignature) {
  const query = `
    INSERT INTO error_groups
      (service, error_signature, count, first_seen, last_seen)
    VALUES ($1, $2, 1, NOW(), NOW())
    ON CONFLICT (service, error_signature)
    DO UPDATE SET
      count = error_groups.count + 1,
      last_seen = NOW()
    RETURNING id;
  `;

  const { rows } = await pool.query(query, [service, errorSignature]);

  return rows[0]; // { id }
}