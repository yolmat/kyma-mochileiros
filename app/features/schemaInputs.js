import { z } from "zod";

const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let first = (sum * 10) % 11;
    if (first === 10) first = 0;
    if (first !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    let second = (sum * 10) % 11;
    if (second === 10) second = 0;

    return second === parseInt(cpf[10]);
};

export const fullSchema = z.object({

    name: z.string().min(3, "Nome obrigatório"),
    cpf: z.string().min(14, 'CPF invalido').max(15, 'CPF invalido').refine(validateCPF, "CPF inválido"),
    rg: z
        .string()
        .transform((v) => v.replace(/[^0-9Xx]/g, "").toUpperCase())
        .refine((v) => v.length >= 8 && v.length <= 9, "RG inválido"),
    birth: z.string().min(8, 'Data de Nascimento obrigatoria'),

    email: z.string().email("E-mail inválido"),
    phone: z.string().min(14, "Telefone inválido"),

    cep: z.string().min(8, 'CEP obrigatorio'),
    number: z.string().min(1, 'Numero obrigatorio'),
    neighborhood: z.string().min(3, 'Bairro obrigatorio'),
    street: z.string().min(5, "Endereço obrigatório"),
    city: z.string().min(2, "Cidade obrigatória"),
});