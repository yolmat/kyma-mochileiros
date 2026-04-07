'use client'

import { useState, useEffect } from "react"
import MochileirosBanner from '@/public/MochileirosBanner.png'
import kymaDark from '@/public/kymaLight.png'
import Image from "next/image"
import Logo from "@/components/logo"
import ButtonLinks from "@/components/buttonLinks"

export default function MochileirosLandingPage() {
  const eventDate = new Date('2026-08-28T18:00:00').getTime()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen scroll-smooth">
      <Countdown eventDate={eventDate} />
    </div>
  )
}

function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      })
    }

    updateCountdown()

    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [eventDate])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0D0D0D]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <Logo
            size={8}
            name={true}
            extraTag={(<p className="text-xs text-[#8A8A8A]">Mochileiros 2.0</p>)}
          />

          <nav className="flex flex-wrap items-center justify-center gap-4 text-center text-xs font-medium sm:gap-6 sm:text-sm md:justify-end md:gap-8">
            <a href="#sobre" className="text-[#CFCFCF] transition hover:text-[#FF7A18]">
              Sobre
            </a>
            <a href="#programacao" className="text-[#CFCFCF] transition hover:text-[#FF7A18]">
              Programação
            </a>
            <a href="#inscricao" className="text-[#CFCFCF] transition hover:text-[#FF7A18]">
              Inscrição
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section
          id='inicio'
          className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center px-6"
          style={{
            backgroundImage: `linear-gradient(rgba(13,13,13,0.45), rgba(13,13,13,0.65)), url(${MochileirosBanner.src})`,
          }}
        >
          <div className="mx-auto grid max-w-7xl gap-12 pt-40 sm:pt-44 lg:grid-cols-2 lg:items-center lg:pt-28">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-[#2EC4B6]/30 bg-[#2EC4B6]/10 px-4 py-2 text-sm font-medium text-[#2EC4B6]">
                Kyma • Agosto de 2026
              </span>

              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
                Mochileiros <span className="text-[#FF7A18]">2.0</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#CFCFCF]">
                28 de agosto de 2026 até 30 de agosto de 2026
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ButtonLinks
                  href={'#inscricao'}
                  typeButton={'action'}
                  internal={true}
                >
                  Faça sua Inscrição
                </ButtonLinks>

                <ButtonLinks
                  href={'#sobre'}
                  typeButton={'information'}
                  internal={true}
                >
                  Saiba Mais
                </ButtonLinks>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1A]/90 p-8 shadow-2xl backdrop-blur-xl">
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#8A8A8A]">
                Contagem Regressiva
              </p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <CountdownCard value={timeLeft.days} />
                <CountdownCard value={timeLeft.hours} />
                <CountdownCard value={timeLeft.minutes} />
                <CountdownCard value={timeLeft.seconds} />
              </div>

              <div className="mt-8 rounded-2xl border border-[#2EC4B6]/20 bg-[#2EC4B6]/10 p-4 text-center text-sm text-[#CFCFCF]">
                O evento começa em 28/08/2026 às 18:00h
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-[#1A1A1A] px-6 py-28">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[#0D0D0D] p-10 shadow-2xl md:p-16">
            <div className="mb-12">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
                Sobre o Evento
              </span>
              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                PREPARADOS?
              </h2>
            </div>

            <div className="space-y-8 text-lg leading-9 text-[#CFCFCF]">
              <p className="text-2xl font-bold text-[#FF7A18]">
                1 FOI BOM. 2 SERÁ DEMAIS!
              </p>

              <p>Ele foi pedido e desejado por muitos.</p>

              <p className="text-2xl font-bold text-white">
                MOCHILEIROS 2.0 VAI ACONTECER!
              </p>

              <blockquote className="rounded-2xl border-l-4 border-[#FF7A18] bg-[#1A1A1A] p-6 italic text-white">
                &ldquo;Deus abençoou o sétimo dia e o declarou santo, pois foi o dia em que ele descansou de toda a sua obra de criação.&rdquo; Gênesis 2:3
              </blockquote>

              <p>
                Quando falamos que Deus descansou, não dizemos que Ele parou para relaxar, mas que Ele agora contemplava tudo o que havia feito e enchia a Terra com sua glória.
              </p>

              <p>
                Passaremos alguns dias em família, isolados em um sítio, contemplando tudo aquilo que Deus fez e nos enchendo de sua presença.
              </p>

              <p>
                Prepare sua mochila, seu sapato, sua bíblia e sua cruz e venha se esvaziar do mundo e se encher do Glória de Deus.
              </p>
            </div>
          </div>
        </section>

        <section id="programacao" className="bg-[#0D0D0D] px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
                Programação
              </span>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Agenda do Mochileiros 2.0
              </h2>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1A1A1A] shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#2A2A2A] text-left">
                      <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-[#FF7A18]">
                        Horário
                      </th>
                      <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-[#FF7A18]">
                        Atividade
                      </th>
                      <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-[#FF7A18]">
                        Descrição
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b border-white/5 transition hover:bg-white/5">
                      <td className="px-8 py-7 font-bold text-white">19:30h</td>
                      <td className="px-8 py-7 text-[#2EC4B6] font-semibold">Saída</td>
                      <td className="px-8 py-7 leading-7 text-[#CFCFCF]">
                        O ônibus sairá da igreja às 20h30. <br />
                        <span className="font-semibold text-[#E63946]">
                          ATENÇÃO: Não será permitido ida ao sítio em carro particular.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="inscricao" className="bg-[#1A1A1A] px-6 py-28">
          <div className="mx-auto max-w-6xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
              Inscrição
            </span>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Escolha Seu Lote
            </h2>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <LotCard
                title="1º Lote"
                date="31 de maio"
                price="R$ 250,00"
                spots="15 vagas"
                featured
              />

              <LotCard
                title="2º Lote"
                date="05 de julho"
                price="R$ 300,00"
                spots="25 vagas"
                blurred
              />

              <LotCard
                title="3º Lote"
                date="15 de agosto"
                price="R$ 350,00"
                spots="10 vagas"
                blurred
              />
            </div>

            <ButtonLinks
              href={'/checkout'}
              typeButton={'action'}
              extraClass={'mt-14 px-10 py-5 text-lg'}
            >
              Faça sua Inscrição
            </ButtonLinks>

          </div>
        </section>

        <section className="bg-[#0D0D0D] px-6 py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-12 text-center shadow-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2EC4B6]">
              Redes
            </span>

            <h2 className="mt-4 text-4xl font-black">
              Acompanhe a Kyma
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#CFCFCF]">
              Fique por dentro de novidades, avisos e atualizações do evento Mochileiros 2.0.
            </p>

            <ButtonLinks
              href={"https://www.instagram.com/triakyma/"}
              target={true}
              typeButton={'social'}
            >
              Instagram da Kyma
            </ButtonLinks>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0D0D0D] px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3">
          <Image src={kymaDark} alt="Logo Kyma" className="h-8 w-auto" />
          <span className="text-lg font-bold">Kyma</span>
        </div>
      </footer>
    </>
  )
}

function CountdownCard({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-6 text-center">
      <div className="text-4xl font-black text-[#FF7A18] md:text-4xl">{value}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.3em] text-[#8A8A8A]">{label}</div>
    </div>
  )
}

function LotCard({ title, date, price, spots, featured, blurred }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-8 text-left shadow-2xl transition ${featured
        ? 'border-[#FF7A18]/40 bg-[#0D0D0D]'
        : 'border-white/10 bg-[#0D0D0D]'
        }`}
    >
      {blurred && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0D0D0D]/30 backdrop-blur-3xl">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-[#8A8A8A]">
            Em Breve
          </span>
        </div>
      )}

      <div className={blurred ? 'blur-md' : ''}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-white">{title}</h3>
          {featured && (
            <span className="rounded-full bg-[#FF7A18]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#FF7A18]">
              Disponível
            </span>
          )}
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#8A8A8A]">Término do lote</p>
            <p className="mt-2 text-xl font-bold text-[#CFCFCF]">{date}</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#8A8A8A]">Valor</p>
            <p className="mt-2 text-3xl font-black text-[#2EC4B6]">{price}</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#8A8A8A]">Quantidade</p>
            <p className="mt-2 text-xl font-bold text-[#CFCFCF]">{spots}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
