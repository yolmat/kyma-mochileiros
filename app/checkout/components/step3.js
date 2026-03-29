
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialization, customization, onReady, onError } from '@/app/features/configPayment';
import Button from './button';

const publicKey = process.env.NEXT_PUBLIC_KEY_TESTE
const valueTicket = process.env.NEXT_PUBLIC_VALUE_TICKET

initMercadoPago(publicKey)

export default function Steap3({ prevStep, setStatus, setStep }) {
    // =========================
    // Mercado Pago Submit
    // =========================

    const [dataPayment, setDataPayment] = useState(null);
    const [methodPayment, setMethodPayment] = useState(null);

    const onSubmit = async ({ selectedPaymentMethod, formData }) => {

        const idempotencyKey = uuidv4();

        const dataLocalStorage = localStorage.getItem('checkout_v2')
        const dataUser = JSON.parse(dataLocalStorage)

        const nameUser = dataUser.name
        const separetor = nameUser.trim().split(/\s+/)

        const firstNameUser = separetor.at(0)
        const lastNameUser = nameUser.trim().split(/\s+/).at(-1);

        const payloader = {
            transaction_amount: valueTicket,

            ...formData,

            description: "Ingresso Mochileiros 2.0 - Kyma",
            payer: {
                ...formData.payer,

                first_name: firstNameUser,
                last_name: lastNameUser,
                identification: {
                    type: 'CPF',
                    number: dataUser.cpf.replace(/\D/g, "")
                }
            },
            ticket: {
                name: dataUser.name,
                email: dataUser.email,
                phone: dataUser.phone,
                document: dataUser.cpf,
            },
            items: [
                {
                    id: "1",
                    title: "28/08/2026 | Ingresso Evento mochileiros | Lote 1",
                    description: "28/08/2026 | Ingresso para o evento mochileiros da Igreja do Evangelho Quadrangular Vila Dionisia e Vila Carolina",
                    category_id: "Tickets",
                    quantity: 1,
                    unit_price: 1,
                    event_date: "28-08-26-30-08-26T19:00:00.000-13:00",
                }
            ],
            external_reference: idempotencyKey,
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

                await fetch('api/create-ticket', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ticketBody),
                })
            }

            if (formData.payment_method_id === "pix") {
                setDataPayment(data);

                return console.log(data);
            }

            setStep((prev) => prev + 1)
            return setStatus(data.status);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
            <Button
                type={'button'}
                onClick={prevStep}
                extraClass={'opacity-100 cursor-pointer hover:opacity-90 active:opacity-80'}
            >
                Voltar
            </Button>
        </>
    )
}