export const runtime = "nodejs";

import { MercadoPagoConfig, Payment } from "mercadopago";
import { z } from "zod";


const publicToken = process.env.ACCESS_TOKEN_TESTE

const schema = z.object({
    transaction_amount: z.number(),
    description: z.string(),
    payment_method_id: z.string(),
    payer: z.object({
        email: z.string().email(),
        first_name: z.string(),
        last_name: z.string(),
        identification: z.object({
            type: z.string(),
            number: z.string(),
        }),
    }),
    token: z.string().optional(),
    installments: z.number().optional(),
});

export async function POST(req) {

    try {
        const body = await req.json();

        const data = schema.parse(body);

        const client = new MercadoPagoConfig({ accessToken: publicToken, options: { timeout: 10000 } });

        const payment = new Payment(client);

        const newPayment = await payment.create({
            body: data,
            requestOptions: {
                idempotencyKey: body.external_reference,
            },
        });

        return Response.json({

            id: newPayment.id,
            status: newPayment.status,

            qr_code:
                newPayment.point_of_interaction?.transaction_data?.qr_code,
            qr_code_base64:
                newPayment.point_of_interaction?.transaction_data?.qr_code_base64,
        });
    } catch (error) {

        return Response.json(
            { error: error.message },
            { status: 400 },
            { body: req.body }
        );
    }
}