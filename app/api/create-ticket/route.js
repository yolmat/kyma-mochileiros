import prisma from "@/lib/prisma";

export async function POST(req) {

    try {

        const body = await req.json()

        const res = await prisma.ticket.create({
            data: {
                name: body.ticket.name,
                email: body.ticket.email,
                phone: body.ticket.phone,
                document: body.ticket.document,
                transaction_amount: '0',
                payment_method_id: '0',
                id_payment: '0',
                status_payment: '0',
                birth: body.ticket.birth,
                cep: body.ticket.cep,
                street: body.ticket.street,
                number: body.ticket.number,
                district: body.ticket.district,
                city: body.ticket.city,
                rg: body.ticket.rg,
                useMedication: body.ticket.useMedication,
                healthProblem: body.ticket.healthProblem,
                foodRestriction: body.ticket.foodRestriction,
                paymentname: body.ticket.paymentname,
                paymentcpf: body.ticket.paymentcpf,
                acceptTheTerms: body.ticket.acceptTheTerms
            }
        })

        return Response.json(
            { data: res },
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

export async function PUT(req) {
    try {

        const body = await req.json()

        console.log(body)

        await prisma.ticket.update({

            where: {
                id: body.ticket.id
            },
            data: {
                name: body.ticket.name,
                phone: body.ticket.phone,
                transaction_amount: body.transaction_amount,
                payment_method_id: body.payment_method_id,
                id_payment: body.payment.id,
                status_payment: body.payment.status,
                birth: body.ticket.birth,
                cep: body.ticket.cep,
                street: body.ticket.street,
                number: body.ticket.number,
                district: body.ticket.district,
                city: body.ticket.city,
                rg: body.ticket.rg,
                useMedication: body.ticket.useMedication,
                healthProblem: body.ticket.healthProblem,
                foodRestriction: body.ticket.foodRestriction,
                paymentname: body.ticket.paymentname,
                paymentcpf: body.ticket.paymentcpf,
                acceptTheTerms: body.ticket.acceptTheTerms
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