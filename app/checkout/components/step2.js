import { motion } from "framer-motion";
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

    const email = watch('email')
    const phone = watch('phone')

    const isStepValid = email && phone.length >= 15

    const maskPhone = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    };

    const inputStyle = createInputStyle(errors)

    return (

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
                    placeholder="(00) 00000-0000"
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
            <div className="flex justify-around gap-3">
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