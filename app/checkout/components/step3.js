'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { createInputStyle } from "@/app/features/createInputStyle";
import Button from "./button";

export default function Steap2(
    { register,
        setValue,
        errors,
        nextStep,
        watch,
        prevStep,
    }
) {
    const [healthInfo, setHealthInfo] = useState({
        useMedication: false,
        medication: "",

        healthProblem: false,
        healthProblemDescription: "",

        foodRestriction: false,
        foodRestrictionDescription: "",
    });

    const handleCheckbox = (field) => {
        console.log("teste")
        setHealthInfo((prev) => ({
            ...prev,
            [field]: !prev[field],
            ...(field === "useMedication" && prev[field]
                ? { medication: "" }
                : {}),
            ...(field === "healthProblem" && prev[field]
                ? { healthProblemDescription: "" }
                : {}),
            ...(field === "foodRestriction" && prev[field]
                ? { foodRestrictionDescription: "" }
                : {}),
        }));
    };

    const useMedication = watch('useMedication')
    const healthProblem = watch('healthProblem')
    const foodRestriction = watch('foodRestriction')

    const isStepValid = true

    const inputStyle = createInputStyle(errors)

    return (
        <motion.div key='steap3' className="space-y-4">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <input
                        id="useMedication"
                        type="checkbox"
                        checked={healthInfo.useMedication}
                        onChange={() => handleCheckbox("useMedication")}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="flex-1">
                        <label
                            htmlFor="useMedication"
                            className="cursor-pointer text-base font-semibold text-gray-900 dark:text-white"
                        >
                            Faz uso de algum medicamento?
                        </label>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Marque caso utilize algum medicamento regularmente.
                        </p>

                        {healthInfo.useMedication && (
                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Se sim, qual?
                                </label>

                                <input
                                    {...register("useMedication")}
                                    placeholder="Ex.: Dipirona, Insulina..."
                                    className={inputStyle("useMedication")}
                                />

                                {errors.useMedication && (
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
                                        <span>{errors.useMedication.message}</span>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <input
                        id="healthProblem"
                        type="checkbox"
                        checked={healthInfo.healthProblem}
                        onChange={() => handleCheckbox("healthProblem")}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="flex-1">
                        <label
                            htmlFor="healthProblem"
                            className="cursor-pointer text-base font-semibold text-gray-900 dark:text-white"
                        >
                            Tem algum problema de saúde?
                        </label>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Informe caso exista alguma condição importante.
                        </p>

                        {healthInfo.healthProblem && (
                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Se sim, qual?
                                </label>

                                <input
                                    {...register("healthProblem")}
                                    placeholder="Ex.: Asma, Hipertensão..."
                                    className={inputStyle("healthProblem")}
                                />

                                {errors.healthProblem && (
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
                                        <span>{errors.healthProblem.message}</span>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <input
                        id="foodRestriction"
                        type="checkbox"
                        checked={healthInfo.foodRestriction}
                        onChange={() => handleCheckbox("foodRestriction")}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="flex-1">
                        <label
                            htmlFor="foodRestriction"
                            className="cursor-pointer text-base font-semibold text-gray-900 dark:text-white"
                        >
                            Alguma restrição alimentar?
                        </label>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Informe caso tenha alguma restrição ou alergia alimentar.
                        </p>

                        {healthInfo.foodRestriction && (
                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Se sim, qual?
                                </label>

                                <input
                                    {...register("foodRestriction")}
                                    placeholder="Ex.: Lactose, Glúten, Amendoim..."
                                    className={inputStyle("foodRestriction")}
                                />

                                {errors.foodRestriction && (
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
                                        <span>{errors.foodRestriction.message}</span>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-3">
                <Button
                    type={'button'}
                    onClick={prevStep}
                    extraClass={'opacity-100 cursor-pointer hover:opacity-90 active:opacity-80'}
                >
                    Voltar
                </Button>
                <Button
                    type={'button'}
                    onClick={nextStep}
                    disabled={isStepValid ? true : false}
                    extraClass={isStepValid ? 'opacity-100  cursor-pointer hover:opacity-90 active:opacity-80' : 'opacity-50 cursor-not-allowed'}
                >
                    {isStepValid ? 'Continuar' : 'Preencha os Dados'}
                </Button>
            </div>
        </motion.div>
    )
}
