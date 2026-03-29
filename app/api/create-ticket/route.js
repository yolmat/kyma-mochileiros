import prisma from "@/lib/prisma";

export async function POST(req) {

    try {

        const body = await req.json()

        await prisma.ticket.create({
            data: {
                name: body.ticket.name,
                email: body.ticket.email,
                phone: body.ticket.phone,
                document: body.ticket.document,
                transaction_amount: body.transaction_amount,
                payment_method_id: body.payment_method_id,
                id_payment: body.payment.id,
                status_payment: body.payment.status
            }
        })

        return Response.json(
            { success: true },
            { status: 200 },
        );
    } catch (e) {
        return Response.json(
            { error: e },
            { status: 400 },
        );
    }
}