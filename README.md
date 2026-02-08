# AI Log Analyzer (MVP)

A minimal log analysis system that stores logs, groups recurring `ERROR` events deterministically, and generates on-demand AI summaries.

## Overview
- Stores logs from multiple services
- Groups recurring `ERROR` logs deterministically
- Generates AI summaries only when requested

## Design
- `INFO` / `WARN` → stored as logs
- `ERROR` → grouped into error groups
- AI explains error groups, not individual logs

## Architecture
```text
Client Services
   |
   | POST /logs
   v
Express API (src/server.js)
   |-- insert / group --> PostgreSQL
   |       ├─ logs (all events)
   |       └─ error_groups (recurring errors)
   |
   | POST /error-groups/:id/summarize
   v
AI Summary Generator (src/ai/aiClient.js)
```

## Stack
- Backend: Node.js, Express
- Database: PostgreSQL
- Frontend: React (mock data)

## Status
MVP complete.
