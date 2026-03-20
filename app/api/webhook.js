import mercadopago from "mercadopago";

const publicToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_TESTE

mercadopago.configure({
    access_token: publicToken,
});

export default async function handler(req, res) {
    try {
        const { type, data } = req.body;

        if (type === "payment") {
            const payment = await mercadopago.payment.findById(data.id);

            // 👉 Aqui você atualiza seu banco
            console.log("STATUS:", payment.body.status);

            /**
             * approved → pago
             * pending → aguardando
             * rejected → recusado
             */
        }

        res.status(200).send("OK");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}