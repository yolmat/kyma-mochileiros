"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { fullSchema } from "../features/schemaInputs";
import Image from "next/image";
import MochileirosBanner from '@/public/MochileirosBanner.png'
import kymaDark from '@/public/kymaLight.png'
import Steap1 from "./components/step1";
import { createInputStyle } from "@/app/features/createInputStyle";
import Steap2 from "./components/step2";
import Steap3 from "./components/step3";
import Steap4 from "./components/step4";
import Steap5 from "./components/step5";

// =========================
// Utils
// =========================


export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState(null);

    const valueTicket = process.env.NEXT_PUBLIC_VALUE_TICKET

    const stepFields = {
        1: ["name", "cpf", "rg", "email", "phone", 'birth'],
        2: ['cep', 'street', 'number', 'district', 'city',],
        3: [],
        4: [],
        5: []
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset,
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(fullSchema),
        mode: "onChange",
    });

    const totalSteps = 4;
    const progress = ((step - 1) / (totalSteps - 1)) * 100;

    const inputStyle = createInputStyle(errors)

    // =========================
    // Persistência
    // =========================
    useEffect(() => {
        const saved = localStorage.getItem("checkout_v2");
        const savedStep = localStorage.getItem("checkout_step");

        if (saved) reset(JSON.parse(saved));
        if (savedStep) setStep(Number(savedStep));
    }, [reset]);

    useEffect(() => {
        const sub = watch((value) => {
            localStorage.setItem("checkout_v2", JSON.stringify(value));
        });
        return () => sub.unsubscribe();
    }, [watch]);

    useEffect(() => {
        localStorage.setItem("checkout_step", step.toString());
    }, [step]);

    // =========================
    // Helpers
    // =========================
    const focusFirstError = () => {
        const firstErrorKey = Object.keys(errors)[0];
        if (!firstErrorKey) return;

        const el = document.querySelector(`[name="${firstErrorKey}"]`);
        if (el) {
            el.focus();
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        const valid = await trigger(fields);

        if (!valid) {
            focusFirstError();
            return;
        }

        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    // =========================
    // Validação em tempo real
    // =========================
    const isStepValid = stepFields[step].every((field) => {
        const value = watch(field);
        return value && value.toString().trim() !== "" && !errors[field];
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 md:p-6">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* LEFT */}
                <div className="w-full md:w-1/3 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 md:p-8 flex flex-col items-center justify-between text-center">

                    {/* TOP */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex items-center gap-3">
                            <Image src={kymaDark} alt="Logo Kyma" className="h-8 w-auto" />
                            <h1 className="text-2xl font-bold">Kyma</h1>
                        </div>

                        {/* BANNER */}
                        <Image
                            src={MochileirosBanner}
                            alt="banner"
                            className="rounded-2xl shadow-xl shadow-black/30 w-full max-h-55 md:max-h-none object-cover"
                        />

                        {/* TÍTULO */}
                        <h2 className="text-lg">Passaporte Mochileiros</h2>
                    </div>

                    {/* BOTTOM */}
                    <div className="text-center">
                        <p>Valor:</p>
                        <h3 className="text-3xl font-bold">
                            R$ {valueTicket},00
                        </h3>
                    </div>

                </div>
                {/* RIGHT */}
                <div className="w-full md:w-2/3 p-6 md:p-10">
                    <AnimatePresence>
                        <>
                            {/* Progress */}
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-600"
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Steps */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-6">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm${step === s
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                            }`}
                                    >
                                        {s === 1 && "Dados Pessoais"}
                                        {s === 2 && "Endereço"}
                                        {s === 3 && "Adicionais"}
                                        {s === 4 && "Pagamento"}
                                        {s === 5 && "Concluido"}
                                    </div>
                                ))}
                            </div>

                            <form>
                                <AnimatePresence mode="wait">

                                    {step === 1 && (
                                        <Steap1
                                            register={register}
                                            setValue={setValue}
                                            watch={watch}
                                            errors={errors}
                                            nextStep={nextStep}
                                        />
                                    )}

                                    {step === 2 && (
                                        <Steap2
                                            register={register}
                                            setValue={setValue}
                                            watch={watch}
                                            errors={errors}
                                            nextStep={nextStep}
                                            prevStep={prevStep}
                                        />
                                    )}

                                    {step === 3 && (
                                        <motion.div key="step3" className="space-y-4">
                                            <Steap3
                                                prevStep={prevStep}
                                                setStatus={setStatus}
                                                setStep={setStep}
                                                errors={errors}
                                            />
                                        </motion.div>
                                    )}
                                    {step === 4 && (
                                        <motion.div key="step4" className="space-y-4">
                                            <Steap4
                                                status={status}
                                                setStep={setStep}
                                            />
                                        </motion.div>
                                    )}
                                    {step === 5 && (
                                        <motion.div key="step5" className="space-y-4">
                                            <Steap5
                                                status={status}
                                                setStep={setStep}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}