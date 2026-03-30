
import { AnimatePresence, motion } from "framer-motion";
import Button from "./button";

export default function Steap5({ status, setStep }) {

    const resetCheckout = () => {
        localStorage.removeItem("checkout_v2");
        localStorage.removeItem("checkout_step");

        setStep(1);
    };

    return (
        <AnimatePresence mode="wait">
            {status && (
                <motion.div
                    key={result.status}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="rounded-3xl border overflow-hidden"
                >
                    {status.payment.status === "approved" && (
                        <div className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/40">
                            <div className="p-6 border-b border-green-200 dark:border-green-900 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
                                    ✓
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-green-700 dark:text-green-400">
                                        Pedido Aprovado
                                    </h2>
                                    <p className="text-green-600 dark:text-green-500 text-sm mt-1">
                                        Seu pagamento foi confirmado com sucesso.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Nome</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        {status.ticket.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Produto</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        Passaporte Mochileiros
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Forma de Pagamento</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        {status.payment_method_id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status.payment.status === "pending" && (
                        <div className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/40">
                            <div className="p-6 border-b border-yellow-200 dark:border-yellow-900 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-yellow-500 text-white flex items-center justify-center text-2xl font-bold">
                                    !
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
                                        Pagamento em Análise
                                    </h2>
                                    <p className="text-yellow-600 dark:text-yellow-500 text-sm mt-1">
                                        Seu pedido foi encontrado, mas ainda está aguardando confirmação.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Nome</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        {status.ticket.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Forma de Pagamento</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        {status.payment_method_id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status.payment.status === "rejected" && (
                        <div className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40">
                            <div className="p-6 border-b border-red-200 dark:border-red-900 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold">
                                    ×
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                                        Pedido Rejeitado
                                    </h2>
                                    <p className="text-red-600 dark:text-red-500 text-sm mt-1">
                                        O pagamento do seu pedido não foi aprovado.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Nome</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        {status.ticket.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Forma de Pagamento</p>
                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                        {status.payment_method_id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {status.payment.status === "not_found" && (
                        <div className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-6 flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                                ×
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                                    Pedido não encontrado
                                </h2>
                                <p className="text-red-600 dark:text-red-500 text-sm mt-2 leading-relaxed">
                                    Não localizamos nenhum pedido vinculado a este CPF. Verifique se o CPF foi digitado corretamente ou tente novamente em alguns minutos.
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}

            <Button
                type={'button'}
                onClick={resetCheckout}
                extraClass={'opacity-100 cursor-pointer hover:opacity-90 active:opacity-80'}
            >
                Nova compra
            </Button>
        </AnimatePresence>

    )
}