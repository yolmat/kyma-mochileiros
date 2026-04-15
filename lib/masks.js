export default function maskMap(field, value) {

    switch (field) {
        case 'rg':
            const cleanedRg = value
                .replace(/[^0-9Xx]/g, "")
                .toUpperCase()
                .slice(0, 9);

            return cleanedRg
                .replace(/^(\d{2})(\d)/, "$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d|X)$/, ".$1-$2");

        case 'cpf':
            const cleanedCpf = value
                .replace(/\D/g, "")
                .slice(0, 11);

            return cleanedCpf
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        case 'phone':
            return value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .slice(0, 15);

        case 'birth':
            return value
                .replace(/\D/g, "")
                .slice(0, 8)
                .replace(/(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

        case 'cep':
            return value
                .replace(/\D/g, "")
                .slice(0, 8)
                .replace(/(\d{5})(\d)/, "$1-$2");

        case 'paymentcpf':
            const cleanedPaymentCpf = value
                .replace(/\D/g, "")
                .slice(0, 11);

            return cleanedPaymentCpf
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        default:
            break;
    }

}