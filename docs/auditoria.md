# Auditoria final — Fase 7

**Data:** 2026-10-23 · **Escopo:** suíte E2E do Automation Exercise (TCs 1, 2, 3, 4, 5, 8, 9, 10, 15, 16) · **Repositório:** <https://github.com/labittencourt/pos-graduacao-auto-web>

Este documento confere a suíte contra os 5 critérios de avaliação do trabalho, com evidência verificável para cada item. Lista também os riscos restantes, as suposições assumidas, as divergências do site e tudo o que os agentes (e a orquestração) erraram no processo.

## Resumo

| # | Critério | Situação | Evidência principal |
|---|----------|----------|---------------------|
| 1 | Execução via GitHub Actions | ✅ | `e2e` verde nos pushes [`4f2522e`](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39884571898), [`d31431d`](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39885365216) e [`96f00d4`](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39945967847) |
| 2 | Execução sem quebras | ✅ local · ⚠️ CI | 10 consecutivas locais sem falha inesperada; no CI, 3 execuções avulsas verdes e 3 séries de 10 com 7/10, 8/10 e 7/10, todas as falhas do site (anti-bot, sobrecarga, indisponibilidade), nenhuma de lógica da suíte ([docs/execucoes.md](execucoes.md)) |
| 3 | Uso adequado de seletores e padrões | ✅ | 43 `data-qa` + 8 role/label/text nos Page Objects; 0 XPath; 0 locator nos specs |
| 4 | Boas práticas | ✅ | 0 `waitForTimeout`, 0 retries, dados únicos, teardown garantido, sem segredos |
| 5 | Relatórios | ✅ | HTML do Playwright + Allure publicados como artefatos no CI; reporter de console + catálogo |

## 1. Execução via GitHub Actions

| Item | Evidência |
|------|-----------|
| Workflow em `push`, `pull_request` e `workflow_dispatch` | [.github/workflows/e2e.yml](../.github/workflows/e2e.yml) |
| Dependências com cache | `actions/setup-node@v4` com `cache: npm` + `npm ci` |
| Navegador instalado no CI | `npx playwright install --with-deps chromium` |
| Headless, sem retries, 1 worker | `CI=true` → `workers: 1`; `retries: 0` em [playwright.config.ts](../playwright.config.ts) |
| Relatório e traces/prints de falha como artefato | passos `Upload Playwright HTML report`, `Upload Allure report`, `Upload traces and screenshots of failures` |
| Sem segredos no log | nenhum segredo existe: o `.env` só tem `BASE_URL` e fica fora do git; a busca por padrões de segredo no commit inicial não achou nada |
| Execuções verdes | [39884571898](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39884571898), [39885365216](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39885365216) e [39945967847](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39945967847): todos os passos com sucesso, artefatos publicados |
| Pré-checagem de ambiente | [scripts/check-site-access.js](../scripts/check-site-access.js) falha com "AMBIENTE BLOQUEADO" se o site servir a verificação anti-bot (MEM-004) |

## 2. Execução sem quebras

| Item | Evidência |
|------|-----------|
| 10 consecutivas locais | 3ª série, execuções 2 a 11: 25 passaram + 8 falhas esperadas, 0 inesperadas, mesmo código ([docs/execucoes.md](execucoes.md)) |
| 10 consecutivas no CI | ⚠️ **não atingida.** 1ª série: 7/10 (anti-bot, FLK-004). 2ª série: 8/10 (sobrecarga "queue full" + pré-checagem, FLK-005). 3ª série: 7/10 (indisponibilidade + API timeout, ambiente). Fora das séries, as 3 execuções do `e2e` (pushes) foram verdes. Todas as falhas do CI são do site, com evidência pelas anotações públicas |
| Toda falha triada com evidência | 6 séries/rodadas com falha, todas classificadas: 2 testes incorretos (FLK-002, FLK-003, corrigidos), 3 de ambiente (FLK-001 anúncios, picos de latência e Cloudflare 520, FLK-004 anti-bot), 1 sem artefato para classificar (1ª série local, execução 1 — OC-16) |
| Instabilidade corrigida na causa, sem mascarar | [docs/flaky-index.md](flaky-index.md): nenhuma correção usou retry ou espera fixa; os limites de tempo foram dimensionados por medição e decididos pelo usuário (MEM-003) |

**Falhas esperadas não são "quebras".** Os 8 testes em `test.fail()` afirmam o comportamento correto do site e falham por bugs reais do site (BUG-001 a BUG-007). O Playwright os conta como resultado esperado (exit 0). Se o site for corrigido, eles passam a falhar como "inesperados", o que é o sinal para retestar.

## 3. Uso adequado de seletores e padrões

