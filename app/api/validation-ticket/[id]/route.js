import prisma from "@/lib/prisma";

export async function GET(req, { params }) {

    const { id } = await params

    try {
        const client = await prisma.ticket.findFirst({
            where: {
                document: id
            }
        })

        // Não encontrado
        if (!client) {
            return Response.json({ document: false })
        }

        // Encontrado
        return Response.json({ document: true })

    } catch (e) {
        return Response.json({ error: e })
    }
}