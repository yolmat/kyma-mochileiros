import { motion } from "framer-motion";
import { createInputStyle } from "@/app/features/createInputStyle";
import Button from "./button";

export default function Steap1({
    register,
    setValue,
    errors,
    nextStep,
    watch,
}) {

    const name = watch('name')
    const cpf = watch('cpf')
    const rg = watch('rg')
    const email = watch('email')
    const phone = watch('phone')
    const birth = watch('birth')

    const isStepValid = name && cpf.length === 14 && rg.length === 12 && email && phone.length >= 15 && birth

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

    const maskCPF = (value) => {
        const cleaned = value
            .replace(/\D/g, "")
            .slice(0, 11);

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

    const maskDate = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 8)
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    };

    const inputStyle = createInputStyle(errors)

    return (
        <motion.div key="step1" className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome completo:
                </label>
                <input
                    {...register("name")}
                    name="name"
                    placeholder="Bruna Rodrigues Ferreira"
                    className={inputStyle("name")}
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
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data de Nascimento:
                </label>

                <input
                    {...register("birth")}
                    placeholder="00/00/0000"
                    onChange={(e) => {
                        const formatted = maskDate(e.target.value);
                        setValue("birth", formatted, { shouldValidate: true });
                    }}
                    className={inputStyle("birth")}
                />
                {errors.birth && (
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
                        <span>{errors.birth.message}</span>
                    </motion.div>
                )}
            </div>
            <div className="flex justify-end">
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
    );
}
