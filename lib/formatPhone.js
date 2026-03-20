export function formatPhone(value) {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 10) {
        // Telefone fixo
        return numbers
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .slice(0, 14);
    } else {
        // Celular (com 9 dígitos)
        return numbers
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    }
}