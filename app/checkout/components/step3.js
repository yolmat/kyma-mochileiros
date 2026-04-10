'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { createInputStyle } from "@/app/features/createInputStyle";
import Button from "./button";
import NextAndPrevButtons from "./nextAndPrevButtons";

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

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

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
    const acceptTheTerms = watch('acceptTheTerms')

    const isStepValid = acceptTerms

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
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                    <input
                        {...register(true)}
                        id="acceptTheTerms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => {
                            const value = e.target.checked

                            setAcceptTerms(value)

                            const currentCheckout = JSON.parse(
                                localStorage.getItem('checkout_v2') || '{}'
                            )

                            localStorage.setItem(
                                'checkout_v2',
                                JSON.stringify({
                                    ...currentCheckout,
                                    acceptTheTerms: value,
                                })
                            )
                        }}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <label
                        htmlFor="acceptTerms"
                        className="text-sm leading-6 text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                        Aceito os Termos e Condições de Participação no Retiro Mochileiros.{" "}
                        <button
                            type="button"
                            onClick={() => setShowTerms(true)}
                            className="font-semibold text-blue-600 hover:text-blue-500 underline underline-offset-2"
                        >
                            Leia aqui
                        </button>
                    </label>
                </div>

                {!acceptTerms && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                            mt-3 flex items-center gap-2 px-3 py-2
                            rounded-xl bg-red-500/10 text-red-500 text-sm
                        "
                    >
                        <span>⚠</span>
                        <span>Você precisa aceitar os termos para continuar.</span>
                    </motion.div>
                )}
            </div>
            {showTerms && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="
                w-full max-w-3xl rounded-3xl
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                shadow-2xl overflow-hidden
            "
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Termos e Condições de Participação
                            </h2>

                            <button
                                type="button"
                                onClick={() => setShowTerms(false)}
                                className="
                        h-10 w-10 rounded-full
                        flex items-center justify-center
                        text-gray-500 hover:bg-gray-100
                        dark:hover:bg-gray-800
                    "
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <textarea
                                readOnly
                                value={`
Termos e Condições de Participação no Retiro Mochileiros
​
I. PRIVACIDADE
Seus dados de contato serão utilizados ​​para compilar a lista de participantes, que poderá ser utilizada para:
* Cadastro na base de dados dos participantes para organização do evento;
* Envio de e-mail de avisos, envio do passaporte e também de marketing aos participantes, com o objetivo de informação, contato e prospecção. 
​
II. FOTOGRAFIA E GRAVAÇÃO
Ao participar do Evento, você estará sujeito a filmagem e/ou fotografia, o que autoriza e concede ao Retiro Mochileiros, irrevogavelmente, o direito de:
* Gravar e/ou registrar foto e voz com o emprego de recursos de fotografia e filmagem para produção mídia audiovisual, bem como empregar a identificação de seu nome e outras informações sobre a sua pessoa enquanto participante deste evento, para a produção da mídia em questão;
* Apresentar no evento e/ou divulgar as informações citadas anteriormente de forma on-line (inclusive nas mídias sociais).
Dessa forma, por meio deste Termo, você:
* Reconhece que o Retiro Mochileiros possui e deve possuir todos os direitos, títulos e interesses (incluindo direitos autorais) destes registros;
* Reconhece ainda que o Retiro Mochileiros não é obrigado a usar estes registros;
* Entende que não receberá nenhum tipo de remuneração por estes registros.
​
III. AVISO LEGAL
No momento da sua inscrição, o Retiro Mochileiros assegura que forneceu as informações mais recentes disponíveis sobre os termos e condições de participação no evento. O Retiro Mochileiros se reserva o direito de atualizar os Termos e Condições de Participação no Evento sem aviso prévio, cabendo ao participante a consultar a regra vigente por meio de contato com a organização.
Durante a realização do evento, o Retiro Mochileiros não poderá controlar todo o conteúdo publicado ou disseminado por outros. Caso você considere comunicações, gráficos, arquivos de áudio ou outras informações de outros participantes inapropriados, ofensivos, prejudiciais, imprecisos, desonestos ou enganosos, você deverá comunicar a organização, para que exista concordância na remoção de tais conteúdos.
Você é o único responsável pela sua conduta, comportamento e eventual interação durante o evento, de modo que concorda em agir com responsabilidade, cautela, bom senso e segurança enquanto estiver presente em qualquer atividade, dinâmicas, cultos, preservando a ética e os bons costumes das relações.
O Retiro Mochileiros, sua equipe de trabalho e o dono do espaço do evento não serão responsáveis ​​por quaisquer perdas ou danos. 


​
IV. CADASTRO REALIZADO POR TERCEIROS
Se outra pessoa se registrar em seu nome, cabe ao responsável notificá-la dos termos e condições do registro, pelos quais concorda em nome do participante. O passaporte é individual e intransferível, cada ingresso deve ser acompanhado de sua ficha de inscrição individual.
O Retiro Mochileiros não se responsabiliza por cadastros realizados por terceiros em seu nome. No entanto, caso identifique que alguém se cadastrou no evento utilizando os seus dados pessoais, entre em contato com a equipe de trabalho no e-mail triakyma@gmail.com para informar o caso.
​
V. CANCELAMENTO
Todos os pedidos de cancelamento de registro no evento devem ser notificados ao Retiro Mochileiros, por escrito, enviando um e-mail para triakyma@gmail.com.
Os pedidos de cancelamento recebidos só passarão a ser processados após você receber uma confirmação de registro por e-mail do Retiro Mochileiros. Se você não receber uma confirmação dentro de dois (2) dias úteis, por favor entre em contato com a organização no e-mail triakyma@gmail.com.
Se o pedido de cancelamento não for recebido por escrito, o registro não será cancelado.
De acordo com nossos Termos de Serviço e com o CDC (Código de Defesa do Consumidor), a solicitação de cancelamento pode ser feita em até sete (7) dias corridos após a compra, desde que seja antes de 48 horas do evento. Após os sete (7) dias ou após quarenta e oito (48) horas antes do evento, NÃO HAVERÁ REEMBOLSO.
No caso de reagendamento da data do evento, os passaportes serão mantidos com os mesmos valores. Caso o(a) participante opte pelo cancelamento ao invés do reagendamento, o(a) mesmo(a) deverá solicitar nos mesmos prazos acima, contando sete (7) dias após a comunicação oficial da alteração.
Qualquer dúvida ou informação adicional que necessite, entre em contato com a organização: triakyma@gmail.com
                    `}
                                className="
                        h-80 w-full resize-none rounded-2xl
                        border border-gray-200 dark:border-gray-700
                        bg-gray-50 dark:bg-gray-950
                        p-4 text-sm leading-6
                        text-gray-700 dark:text-gray-300
                        outline-none
                    "
                            />

                            <div className="mt-5 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowTerms(false)}
                                    className="
                            rounded-2xl border border-gray-300 dark:border-gray-700
                            px-5 py-2.5 text-sm font-medium
                            text-gray-700 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800
                        "
                                >
                                    Fechar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setAcceptTerms(true);
                                        setShowTerms(false);
                                    }}
                                    className="
                            rounded-2xl bg-blue-600 px-5 py-2.5
                            text-sm font-semibold text-white
                            hover:bg-blue-500
                        "
                                >
                                    Li e Aceito
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
            <NextAndPrevButtons
                next={true}
                prev={true}
                childrenNext={isStepValid ? 'Continuar' : 'Preencha os Dados'}
                childrenPrev={'Voltar'}
                onClickNext={nextStep}
                onClickPrev={prevStep}
                disabled={isStepValid ? false : true}
                extraClass={isStepValid ? ' active:opacity-80' : 'opacity-50 cursor-not-allowed'}
            />
        </motion.div>
    )
}
