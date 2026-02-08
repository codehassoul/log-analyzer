import { validateLog } from "../validators/log.validator.js";
import { insertLog } from "../repositories/logs.repo.js";
import { upsertErrorGroup } from "../repositories/errorGroups.repo.js";
import { generateErrorSignature } from "../utils/errorSignature.js";

export async function createLog(data) {
  validateLog(data);

  let errorGroupId = null;

  if (data.level === "ERROR") {
    const errorSignature = generateErrorSignature(
      data.message,
      data.stacktrace,
    );

    // upsertErrorGroup MUST return the group id
    const errorGroup = await upsertErrorGroup(data.service, errorSignature);

    errorGroupId = errorGroup.id;
  }

  await insertLog({
    timestamp: data.timestamp,
    level: data.level,
    service: data.service,
    message: data.message,
    stacktrace: data.stacktrace,
    error_group_id: errorGroupId,
  });
}