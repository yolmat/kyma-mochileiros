import { formatPhone } from "@/lib/formatPhone";

export default function Step2({ register,
    setValue,
    errors,
    nextStep,
    prevStep,
    watch, }) {

    const email = watch("email");
    const telefone = watch("telefone");

    const isValid =
        email &&
        email.includes("@") &&
        telefone &&
        telefone.length >= 14;

    const telefoneRegister = register("telefone");

    return (
        <div>
            <h2 className="text-xl mb-4">Contato</h2>

            <input
                {...register("email")}
                placeholder="Email"
                className="w-full p-2 mb-2 rounded bg-gray-700"
            />

            {errors.email && (
                <p className="text-red-400 text-sm mb-2">
                    {errors.email.message}
                </p>
            )}

            <input
                {...telefoneRegister}
                placeholder="Telefone"
                onChange={(e) => {
                    const formatted = formatPhone(e.target.value);

                    setValue("telefone", formatted, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });

                    telefoneRegister.onChange(e);
                }}
                className="w-full p-2 mb-2 rounded bg-gray-700"
            />

            {errors.telefone && (
                <p className="text-red-400 text-sm mb-2">
                    {errors.telefone.message}
                </p>
            )}

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={prevStep}
                    className="w-full bg-gray-600 p-2 rounded"
                >
                    Voltar
                </button>

                <button
                    type="button"
                    disabled={!isValid}
                    onClick={nextStep}
                    className={`w-full p-2 rounded ${isValid
                        ? "bg-green-900"
                        : "bg-gray-700/10 cursor-not-allowed"
                        }`}
                >
                    {isValid ? 'Continue' : 'Preencha os dados'}
                </button>
            </div>
        </div>
    );
}