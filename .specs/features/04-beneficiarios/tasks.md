# Tasks — Feature 04 Beneficiários

## T04.1 — InitialsAvatar Component
- Criar `src/components/InitialsAvatar.tsx`
- Props: initials (string), name (string)
- Cor de fundo baseada na primeira letra (hash → paleta de 6 cores)
- Texto branco sobre fundo colorido
- Tamanho: 32px (tabela) ou 40px (props)
- **Verify**: AC → indigo, JP → verde, MA → âmbar (cores consistentes)

## T04.2 — StatCard Component (simples, sem ícone)
- Criar `src/components/StatCard.tsx`
- Props: label, value
- Card branco, label em cima (cinza), valor grande abaixo
- **Verify**: Renderiza os 4 cards de Beneficiários

## T04.3 — Beneficiarios Page
- Criar `src/pages/Beneficiarios.tsx`
- 4 StatCards no topo
- Tabela usando shadcn/ui Table
- Linhas com InitialsAvatar, ProjectBadge
- Botões Filtrar e Cadastrar (visual only)
- Conectar ao `useAppData()`
- **Verify**: Fiel ao design 03-Beneficiarios.png

## Dependências
T01 completo → T04.1 + T04.2 (paralelos) → T04.3
