import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export default pool;
