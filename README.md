# ImpactOS

Plataforma SaaS de gestão de impacto social para ONGs e institutos. Centralize projetos, beneficiários, doadores e relatórios — com inteligência artificial integrada.

## Funcionalidades

- **Dashboard executivo** — KPIs, gráfico de arrecadação e retenção de doadores
- **Gestão de projetos** — CRUD completo com ícones, categorias, ODS e arquivamento
- **Cadastro de beneficiários** — com filtros por gênero, faixa etária, cidade e projeto
- **CRM de doadores** — segmentação, alertas de churn e campanhas de reativação
- **Relatórios com IA** — layout visual com gráficos por projeto, exportação PDF e DOCX
- **Assistente IA** — chat em linguagem natural sobre os dados da organização
- **Configurações de IA** — suporte a Anthropic Claude, OpenAI GPT e Google Gemini
- **Autenticação** — login com e-mail/senha ou Google

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3 + shadcn/ui
- React Router v6
- Recharts (gráficos)
- Context API (estado global)

---

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- npm 9 ou superior

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/wagborba/impactOS.git
cd impactOS
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.local.example .env.local
```

> Se o arquivo `.env.local.example` não existir, crie `.env.local` manualmente (veja a seção de configuração abaixo).

**4. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

**5. Crie sua conta**

Na tela de login, clique em **Criar conta** e preencha nome, cargo, e-mail e senha. Você também pode entrar com **Google** (modo simulado para desenvolvimento).

---

## Configuração de IA

O ImpactOS suporta três provedores de IA para os módulos **Relatórios**, **Assistente** e **Copiloto**. Sem configuração, a plataforma funciona normalmente com dados de demonstração (mock).

### Opção A — Configurar pela interface (recomendado)

1. Faça login na plataforma
2. Clique no seu nome no canto inferior esquerdo da sidebar
3. Acesse **Configurações**
4. Na seção **Inteligência Artificial**, escolha o provedor e insira sua chave de API
5. Clique em **Testar conexão** para verificar
6. Salve as configurações

A chave fica armazenada apenas no seu navegador (localStorage) e nunca é enviada para nenhum servidor além do próprio provedor escolhido.

### Opção B — Variável de ambiente (Anthropic Claude)

Se preferir configurar via `.env.local` para uso com Claude, crie o arquivo:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
```

> Esta variável é reconhecida automaticamente como fallback quando não há configuração salva pela interface.

### Provedores suportados

| Provedor | Modelos disponíveis | Onde obter a chave |
|---|---|---|
| **Anthropic Claude** | Haiku, Sonnet, Opus | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI GPT** | GPT-4o, GPT-4o-mini, GPT-3.5 | [platform.openai.com](https://platform.openai.com) |
| **Google Gemini** | Gemini 1.5 Flash, 1.5 Pro, 2.0 Flash | [aistudio.google.com](https://aistudio.google.com) |

> **Atenção:** as chamadas de IA são feitas diretamente do navegador para a API do provedor. Não exponha sua chave em repositórios públicos.

---

## Build para produção

```bash
npm run build
```

Os arquivos estáticos são gerados em `dist/`. Podem ser hospedados em qualquer CDN ou serviço de hosting estático (Vercel, Netlify, GitHub Pages, etc.).

### Deploy na Vercel (exemplo)

```bash
npm install -g vercel
vercel --prod
```

Configure a variável `VITE_ANTHROPIC_API_KEY` nas configurações de ambiente do projeto na Vercel caso queira usar Claude como padrão.

---

## Estrutura do projeto

```
impactOS/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── context/          # AuthContext, AppDataContext
│   ├── data/             # Dados de demonstração (seed.ts)
│   ├── layouts/          # AppLayout
│   ├── pages/            # Dashboard, Projetos, Doadores, etc.
│   ├── services/         # claudeApi, assistantApi, llmService, llmConfig
│   └── types/            # Interfaces TypeScript
├── .specs/               # Especificações do produto (spec-driven development)
├── .env.local            # Variáveis de ambiente (não versionado)
└── ...
```

---

## Dados de demonstração

A plataforma vem pré-carregada com dados fictícios do **Instituto Semear** — uma ONG de exemplo com 8 projetos, 10 beneficiários, 10 doadores e histórico de arrecadação. Os dados são gerados em memória a cada sessão a partir de `src/data/seed.ts` e não persistem entre recarregamentos de página.

---

## Licença

MIT
