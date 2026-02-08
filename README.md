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
+------------------+
|  Services / Apps |
+------------------+
          |
          |  HTTP logs
          v
+------------------+
|   REST API       |
|  (Express.js)    |
+------------------+
          |
          |  store & query
          v
+------------------+
|   PostgreSQL     |
|                  |
|  logs            |
|  error_groups    |
+------------------+
          |
          |  on-demand
          v
+------------------+
|   AI Summary     |
| (per error group)|
+------------------+

## Stack
- Backend: Node.js, Express
- Database: PostgreSQL
- Frontend: React (mock data)

## Status
MVP complete.