# PET FELIZ Study

Plataforma interativa para estudo de **Plano de Negócios** usando o caso PET FELIZ como fio condutor.

## Objetivo

Transformar o material acadêmico do PET FELIZ em uma experiência de aprendizagem ativa. O estudante não apenas lê conceitos: ele responde questões, recebe explicações, revisa erros, toma decisões gerenciais e observa o negócio melhorar ou piorar.

## O que já está implementado

- 12 módulos progressivos
- Conteúdo ampliado a partir do caso PET FELIZ
- Metas de domínio por módulo
- 24 questões conceituais e aplicadas
- Feedback explicativo imediato
- Fila de revisão de erros
- Recuperação ativa e mistura de conceitos antigos
- Simulação empresarial após cada módulo
- Indicadores do PET FELIZ:
  - estratégia
  - cliente
  - marca
  - operação
  - finanças
- Índice geral de prosperidade
- Simulado aleatório de 20 questões
- Melhor nota registrada
- Persistência de progresso com localStorage
- Interface responsiva para desktop e celular
- Página de fontes e metodologia pedagógica

## Caso-base

O projeto preserva os principais dados do documento fornecido para estudo:

- PET FELIZ em Feliz/RS
- sociedade limitada
- Flávio da Silva e Ana da Silva com 50% cada
- Ana como administradora
- missão, visão e valores originais
- público: tutores de cães e gatos
- gasto médio informado: R$ 190/mês
- diferenciais: alimentação saudável, hospedagem, creche, adestramento, pet sitter e dog walker
- crescimento de mercado informado: 30% a 35% ao ano
- investimento: R$ 194.750,00
- recursos: 100% próprios
- lucratividade: 9,51%
- rentabilidade: 70,99% ao ano
- retorno: 1,4 anos

Os módulos adicionais expandem o estudo com segmentação, posicionamento, 4 Ps, jornada, capacidade operacional, governança, SWOT, cenários, riscos e integração estratégica.

## Metodologia de aprendizagem

A interface foi desenhada em torno de três princípios:

1. **Recuperação ativa** — tentar lembrar e responder antes de reler.
2. **Prática distribuída** — erros e conceitos antigos retornam em revisões.
3. **Interleaving** — conceitos semelhantes são misturados para treinar discriminação.

Referências acadêmicas e gerenciais estão disponíveis dentro da própria aplicação.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publicar no Vercel

1. Importe este repositório no Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy.

O arquivo `vercel.json` já inclui rewrite para a SPA.

## Arquitetura

```
src/
  App.tsx       # navegação, progresso, quizzes, revisão, simulado e simulador
  data.ts       # currículo, questões, decisões e referências
  main.tsx      # bootstrap React
  styles.css    # design system e responsividade
```

## Persistência

A versão atual não exige backend. O progresso é salvo no navegador em `localStorage`. Isso torna a primeira versão simples de publicar e testar no Vercel.

Uma evolução futura pode adicionar autenticação e banco de dados para sincronizar progresso entre dispositivos, turmas e estudantes.
