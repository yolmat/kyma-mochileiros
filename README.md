# 🎒 Kyma Mochileiros

Aplicação web desenvolvida para o **Kyma Mochileiros**, com foco na experiência de compra, gerenciamento de reservas e processamento de pagamentos para viagens e experiências.

🌐 **Aplicação:** https://kyma-mochileiros.vercel.app

📦 **Repositório:** https://github.com/yolmat/kyma-mochileiros

---

## 📌 Sobre o projeto

O **Kyma Mochileiros** é uma aplicação web construída com **Next.js** para disponibilizar uma experiência digital de contratação de serviços e viagens.

O projeto combina uma interface orientada à experiência do usuário com recursos de backend, persistência de dados e integração com meios de pagamento.

A aplicação utiliza o **Next.js App Router**, Prisma como ORM, validação de dados com Zod e integração com o **Mercado Pago** para processamento de pagamentos.

---

## 🚀 Principais funcionalidades

A aplicação possui uma estrutura preparada para diferentes etapas da jornada do usuário:

* 🏠 Página principal
* 🧭 Apresentação das funcionalidades da plataforma
* 🎫 Fluxo de checkout
* 💳 Processamento de pagamentos
* 🧾 Fluxo de compra dividido em etapas
* 📊 Dashboard
* 🎟️ Consulta e gerenciamento de tickets
* 📥 Área de downloads
* 🔌 API interna utilizando recursos do Next.js
* 🗄️ Persistência de dados utilizando Prisma
* ✅ Validação de dados utilizando Zod
* ✨ Animações e transições utilizando Framer Motion

A estrutura atual do projeto contém áreas específicas para `checkout`, `dashboard`, `downloads`, `features`, `ticket` e `api`.

---

# 🧱 Stack

| Camada          | Tecnologia              |
| --------------- | ----------------------- |
| Framework       | Next.js 16              |
| Frontend        | React 19                |
| Linguagem       | JavaScript              |
| Estilização     | Tailwind CSS 4          |
| UI/Componentes  | React                   |
| Formulários     | React Hook Form         |
| Validação       | Zod                     |
| ORM             | Prisma                  |
| Banco de dados  | PostgreSQL              |
| Pagamentos      | Mercado Pago            |
| Animações       | Framer Motion           |
| Deploy          | Vercel                  |
| Containerização | Docker / Docker Compose |

As versões e dependências acima são baseadas no `package.json` atual do repositório.

---

# 🏗️ Arquitetura

O projeto utiliza o **App Router do Next.js**, concentrando páginas, APIs e componentes dentro da estrutura da aplicação.

Fluxo simplificado:

```text
                    ┌─────────────────┐
                    │     Usuário     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Next.js     │
                    │   App Router    │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
       ┌─────────────┐               ┌─────────────┐
       │    Pages    │               │     API     │
       │  /app       │               │  /app/api   │
       └──────┬──────┘               └──────┬──────┘
              │                             │
              │                             ▼
              │                     ┌─────────────┐
              │                     │   Prisma    │
              │                     └──────┬──────┘
              │                            │
              │                            ▼
              │                     ┌─────────────┐
              │                     │ PostgreSQL  │
              │                     └─────────────┘
              │
              ▼
       ┌─────────────┐
       │ Components  │
       └─────────────┘
```

Para pagamentos, existe uma integração específica com o **Mercado Pago**, utilizando tanto o SDK React quanto o SDK oficial para Node.js.

---

# 📂 Estrutura do projeto

A estrutura atual do repositório é organizada da seguinte maneira:

```text
kyma-mochileiros/
│
├── app/
│   ├── api/
│   ├── checkout/
│   ├── dashboard/
│   ├── downloads/
│   ├── features/
│   ├── ticket/
│   │
│   ├── configs.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── payment.js
│   ├── step1.js
│   ├── step2.js
│   └── step3.js
│
├── lib/
│
├── prisma/
│
├── public/
│
├── .vscode/
│
├── docker-compose.yml
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── prisma.config.ts
├── tailwind.config.js
└── vercel.json
```

---

## 📁 `app/`

Principal diretório da aplicação.

O projeto utiliza o **App Router**, permitindo organizar páginas, rotas e APIs diretamente dentro dessa estrutura.

### `app/api`

Contém as APIs internas utilizadas pela aplicação.

### `app/checkout`

Responsável pelo fluxo de checkout e processamento da jornada de compra.

### `app/dashboard`

Área destinada ao gerenciamento e visualização de informações do usuário ou operação.

### `app/downloads`

