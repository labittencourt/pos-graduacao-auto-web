# pos-graduacao-auto-web

Suíte E2E de frontend para o site de prática [Automation Exercise](https://www.automationexercise.com), com **Playwright Test + TypeScript**. Trabalho final da disciplina de automação de testes na camada web (PGATS).

Escopo: casos de teste **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** de <https://www.automationexercise.com/test_cases>, derivados em 11 user stories ([docs/user-stories/](docs/user-stories/README.md)).

| | |
|---|---|
| Testes | 33: os 10 TCs + 23 cenários extras de risco aprovados |
| Specs | 4, um por épico |
| Bugs do site encontrados | 7 ([docs/bugs-index.md](docs/bugs-index.md)), cobertos por testes em falha esperada |
| Estabilidade | Local: 10 execuções consecutivas da suíte completa sem falha inesperada. CI: execuções avulsas verdes; nas séries de 10, as falhas foram todas do site (anti-bot, sobrecarga), com triagem ([docs/execucoes.md](docs/execucoes.md)) |
| Retries | 0, por regra do projeto: instabilidade é diagnosticada na causa |

## Pré-requisitos

- Node.js 20 ou mais recente
- Java 17 ou mais recente, **só** para gerar o relatório Allure localmente (`allure generate`)

## Instalação

```bash
npm ci
npx playwright install chromium
cp .env.example .env   # só contém BASE_URL; não há credenciais
```

## Rodar localmente

```bash
npm test                 # suíte completa, headless (2 workers)
npm run test:headed      # com navegador visível
npx playwright test tests/compra.spec.ts   # um épico
npx playwright test -g "TC15"              # um caso
npx playwright test --grep "@TC\d\d"      # só os 10 TCs (sem os extras)
```

`npm test` termina com código 0 quando todo teste se comporta como esperado, inclusive os testes de bugs conhecidos, que **falham como esperado** (`test.fail()`). O console mostra essas falhas esperadas com 🔶.

### Bloqueio de anúncios

A suíte bloqueia os domínios de anúncio do Google AdSense (fixture automática `blockThirdPartyAds`). O anúncio de tela cheia ("vignette") interceptava cliques de navegação de forma intermitente (diagnóstico em [docs/flaky-index.md](docs/flaky-index.md), FLK-001). Para rodar com os anúncios reais:

```bash
BLOCK_ADS=0 npm test
```

## Rodar no GitHub Actions

O workflow [.github/workflows/e2e.yml](.github/workflows/e2e.yml) roda em `push`, `pull_request` e manualmente (**Actions → e2e → Run workflow**). Os passos são:

1. instalar dependências com cache;
2. instalar o Chromium;
3. instalar o Java (para o Allure);
4. rodar a suíte em headless, com 1 worker;
5. gerar o Allure;
6. publicar os artefatos.

Artefatos de cada execução (aba **Summary** da execução):

| Artefato | Conteúdo |
|----------|----------|
| `playwright-report` | Relatório HTML do Playwright, com print de evidência de cada teste |
| `allure-report` | Relatório Allure (épico → feature → story), com prints e scans de acessibilidade |
| `test-results` | Só quando há falha: traces, prints e vídeos dos testes que falharam |

Prova de estabilidade: o workflow [.github/workflows/e2e-stability.yml](.github/workflows/e2e-stability.yml), disparado manualmente em **Actions → e2e-stability → Run workflow**, roda a suíte completa 10 vezes **em sequência** (nunca em paralelo, para não sobrecarregar o site), uma execução por job.

O workflow só reporta. Para bloquear o merge com falha, ative a proteção de branch no GitHub: **Settings → Branches → Require status checks → `e2e`**.

## Ver os relatórios localmente

```bash
npm run report            # relatório HTML do Playwright
npm run allure:serve      # gera e abre o Allure (precisa de Java)
npm run dashboard         # painel com os índices de docs/ (bugs, instabilidade, US, catálogo)
```

## Mapa TC → story → spec

| TC | Caso de teste | Story | Spec | Teste |
|----|---------------|-------|------|-------|
| 1 | Register User | [US-01](docs/user-stories/US-01-cadastrar-nova-conta.md) (+ US-06) | [conta.spec.ts](tests/conta.spec.ts) | `TC01 Register User` |
| 2 | Login User with correct email and password | [US-03](docs/user-stories/US-03-entrar-credenciais-validas.md) (+ US-06) | [conta.spec.ts](tests/conta.spec.ts) | `TC02 Login User with correct email and password` |
| 3 | Login User with incorrect email and password | [US-04](docs/user-stories/US-04-recusar-login-invalido.md) | [conta.spec.ts](tests/conta.spec.ts) | `TC03 Login User with incorrect email and password` |
| 4 | Logout User | [US-05](docs/user-stories/US-05-encerrar-sessao.md) | [conta.spec.ts](tests/conta.spec.ts) | `TC04 Logout User` |
| 5 | Register User with existing email | [US-02](docs/user-stories/US-02-impedir-cadastro-email-existente.md) | [conta.spec.ts](tests/conta.spec.ts) | `TC05 Register User with existing email` |
| 8 | Verify All Products and product detail page | [US-07](docs/user-stories/US-07-lista-e-detalhe-de-produto.md) | [catalogo.spec.ts](tests/catalogo.spec.ts) | `TC08 Verify All Products and product detail page` |
| 9 | Search Product | [US-08](docs/user-stories/US-08-buscar-produtos.md) | [catalogo.spec.ts](tests/catalogo.spec.ts) | `TC09 Search Product` |
| 10 | Verify Subscription in home page | [US-09](docs/user-stories/US-09-assinar-newsletter.md) | [newsletter.spec.ts](tests/newsletter.spec.ts) | `TC10 Verify Subscription in home page` |
| 15 | Place Order: Register before Checkout | [US-10](docs/user-stories/US-10-comprar-apos-cadastro.md) (+ US-01, US-06) | [compra.spec.ts](tests/compra.spec.ts) | `TC15 Place Order: Register before Checkout` |
| 16 | Place Order: Login before Checkout | [US-11](docs/user-stories/US-11-comprar-apos-login.md) (+ US-03, US-06) | [compra.spec.ts](tests/compra.spec.ts) | `TC16 Place Order: Login before Checkout` |

Todo teste leva a tag do caso (`@TC01`...) e do épico (`@epico-conta`...). Os 23 extras levam `@extra` e o prefixo `USnn-EXTRA` no nome; os de bug conhecido também levam `@regression` e o ID do bug no título. A lista completa, com o cenário de origem de cada teste, está em [docs/system-map.md](docs/system-map.md) e [docs/us-index.md](docs/us-index.md).

## Estrutura de pastas

```
.github/workflows/e2e.yml       CI
playwright.config.ts            limites de tempo medidos (MEM-003), sem retries, trace em toda falha
src/
  pages/                        Page Objects (um por página) e componentes (menu, rodapé, lista de produtos)
  fixtures/
    index.ts                    injeção dos Page Objects + fixtures automáticas (anúncios, triagem 5xx, evidência)
    factories/                  dados fictícios únicos: usuário (e-mail @example-test.invalid) e cartão de teste
  utils/account-api.ts          criação/exclusão de conta pela API do site (setup e teardown)
  reporters/                    reporter de console + catálogo de testes
tests/                          um spec por épico: conta, catalogo, newsletter, compra
docs/
  user-stories/                 as 11 stories (fonte de verdade dos requisitos)
  analysis/US-nn/               gate de qualidade, perguntas, suposições do QA, cenários e acordo de cada story
  coverage/                     relatório de cobertura por story
  reverse/                      engenharia reversa do site real: seletores, regras observadas, prints
  bugs-index.md · bug-report-*  bugs do site
  divergencias.md               onde o site diverge das stories
  flaky-index.md                instabilidades e o diagnóstico de cada uma
  execucoes.md                  séries de execuções da Fase 5
  project-memory.md             decisões do projeto (MEM-001 a MEM-003)
  agentes-ocorrencias.md        erros e inconsistências dos agentes e da orquestração
  runs/                         relatórios de execução e auditoria por rodada
```

## Decisões do projeto

| ID | Decisão |
|----|---------|
| [MEM-001](docs/project-memory.md) | Stories testadas como estão, sem retorno ao PO. Cada lacuna é observada no site ou vira suposição do QA documentada. |
| [MEM-002](docs/project-memory.md) | Anúncios de terceiros bloqueados (interferiam em cliques). |
| [MEM-003](docs/project-memory.md) | Limite de 60 s por teste e 10 s por assertion, dimensionados pela medição; 2 workers locais e 1 no CI, para não sobrecarregar o site público. |

### Dados de teste
- **Nenhum usuário fixo.** Cada teste cria a própria conta, com e-mail único `qa-automation-<timestamp>-<uuid>@example-test.invalid`, pela UI ou pela API, e a exclui no teardown, mesmo se o teste falhar.
- **Cartão de teste público** (`4111 1111 1111 1111`). Nenhum dado real.
- **Sem segredos no repositório:** o `.env` só tem a URL do site e fica fora do git.

## Convenções de código

Seletores na ordem `data-qa` → role/label → estrutura; nunca XPath. Esperas sempre por condição, nunca por tempo fixo. Allure (`epic`/`feature`/`story`/`severity`/`owner`) em todo teste. Detalhes em [CLAUDE.md](CLAUDE.md) e [docs/test-standards.md](docs/test-standards.md).
