"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { fullSchema } from "../features/schemaInputs";
import Image from "next/image";
import MochileirosBanner from '@/public/MochileirosBanner.png'
import kymaDark from '@/public/kymaLight.png'
import { Payment } from "mercadopago";

// =========================
// Utils
// =========================
const maskCPF = (value) => {
    const cleaned = value
        .replace(/\D/g, "")
        .slice(0, 11); // 🔒 limita ANTES

    return cleaned
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const maskPhone = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
};

const maskRG = (value) => {
    const cleaned = value
        .replace(/[^0-9Xx]/g, "")
        .toUpperCase()
        .slice(0, 9);

    return cleaned
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d|X)$/, ".$1-$2");
};

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState(null);

    const stepFields = {
        1: ["name", "cpf", "rg"],
        2: ["email", "phone"],
        3: [],
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

    // =========================
    // Persistência
    // =========================
    useEffect(() => {
        const saved = localStorage.getItem("checkout");
        const savedStep = localStorage.getItem("checkout_step");

        if (saved) reset(JSON.parse(saved));
        if (savedStep) setStep(Number(savedStep));
    }, [reset]);

    useEffect(() => {
        const sub = watch((value) => {
            localStorage.setItem("checkout", JSON.stringify(value));
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

    const onSubmit = async (data) => {
        try {
            await new Promise((res) => setTimeout(res, 1000));
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    const inputStyle = (field) =>
        `w-full p-3 rounded-xl border transition-all outline-none 
    ${errors[field]
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-blue-300"
        }
    bg-white text-black
    dark:bg-gray-700 dark:text-white dark:border-gray-600
  `;

    // =========================
    // Validação em tempo real
    // =========================
    const isStepValid = stepFields[step].every((field) => {
        const value = watch(field);
        return value && value.toString().trim() !== "" && !errors[field];
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden flex">

                {/* LEFT */}
                <div className="w-1/3 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 flex flex-col items-center justify-between text-center">

                    {/* TOP */}
                    <div className="flex flex-col items-center gap-6 w-full">

                        {/* LOGO + TEXTO */}
                        <div className="flex items-center gap-3">
                            <Image
                                src={kymaDark}
                                alt="Logo Kyma"
                                className="h-8 w-auto object-contain"
                            />
                            <h1 className="text-2xl font-bold leading-none">
                                Kyma
                            </h1>
                        </div>

                        {/* BANNER */}
                        <Image
                            src={MochileirosBanner}
                            alt="banner oficial Mochileiros 2.0"
                            className="
                                rounded-2xl
                                shadow-xl
                                shadow-black/30
                                object-cover
                            "
                        />

                        {/* TÍTULO */}
                        <h2 className="text-lg font-medium">
                            Passaporte Mochileiros
                        </h2>
                    </div>

                    {/* BOTTOM */}
                    <div className="text-center">
                        <p>Valor:</p>
                        <h3 className="text-3xl font-bold">
                            R$ 250,00
                        </h3>
                    </div>

                </div>
                {/* RIGHT */}
                <div className="w-2/3 p-10">
                    <AnimatePresence>
                        {status ? (
                            <motion.div className="text-center">
                                <div className="text-4xl text-green-500">✓</div>
                                <p>Pagamento aprovado</p>
                            </motion.div>
                        ) : (
                            <>
                                {/* Progress */}
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-600"
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>

                                {/* Steps */}
                                <div className="flex gap-4 mb-8">
                                    {[1, 2, 3, 4].map((s) => (
                                        <div
                                            key={s}
                                            className={`px-4 py-2 rounded-full text-sm ${step === s
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                                }`}
                                        >
                                            {s === 1 && "Dados Pessoais"}
                                            {s === 2 && "Contato"}
                                            {s === 3 && "Pagamento"}
                                            {s === 4 && "Concluido"}
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <AnimatePresence mode="wait">

                                        {step === 1 && (
                                            <motion.div key="step1" className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Nome completo:
                                                    </label>
                                                    <input {...register("name")} name="name" placeholder="Bruna Rodrigues Ferreira" className={inputStyle("name")} />
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
                                                        CPF:
                                                    </label>
                                                    <input
                                                        {...register("cpf")}
                                                        name="cpf"
                                                        placeholder="000.000.000-00"
                                                        onChange={(e) =>
                                                            setValue("cpf", maskCPF(e.target.value), { shouldValidate: true })
                                                        }
                                                        className={inputStyle("cpf")}
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
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        RG:
                                                    </label>
                                                    <input
                                                        {...register("rg")}
                                                        placeholder="00.000.000-0"
                                                        onChange={(e) => {
                                                            const formatted = maskRG(e.target.value);
                                                            setValue("rg", formatted, { shouldValidate: true });
                                                        }}
                                                        className={inputStyle("rg")}
                                                    />
                                                    {errors.rg && (
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
                                                            <span>{errors.rg.message}</span>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div key="step2" className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Email:
                                                    </label>

                                                    <input {...register("email")} name="email" placeholder="exemplo@dominio.com.br" className={inputStyle("email")} />
                                                    {errors.email && (
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
                                                            <span>{errors.email.message}</span>
                                                        </motion.div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Celular:
                                                    </label>

                                                    <input
                                                        {...register("phone")}
                                                        placeholder="(00) 00000-00"
                                                        onChange={(e) => {
                                                            const formatted = maskPhone(e.target.value);
                                                            setValue("phone", formatted, { shouldValidate: true });
                                                        }}
                                                        className={inputStyle("phone")}
                                                    />
                                                    {errors.phone && (
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
                                                            <span>{errors.phone.message}</span>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div key="step3" className="space-y-4">

                                            </motion.div>
                                        )}

                                    </AnimatePresence>

                                    <div className="flex justify-between mt-6">
                                        {step > 1 && (
                                            <button type="button" onClick={prevStep} className="px-6 py-3 bg-gray-300 rounded-xl">
                                                Voltar
                                            </button>
                                        )}

                                        {step < 3 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!isStepValid}
                                                className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50"
                                            >
                                                Continuar
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </form>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}