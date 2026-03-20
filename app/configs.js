export const initialization = {
    amount: 100,
    preferenceId: "<PREFERENCE_ID>",
};
export const customization = {
    paymentMethods: {
        ticket: "all",
        bankTransfer: "all",
        creditCard: "all",
        prepaidCard: "all",
    },
};
export const onSubmit = async (
    { selectedPaymentMethod, formData }
) => {
    // callback chamado ao clicar no botão de submissão dos dados

    console.log('Cheguei')

    console.log("data", formData)

    try {
        const res = await fetch("/api/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    transaction_amount: 100.00,

                    ...formData,

                    description: "Ingresso Mochileiros 2.0 - Kyma",
                    payer: {
                        ...(formData.payer || {}),

                        first_name: "Mateus",
                        last_name: "Saraiva",

                        identification: {
                            type: "CPF",
                            number: "12345678909",
                        },
                    },
                }),
        });

        const data = await res.json();

        if (formData.payment_method_id === "pix") {
            setPixData(data); // salva QR code
            return {};
        }
        return data;
    } catch (error) {
        console.error(error);
    }
};
export const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.error(error);
};
export const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
};