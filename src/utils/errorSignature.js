export function generateErrorSignature(message, stacktrace) {
  if (!stacktrace) {
    return message.split("\n")[0];
  }

  const lines = stacktrace.split("\n");

  const errorType = lines[0].split(":")[0];

  const frames = lines
    .slice(1)
    .map((line) =>
      line
        .replace(/\(.*[\\/]/, "(")
        .replace(/:\d+:\d+\)/, ")")
        .trim(),
    )
    .slice(0, 3);

  return `${errorType}|${frames.join(">")}`;
}
