export const mockErrorGroups = {
  1: {
    id: 1,
    ai_summary: null,
  },
  2: {
    id: 2,
    ai_summary: `Summary:
The payment service appears to be failing during the card charging step.

Possible root cause:
This might indicate insufficient balance handling or missing validation before charging.

Suggested next steps:
- Review payment validation logic
- Add defensive checks before charging
- Improve logging around payment failures`,
  },
};
