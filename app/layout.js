import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kyma - Mochileiros 2.0",
  description: "Compre seu acesso para o Mochileiros 2.0",
  keywords: ["Ingresso", "Kyma", "Mochileiros", "Quadrangular"],
  openGraph: {
    title: "Kyma - Mochileiros 2.0",
    description: "Compre seu acesso para o Mochileiros 2.0",
    url: "https://kyma.msaraiva.dev.br/",
    siteName: "Mochileiros 2.0",
    images: [
      {
        url: "kymaLight.png",
        width: 1200,
        height: 630,
        alt: "Logo Kyma",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/kymaDark.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <nav className="text-center">
          <Link href="https://api.whatsapp.com/send?phone=5511986619079&text=Ol%C3%A1%2C%0AEstou%20com%20duvida%20quanto%20ao%20Mochileiros%202.0" target="_blank">
            <p>Suporte</p>
          </Link>
        </nav>
      </body>
    </html>
  );
}
