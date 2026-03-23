export default function PaymentStatus({ amount, method, description, paymentId, status }) {
    return (
        <div className="w-full max-w-md h-full bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            {status === 'approved' && (
                <div className="bg-green-600 h-20 relative flex items-center justify-center">
                    <div className="absolute -bottom-8 bg-green-600 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white">
                        <span className="text-white text-2xl">✓</span>
                    </div>
                </div>
            )}
            {status === 'in_process' && (
                <div className="bg-orange-500 h-20 relative flex items-center justify-center">
                    <div className="absolute -bottom-8 bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white">
                        <span className="text-white text-2xl">!</span>
                    </div>
                </div>
            )}
            {status === 'rejected' && (
                <div className="bg-red-600 h-20 relative flex items-center justify-center">
                    <div className="absolute -bottom-8 bg-red-600 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white">
                        <span className="text-white text-2xl">X</span>
                    </div>
                </div>
            )}


            {/* Content */}
            <div className="pt-12 pb-6 px-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                        Seu pagamento {
                            status === "approved"
                                ? "foi aprovado"
                                : status === "in_process"
                                    ? "esta em processamento"
                                    : "foi recusado"
                        }
                    </h2>
                </h2>

                {/* Card 1 */}
                <div className="flex items-center gap-4 border rounded-xl p-4 mb-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        💳
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-gray-800">R$ {amount}</p>
                        <p className="text-sm text-gray-500">
                            {method}
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center gap-4 border rounded-xl p-4 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        🔒
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-gray-800">{description}</p>
                        <p className="text-sm text-gray-500">
                            Kyma Store
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center gap-4 border rounded-xl p-4 mb-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        🧾
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-gray-800">
                            Operação #{paymentId}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}