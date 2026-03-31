// app/api/tickets/download/route.js

import prisma from "@/lib/prisma"

export async function GET() {
    const tickets = await prisma.ticket.findMany()

    if (!tickets.length) {
        return new Response('Nenhum registro encontrado', { status: 404 })
    }

    const headers = Object.keys(tickets[0]).join(',')

    const rows = tickets.map((ticket) =>
        Object.values(ticket)
            .map((value) => {
                const text = value == null ? '' : String(value)
                return `"${text.replace(/"/g, '""')}"`
            })
            .join(',')
    )

    const csv = [headers, ...rows].join('\n')

    const now = new Date()

    const date = now
        .toISOString()
        .replace(/:/g, '-')
        .replace(/\..+/, '')

    const fileName = `tickets(${date}).csv`

    return new Response(csv, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        },
    })
}