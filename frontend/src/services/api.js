import { mockErrorGroups } from "../mocks/errorGroups";

export function requestAISummary(errorGroupId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockErrorGroups[errorGroupId] = {
        id: errorGroupId,
        ai_summary: `Summary:
The service appears to be failing in a repeated execution path.

Possible root cause:
This may indicate unexpected or missing data during request handling.

Suggested next steps:
- Inspect recent code changes
- Add validation around critical inputs
- Improve logging near the failure point`,
      };

      resolve(mockErrorGroups[errorGroupId].ai_summary);
    }, 1200);
  });
}

export function getErrorGroup(errorGroupId) {
  return mockErrorGroups[errorGroupId] || null;
}
