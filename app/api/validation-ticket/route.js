import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json()

        const ticket = await prisma.ticket.findUnique({
            where: {
                document: body.cpf
            },
        });

        if (!ticket) {
            return Response.json(
                {
                    success: false,
                    message: "CPF não encontrado",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "CPF encontrado",
                data: ticket,
            },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);

        return Response.json(
            {
                success: false,
                message: "Erro ao consultar CPF",
            },
            { status: 500 }
        );
    }
}