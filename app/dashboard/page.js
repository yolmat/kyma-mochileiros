'use client'
import { useEffect, useMemo, useState } from 'react'
import kymaDark from '@/public/kymaLight.png'
import Image from 'next/image'


const passwordDashboard = process.env.NEXT_PUBLIC_PASSWORD_DASHBOARD

export default function DashboardInscricoes() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [dataTicket, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorTicket, setErrorTicket] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {

                setLoading(true)

                const res = await fetch('/api/get-all-ticket', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const dataAllTickets = await res.json()

                if (dataAllTickets.success === true) {
                    setData(dataAllTickets.data)
                    setLoading(false)
                    return
                }

                if (dataAllTickets.success === false) {
                    setErrorTicket(true)
                    setLoading(false)
                }

                return e
            } catch (e) {
                console.error(e)
                setErrorTicket(true)
                setLoading(false)
            }
        }

        getData()
    }, [])

    const filteredRegistrations = dataTicket.filter(item => {

        const matchesSearch = [
            item.name,
            item.email,
            item.document,
            item.phone,
            item.city,
            item.id_payment,
        ]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesStatus =
            statusFilter === 'all' ? true : item.status_payment === statusFilter

        return matchesSearch && matchesStatus
    })

    const stats = useMemo(() => {
        const approved = dataTicket.filter(item => item.status_payment === 'approved').length
        const pending = dataTicket.filter(item => item.status_payment === 'pending').length
        const rejected = dataTicket.filter(
            item => item.status_payment === 'rejected' || item.status_payment === 'error' || item.status_payment === '0'
        ).length

        const totalRevenue = dataTicket
            .filter(item => item.status_payment === 'approved')
            .reduce((acc, item) => acc + Number(item.transaction_amount || 0), 0)

        const totalPedding = dataTicket
            .filter(item => item.status_payment === 'pending')
            .reduce((acc, item) => acc + Number(item.transaction_amount || 0), 0)

        return {
            total: dataTicket.length,
            approved,
            pending,
            rejected,
            totalRevenue,
            totalPedding,
        }
    }, [dataTicket])

    const handleLogin = e => {
        e.preventDefault()

        if (password === passwordDashboard) {
            setIsAuthenticated(true)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D] px-4">
                <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
                            Área Restrita
                        </span>

                        <h1 className="mt-3 text-3xl font-black text-white">
                            Dashboard Mochileiros 2.0
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#8A8A8A]">
                            Digite a senha de acesso para visualizar as inscrições.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Senha de acesso"
                            className="w-full rounded-2xl border border-white/10 bg-[#2A2A2A] px-5 py-4 text-white outline-none transition placeholder:text-[#8A8A8A] focus:border-[#FF7A18]"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#FF7A18] px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0D0D0D] transition hover:scale-[1.02] hover:bg-[#ff8d3a]"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <style jsx global>{`
                    .custom-scroll::-webkit-scrollbar {
                    height: 10px;
                    width: 10px;
                    }

                    .custom-scroll::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 999px;
                    }

                    .custom-scroll::-webkit-scrollbar-thumb {
                    background: #FF7A18;
                    border-radius: 999px;
                    border: 2px solid #0D0D0D;
                    }

                    .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: #F4A261;
                    }

                    .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #FF7A18 rgba(255, 255, 255, 0.05);
                    }
      `}</style>

            <div className="min-h-screen bg-[#0D0D0D] text-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-10 flex flex-col-reverse md:flex-row gap-4 rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-6 shadow-2xl md:items-center md:justify-between">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
                                Dashboard
                            </span>
                            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                                Inscrições - Mochileiros 2.0
                            </h1>
                            <p className="mt-2 text-sm text-[#8A8A8A]">
                                Acompanhe pagamentos, participantes e dados cadastrais em tempo real.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Image src={kymaDark} alt="Logo Kyma" className="h-15 w-auto" />
                            <h1 className="text-2xl font-bold">Kyma</h1>
                        </div>
                    </header>

                    <section className="mb-10">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                            <StatCard
                                title="Valor Arrecadado"
                                value={`R$ ${stats.totalRevenue.toFixed(2).replace('.', ',')}`}
                                color="text-[#2EC4B6]"
                                subtitle="Somente pagamentos aprovados"
                            />

                            <StatCard
                                title="Valor Arrecadado"
                                value={`R$ ${stats.totalPedding.toFixed(2).replace('.', ',')}`}
                                color="text-[#FF7A18]"
                                subtitle="Somente pagamentos pendentes"
                            />

                            <StatCard
                                title="Total de Inscrições"
                                value={stats.total}
                                color="text-[#FF7A18]"
                                subtitle="Pagas, pendentes e rejeitadas"
                            />

                            <StatCard
                                title="Pagamentos Aprovados"
                                value={stats.approved}
                                color="text-[#2EC4B6]"
                                subtitle="Inscrições confirmadas"
                            />

                            <StatCard
                                title="Pagamentos Pendentes"
                                value={stats.pending}
                                color="text-[#F4A261]"
                                subtitle="Aguardando confirmação"
                            />

                            <StatCard
                                title="Pagamentos Rejeitados"
                                value={stats.rejected}
                                color="text-[#E63946]"
                                subtitle="Erro ou rejeição"
                            />
                        </div>
                    </section>

                    <section>
                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
                                    Informações
                                </span>
                                <h2 className="mt-2 text-3xl font-black">
                                    Lista de Inscrições
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Buscar nome, email, CPF, cidade..."
                                    className="w-full rounded-2xl border border-white/10 bg-[#2A2A2A] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#8A8A8A] focus:border-[#FF7A18] sm:min-w-[320px]"
                                />

                                <select
                                    value={statusFilter}
                                    onChange={e => setStatusFilter(e.target.value)}
                                    className="rounded-2xl border border-white/10 bg-[#2A2A2A] px-5 py-4 text-sm text-white outline-none transition focus:border-[#FF7A18]"
                                >
                                    <option value="all">Todos os status</option>
                                    <option value="approved">Aprovado</option>
                                    <option value="pending">Pendente</option>
                                    <option value="rejected">Rejeitado</option>
                                    <option value="error">Erro</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6 text-sm text-[#8A8A8A]">
                            Exibindo {filteredRegistrations.length} de {dataTicket.length} inscrições.
                        </div>

                        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1A1A1A] shadow-2xl">
                            <div className="custom-scroll overflow-x-auto scrollbar-hide">
                                <table className="w-full min-w-[2400px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-[#2A2A2A]">
                                            {[
                                                'Nome',
                                                'Email',
                                                'Celular',
                                                'CPF',
                                                'Valor',
                                                'Metodo de Pagamento',
                                                'id do Pagamento',
                                                'Status',
                                                'Nascimento',
                                                'CEP',
                                                'Rua',
                                                'Numero',
                                                'Bairro',
                                                'Cidade',
                                                'Rg',
                                                'Medicamentos',
                                                'Saude',
                                                'Restrições',
                                                'Nome do Pagador',
                                                'CPF do Pagador',
                                                'Aceito dos Termos',
                                            ].map(column => (
                                                <th
                                                    key={column}
                                                    className="whitespace-nowrap px-5 py-5 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A18]"
                                                >
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredRegistrations.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-white/5 transition hover:bg-white/5"
                                            >
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.phone}</TableCell>
                                                <TableCell>{item.document}</TableCell>
                                                <TableCell>R$ {item.transaction_amount},00</TableCell>
                                                <TableCell>{item.payment_method_id}</TableCell>
                                                <TableCell>{item.id_payment}</TableCell>
                                                <td className="px-5 py-5">
                                                    <span
                                                        className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] ${item.status_payment === 'approved'
                                                            ? 'bg-[#2EC4B6]/15 text-[#2EC4B6]'
                                                            : item.status_payment === 'pending'
                                                                ? 'bg-[#F4A261]/15 text-[#F4A261]'
                                                                : 'bg-[#E63946]/15 text-[#E63946]'
                                                            }`}
                                                    >
                                                        {item.status_payment}
                                                    </span>
                                                </td>
                                                <TableCell>{item.birth}</TableCell>
                                                <TableCell>{item.cep}</TableCell>
                                                <TableCell>{item.street}</TableCell>
                                                <TableCell>{item.number}</TableCell>
                                                <TableCell>{item.district}</TableCell>
                                                <TableCell>{item.city}</TableCell>
                                                <TableCell>{item.rg}</TableCell>
                                                <TableCell>{item.useMedication}</TableCell>
                                                <TableCell>{item.healthProblem}</TableCell>
                                                <TableCell>{item.foodRestriction}</TableCell>
                                                <TableCell>{item.paymentname}</TableCell>
                                                <TableCell>{item.paymentcpf}</TableCell>
                                                <TableCell>{(item.acceptTheTerms ? 'Sim' : 'Não')}</TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

function StatCard({ title, value, subtitle, color }) {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-6 shadow-2xl transition hover:-translate-y-1 hover:border-[#FF7A18]/30">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A8A8A]">
                {title}
            </p>

            <div className={`mt-4 text-3xl font-black sm:text-4xl ${color}`}>
                {value}
            </div>

            <p className="mt-3 text-sm leading-6 text-[#CFCFCF]">
                {subtitle}
            </p>
        </div>
    )
}

function TableCell({ children }) {
    return (
        <td className="max-w-[180px] px-5 py-5 align-top text-sm text-[#CFCFCF]">
            <div className="custom-scroll overflow-x-auto whitespace-nowrap scrollbar-hidden">
                <div className="w-max min-w-full pr-2">
                    {children}
                </div>
            </div>
        </td>
    )
}
