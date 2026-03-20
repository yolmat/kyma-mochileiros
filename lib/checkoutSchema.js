import { z } from "zod";

export const checkoutSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    cpf: z
        .string()
        .min(14, "CPF inválido")
        .max(14, "CPF inválido"),
    telefone: z
        .string()
        .min(15, "Telefone inválido")
        .max(15, "Telefone inválido"),
});