export function buildErrorSummaryPrompt({
  service,
  errorSignature,
  count,
  sampleLogs,
}) {
  return `
You are an assistant helping developers analyze application errors.

You are given a group of similar error logs that are believed to have the same root cause.

Your task is to produce a short, clear summary with:
1. What appears to be failing
2. Possible root cause(s)
3. Suggested next steps

Guidelines:
- Do NOT claim certainty
- Use cautious language such as "may", "might", "could indicate"
- Do NOT invent facts not present in the logs
- Keep the output concise and readable by humans

Error context:
- Service: ${service}
- Error signature: ${errorSignature}
- Occurrence count: ${count}

Sample logs:
${sampleLogs.join("\n\n")}
`;
}
