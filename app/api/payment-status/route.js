import mercadopago from "mercadopago";

const publicToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_TESTE

mercadopago.configure({
    access_token: publicToken,
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json(
                { error: "Payment ID obrigatório" },
                { status: 400 }
            );
        }

        const payment = await mercadopago.payment.findById(id);

        return Response.json({
            id: payment.id,
            status: payment.status,
            status_detail: payment.status_detail,
            method: payment.payment_method_id,
            amount: payment.transaction_amount,
        });
    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}