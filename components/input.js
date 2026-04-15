import { motion } from "framer-motion";
import { createInputStyle } from "@/app/features/createInputStyle";
import maskMap from "@/lib/masks";

export default function Input({ LabelChidren, InputCondition, placeholder, onChangeBoolean, setValue, register, setAddress, automaticValue, errors }) {

    const inputStyle = createInputStyle(errors)
    const field = register(InputCondition)

    const handleCEPChange = async (value) => {
        const cep = value.replace(/\D/g, "");

        if (cep.length !== 8) {

            setValue("street", "", { shouldValidate: true });
            setValue("district", "", { shouldValidate: true });
            setValue("city", "", { shouldValidate: true });
            setValue("state", "", { shouldValidate: true });

            return
        };

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            const data = await response.json();

            if (data.erro) return;

            setAddress({
                cep: value,
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

    return (
        <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {LabelChidren}
            </label>
            <input
                {...field}
                name={InputCondition}
                placeholder={placeholder}
                onChange={
                    async (e) => {
                        const rawValue = e.target.value

                        if (InputCondition === "cep") {
                            const formatted = maskMap(InputCondition, rawValue)

                            setValue(InputCondition, formatted, { shouldValidate: true })

                            await handleCEPChange(formatted)

                            return
                        }

                        if (onChangeBoolean) {
                            const formatted = maskMap(InputCondition, rawValue)

                            setValue(InputCondition, formatted, { shouldValidate: true })
                            return
                        }

                        field.onChange(e)
                    }}
                className={inputStyle(InputCondition)}
                disabled={automaticValue}
            />
            {errors[InputCondition] && (
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
                    <span>{errors[InputCondition]?.message}</span>
                </motion.div>
            )}
        </div>
    )
}