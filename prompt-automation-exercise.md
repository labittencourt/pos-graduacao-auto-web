# Prompt — Automação E2E do Automation Exercise (TCs 1, 2, 3, 4, 5, 8, 9, 10, 15, 16)

> Como usar: copie as User Stories para `docs/user-stories/automation-exercise-user-stories.md` no repositório de trabalho e cole TUDO abaixo da linha no Claude Code (VS Code). Antes, ajuste a seção "Decisões que ficam com o humano" se a ferramenta da disciplina não for Playwright + TypeScript.

---

## Papel e objetivo

Você é o orquestrador do meu sistema de agentes de QA. Quero conduzir, ponta a ponta, o ciclo completo de uma entrega: das user stories até uma suíte E2E web automatizada, rodando em GitHub Actions, com relatório. Isto também é um teste dos agentes: onde um agente falhar, errar ou inventar algo, quero que isso fique registrado, não escondido.

## Contexto

- Trabalho final individual da pós-graduação em automação (PGATS), disciplina de automação de testes na camada web.
- Aplicação: https://www.automationexercise.com (site público e compartilhado, fictício, de prática).
- Escopo: casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 da página https://www.automationexercise.com/test_cases
- As user stories derivadas desses casos estão em `docs/user-stories/automation-exercise-user-stories.md`. Esse arquivo é a fonte de verdade dos requisitos. Os casos de teste originais são a referência de rastreabilidade.
- Prazo de entrega: 31/10/2026, 23:59:59. Entrega por link do GitHub.

## Critérios de avaliação do trabalho (a suíte final precisa cumprir todos)

1. Execução via GitHub Actions.
2. Execução sem quebras (sem testes falhando nem instáveis).
3. Uso adequado de seletores e padrões.
4. Boas práticas.
5. Relatórios.

## Decisões que ficam com o humano (não decida sozinho; pergunte antes da Fase 3)

- Ferramenta: padrão proposto = Playwright + TypeScript. Confirme comigo; a disciplina pode exigir outra.
- Formato de relatório: padrão proposto = relatório HTML nativo + Allure, publicados como artefato do Actions.
- Os pontos abertos da seção "Lacunas e perguntas em aberto" das user stories.

## Regras de conduta (valem para todos os agentes)

- Não invente comportamento do site. Tudo que não estiver nos casos de teste deve ser observado no site real ou marcado como suposição.
- Quando o site real divergir da user story, registre a divergência em `docs/divergencias.md` (story, o esperado, o observado, evidência). Não ajuste a story em silêncio e não ajuste o teste para "passar".
- Pare ao fim de cada fase e me mostre o resultado antes de seguir. Eu aprovo ou corrijo.
- Dê o seu nível de confiança quando houver incerteza.
- Nada de dados reais: cartão, senha e dados pessoais são fictícios e gerados.
- Não mascare instabilidade com retries, `sleep` ou timeouts enormes. Se um teste é instável, diagnostique a causa.

## Fases

### Fase 1 — Análise das user stories (quality gate)
Analise as 11 stories: coerência, completude e testabilidade, com nota por story e veredito PASS / CONDITIONAL / FAIL. Aponte ambiguidades e contradições. Proponha reescritas apenas onde o gate exigir, sem mudar o escopo dos casos de teste. Entregável: `docs/analise-us.md`. Pare e me pergunte sobre as lacunas.

### Fase 2 — Cenários e estratégia
Para cada story, gere cenários de teste com mentalidade RST: separe o que é checagem (confirmar) do que é teste (investigar). Os critérios das stories devem estar cobertos, e proponha poucos cenários extras de risco, claramente marcados como extras (não implementar sem minha aprovação). Defina a estratégia de dados: e-mail único por execução, conta criada por API ou UI no setup, remoção no teardown, nenhum usuário fixo. Entregável: `docs/cenarios.md` e `docs/estrategia-dados.md`.

### Fase 3 — Engenharia reversa do site
Navegue o site real, no escopo dos 10 casos, e levante: URLs, seletores estáveis (prefira atributos de teste como `data-qa` quando existirem, depois roles/labels acessíveis; evite XPath e CSS frágil), comportamentos de anúncios e iframes que cubram botões, e se a página "API Testing" permite criar e excluir conta por API. Entregável: `docs/mapeamento-ui.md`. Aqui, antes de seguir, confirme comigo ferramenta e relatório.

### Fase 4 — Scaffold e implementação
Crie o projeto com a ferramenta confirmada, seguindo:
- Page Objects (ou equivalente) com responsabilidade clara; sem seletores soltos nos testes.
- Um arquivo de spec por épico, nome de teste com o ID do caso (`TC01 ...`) e a tag do caso.
- Fixtures/helpers para: gerar dados únicos, criar conta, excluir conta (teardown garantido mesmo se o teste falhar).
- Testes independentes e executáveis em paralelo sem colisão de dados.
- Esperas por condição, nunca por tempo fixo.
- Sem credenciais ou dados sensíveis no repositório; configuração por variáveis de ambiente.
- `README.md` com: como instalar, rodar local, rodar no CI, ver o relatório, estrutura de pastas e mapa TC → story → spec.
- `.gitignore` incluindo `node_modules` e saídas de relatório.
Implemente os 10 casos. Rode local, headless e headed, e me mostre o resultado.

### Fase 5 — Execução, triagem e estabilidade
Rode a suíte completa pelo menos 10 vezes seguidas, localmente e depois no Actions. Para toda falha, classifique: defeito real do site, teste instável ou problema de ambiente, com evidência (trace, screenshot, log). Corrija a causa raiz no teste. Meta: 0 falhas em 10 execuções consecutivas. Entregável: `docs/execucoes.md` com a tabela de execuções.

### Fase 6 — GitHub Actions e relatórios
Crie `.github/workflows/` rodando em `push`, `pull_request` e `workflow_dispatch`: instalar dependências com cache, instalar navegadores, rodar headless, publicar relatório e traces/screenshots de falha como artefato. Sem segredos no log. Entregável: workflow funcionando e link da última execução verde. Repositório: https://github.com/labittencourt/pos-graduacao-auto-web.git

### Fase 7 — Auditoria final
Audite a qualidade da própria suíte contra os 5 critérios de avaliação: checklist com evidência por item (seletores, padrões, boas práticas, estabilidade, relatório, CI). Liste riscos restantes, suposições assumidas, divergências do site e tudo que os agentes erraram durante o processo. Entregável: `docs/auditoria.md`.

## Agentes para realizar consultas 
/c/ProjetoLeandro/Agentes_Jornada_QA/qa-agentes-claude-codex-copilot/qa-agentes-claude-codex-copilot

## Definição de pronto

- [ ] Os 10 casos automatizados e rastreáveis até a story.
- [ ] 10 execuções consecutivas sem falha, local e no Actions.
- [ ] Workflow no GitHub Actions verde, com relatório publicado como artefato.
- [ ] README completo; repositório limpo (sem `node_modules`, sem dados reais).
- [ ] `docs/divergencias.md` e `docs/auditoria.md` preenchidos.

## Comece agora

Faça somente a Fase 1. Ao terminar, mostre o gate por story, as ambiguidades e as perguntas que precisam da minha resposta, e aguarde.
