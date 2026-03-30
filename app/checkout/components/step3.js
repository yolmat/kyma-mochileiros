import { motion } from "framer-motion";
import { useState } from "react";
import { createInputStyle } from "@/app/features/createInputStyle";


export default function Steap2({ errors }) {
    const [healthInfo, setHealthInfo] = useState({
        useMedication: false,
        medication: "",

        healthProblem: false,
        healthProblemDescription: "",

        foodRestriction: false,
        foodRestrictionDescription: "",
    });

    const handleCheckbox = (field) => {
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

    const inputStyle = createInputStyle(errors)


    return (
        <div className="space-y-6">
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
                                    type="text"
                                    value={healthInfo.medication}
                                    onChange={(e) =>
                                        setHealthInfo((prev) => ({
                                            ...prev,
                                            medication: e.target.value,
                                        }))
                                    }
                                    placeholder="Ex.: Dipirona, Insulina..."
                                    className={inputStyle("medication")}
                                />

                                {!healthInfo.medication.trim() && (
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
                                        <span>⚠</span>
                                        <span>Informe qual medicamento utiliza.</span>
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
                                    type="text"
                                    value={healthInfo.healthProblemDescription}
                                    onChange={(e) =>
                                        setHealthInfo((prev) => ({
                                            ...prev,
                                            healthProblemDescription: e.target.value,
                                        }))
                                    }
                                    placeholder="Ex.: Asma, Hipertensão..."
                                    className={inputStyle("healthProblemDescription")}
                                />

                                {!healthInfo.healthProblemDescription.trim() && (
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
                                        <span>⚠</span>
                                        <span>Informe qual problema de saúde possui.</span>
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
                                    type="text"
                                    value={healthInfo.foodRestrictionDescription}
                                    onChange={(e) =>
                                        setHealthInfo((prev) => ({
                                            ...prev,
                                            foodRestrictionDescription: e.target.value,
                                        }))
                                    }
                                    placeholder="Ex.: Lactose, Glúten, Amendoim..."
                                    className={inputStyle("foodRestrictionDescription")}
                                />

                                {!healthInfo.foodRestrictionDescription.trim() && (
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
                                        <span>⚠</span>
                                        <span>Informe qual restrição alimentar possui.</span>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