Área relacionada aos downloads disponibilizados pela plataforma.

### `app/features`

Página ou conjunto de páginas responsáveis pela apresentação dos recursos da aplicação.

### `app/ticket`

Área relacionada aos tickets e informações associadas às compras/experiências.

---

# 🧩 Componentes

A pasta `components/` concentra componentes reutilizáveis da interface.

Atualmente existem componentes relacionados ao fluxo de pagamento e checkout:

```text
components/
├── payment.js
├── step1.js
├── step2.js
└── step3.js
```

Essa separação permite dividir processos complexos em etapas menores e reutilizáveis.

---

# 💳 Fluxo de Checkout

O checkout é dividido em componentes específicos:

```text
Checkout
   │
   ├── Step 1
   │
   ├── Step 2
   │
   ├── Step 3
   │
   └── Payment
```

Essa abordagem facilita:

* Separação de responsabilidades
* Validação individual de etapas
* Manutenção do fluxo
* Evolução da experiência de compra

---

# 💰 Pagamentos

O projeto possui integração com o **Mercado Pago**.

São utilizadas duas bibliotecas:

```text
@mercadopago/sdk-react
mercadopago
```

A primeira permite integração de recursos de pagamento no frontend React, enquanto o SDK `mercadopago` permite operações relacionadas ao processamento no ambiente JavaScript/Node.js.

O fluxo geral pode ser representado como:

```text
Usuário
   │
   ▼
Checkout
   │
   ▼
Dados da compra
   │
   ▼
Validação
   │
   ▼
Mercado Pago
   │
   ▼
Processamento
   │
   ▼
Resultado do pagamento
```

---

# ✅ Validação de dados

O projeto utiliza **Zod** para validação e **React Hook Form** para gerenciamento de formulários.

Exemplo conceitual:

```javascript
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
});
```

Isso permite garantir que os dados enviados pelos usuários estejam de acordo com o formato esperado antes de serem processados.

---

# 🗄️ Banco de dados

O projeto utiliza **Prisma ORM** para comunicação com o banco de dados.

Estrutura:

```text
prisma/
```

O Prisma atua como camada de abstração entre a aplicação e o banco relacional.

Fluxo:

```text
Next.js
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

A aplicação também executa `prisma generate` automaticamente durante o `postinstall` e antes do processo de build.

---

# 🐳 Docker

O repositório possui um `docker-compose.yml`, permitindo utilizar Docker para configurar serviços necessários ao ambiente de desenvolvimento ou execução da aplicação.

Para iniciar os serviços:

```bash
docker compose up -d
```

Para interromper:

```bash
docker compose down
```

---

# ⚙️ Instalação

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

* Node.js
* npm
* PostgreSQL ou ambiente equivalente
* Docker e Docker Compose, caso utilize o ambiente containerizado

---

## Clone o repositório

```bash
git clone https://github.com/yolmat/kyma-mochileiros.git

cd kyma-mochileiros
```

---

## Instale as dependências

```bash
npm install
```

Durante a instalação, o Prisma Client é gerado automaticamente pelo script `postinstall`.

---

# 🔐 Variáveis de ambiente

Crie um arquivo:

```text
.env
```

Configure as variáveis necessárias para:

```env
DATABASE_URL=""

MERCADOPAGO_ACCESS_TOKEN=""

MERCADOPAGO_PUBLIC_KEY=""
```

> Os nomes exatos das variáveis devem permanecer alinhados com os arquivos de configuração da aplicação. Nunca publique credenciais reais no GitHub.

---

# 🗃️ Prisma

Após configurar o banco:

```bash
npx prisma generate
```

Para executar migrations:

```bash
npx prisma migrate dev
```

Para visualizar os dados:

```bash
npx prisma studio
```

---

# ▶️ Executando localmente

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

O script `dev` utiliza diretamente o servidor de desenvolvimento do Next.js.

---

# 🏭 Build de produção

Para gerar uma build:

```bash
npm run build
```

O projeto gera o Prisma Client antes de executar o build do Next.js.

Depois:

```bash
npm start
```

---

# ☁️ Deploy

O projeto possui configuração para **Vercel** através do arquivo:

```text
vercel.json
```

O repositório também está associado a uma aplicação publicada em:

**https://kyma-mochileiros.vercel.app**

---

# 👨‍💻 Desenvolvimento

Projeto desenvolvido por **Mateus / yolmat**.

🔗 GitHub:
https://github.com/yolmat

🔗 Repositório:
https://github.com/yolmat/kyma-mochileiros
