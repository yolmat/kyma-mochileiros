const publicKey = process.env.NEXT_PUBLIC_KEY_TESTE
const valueTicket = process.env.NEXT_PUBLIC_VALUE_TICKET

export const initialization = {
    amount: valueTicket,
};

export const customization = {
    paymentMethods: {
        bankTransfer: "all",
        creditCard: "all",
    },
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