| Item | Evidência |
|------|-----------|
| Prioridade `data-qa` → role/label → estrutura | 43 usos de `data-qa` e 8 de `getByRole`/`getByLabel`/`getByText` em `src/pages/`. Os seletores estruturais (`.features_items`, `#cart_info_table`, `.shop-menu`) existem só onde o site não tem `data-qa`, e cada um está documentado na engenharia reversa ([docs/reverse/](reverse/index.md)) |
| Nenhum XPath | 0 ocorrências |
| Page Objects com responsabilidade clara | 14 classes em `src/pages/` (uma por página, mais componentes compartilhados: `NavBar`, `Footer`, `ProductList`, `CartModal`); sem assertion de negócio, só `expectLoad()` |
| Nenhum seletor solto nos specs | 0 `page.locator`/`getBy*` em `tests/*.spec.ts` |
| Um spec por épico, teste com ID e tag do caso | `conta`, `catalogo`, `newsletter`, `compra`; `TC01 ...` + `@TC01`; extras com `USnn-EXTRA` + `@extra` |
| Fixtures/helpers | `newUser` e `registeredUser` (dados únicos + teardown por API), `buildUser`/`buildCard`, helpers `placeOrder`/`deleteAccount` no fim do spec (convenção do `CLAUDE.md`) |

## 4. Boas práticas

| Item | Evidência |
|------|-----------|
| Esperas por condição, nunca por tempo | 0 `waitForTimeout`; 3 `waitForLoadState('domcontentloaded')`, todos de correções diagnosticadas (FLK-002/003) |
| Sem retries | `retries: 0`; o template trazia `retries: 2` no CI e foi corrigido (OC-01) |
| Testes independentes e paralelizáveis | dados únicos por teste (`qa-automation-<timestamp>-<uuid>@example-test.invalid`); 10 execuções com 4 workers (1ª série) sem colisão |
| Nenhum usuário fixo; teardown garantido | contas criadas pela UI ou pela API e excluídas no teardown pela API, mesmo se o teste falhar |
| Dados fictícios | domínio `.invalid` (RFC 2606) e cartão de teste público `4111 1111 1111 1111` |
| Sem credenciais no repositório | `.env` no `.gitignore`; nenhum segredo existe |
| Assertions de conteúdo, não só de presença | ex.: a exclusão é provada pela API, não pela mensagem (AUD-002); o detalhe do produto confere nome e preço do item clicado; "lista visível" exige nome, preço e link |
| `README.md` | instalação, execução local e no CI, relatórios, estrutura, mapa TC → story → spec ([README.md](../README.md)) |
| `.gitignore` | `node_modules`, relatórios, `test-results`, `.env`, `.playwright-mcp`, `.ci-artifacts` |

## 5. Relatórios

| Relatório | Onde |
|-----------|------|
| Playwright HTML (print de evidência em todo teste, trace em toda falha) | `npm run report`; artefato `playwright-report` no CI |
| Allure (épico → feature → story, severidade, dono, anexos) | `npm run allure:serve`; artefato `allure-report` no CI |
| Console com falhas esperadas separadas (🔶) | `src/reporters/console.reporter.ts` (corrigido, OC-10) |
| Catálogo cumulativo de testes | [docs/test-catalog.md](test-catalog.md) |
| Anotações de ambiente (5xx, anti-bot) | fixture `serverErrorAnnotation`; reporter `github` no CI |
| Relatórios por rodada | [docs/runs/](runs/) |

## Bugs do site encontrados

| ID | Resumo | Teste |
|----|--------|-------|
| BUG-001 | Formulário de conta: Zipcode sem label; selects de data sem nome acessível | `US01-EXTRA ... a11y (BUG-001)` |
| BUG-002 | E-mail comparado diferenciando maiúsculas, inclusive no domínio: conta duplicada e login recusado | `US02-EXTRA`, `US03-EXTRA (BUG-002)` |
| BUG-003 | Login inválido devolve a senha digitada no HTML | `US04-EXTRA ... (BUG-003)` |
| BUG-004 | `/delete_account` sem sessão mostra "Account Deleted!" sem excluir nada | `US05-EXTRA ... (BUG-004)` |
| BUG-005 | Produto inexistente aparece "In Stock" com "Add to cart" | `US07-EXTRA ... (BUG-005)` |
| BUG-006 | Busca não ignora espaços à esquerda | `US08-EXTRA ... (BUG-006)` |
| BUG-007 | Newsletter mostra sucesso sem enviar o e-mail | `US09-EXTRA ... (BUG-007)` |

Detalhes e evidências: [docs/bugs-index.md](bugs-index.md).

## Divergências entre stories e site

