const LEVELS = ["INFO", "WARN", "ERROR"];

export function validateLog(log) {
  if (!log.timestamp || !log.level || !log.service || !log.message) {
    throw new Error("Missing required fields");
  }

  if (!LEVELS.includes(log.level)) {
    throw new Error("Invalid log level");
  }

  if (isNaN(new Date(log.timestamp))) {
    throw new Error("Invalid timestamp");
  }
}
