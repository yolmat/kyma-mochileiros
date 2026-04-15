'use client'

import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useState, useMemo, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialization, customization, onReady, onError } from '@/app/features/configPayment';
import Button from '@/components/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createInputStyle } from "@/app/features/createInputStyle";
import NextAndPrevButtons from './nextAndPrevButtons';
import Input from '@/components/input';

const publicKey = process.env.NEXT_PUBLIC_KEY_TESTE
const valueTicket = process.env.NEXT_PUBLIC_VALUE_TICKET

initMercadoPago(publicKey)

export default function Steap4({ prevStep, setStatus, setStep, register, errors, watch, setValue }) {

    // =========================
    // Create ticket
    // =========================
    const [loading, setLoading] = useState(true)
    const [errorTicket, setErrorTicket] = useState(false)
    const [statusTicket, setStatusTicket] = useState(false)
    const [hasTicket, setHasTicket] = useState(false)
    const hasCreatedUser = useRef(false)

    useEffect(() => {

        const dataLocalStorageTicket = localStorage.getItem('checkout_v2')
        const dataUserTicket = JSON.parse(dataLocalStorageTicket)

        const cpf = dataUserTicket.cpf

        const payloaderTicket = {
            ticket: {
                name: dataUserTicket.name,
                email: dataUserTicket.email,
                cpf: dataUserTicket.cpf.replace(/\D/g, ""),
                phone: dataUserTicket.phone,
                document: dataUserTicket.cpf,
                rg: dataUserTicket.rg,
                birth: dataUserTicket.birth,
                cep: dataUserTicket.cep,
                number: dataUserTicket.number,
                city: dataUserTicket.city,
                district: dataUserTicket.district,
                state: dataUserTicket.state,
                street: dataUserTicket.street,
                acceptTheTerms: dataUserTicket.acceptTheTerms
            },
        }

        if (hasCreatedUser.current) return

        hasCreatedUser.current = true

        const createUser = async () => {
            try {
                setLoading(true)

                const validationTicket = await fetch('/api/validation-ticket', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cpf: cpf }),
                })

                const dataValidationTicket = await validationTicket.json()

                console.log(dataValidationTicket)

                if (dataValidationTicket.success === true) {
                    localStorage.setItem(
                        'checkout_v2',
                        JSON.stringify({
                            ...JSON.parse(localStorage.getItem('checkout_v2') || '{}'),
                            id: dataValidationTicket.data.id
                        })
                    )
                    setLoading(false)
                    setStatusTicket(true)
                    return
                }

                const responseCreate = await fetch('/api/create-ticket', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payloaderTicket),
                })

                if (responseCreate.status === 400) {
                    setErrorTicket(true)
                    setLoading(false)
                    return
                }

                const data = await responseCreate.json()
                // caso queira salvar o id do usuário
                await localStorage.setItem(
                    'checkout_v2',
                    JSON.stringify({
                        ...JSON.parse(localStorage.getItem('checkout_v2') || '{}'),
                        id: data.data.id
                    })
                )

                setLoading(false)
            } catch (err) {
                console.error(err)
                setErrorTicket(true)
                setLoading(false)
            }
        }

        createUser()
    }, [])

    // =========================
    // Configs visible
    // =========================
    const paymentname = watch('paymentname') || ''
    const paymentcpf = watch('paymentcpf') || ''

    const maskCPF = (value) => {
        const cleaned = value
            .replace(/\D/g, "")
            .slice(0, 11);

        return cleaned
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const paymentVisible = useMemo(() => {
        const validName = paymentname.trim().length >= 2
        const validCpf = paymentcpf.length === 14

        return validName && validCpf
    }, [paymentname, paymentcpf])

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
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
                cpf: dataUser.paymentcpf.replace(/\D/g, ""),
                phone: dataUser.phone,
                document: dataUser.cpf,
                rg: dataUser.rg,
                birth: dataUser.birth,
                cep: dataUser.cep,
                number: dataUser.number,
                city: dataUser.city,
                district: dataUser.district,
                state: dataUser.state,
                street: dataUser.street,
                paymentcpf: dataUser.paymentcpf,
                paymentname: dataUser.paymentname,
                acceptTheTerms: dataUser.acceptTheTerms
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
                method: 'POST',
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
                    method: 'PUT',
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

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Preparando seu cadastro...
                    </span>
                </div>
            </div>
        )
    }

    if (errorTicket) {
        return (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Não foi possível concluir seu cadastro. Tente novamente ou entre em contato com o suporter.
                </p>
            </div>
        )
    }

    return (
        <>
            {(!methodPayment) && (
                <motion.div key="step4" className="space-y-4">

                    <Input
                        LabelChidren='Nome completo do Pagador:'
                        InputCondition={'paymentname'}
                        placeholder='Bruna Oliveira de Santos Madeiros'
                        register={register}
                        onChangeBoolean={false}
                        setValue={setValue}
                        errors={errors}
                    />

                    <Input
                        LabelChidren='CPF do Pagador:'
                        InputCondition={'paymentcpf'}
                        placeholder='000.000.000-00'
                        register={register}
                        onChangeBoolean={true}
                        setValue={setValue}
                        errors={errors}
                    />

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
            {(hasTicket) && (
                <div className="flex min-h-[70vh] items-center justify-center px-4">
                    <div
                        className="
            w-full max-w-xl rounded-3xl
            border border-amber-200 dark:border-amber-900
            bg-white dark:bg-gray-900
            p-8 shadow-xl
        "
                    >
                        <div className="flex flex-col items-center text-center">
                            <div
                                className="
                    mb-6 flex h-20 w-20 items-center justify-center
                    rounded-full bg-amber-100 dark:bg-amber-950/40
                    text-4xl
                "
                            >
                                ⚠️
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                CPF já cadastrado
                            </h1>

                            <p className="mt-4 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400">
                                Este CPF já realizou a compra do Passaporte Mochileiros e não é
                                possível efetuar uma nova inscrição utilizando o mesmo documento.
                            </p>

                            <div
                                className="
                    mt-6 w-full rounded-2xl
                    border border-amber-200 dark:border-amber-800
                    bg-amber-50 dark:bg-amber-950/20
                    px-5 py-4
                "
                            >
                                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                    Caso você já tenha efetuado o pagamento e queira consultar o
                                    status do seu pedido, utilize a área de consulta pelo CPF.
                                </p>
                            </div>

                            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => window.location.href = '/consulta'}
                                    className="
                        flex-1 rounded-2xl bg-blue-600 px-5 py-3
                        text-sm font-semibold text-white
                        transition hover:bg-blue-500
                    "
                                >
                                    Consultar Pedido
                                </button>

                                <button
                                    type="button"
                                    onClick={() => window.location.reload()}
                                    className="
                        flex-1 rounded-2xl border border-gray-300 dark:border-gray-700
                        px-5 py-3 text-sm font-semibold
                        text-gray-700 dark:text-gray-300
                        transition hover:bg-gray-100 dark:hover:bg-gray-800
                    "
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {(!methodPayment && paymentVisible) && (
                <Payment
                    initialization={initialization}
                    customization={customization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                />)}
            <NextAndPrevButtons
                next={false}
                prev={true}
                childrenPrev={'Voltar'}
                onClickPrev={prevStep}
            />
        </>
    )
}