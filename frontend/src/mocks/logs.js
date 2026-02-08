export const mockLogs = [
  {
    id: 1,
    timestamp: "2026-02-07T15:45:30Z",
    level: "ERROR",
    service: "auth-service",
    message: "Crash in login flow",
    stacktrace: `TypeError: Cannot read property 'id' of undefined
at login (auth.js:42:13)
at handleRequest (server.js:88:5)`,
    errorGroupId: 1,
  },
  {
    id: 2,
    timestamp: "2026-02-07T15:46:00Z",
    level: "WARN",
    service: "auth-service",
    message: "Slow response detected",
    stacktrace: null,
    errorGroupId: null,
  },
  {
    id: 3,
    timestamp: "2026-02-07T15:47:10Z",
    level: "INFO",
    service: "payment-service",
    message: "Payment initiated",
    stacktrace: null,
    errorGroupId: null,
  },
  {
    id: 4,
    timestamp: "2026-02-07T15:48:55Z",
    level: "ERROR",
    service: "payment-service",
    message: "Failed to charge card",
    stacktrace: `Error: Insufficient funds
at chargeCard (payment.js:21:7)
at processPayment (checkout.js:54:3)`,
    errorGroupId: 2,
  },
];
