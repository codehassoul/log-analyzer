import {
  getErrorGroupById,
  getSampleLogs,
  saveAISummary,
} from "../repositories/errorGroups.repo.js";

import { buildErrorSummaryPrompt } from "../ai/prompts/errorSummary.prompt.js";
import { generateSummary } from "../ai/aiClient.js";

export async function summarizeErrorGroup(groupId) {
  const group = await getErrorGroupById(groupId);

  if (!group) {
    throw new Error("Error group not found");
  }

  // IMPORTANT: fetch samples by error_group_id
  const sampleLogs = await getSampleLogs(groupId);

  const prompt = buildErrorSummaryPrompt({
    service: group.service,
    errorSignature: group.error_signature,
    count: group.count,
    sampleLogs,
  });

  const summary = await generateSummary(prompt);

  await saveAISummary(groupId, summary);

  return summary;
}