import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ model: string }> }) {
    try {
        const p = await params;
        const model = p.model;
        const pool = getDbPool();
        const result = await pool.query(`SELECT * FROM ${model} ORDER BY "createdAt" DESC`);
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch', details: error }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ model: string }> }) {
    try {
        const p = await params;
        const model = p.model;
        const pool = getDbPool();
        const body = await req.json();

        const keys = Object.keys(body).map(k => `"${k}"`).join(", ");
        const valuesList = Object.values(body);
        const placeholders = valuesList.map((_, i) => `$${i + 1}`).join(", ");

        const result = await pool.query(`INSERT INTO ${model} (${keys}) VALUES (${placeholders}) RETURNING *`, valuesList);
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create', details: error }, { status: 500 });
    }
}
