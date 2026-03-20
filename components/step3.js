'use client'

import { Payment } from '@mercadopago/sdk-react';
import { useState } from "react";
//import { initialization, customization, onSubmit, onError, onReady } from '../app/configs'
import { initMercadoPago } from '@mercadopago/sdk-react'

const publicKey = process.env.NEXT_PUBLIC_KEY_TESTE

initMercadoPago(publicKey)

export default function MochileirosCheckout({ prevStep }) {

    const [pixData, setPixData] = useState(null);

    const initialization = {
        amount: 100,
        preferenceId: "<PREFERENCE_ID>",
    };
    const customization = {
        paymentMethods: {
            ticket: "all",
            bankTransfer: "all",
            creditCard: "all",
            prepaidCard: "all",
        },
    };
    const onSubmit = async (
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
    const onError = async (error) => {
        // callback chamado para todos os casos de erro do Brick
        console.error(error);
    };
    const onReady = async () => {
        /*
          Callback chamado quando o Brick estiver pronto.
          Aqui você pode ocultar loadings do seu site, por exemplo.
        */
    };

    const copiarPix = () => {
        navigator.clipboard.writeText(pixData.qr_code);
        alert("Código PIX copiado!");
    };

    return (
        <div className="flex flex-col gap-2">
            <div className='w-full'>
                {!pixData && (
                    <>
                        <Payment
                            initialization={initialization}
                            customization={customization}
                            onSubmit={onSubmit}
                            onReady={onReady}
                            onError={onError}
                        />
                    </>
                )}

                {pixData && (
                    <div className='flex flex-col items-center'>
                        <h2>Pagamento via PIX</h2>

                        {/* QR CODE */}
                        <img
                            src={`data:image/png;base64,${pixData.qr_code_base64}`}
                            alt="QR Code PIX"
                            style={{ width: 250, margin: "20px 0" }}
                        />

                        {/* COPIA E COLA */}
                        <textarea
                            className='bg-gray-700 p-1 '
                            value={pixData.qr_code}
                            readOnly
                            style={{
                                width: "100%",
                                height: 100,
                                marginBottom: 10,
                            }}
                        />

                        <button className='bg-green-900 p-1 w-full rounded-2xl' onClick={copiarPix}>
                            Copiar código PIX
                        </button>

                        <p>Status: {pixData.status}</p>
                    </div>
                )}

            </div>
            <button
                type="button"
                onClick={prevStep}
                className="w-full bg-gray-600 p-2 rounded"
            >
                Voltar
            </button>
        </div>



    );
}

