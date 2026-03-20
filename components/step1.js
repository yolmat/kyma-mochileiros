import { formatCPF } from "@/lib/formatcpf";

export default function Step1({ register, setValue, errors, nextStep, watch }) {

    const nome = watch("nome");
    const cpf = watch("cpf");
    const responsiblenName = watch('Nome do resposavel')

    const isValid = nome && responsiblenName && cpf.length === 14;

    return (
        <div>
            <h2 className="text-xl mb-4">Seus dados</h2>

            <input
                {...register("nome")}
                placeholder="Nome"
                className="w-full p-2 mb-2 rounded bg-gray-700"
            />

            {errors.nome && (
                <p className="text-red-400 text-sm mb-2">
                    {errors.nome.message}
                </p>
            )}

            <input
                {...register("cpf")}
                placeholder="CPF"
                onChange={(e) => {
                    const formatted = formatCPF(e.target.value);

                    // atualiza visualmente o input
                    e.target.value = formatted;

                    // atualiza o estado do react-hook-form
                    setValue("cpf", formatted, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }}
                maxLength={14}
                className="w-full p-2 mb-2 rounded bg-gray-700"
            />

            {errors.cpf && (
                <p className="text-red-400 text-sm mb-2">
                    {errors.cpf.message}
                </p>
            )}

            <input
                {...register("Nome do resposavel")}
                placeholder="Nome do Responsavel"
                className="w-full p-2 mb-2 rounded bg-gray-700"
            />

            {errors.nome && (
                <p className="text-red-400 text-sm mb-2">
                    {errors.nome.message}
                </p>
            )}

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
    );
}