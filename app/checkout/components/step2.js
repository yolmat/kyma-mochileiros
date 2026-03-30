'use client'

import { motion } from "framer-motion";
import { createInputStyle } from "@/app/features/createInputStyle";
import { useState } from "react";
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

    const cep = watch('cep') || ''
    const street = watch('street') || ''
    const number = watch('number') || ''
    const district = watch('district') || ''
    const city = watch('city') || ''

    const isStepValid = cep.length >= 9 && number.length >= 1

    const [address, setAddress] = useState({
        cep: "",
        street: "",
        district: "",
        city: "",
        state: "",
    });

    const maskCEP = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 8)
            .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const handleCEPChange = async (e) => {
        const masked = maskCEP(e.target.value);

        setAddress((prev) => ({
            ...prev,
            cep: masked,
        }));

        const cep = masked.replace(/\D/g, "");

        if (cep.length < 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) return;

            setAddress({
                cep: masked,
                street: data.logradouro || "",
                district: data.bairro || "",
                city: data.localidade || "",
                state: data.uf || "",
            });

            setValue("street", data.logradouro || "", { shouldValidate: true });
            setValue("district", data.bairro || "", { shouldValidate: true });
            setValue("city", data.localidade || "", { shouldValidate: true });
            setValue("state", data.uf || "", { shouldValidate: true });
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const inputStyle = createInputStyle(errors)

    return (

        <motion.div key="step2" className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    CEP:
                </label>

                <input
                    {...register("cep")}
                    placeholder="00000-000"
                    onChange={async (e) => {
                        await handleCEPChange(e);
                        const formatted = maskCEP(e.target.value);
                        setValue("cep", formatted, { shouldValidate: true });
                    }}
                    className={inputStyle("cep")}
                />
                {errors.cep && (
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
                        <span>{errors.cep.message}</span>
                    </motion.div>
                )}
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rua:
                </label>

                <input
                    {...register("street")}
                    name="street"
                    value={address.street}
                    readOnly
                    placeholder="Rua dos Ipès"
                    className={inputStyle("street")}
                />
                {errors.street && (
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
                        <span>{errors.street.message}</span>
                    </motion.div>
                )}
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Numero:
                </label>

                <input
                    {...register("number")}
                    name="number"
                    placeholder="0000"
                    className={inputStyle("number")}
                />
                {errors.number && (
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
                        <span>{errors.number.message}</span>
                    </motion.div>
                )}
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bairro:
                </label>

                <input
                    {...register("district")}
                    name="district"
                    value={address.district}
                    readOnly
                    placeholder="Vila Matilda"
                    className={inputStyle("district")}
                />
                {errors.district && (
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
                        <span>{errors.district.message}</span>
                    </motion.div>
                )}
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cidade:
                </label>

                <input
                    {...register("city")}
                    name="city"
                    value={address.city}
                    readOnly
                    placeholder="Vila Matilda"
                    className={inputStyle("city")}
                />
                {errors.city && (
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
                        <span>{errors.city.message}</span>
                    </motion.div>
                )}
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
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid}
                    extraClass={
                        isStepValid
                            ? 'opacity-100 cursor-pointer hover:opacity-90 active:opacity-80'
                            : 'opacity-50 cursor-not-allowed'
                    }
                >
                    {isStepValid ? 'Continuar' : 'Preencha os Dados'}
                </Button>
            </div>
        </motion.div>
    )
}