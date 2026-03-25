'use client'

import { Payment } from '@mercadopago/sdk-react';
import { useState } from "react";
import { initMercadoPago } from '@mercadopago/sdk-react'
import PaymentStatus from './payment'
import { v4 as uuidv4 } from "uuid";
import validationClient from '@/app/features/validations';

const idempotencyKey = uuidv4();

const publicKey = process.env.NEXT_PUBLIC_KEY_TESTE
const valueTicket = process.env.NEXT_PUBLIC_VALUE_TICKET

initMercadoPago(publicKey)

export default function MochileirosCheckout({ prevStep }) {

    const [dataPayment, setDataPayment] = useState(null);
    const [methodPayment, setMethodPayment] = useState(null);
    const [validation, setValidaton] = useState(false)

    const initialization = {
        amount: valueTicket,
    };

    const customization = {
        paymentMethods: {
            bankTransfer: "all",
            creditCard: "all",
            prepaidCard: "all",
        },
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        // callback chamado ao clicar no botão de submissão dos dados
        const dataLocalStorage = localStorage.getItem('checkout_v1')
        const userObj = JSON.parse(dataLocalStorage).formData

        const words = userObj.nome
        const separetor = words.trim().split(/\s+/)

        const firstName = separetor.at(0)
        const lastName = words.at(-1);

        const validationClientExist = await validationClient(userObj.cpf)

        if (validationClientExist === true) {
            setValidaton(true)
            return validation
        }

        const payloader = {
            transaction_amount: valueTicket,

            ...formData,

            description: "Ingresso Mochileiros 2.0 - Kyma",
            payer: {
                ...formData.payer,

                first_name: firstName,
                last_name: lastName,
            },
            ticket: {
                name: userObj.nome,
                email: userObj.email,
                phone: userObj.telefone,
                document: userObj.cpf
            },
            items: {
                id: "1",
                title: "28/08/2026 | Ingresso Evento mochileiros | Lote 1",
                description: "28/08/2026 | Ingresso para o evento mochileiros da Igreja do Evangelho Quadrangular Vila Dionisia e Vila Carolina",
                category_id: "Tickets",
                quantity: 1,
                unit_price: 1,
                event_date: "28-08-26-30-08-26T19:00:00.000-13:00"
            },
            external_reference: idempotencyKey
        }

        try {
            const res = await fetch("/api/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payloader),
            });

            const data = await res.json()

            const ticketBody = {
                ...payloader,
                payment: data,
            }

            if (data?.id) {

                console.log('criar usuario')

                await fetch('api/create-ticket', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ticketBody),
                })
            }

            if (formData.payment_method_id === "pix") {
                setMethodPayment(data); // salva QR code
                return {};
            }

            setDataPayment(ticketBody)

            return dataPayment;
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
                {(!dataPayment && !methodPayment && !validation) && (
                    <>
                        <Payment
                            initialization={initialization}
                            customization={customization}
                            onSubmit={onSubmit}
                            onReady={onReady}
                            onError={onError}
                        />
                        <button
                            type="button"
                            onClick={prevStep}
                            className="w-full bg-gray-600 p-2 rounded mt-2"
                        >
                            Voltar
                        </button>
                    </>
                )}

                {methodPayment && (
                    <div className='flex flex-col items-center'>
                        <h2>Pagamento via PIX</h2>

                        {/* QR CODE */}
                        <img
                            src={`data:image/png;base64,${methodPayment.qr_code_base64}`}
                            alt="QR Code PIX"
                            style={{ width: 250, margin: "20px 0" }}
                        />

                        {/* COPIA E COLA */}
                        <textarea
                            className='bg-gray-700 p-1 '
                            value={methodPayment.qr_code}
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

                        <p>Status: {methodPayment.status}</p>
                    </div>
                )}

                {dataPayment && (
                    <PaymentStatus

                        amount={dataPayment.transaction_amount}
                        method={dataPayment.payment_method_id}
                        description={dataPayment.description}
                        paymentId={dataPayment.payment.id}
                        status={dataPayment.payment.status}

                    />
                )}

                {validation && (
                    <h1>Usuario já criado</h1>
                )}
            </div>
        </div>
    );
}