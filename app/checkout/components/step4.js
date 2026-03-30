'use client'

import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialization, customization, onReady, onError } from '@/app/features/configPayment';
import Button from './button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createInputStyle } from "@/app/features/createInputStyle";

const publicKey = process.env.NEXT_PUBLIC_KEY_TESTE
const valueTicket = process.env.NEXT_PUBLIC_VALUE_TICKET

initMercadoPago(publicKey)

export default function Steap4({ prevStep, setStatus, setStep, register, errors, watch, setValue }) {

    /*const [aataUserPayment, setDataUserPayment] = useState()
    const [dataCpfPayment, setDataCpfPayment] = useState()

    const userPayment = (e) => {
        const nameDataPayment = e.target.value

        setDataUserPayment(nameDataPayment)
    }

    const cpfPayment = (e) => {
        const cpfDataPayment = e.target.value

        setDataCpfPayment(cpfDataPayment)
    }*/

    const maskCPF = (value) => {
        const cleaned = value
            .replace(/\D/g, "")
            .slice(0, 11);

        return cleaned
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const inputStyle = createInputStyle(errors)

    // =========================
    // Mercado Pago Submit
    // =========================

    const [methodPayment, setMethodPayment] = useState(null);
    const [copied, setCopied] = useState(false);

    const onSubmit = async ({ selectedPaymentMethod, formData }) => {

        const idempotencyKey = uuidv4();

        const dataLocalStorage = localStorage.getItem('checkout_v2')
        const dataUser = JSON.parse(dataLocalStorage)

        const nameUser = dataUser.paymentname
        const separetor = nameUser.trim().split(/\s+/)

        const firstNameUser = separetor.at(0)
        const lastNameUser = nameUser.trim().split(/\s+/).at(-1);

        console.log(nameUser)
        console.log(dataUser.paymentcpf.replace(/\D/g, ""))

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
                    number: dataUser.paymentcpf.replace(/\D/g, "")
                }
            },
            ticket: {
                name: dataUser.name,
                email: dataUser.email,
                phone: dataUser.phone,
                document: dataUser.cpf,
                birth: dataUser.birth,
                cep: dataUser.cep,
                city: dataUser.city,
                district: dataUser.district,
                state: dataUser.state,
                street: dataUser.street
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
                setMethodPayment(data);

                return methodPayment;
            }

            setStatus(ticketBody)

            setStep((prev) => prev + 1)
            return;

        } catch (e) {
            console.error(e);
        }
    }

    const handleCopy = async (e) => {

        e.preventDefault();

        try {
            await navigator.clipboard.writeText(methodPayment.qr_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <>
            {(true) && (
                <motion.div key="step4" className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome completo do Pagador:
                        </label>
                        <input
                            {...register("paymentname")}
                            name="paymentname"
                            placeholder="Bruna Rodrigues Ferreira"

                            className={inputStyle("paymentname")}
                        />
                        {errors.name && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="
                            flex items-center gap-2 mt-2 px-3 py-2
                            rounded-lg
                            bg-red-500/10
                            text-red-500 text-sm"
                            >
                                <span className="text-red-500">⚠</span>
                                <span>{errors.name.message}</span>
                            </motion.div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            CPF do Pagador:
                        </label>
                        <input
                            {...register("paymentcpf")}
                            name="paymentcpf"
                            placeholder="000.000.000-00"
                            onChange={async (e) => {
                                await cpfPayment(e);
                                setValue("paymentcpf", maskCPF(e.target.value), { shouldValidate: true })
                            }}
                            className={inputStyle("paymentcpf")}
                        />
                        {errors.cpf && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="
                                        flex items-center gap-2 mt-2 px-3 py-2
                                        rounded-lg
                                        bg-red-500/10
                                        text-red-500 text-sm"
                            >
                                <span className="text-red-500">⚠</span>
                                <span>{errors.cpf.message}</span>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
            {methodPayment && (
                <div className="flex flex-col items-center text-center gap-6">

                    {/* Título */}
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Pagamento via PIX
                    </h2>

                    {/* QR Code */}
                    <div className="p-4 bg-white rounded-2xl shadow-lg shadow-black/20">
                        <img
                            src={`data:image/png;base64,${methodPayment.qr_code_base64}`}
                            alt="QR Code PIX"
                            className="w-52 h-52 object-contain"
                        />
                    </div>

                    {/* Código PIX */}
                    <div className="w-full">
                        <textarea
                            readOnly
                            value={methodPayment.qr_code}
                            className="
                                        w-full p-3 rounded-xl border text-sm resize-none
                                        bg-gray-50 dark:bg-gray-700
                                        text-gray-800 dark:text-white
                                        border-gray-300 dark:border-gray-600"
                            rows={4}
                        />

                        {/* Botão copiar */}
                        <div className='flex gap-5'>
                            <button
                                type={'button'}
                                onClick={handleCopy}
                                className="
                                     w-full py-3 rounded-xl
                                    bg-blue-600 text-white font-medium
                                    hover:bg-blue-700 transition"
                            >
                                {copied ? "Copiado ✓" : "Copiar código PIX"}
                            </button>
                            <Link href="/ticket">
                                <Button
                                    type={'button'}
                                    onClick={prevStep}
                                    extraClass={'opacity-100 cursor-pointer hover:opacity-90 active:opacity-80'}
                                >
                                    Verificar pagamento
                                </Button>

                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {(!methodPayment) && (
                <Payment
                    initialization={initialization}
                    customization={customization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                />)}
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