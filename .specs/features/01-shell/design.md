# Design — Feature 01 Shell

## Estrutura de Arquivos

```
src/
├── main.tsx                    # Entry point + Router
├── App.tsx                     # Router provider
├── layouts/
│   └── AppLayout.tsx           # Sidebar + Header wrapper
├── components/
│   ├── Sidebar.tsx             # Navegação lateral
│   ├── Header.tsx              # Header global
│   └── ui/                     # shadcn/ui components (gerados via CLI)
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── table.tsx
│       ├── drawer.tsx
│       ├── tabs.tsx
│       ├── select.tsx
│       ├── avatar.tsx
│       └── progress.tsx
├── context/
│   └── AppDataContext.tsx      # Global data provider
├── data/
│   └── seed.ts                 # Mock data completo
├── types/
│   └── index.ts                # TypeScript interfaces
└── pages/
    ├── Dashboard.tsx
    ├── Projetos.tsx
    ├── Beneficiarios.tsx
    ├── Doadores.tsx
    ├── RelatoriosIA.tsx
    └── Assistente.tsx
```

## Componente AppLayout

```
<div className="flex h-screen bg-background">
  <Sidebar />                          // w-60, fixed
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header />                         // h-16, sticky
    <main className="flex-1 overflow-y-auto p-6">
      <Outlet />                       // React Router
    </main>
  </div>
</div>
```

## Sidebar — Estrutura Visual

```
┌─────────────────────────┐
│ [logo] ImpactOS         │
│         Instituto Semear│
├─────────────────────────┤
│ GESTÃO                  │
│ ▪ Dashboard      (ativo)│
│   Projetos              │
│   Beneficiários         │
│   Doadores              │
├─────────────────────────┤
│ INTELIGÊNCIA            │
│   Relatórios IA  [IA]   │
│   Assistente     [IA]   │
├─────────────────────────┤
│ ● Plano Crescer         │
│ 8 de 10 projetos        │
│ [████████░░] 80%        │
├─────────────────────────┤
│ [MA] Marina Alves    ↓  │
│      Diretora Executiva │
└─────────────────────────┘
```

## Tipos TypeScript

```typescript
// src/types/index.ts
export interface Organization {
  id: string
  name: string
  plan: 'crescer' | 'expandir' | 'transformar'
  projectsUsed: number
  projectsLimit: number
}

export interface User {
  id: string
  name: string
  role: string
  initials: string
}

export interface Project {
  id: string
  name: string
  category: string
  categoryColor: string
  status: 'em_andamento' | 'planejamento' | 'concluido'
  description: string
  beneficiaries: number
  actions: number
  raised: number
  ods: number[]
  startDate: string
  endDate: string
  icon: string
}

export interface Beneficiary {
  id: string
  name: string
  initials: string
  gender: 'Masculino' | 'Feminino'
  ageRange: string
  city: string
  project: string
  actions: number
}

export interface Donor {
  id: string
  name: string
  initials: string
  email: string
  segment: 'Grande doador' | 'Recorrente' | 'Eventual'
  totalDonated: number
  lastDonation: string
  origin: string
  engagement: number
  atChurnRisk: boolean
}

export interface KPI {
  label: string
  value: string
  delta: number
  deltaType: 'up' | 'down'
  icon: string
}
```

## Roteamento

```typescript
// src/main.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'projetos', element: <Projetos /> },
      { path: 'beneficiarios', element: <Beneficiarios /> },
      { path: 'doadores', element: <Doadores /> },
      { path: 'relatorios', element: <RelatoriosIA /> },
      { path: 'assistente', element: <Assistente /> },
    ],
  },
])
```
