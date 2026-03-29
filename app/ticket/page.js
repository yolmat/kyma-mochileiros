"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConsultaPedidoCPF() {
    const [cpf, setCpf] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Mock apenas para front-end
    const mockDatabase = {
        "123.456.789-00": {
            name: "Bruna Rodrigues Ferreira",
            status: "approved",
            product: "Passaporte Mochileiros",
            payment: "PIX",
            date: "29/03/2026 às 08:15",
        },
        "987.654.321-00": {
            name: "Mateus Saraiva",
            status: "pending",
            product: "Passaporte Mochileiros",
            payment: "Cartão de Crédito",
            date: "29/03/2026 às 08:42",
        },
    };

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const handleSearch = async () => {
        setLoading(true);
        setResult(null);

        const cpfRes = {
            cpf: cpf,
        }

        const res = await fetch('/api/validation-ticket', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cpfRes),
        });

        const data = await res.json();
        if (data.success == true) {
            setResult(data.data);
        } else {
            setResult({ status_payment: "not_found" });
        }

        console.log(result)

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 md:px-8 py-8 text-white text-center">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Consultar o seu passaporte para o Mochileiros
                    </h1>
                    <p className="mt-2 text-blue-100 text-sm md:text-base">
                        Informe seu CPF para verificar se seu pedido foi aprovado.
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            CPF
                        </label>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(maskCPF(e.target.value))}
                                placeholder="000.000.000-00"
                                className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />

                            <button
                                type="button"
                                onClick={handleSearch}
                                disabled={cpf.length < 14 || loading}
                                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition"
                            >
                                {loading ? "Consultando..." : "Consultar"}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {result && (
                            <motion.div
                                key={result.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                className="rounded-3xl border overflow-hidden"
                            >
                                {result.status_payment === "approved" && (
                                    <div className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/40">
                                        <div className="p-6 border-b border-green-200 dark:border-green-900 flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
                                                ✓
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-green-700 dark:text-green-400">
                                                    Pedido Aprovado #{result.id_payment}
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
                                                    {result.name}
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
                                                    {result.payment_method_id}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {(result.status_payment === "pending" || result.status_payment === 'in_process') && (
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
                                                    {result.name}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">Forma de Pagamento</p>
                                                <p className="font-medium text-gray-900 dark:text-white mt-1">
                                                    {result.payment_method_id}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {result.status_payment === "rejected" && (
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
                                                    {result.name}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">Forma de Pagamento</p>
                                                <p className="font-medium text-gray-900 dark:text-white mt-1">
                                                    {result.payment_method_id}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {result.status_payment === "not_found" && (
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
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
