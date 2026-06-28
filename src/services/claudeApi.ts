import { callLLM } from './llmService'

interface GenerateReportParams {
  reportType: string
  project: string
  tone: string[]
}

const MOCK_REPORT = `## Resumo Executivo

Em junho de 2026, o Instituto Semear atingiu seu melhor resultado semestral, consolidando crescimento de **18,2%** na captação e superando a meta de 1.200 beneficiários para o período. A diversificação dos projetos e a maturidade do CRM de doadores foram os fatores determinantes para esse desempenho, reforçando a capacidade institucional de ampliar impacto com eficiência.

## Insights Acionáveis

- **Risco de churn é a prioridade imediata**: 38 doadores em risco representam ~R$ 22k em recorrência mensal. Uma campanha personalizada nas próximas 2 semanas pode recuperar 50–60% desse valor.
- **Prato Cheio lidera em alcance e ROI**: Com 540 beneficiários e maior arrecadação, o projeto tem capacidade de absorver **30% mais famílias** com apenas 15% de aumento orçamentário — candidato natural à expansão geográfica.
- **Semear Digital abaixo do potencial**: Concentração de ações em poucas oficinas indica oportunidade para parcerias com empresas de tecnologia, podendo dobrar o alcance sem custo adicional relevante.

## Perspectivas para o Q3/2026

O foco estratégico deve ser a expansão do **Prato Cheio** e o lançamento dos projetos Arte & Cidadania e Casa Abrigo, projetando alcançar **1.500 beneficiários** até setembro. Em paralelo, a revisão do ticket médio — atualmente R$ 185, abaixo da meta de R$ 210 — e a campanha de reativação são as duas alavancas operacionais com maior potencial de retorno no curto prazo.`

const SYSTEM = `Você é o analista de impacto social do Instituto Semear. Os dados numéricos JÁ estão exibidos visualmente no relatório — não repita tabelas ou listas de dados.

Escreva APENAS análise narrativa e estratégica com 3 seções em Markdown:

## Resumo Executivo
2-3 frases contextualizando os resultados no cenário mais amplo. Foque em tendências e significado, não em números que já aparecem nos cards.

## Insights Acionáveis
3 bullets curtos e diretos com recomendações concretas para a liderança. Cada bullet deve começar com o tema em **negrito**.

## Perspectivas para o Q3/2026
2-3 frases sobre prioridades e projeções para o próximo trimestre.

Dados de referência (junho 2026):
- Total arrecadado: R$ 487.250 (+18% vs. mês anterior)
- Beneficiários ativos: 1.284 em 7 cidades
- Projetos ativos: 8 | Ações: 142
- Doadores: 312 ativos, 38 em risco de churn, retenção D30: 64%, ticket médio R$ 185
- Projetos: Prato Cheio (R$ 148k, 540 benef.), Educação Transforma (R$ 118,9k, 320 benef.), Mãos que Cuidam (R$ 89k, 95 benef.)`

export async function generateReport({ reportType, project, tone }: GenerateReportParams): Promise<string> {
  const result = await callLLM({
    systemPrompt: SYSTEM,
    messages: [{
      role: 'user',
      content: `Gere a análise narrativa do ${reportType} com tom ${tone.join(', ')} focando em ${project}. Português brasileiro. Máximo 300 palavras.`,
    }],
    maxTokens: 1024,
  })

  if (result === null) {
    await new Promise((r) => setTimeout(r, 1500))
    return MOCK_REPORT
  }

  return result
}
