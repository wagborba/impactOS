# Feature 04 — Beneficiários

## Objetivo

Cadastro e visualização de pessoas impactadas pelos projetos da organização.

## Requisitos

### BN-01 Cabeçalho da Página
- Título: "Beneficiários"
- Subtítulo: "Pessoas impactadas pelas ações da organização"

### BN-02 Cards de Estatísticas (4 cards)
| # | Label | Valor |
|---|-------|-------|
| 1 | Total de beneficiários | 1.284 |
| 2 | Novos este mês | 96 |
| 3 | Cidades atendidas | 7 |
| 4 | Faixa predominante | 0-12 anos |

Cards brancos, sem ícone colorido, apenas label + valor grande.

### BN-03 Tabela de Beneficiários
- Header: "Beneficiários cadastrados" + contagem "[N] registros"
- Botões: "≡ Filtrar" e "+ Cadastrar" (ação: MVP apenas visual)
- Colunas: NOME | GÊNERO | FAIXA ETÁRIA | CIDADE | PROJETO | AÇÕES
- Cada linha:
  - NOME: Avatar com iniciais coloridas + nome completo
  - GÊNERO: texto
  - FAIXA ETÁRIA: texto (ex: "0-12", "13-17", "18-29", "30-59")
  - CIDADE: texto
  - PROJETO: badge/pílula com nome do projeto
  - AÇÕES: número (contagem de ações que o beneficiário participou)

### BN-04 Seed Data — Beneficiários
| Nome | Iniciais | Gênero | Faixa | Cidade | Projeto | Ações |
|------|---------|--------|-------|--------|---------|-------|
| Ana Clara Souza | AC | Feminino | 0-12 | São Paulo | Educação que Transforma | 8 |
| João Pedro Lima | JP | Masculino | 13-17 | São Paulo | Jovem Protagonista | 5 |
| Maria Aparecida Reis | MA | Feminino | 30-59 | Guarulhos | Prato Cheio | 12 |
| Lucas Ferreira | LF | Masculino | 18-29 | Osasco | Semear Digital | 6 |
| Carla Santos | CS | Feminino | 0-12 | São Paulo | Educação que Transforma | 9 |
| Pedro Oliveira | PO | Masculino | 30-59 | Mauá | Mãos que Cuidam | 3 |
| Beatriz Almeida | BA | Feminino | 13-17 | São Paulo | Jovem Protagonista | 7 |
| Roberto Costa | RC | Masculino | 60+ | São Bernardo | Prato Cheio | 4 |
| Fernanda Lima | FL | Feminino | 18-29 | Diadema | Semear Digital | 11 |
| Marcos Paulo | MP | Masculino | 0-12 | Guarulhos | Educação que Transforma | 6 |

### BN-05 Cores dos Avatares
- Iniciais com fundo colorido (rotação de cores: indigo, verde, âmbar, roxo, rosa, laranja)
- Cor consistente por letra inicial

## Critérios de Aceitação

- [ ] 4 stat cards com valores corretos
- [ ] Tabela renderiza 10+ beneficiários
- [ ] Avatar com iniciais coloridas em cada linha
- [ ] Badge do projeto em cada linha
- [ ] Tabela com cabeçalho correto (colunas)
