import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function PUT(req: Request, { params }: { params: Promise<{ model: string; id: string }> }) {
    try {
        const p = await params;
        const model = p.model;
        const id = p.id;
        const pool = getDbPool();
        const body = await req.json();

        const keys = Object.keys(body);
        const setClause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ");
        const valuesList = Object.values(body);

        // add ID param at the end
        valuesList.push(id);
        const idIndex = valuesList.length;

        const result = await pool.query(
            `UPDATE ${model} SET ${setClause} WHERE id = $${idIndex} RETURNING *`,
            valuesList
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update', details: error }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ model: string; id: string }> }) {
    try {
        const p = await params;
        const model = p.model;
        const id = p.id;
        const pool = getDbPool();

        const result = await pool.query(`DELETE FROM ${model} WHERE id = $1 RETURNING *`, [id]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete', details: error }, { status: 500 });
    }
}
