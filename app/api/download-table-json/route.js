// app/api/tickets/download/route.js

import prisma from "@/lib/prisma"

export async function GET() {
    const tickets = await prisma.ticket.findMany()

    if (!tickets.length) {
        return new Response(
            JSON.stringify({ error: 'Nenhum registro encontrado' }),
            {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }

    const now = new Date()

    const date = now
        .toISOString()
        .replace(/:/g, '-')
        .replace(/\..+/, '')

    const fileName = `tickets(${date}).json`

    return new Response(JSON.stringify(tickets, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Disposition': `attachment; filename='${fileName}'`,
        },
    })
}