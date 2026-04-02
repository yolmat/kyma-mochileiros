import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const tickets = await prisma.ticket.findMany()

        return Response.json(
            {
                success: true,
                total: tickets.length,
                data: tickets
            },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)

        return Response.json(
            {
                success: false,
                message: "Erro ao buscar tickets"
            },
            { status: 500 }
        )
    }
}