export default function Downloads() {
    return (
        <>
            <a
                href="/api/download-table-csv"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                Baixar tabela CSV
            </a>

            <a
                href="/api/download-table-json"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                Baixar tabela json
            </a>
        </>
    )
}
