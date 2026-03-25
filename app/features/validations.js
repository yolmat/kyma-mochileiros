export default async function validationClient(cpf) {

    try {
        const res = await fetch(`/api/validation-ticket/${cpf}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        // Encontrado
        if (res.ok === true) {
            return true
        }

        // Não encontrado
        if (res.ok === false) {
            return false
        }

    } catch (e) {
        console.log(e)
    }

}