| ID | Story | Resumo |
|----|-------|--------|
| DIV-01 | US-01 | O e-mail do formulário de conta vem preenchido e bloqueado (a story manda preencher) |
| DIV-02 | US-01 | "Logged in as" mostra o campo Name (a story não define qual nome) |
| DIV-03 | US-08 | A busca também casa pela categoria (a story fala em "pelo nome") |
| DIV-04 | US-10/11 | "Your order has been placed successfully!" só existe no instante do envio; a página final mostra "Order Placed!" |

Detalhes: [docs/divergencias.md](divergencias.md).

## Suposições do QA (MEM-001: stories sem retorno ao PO)

| Story | Suposição |
|-------|-----------|
| US-01 | Valores fictícios por execução, com título/país/estado entre as opções do site (Q02); verificar a home na entrada (Q04); rótulos literais dos checkboxes (Q05); sem caminhos de erro no TC, extras só com aprovação (Q06); e-mail `qa-automation-<ts>-<uuid>@example-test.invalid` (Q07); exclusão no teardown por API (Q08) |
| US-02 | Conta pré-existente pela API (Q03); home na entrada (Q04) |
| US-03 | O teste do TC 2 inclui "Delete Account" (Q03); conta pela API (Q04) |
| US-04 | TC 3 com e-mail nunca cadastrado (Q01); home na entrada (Q06) |
| US-05 | "Página de login" = URL `/login` + "Login to your account" (Q01); o teste executa os passos 3–8 do TC (Q05) |
| US-07 | Lista visível = item com nome, preço e link (Q02); detalhe = nome e preço do item clicado (Q03); rótulos com valor (Q04); quantidade não fixada (Q05) |
| US-08 | Termo "Top" (Q01); nenhum produto com o termo no nome pode faltar (Q03) |
| US-09 | E-mail único da factory (Q04) |
| US-10 | 2 primeiros produtos da home (Q01); endereços = cadastro (Q02); total = soma (Q03); cartão de teste público (Q04) |
| US-11 | Conta pela API (Q01); mesmos oráculos e helper da US-10 (Q02) |

Fontes: `docs/analysis/US-nn/po-suggestions.md`.

## O que os agentes (e a orquestração) erraram

17 ocorrências em [docs/agentes-ocorrencias.md](agentes-ocorrencias.md). As mais relevantes:

| Origem | Erro | Efeito | Tratamento |
|--------|------|--------|------------|
| Template da montagem (OC-01) | `retries: 2` no CI | mascararia instabilidade | corrigido para 0 |
| Template do reporter (OC-10) | falha esperada contada como falha ("FALHOU") | console contradizia o Playwright | corrigido |
| `CLAUDE.md` do template (OC-04) | recomenda `networkidle` | nunca estabiliza com anúncios | não usado |
| Agente de desenho (OC-03) | caminho de factories diferente do `CLAUDE.md` | ambiguidade | seguido o `CLAUDE.md` |
| Agente de análise (OC-07) | sugeriu `@example.com` sem ler a convenção | inconsistência | corrigido |
| Engenharia reversa (OC-14) | registrou o resultado de "  Top" (2 espaços) como se fosse " Top" | fato errado no BUG-006 | detectado ao conferir a falha esperada; corrigido |
| Orquestração (OC-17) | afirmou que não havia outro caso do FLK-002 sem olhar o código | "Proceed To Checkout" e busca expostos; 1 falha na Fase 5 | varredura refeita no código (FLK-003) |
| Orquestração (OC-15) | script exploratório sem `finally` | **1 conta fictícia ficou no site** (`qa-automation-us10c-<ts>@example-test.invalid`) | não excluível (timestamp perdido); registrada |
| Orquestração (OC-16) | séries sem pasta de saída por execução | 1 falha sem evidência | pasta por execução nas séries seguintes |

## Riscos restantes

| Risco | Por que fica | Mitigação |
|-------|--------------|-----------|
| Anti-bot do site bloqueia o CI depois de tráfego contínuo | proteção de terceiro; burlar seria inadequado | espaçamento + pré-checagem com mensagem clara (MEM-004) |
| Sobrecarga do site ("queue full") e indisponibilidade intermitente | capacidade do site de terceiro | nenhuma na suíte (aumentar limites ou repetir mascararia); a causa aparece nas anotações (FLK-005) |
| Picos de latência e indisponibilidade (Cloudflare 520) | site público compartilhado | limites medidos (MEM-003); anotação `ambiente` para 5xx |
| Anúncios cobrindo botões para o usuário real | bloqueados na suíte (MEM-002) | `BLOCK_ADS=0` permite explorar com anúncios |
| Mensagem de pagamento exibida antes da confirmação do servidor | cartão recusado não pôde ser provocado | registrado como GAP em `docs/reverse/compra-us-reversa.md` |
| Catálogo público pode mudar | dado de terceiro | oráculos relativos ao catálogo da própria execução, sem lista fixa |
| 1 conta fictícia residual no site | OC-15 | registrada; domínio `.invalid` |
