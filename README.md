# Log Analyzer (MVP)

A minimal log analysis system with deterministic error grouping and on-demand AI summaries.

## Overview
- Stores logs from multiple services
- Groups recurring ERROR logs deterministically
- Generates AI summaries only when requested

## Design
- INFO / WARN → stored as logs
- ERROR → grouped into error groups
- AI explains error groups, not individual logs

## Architecture
Client Services
      |
      |  POST /logs
      v
Express API
      |
      |  insert / group
      v
PostgreSQL
  ├─ logs (all events)
  └─ error_groups (recurring errors)
      |
      |  POST /error-groups/:id/summarize
      v
AI Summary Generator

## Stack
- Backend: Node.js, Express
- Database: PostgreSQL
- Frontend: React (mock data)

## Status
MVP complete.