import { Pool } from 'pg';

let pool: Pool | undefined;

export function getDbPool() {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;
        pool = new Pool({
            connectionString,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    return pool;
}
