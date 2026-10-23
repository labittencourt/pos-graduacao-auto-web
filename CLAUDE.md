# CLAUDE.md — pos-graduacao-auto-web

Automacao de testes E2E de frontend para **Automation Exercise**, usando **Playwright Test** + **TypeScript**.

---

## Diretiva principal — Michael Bolton + heuristicas complementares

**Toda atividade neste projeto deve seguir a mentalidade de Michael Bolton (context-driven testing).** Isso se aplica a:

- **Explorar** uma pagina ou funcionalidade nova — investigar como um testador, nao como um verificador
- **Analisar** o que testar — priorizar por risco ao negocio, nao por cobertura de campos
- **Projetar** cenarios — usar os oraculos HICCUPPS para questionar consistencia
- **Categorizar** testes — tags mapeiam diretamente para os oraculos
- **Criar** testes — cada check automatizado deve nascer de uma investigacao real
- **Questionar** comportamentos — sinalizar quando algo parece errado, mesmo que o teste passe

Antes de qualquer acao, pergunte: **"O que eu estou tentando aprender sobre o produto?"**

Para reduzir pontos cegos que a mentalidade Bolton sozinha nem sempre cobre por si so, este
projeto tambem aplica quatro heuristicas complementares:

- **SFDPOT (James Bach, HTSM)** — antes de cobrir uma pagina/feature nova, varra as seis
  dimensoes do produto (Estrutura, Funcao, Dados, Plataforma, Operacoes, Tempo) para garantir
  que nenhuma fique de fora do planejamento. Ver secao "Categorias de cenarios".
- **Test Heuristics Cheat Sheet (Elisabeth Hendrickson)** — torna sistematica a cobertura de
  dados de borda, sequencias anomalas e estados de arquivamento, em vez de depender so da
  intuicao de quem escreve o teste.
- **Quadrantes de Teste Agil (Lisa Crispin & Janet Gregory)** — garante equilibrio entre os
  quatro quadrantes de teste; em particular, da estrutura operacional real para exploracao
  (Q3) e para performance/seguranca (Q4), que sem isso ficam so como discurso.
- **Ataques de software (James Whittaker)** — complementa os oraculos reflexivos de Bolton
  com tecnicas de ataque concretas e repetiveis, com destaque para ataques de **autorizacao
  entre perfis/grupos** — historicamente um dos tipos de bug mais graves e mais faceis de
  passar despercebido quando a suite so testa "a tela pede login?" (`@security`), nao "o que
  este perfil especifico pode ver/acessar na tela?" (`@authz`).

---

## Stack

- **Runner**: Playwright Test + TypeScript
- **Reports**: Custom console reporter + Allure Playwright + Playwright HTML report
- **Autenticacao**: storageState (login unico salvo em arquivo) — se aplicavel
- **UI**: Bootstrap (jQuery)
- **Idioma do app**: inglês

## Comandos

```bash
npm test                    # Roda a suite padrao (exclui @opt-in)
npm run test:smoke          # Apenas @smoke
npm run test:security       # Apenas @security (a tela pede login/protege a rota?)
npm run test:authz          # Apenas @authz (o que este perfil pode ver/acessar na tela?)
npm run test:validation     # Apenas @validation
npm run test:ux             # Apenas @ux
npm run test:boundary       # Apenas @boundary
npm run test:a11y           # Apenas @a11y (scan automatizado axe-core)
npm run test:visual         # Apenas @visual (regressao visual, baseline)
npm run test:visual:update  # Regenera os baselines de @visual (revisar diff antes de commitar)
npm run test:idempotency    # Apenas @idempotency
npm run test:performance    # Apenas @performance
npm run test:regression     # Apenas @regression
npm run test:create         # Todos os @create, de qualquer modulo
npm run test:exclude -- "<regex>"   # Exclui qualquer combinacao de tags pontualmente
npm run test:wip            # Debug — headed + trace + 1 worker
npm run test:allure         # Roda com reporter Allure
npm run allure:generate     # Gera relatorio Allure
npm run allure:open         # Abre relatorio Allure
npm run allure:serve        # Gera e abre em um passo so
npm run report              # Abre relatorio HTML do Playwright
npm run dashboard           # Sobe docs/dashboard.html com os indices de docs/ (ver "Catalogo de testes")
```

Adicione novos scripts `test:<tag>` no `package.json` conforme novas tags de dominio surgirem.

## Variaveis de ambiente

Definidas em `.env.example`.

- `BASE_URL` — URL base do sistema
- `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` — credenciais de teste, se o app exigir login

## Arquitetura do projeto

```
src/
  pages/                          # Page Objects (.page.ts), um por pagina/tela
  fixtures/
    index.ts                      # test/expect com page objects injetados + evidenceScreenshot auto
    factories/
      <recurso>.factory.ts        # 1 por recurso/formulario com teste @create — ver secao "Factories de dado de teste"
  auth/                            # so existe se o app exige login (AUTH_REQUIRED)
    setup.ts                      # Login unico que salva storageState
    .auth/                        # Cookies salvos (gitignored)
  reporters/
    console.reporter.ts           # Custom reporter visual (ANSI colors + Unicode)
  utils/                          # Utilitarios (criado vazio)

tests/                             # Specs (.spec.ts) por feature

docs/
  bugs-index.md                    # Fonte unica de status de bugs/claims
  audit-index.md                    # Fonte unica de pendencias de auditoria (/qa-auditoria-teste)
  flaky-index.md                    # Historico de flakiness e quarentena (/qa-triagem-falha)
  test-catalog.md                  # Gerado automaticamente pelo reporter — nao editar
  dashboard.html                   # Visualizacao em navegador dos indices acima — npm run dashboard
  test-standards.md                # Exemplos de codigo detalhados (anatomia de teste, etc.)
  bug-report-<data>-<tema>.md             # Um por investigacao de bug — historico, nao status atual
  exploratory-log/
    INDEX.md                       # Indice de uma linha por investigacao
    <data>-<tema>.md               # Achados/decisoes de uma sessao de investigacao

scripts/
  serve-dashboard.js               # Servidor estatico zero-dependencia usado por npm run dashboard

playwright.config.ts
```

## Camadas e responsabilidades

| Camada | Local | Responsabilidade |
|--------|-------|------------------|
| **Page Object** | `src/pages/` | Locators e acoes de uma pagina. Sem assertions de negocio (so `expectLoad()`). |
| **Fixture** | `src/fixtures/index.ts` | Injeta page objects no `test`/`expect`; `evidenceScreenshot` roda em todo teste automaticamente. |
| **Auth** | `src/auth/setup.ts` | Login unico que salva `storageState` — reusado por todos os testes que precisam estar logados. |
| **Teste** | `tests/` | Assertions de negocio e de UX. Toda logica de validacao fica aqui. |
| **Reporter** | `src/reporters/` | Custom reporter do Playwright. Sem dependencias externas. |

## Convencoes de teste

### Estrutura obrigatoria

- Specs importam **sempre** de `../src/fixtures` — nunca de `@playwright/test` diretamente (perde os page objects e o `evidenceScreenshot`).
- Onde o framework de steps estiver disponivel, usar `test.step()` nomeando a acao do usuario ("Navigate to X", "Submit Y"), nao a chamada tecnica.
- Assertions do Playwright (`expect(locator).toBeVisible()`) — nunca `waitForTimeout`.
- Seletores: `data-testid` > role/aria > CSS class — nunca XPath.
- Mensagens descritivas em **todos** os `expect()`.

### Tags (HICCUPPS)

Tags no formato `{ tag: ['@tag'] }` em `test()` ou `test.describe()`:

| Tag | Oraculo | Pergunta de risco |
|-----|---------|-------------------|
| `@smoke` | Purpose | O sistema serve ao proposito central? |
| `@security` | Statutes/Standards | **Autenticacao** — a tela exige login, expira sessao, redireciona quando deslogado? Quem e voce |
| `@authz` | Statutes/Standards | **Autorizacao/escopo entre perfis e grupos** — o que este perfil pode ver/acessar na tela, mesmo logado? Cobre acesso direto por URL a recurso de outro grupo (IDOR) e comparacao do que cada perfil ve na mesma tela quando ambos tem acesso — ver secao "Categorias de cenarios". Nao confundir com `@security` |
| `@validation` | Claims | O sistema rejeita dados invalidos como promete? |
| `@ux` | Users' expectations | O usuario esperaria esse comportamento? |
| `@boundary` | Comparable Products / Product | O sistema lida com inputs incomuns? |
| `@a11y` | Statutes/Standards | Scan automatizado de acessibilidade (WCAG) via axe-core — ver `src/fixtures/accessibility.ts`. Complementa `@ux`: `@ux` e julgamento humano sobre a experiencia, `@a11y` e o que uma ferramenta consegue verificar objetivamente (contraste, `aria`, labels, foco) |
| `@idempotency` | Claims | Duplo clique/duplo submit no mesmo formulario nao deveria gerar efeito colateral duplicado |
| `@performance` | Product | Tempo de carregamento/resposta da tela dentro do esperado; cobre o quadrante tecnico-critico (Q4) |
| `@visual` | History | Regressao visual via `expect(page).toHaveScreenshot()` nativo do Playwright — compara contra um baseline salvo, nao contra um design do Figma (isso continua manual, ver secao `@visual`) |
| `@regression` | History | Teste nascido de um bug real — inclui o ID do bug no titulo (ex: `BUG-003`) |
| `@create` | — | Informativo: cria dados reais via UI sem acao de exclusao correspondente. Rodar todos via `npm run test:create` |
| `@opt-in` | — | Controla o que fica fora do `npm test` padrao. Usar em `@create` de features que o time ainda nao liberou para criar dados em toda execucao |
| `@pending` | — | Cenario de golden path identificado mas nao implementado — usa `test.fixme()`, nao `test.skip()`, com comentario explicando o motivo |
| `@quarantine` | History | Teste com flakiness recorrente (3+ de 5 execucoes instaveis, ver `docs/flaky-index.md`), tirado da contagem de resultado oficial mas continua rodando — nunca aplicar sem a recomendacao do /qa-triagem-falha |
| `@wip` | debug | Headed + trace + 1 worker, para depuracao manual |

#### Correspondencia com as 8 dimensoes de risco RST

As tags de investigacao acima sao a implementacao tatica, para este stack de frontend,
de uma camada de risco mais generica (usada tambem pelo stack de API, com outro
vocabulario — as 7+1 perguntas Bolton): `@smoke`→Contrato/Promessa, `@security`/
`@validation`→Tratamento de erro, `@authz`→Autorizacao entre perfis, `@boundary`→Limites,
`@ux`/`@a11y`→Consistencia cruzada, `@performance`/`@idempotency`→Determinismo,
`@visual`/`@regression`→Consistencia interna. Tags operacionais (`@create`, `@opt-in`,
`@pending`, `@quarantine`, `@wip`) nao mapeiam a nenhuma dimensao — sao bookkeeping de
processo, nao investigacao de risco. Nao precisa citar essa camada ao escrever teste —
e so uma referencia caso o projeto precise comparar cobertura com um projeto de API.

Adicione tags de dominio conforme necessario (ex: `@login`, `@checkout`, `@<feature>`).

Exploracao (Q3 dos Quadrantes de Teste Agil) nao vira tag automatizada — por definicao, e
investigacao aberta, nao um check fechado. Ver secao "Log de atividades exploratorias".

**Por que essas tags e nao as do stack de API** (`@contract`/`@auth`/`@flow`/`@claims`): o mapeamento HICCUPPS e o mesmo framework de risco, mas os oraculos que mais importam mudam com o tipo de teste. Em frontend, "o usuario esperaria isso?" (`@ux`) e um risco de primeira classe que nao existe em teste de API; contrato de schema (`@contract`) nao se aplica a UI. `@security`/`@authz` cobrem a mesma divisao que `@auth`/`@authz` cobrem no stack de API (autenticacao vs autorizacao entre perfis), so que `@security` usa o nome do oraculo Statutes/Standards em vez do nome tecnico. `@regression` e a unica tag que **precisa** ser identica entre os stacks — e o que fecha o ciclo bug -> teste -> retest via `docs/bugs-index.md` e a deteccao automatica do reporter (ver secao Reporters).

### Tag `@create` e `@opt-in`

`[@create]` e **informativo**: marca testes que criam registros reais via acoes de UI (preencher formulario e submeter) sem acao de exclusao correspondente na tela. Todo teste `@create` deve limpar o que criou quando possivel e seguir uma convencao de nomenclatura reconhecivel nos dados preenchidos (prefixo tipo `QA Automation <Recurso>`, dominio de email reservado tipo `@example-test.invalid`, sempre incluindo um valor unico tipo timestamp) — isso permite ao time localizar e remover em lote os registros de teste sem risco de apagar dados reais. `npm run test:create` roda todos, de qualquer feature.

`[@opt-in]` controla o que fica fora do `npm test` padrao (`--grep-invert "@opt-in"`). Um teste `@create` so fica de fora da execucao padrao se tambem tiver `[@opt-in]`. Use esse par quando o time ainda nao confirmou que e seguro criar aquele tipo de dado em toda execucao da suite. Quando o time libera, o teste mantem `[@create]` mas remove `[@opt-in]`.

### Factories de dado de teste (`src/fixtures/factories/`)

Um arquivo por recurso/formulario que tem teste `@create` (ex: `user.factory.ts`), exportando uma funcao que devolve os valores a preencher no formulario, seguindo a convencao de nomenclatura acima. Quando o /qa-desenho-teste ja tinha campo minerado do recurso (base de conhecimento, mapa de codigo, backlog de endpoints ou US reversa do /qa-engenharia-reversa — nessa ordem de prioridade; em frontend, a US reversa e a fonte mais comum, porque ja lista os campos do formulario observado ao vivo), a factory nasce com os campos reais ja preenchidos, mas com `// TODO: confirmar valor valido` em qualquer campo que dependa de contexto do sistema (select com opcoes fixas, campo que referencia outro registro) — nunca chutado. Sem nenhuma fonte minerada disponivel, a factory nasce vazia, time preenche do zero.

### Categorias de cenarios (HICCUPPS + heuristicas complementares)

#### Passo 0 — Mapeamento SFDPOT antes das tags (James Bach)

Antes de cobrir uma pagina/feature nova, varra-a pelas seis dimensoes do HTSM. Se uma
dimensao nao for relevante para esta pagina especifica, diga isso explicitamente em vez de
pular a etapa silenciosamente:

- **Estrutura:** de que componentes/APIs esta pagina depende?
- **Funcao:** o que ela calcula, transforma ou submete?
- **Dados:** quais formatos, volumes e estados (inclusive listas vazias/arquivadas) ela exibe?
- **Plataforma:** o comportamento muda entre navegadores, viewports ou ambientes (dev/staging/prod)?
- **Operacoes:** ha uso concorrente real (dois usuarios editando o mesmo recurso ao mesmo tempo)?
- **Tempo:** o que acontece com sessao expirando no meio de uma acao, ou uma chamada de API lenta/falhando?

#### `@authz` — autorizacao entre perfis e grupos (oraculo Statutes + ataque de autorizacao)

Testar explicitamente: um usuario logado de um perfil/grupo consegue acessar, por URL direta,
uma tela ou recurso de outro grupo? E quando dois perfis diferentes acessam a mesma tela com
sucesso, o **conteudo** exibido (linhas de tabela, campos, contagens) e o que cada perfil
deveria ver — nao so "a tela carregou"? Dois padroes concretos a que ficar atento:
- **Linhas que deveriam ser filtradas nao sao (ou sao filtradas demais):** uma listagem que,
  pra um perfil, deveria mostrar um subconjunto dos itens.
- **Campo/acao que parece interna aparecendo pra um perfil externo:** um botao ou coluna que
  sugere uma acao que aquele perfil nao deveria poder fazer.
Quando o comportamento correto ainda nao foi confirmado pelo time, documente o estado atual
como `[@authz]` sem assumir certo/errado, e registre a duvida em `docs/bugs-index.md`.

#### `@a11y` — acessibilidade automatizada (axe-core)

`src/fixtures/accessibility.ts` exporta `checkAccessibility(page, testInfo)`, que roda o
axe-core na pagina atual e anexa o resultado bruto como evidencia no relatorio (mesmo
espirito do `evidenceScreenshot`). Nao decide sozinho o que quebra o teste — quem escreve
decide o limiar de severidade a afirmar:

```typescript
test('[@a11y] Pagina de login nao tem violacoes criticas de acessibilidade', async ({ page }, testInfo) => {
  await page.goto('/login');
  const results = await checkAccessibility(page, testInfo);
  const blocking = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  );
  expect(blocking, formatViolations(blocking)).toEqual([]);
});
```

Isso cobre o que uma ferramenta consegue verificar objetivamente (contraste insuficiente,
`aria` ausente/incorreto, labels de formulario, ordem de foco, landmarks) — nao substitui
`@ux`, que continua sendo julgamento humano sobre a experiencia (a ferramenta nao sabe se
a navegacao por teclado *faz sentido*, so se os atributos estao corretos). Rodar em cada
pagina/feature nova e parte do checklist (ver "Checklist para nova pagina/feature").

#### `@visual` — regressao visual (baseline nativo do Playwright)

`expect(page).toHaveScreenshot()` (ou `expect(locator).toHaveScreenshot()` pra uma area
especifica) compara a tela atual contra um baseline salvo em `__screenshots__/` na primeira
vez que o teste roda. Sem dependencia nova, sem servico externo, sem API key — nativo do
`@playwright/test` que o projeto ja usa.

```typescript
test('[@visual] Home nao teve regressao visual', async ({ page }) => {
  await page.goto('/home');
  await expect(page).toHaveScreenshot('home.png', {
    // Mascare tudo que muda entre execucoes (data, avatar, contador) —
    // sem isso o teste falha por ruido, nao por regressao real
    mask: [page.getByTestId('current-date'), page.getByTestId('user-avatar')],
  });
});
```

**O que `@visual` NAO e**: nao compara contra um design do Figma — isso continua sendo
comparacao manual/humana (ver referencias visuais do /qa-analise-demanda ou /qa-engenharia-reversa). `@visual` compara o
estado atual contra o *proprio historico* do projeto — pega regressao acidental (algo que
funcionava visualmente e quebrou), nao valida se a implementacao bate com o design original.

**Sempre use `mask` para conteudo dinamico** (datas, avatares, contadores, qualquer coisa
que mude entre execucoes sem ser bug) — sem isso o teste vira flaky por definicao, nao por
acidente.

**Baseline e sensivel a sistema operacional e versao de fonte** — um baseline gerado no
Mac local pode falhar sistematicamente rodando em CI Linux, mesmo sem nenhuma mudanca real
na tela (antialiasing e renderizacao de fonte diferem entre SOs). Se este projeto tiver CI,
gere/atualize os baselines rodando dentro do mesmo ambiente do CI (idealmente o container
oficial `mcr.microsoft.com/playwright`), nunca local, ou o teste vai ficar
permanentemente vermelho por motivo errado.

**Atualizar um baseline e sempre uma acao humana deliberada** — `npm run test:visual:update`
regenera os arquivos, mas quem roda precisa revisar o diff visual antes de commitar (o
baseline novo vira a nova verdade; se a mudanca era um bug, atualizar o baseline esconde o
bug, nao conserta nada).

#### Checklist de dados e sequencia (Elisabeth Hendrickson)

Ao investigar formularios e listagens, passe por estes filtros em vez de confiar so na intuicao:
- **CRUD + arquivamento:** um recurso arquivado/inativado desaparece de onde deveria (listagens
  ativas) e continua aparecendo onde deveria (historico)?
- **Sequencias anomalas:** submeter o mesmo formulario duas vezes rapidamente (ver
  `@idempotency`), editar um recurso ja arquivado, navegar com o botao "voltar" apos submeter
- **Dados goldilocks:** valor exatamente no limite de um campo, um a mais, um a menos, vazio,
  caracteres especiais
- **Payload malformado:** colar texto muito longo, caracteres de injecao (`<script>...`) em
  campos de texto livre

#### Ataques de software (James Whittaker)

- **Repeticao/duplo clique:** clicar em "Enviar" varias vezes rapidamente
- **Navegacao inesperada:** usar o botao "voltar" do navegador apos uma acao, recarregar a
  pagina no meio de um fluxo multi-step
- **Dependencia externa:** simular uma chamada de API que a pagina depende ficando lenta ou
  falhando — a tela mostra um erro tratado, ou quebra?

#### Verificacao final por Quadrantes de Teste Agil (Crispin & Gregory)

Antes de considerar a cobertura de uma feature completa, confira o equilibrio:
- **Q1 (tecnico, apoia o time):** os Page Objects e fixtures cobrem a base tecnica?
- **Q2 (negocio, apoia o time):** `@smoke`/`@validation` cobrem os exemplos de negocio
  combinados com o time?
- **Q3 (negocio, critica o produto):** houve sessao exploratoria registrada (ver secao "Log
  de atividades exploratorias")? Nao basta a intencao declarada na diretriz principal.
- **Q4 (tecnico, critica o produto):** existe `@performance` e `@authz`/ataques cobrindo esta
  feature, ou ficou so no funcional?

Se Q3 ou Q4 ficaram sem cobertura, isso e uma lacuna a resolver antes de considerar a feature
pronta, nao um "nice to have".

### Testes de regressao (`@regression`)

Oraculo History do Bolton: "o que ja quebrou antes tem mais chance de quebrar de novo."

Quando um teste nasce de um bug real documentado em `docs/bug-report-*.md`, adicionar a tag `@regression` e o ID do bug no titulo do teste entre parenteses. Formato: `should <comportamento correto> (BUG-XXX)`.

Status atual de cada bug e claim (corrigido, aceito como intencional, ou aberto): ver `docs/bugs-index.md` — fonte unica de verdade, atualizada a cada novo bug-report. Os arquivos `bug-report-*.md` continuam existindo como registro historico da investigacao, mas nao sao a referencia para status atual.

Executar `npm run test:regression` para verificar se algum bug corrigido voltou.

### Helpers

Quando multiplos testes repetem as mesmas assertions, extrair para funcao helper no **final do arquivo** (nao em arquivo separado).

## Checklist para nova pagina/feature

### Antes de tudo — Checagem de reuso (antes de criar qualquer arquivo novo)

Antes de criar um Page Object novo, verifique se algo equivalente ja existe:

1. **Neste projeto** — busque em `src/pages/` por um Page Object que ja cubra a mesma pagina/fluxo, mesmo que sob outro nome (ex: um modal reaproveitado em varias telas).
2. **Em `docs/source-map.md`** (se existir, gerado pelo /qa-mineracao-codigo no repositorio do sistema sob teste) — confira se os seletores da pagina ja foram minerados do codigo-fonte real; use como ponto de partida, mas isso **nunca substitui a captura real do /qa-engenharia-reversa** — seletor minerado estaticamente confirma nome/estrutura, nao comportamento em tela.

Classifique o que encontrar:

- **Exata** — ja existe Page Object completo pra mesma pagina → reutilize, nao crie nada novo, va direto pra secao "Cenarios".
- **Similar** — existe um Page Object de uma tela parecida (mesmo padrao de formulario/listagem) → use como modelo de estrutura, mas ainda precisa dos seletores reais desta tela.
- **Parcialmente compativel** — existe um componente compartilhado reaproveitavel (ex: Page Object de um modal ou header usado em varias telas) → importe/componha em vez de duplicar.
- **Incompativel** — nada reaproveitavel encontrado → siga o checklist "Infraestrutura" abaixo normalmente.

Nao encontrar nada e um resultado valido — registre que a busca foi feita mesmo assim, nao e perda de tempo, e a confirmacao de que nao havia duplicacao a evitar.

### Infraestrutura

1. Criar Page Object em `src/pages/<pagina>.page.ts`
2. Registrar o Page Object como fixture em `src/fixtures/index.ts`
3. Criar spec em `tests/<feature>.spec.ts` (ou `tests/<feature>/<sub-feature>.spec.ts` se a feature tiver varias sub-telas)
4. Se a pagina exigir login e o projeto ainda nao tiver `src/auth/`, avaliar se precisa (normalmente ja existe desde o scaffold, se `AUTH_REQUIRED` foi confirmado)

### Cenarios

Aplicar o Passo 0 (SFDPOT) e as tags HICCUPPS e implementar os cenarios aplicaveis: smoke,
security (autenticacao), authz (autorizacao entre perfis, com checklist Hendrickson pra dados),
validation, ux, a11y (scan automatizado via `checkAccessibility`, ver secao `@a11y`), visual
(baseline via `toHaveScreenshot()`, ver secao `@visual` — so depois que a tela estiver
estavel, baseline prematuro vira ruido), boundary (com ataques de Whittaker pertinentes),
idempotency, performance. So criar `@regression` quando houver um bug real documentado.
Fechar a feature conferindo o equilibrio dos Quadrantes de Teste Agil — se Q3 (exploracao)
ou Q4 (`@performance`/`@authz`) ficaram sem cobertura, isso e uma lacuna a resolver antes
de considerar a feature pronta.

Achados relevantes da exploracao (algo inesperado, uma decisao de escopo, uma duvida ainda nao confirmada) vao para `docs/exploratory-log/` **antes** dos testes finais serem escritos — nao esperar o fim da implementacao para registrar, o raciocinio se perde. Ver secao "Log de atividades exploratorias".

**Sincronismo obrigatorio entre cenario-fonte e teste implementado.** O esboco (`test.skip`) nasce do Gherkin em `docs/reverse/*-test-scenarios.md` / `docs/analysis/*/test-scenarios.md`, mas a implementacao real quase sempre revela algo que o Gherkin nao previa: escopo reduzido por decisao tecnica (ex: excluir uma area flaky de um `@visual`), um achado diferente do esperado (o teste acaba provando outra coisa), ou uma verificacao prometida que nao foi implementada. Quando isso acontecer, **atualizar o cenario-fonte no mesmo passo em que o teste e implementado — nunca depois, nunca "quando sobrar tempo"**. Concretamente:
- Escopo reduzido → reescrever o Gherkin pra descrever o que o teste de fato cobre, e registrar a parte excluida como `[NAO COBERTO]` ou um cenario `[MANUAL]` novo — nunca deixar a parte excluida so desaparecer da documentacao.
- Achado diferente do esperado → reescrever o Gherkin pra afirmar o que o teste realmente prova hoje; se o achado original ainda tiver valor como contexto historico, mantenha como nota separada, mas deixe claro que nao e mais o que o teste automatizado verifica.
- Verificacao prometida e nunca implementada → separar num cenario `[MANUAL]` novo com ID proprio, nao deixar enterrada dentro do texto de um cenario que virou `[AUTOMACAO]` parcialmente.
Isso vale tanto pra quem escreve o teste quanto pra qualquer revisao/auditoria (/qa-auditoria-teste) — cenario e teste que dizem coisas diferentes e o mesmo tipo de bug que documentacao desatualizada em qualquer outro contexto: silencioso ate alguem confiar nele.

### Reauditoria de features ja cobertas

Uma tag ou heuristica nova adicionada a este `CLAUDE.md` **nao se aplica so a features
futuras** — sempre que uma tag/heuristica for adicionada ou reforcada aqui, vale perguntar
explicitamente se as features ja cobertas precisam de uma nova rodada de testes por causa
dela, em vez de assumir que "cobertura completa" de uma feature antiga continua valendo para
sempre.

## Reporters

Custom console reporter em `src/reporters/console.reporter.ts`, registrado no array `reporter` do `playwright.config.ts`. Implementa a interface `Reporter` de `@playwright/test/reporter` com `export default`. Sem dependencias externas.

### Catalogo de testes

O mesmo reporter mantem `docs/test-catalog.md` — uma tabela com todo teste que ja rodou (suite, titulo, arquivo, status, data da ultima execucao). Atualizado automaticamente em `onEnd`, mesclando com o conteudo existente (rodar um subconjunto, ex: `npm run test:smoke`, so atualiza as linhas daquele subconjunto, sem apagar o resto). Nao editar manualmente — o arquivo e reescrito a cada corrida.

### Evidencia visual (Allure e HTML report)

`src/fixtures/index.ts` define a fixture automatica `evidenceScreenshot` (`{ auto: true }`) — roda em todo teste, passe ou falhe, sem precisar ser declarada nos parametros. Ao final do teste, tira um screenshot full-page de cada aba/pagina ainda aberta e anexa via `testInfo.attach()`, visivel automaticamente no HTML report e no Allure. E o equivalente, para frontend, dos anexos de request/response do stack de API — a diferenca e que aqui a evidencia e visual (PNG), nao texto de request/response.

Quando houver mais de uma pagina aberta (ex: popup, nova aba), cada uma gera um anexo numerado (`evidence-2`, `evidence-3`, ...).

### Deteccao de bug corrigido

O reporter compara o status anterior (lido do `test-catalog.md`) com o resultado da corrida atual. Se um teste referenciado na coluna "Teste(s)" de um bug **aberto** em `docs/bugs-index.md` vira de falhou para passou, um aviso aparece no console (`⚠ Possiveis bugs corrigidos`). A granularidade e por arquivo `.spec.ts`, nao por titulo exato de teste (a coluna e texto livre).

Isso so detecta bugs cujo teste falha por design (afirma o comportamento correto e falha ate ser corrigido) — bugs cujo teste so documenta o comportamento atual (e ja passa hoje) exigem que alguem reescreva a expectativa do teste quando corrigidos, nao ha sinal automatico possivel nesse caso. O aviso e so deteccao — atualizar o status no `bugs-index.md` continua sendo manual, para confirmar que e uma correcao real e nao uma instabilidade pontual.

### ANSI colors

```
reset \x1b[0m   bold \x1b[1m    dim \x1b[2m
green \x1b[32m  red \x1b[31m    yellow \x1b[33m
cyan \x1b[36m   magenta \x1b[35m  white \x1b[37m
bgRed \x1b[41m  bgGreen \x1b[42m
```

### Estrutura da saida

**1. Banner de inicio (`onBegin`)** — caixa com bordas duplas Unicode em cyan+bold. Contem o nome do projeto e a quantidade de testes encontrados (contagem recursiva de todas as suites).

**2. Agrupamento por suite (`onTestBegin`)** — ao entrar em uma nova suite (`test.parent.title`), imprimir o nome em magenta+bold com prefixo `▸` e indentacao de 2 espacos.

**3. Resultado por teste (`onTestEnd`)** — indentacao de 4 espacos, icone emoji por status, duracao em dim:

| Status | Icone | Cor do titulo | Duracao |
|--------|-------|---------------|---------|
| `passed` | ✅ | green | dim |
| `failed` | ❌ | red+bold | dim |
| `timedOut` | ⏰ | yellow | dim |
| `skipped` | ⏭️ | dim | nao exibir |

**4. Falhas detalhadas (`onEnd`, se houver)** — caixa com bordas simples Unicode em red+bold com titulo centralizado "FALHAS DETALHADAS". Para cada falha: numero sequencial + titulo em red+bold, localizacao do arquivo em dim, primeiras 8 linhas da mensagem de erro em red, primeiras 6 linhas do snippet em dim.

**5. Resumo final (`onEnd`)** — separadores em cyan+bold, contadores condicionais (so exibir se > 0) com icone, badge final verde "PASSOU" ou vermelho "FALHOU".

**Formatacao de duracao**: abaixo de 1000ms exibir como `Xms`, acima como `X.Xs` (1 casa decimal).

## Padroes de codigo

- Um Page Object por pagina.
- Specs importam sempre de `../src/fixtures` — nunca de `@playwright/test`.
- `waitForLoadState('networkidle')` apos acoes que disparam requests relevantes pro teste.
- Dados sensiveis: variaveis de ambiente do `.env`, nunca hardcode.
- Describe blocks e comentarios: ingles. Textos de elementos do app: idioma original do app (inglês).
- Allure obrigatorio em todo teste: `epic`, `feature`, `story`, `severity`, `owner` (via `allure-js-commons`).
- Se o app tem RBAC/multi-perfil, registre um Page Object de login (ou fixture) que produza
  um `storageState` por perfil (ex: `admin.state.json`, `client.state.json`) em vez de um
  unico estado logado — e o que viabiliza escrever `@authz` sem precisar logar manualmente
  dentro de cada teste.

## Log de atividades exploratorias

A diretriz principal deste projeto abre com "explorar como testador, nao como verificador" —
mas exploracao, por definicao, nao vira teste automatizado fechado. Para essa parte da
filosofia Bolton nao ficar so no discurso (Q3 dos Quadrantes de Teste Agil), toda sessao
exploratoria relevante deve deixar um registro em `docs/exploratory-log/<data>-<tema>.md` com,
no minimo:

- **Charter usado** (formato "Explore [area] usando [tecnica], com o objetivo de [o que se
  quer descobrir]")
- **Tempo gasto**
- **O que foi encontrado** (bug, risco, ou "nada relevante desta vez")
- **Se algo virou teste automatizado** (`@regression`, `@authz`, etc.) como consequencia

Sessoes que nao encontram nada tambem devem ser registradas — isso e dado sobre cobertura, nao
so sobre bugs. Nao e log cronologico de tarefas ("hoje trabalhei em X"); so entra o que tem
valor para investigacoes futuras.

Cada entrada e indexada em uma linha no `docs/exploratory-log/INDEX.md`. Quando uma descoberta se confirma como padrao recorrente, ela "sobe" para uma regra neste `CLAUDE.md`; quando vira um bug confirmado, vira entrada em `docs/bugs-index.md`. Entradas resolvidas saem do `INDEX.md` (o arquivo original fica no historico do Git).

## Bug reports

Bugs encontrados pelos testes sao documentados em `docs/bug-report-<data>-<tema>.md` com: severidade, pagina/feature, como reproduzir, resultado atual vs esperado, e quais testes falham.

Todo bug-report novo, ou mudanca de status de um bug/claim existente (corrigido, aceito como intencional, invalidado por falso positivo, reaberto), **deve** atualizar `docs/bugs-index.md` no mesmo momento — esse arquivo e a fonte unica de verdade para status atual, os `bug-report-*.md` sao o registro historico da investigacao.

## Checklist para implementacao — US-01

### Bloqueadores (resolver antes de implementar)
- [x] Qual nome aparece em "Logged in as" — resolvido por observacao: campo Name (DIV-02)
- [x] E-mail no formulario de conta — resolvido por observacao: pre-preenchido e bloqueado (DIV-01)
- [ ] Extras CT-01-05, CT-01-06, CT-01-08, CT-01-09 — aguardando decisao do usuario (docs/analysis/US-01/test-agreement.md)

### Ordem de implementacao sugerida
1. Factory `src/fixtures/factories/user.factory.ts` + teardown por API (`src/utils/account-api.ts`)
2. Page Objects: `home`, `nav-bar`, `login`, `signup`, `account-status`
3. `TC01 Register User` em `tests/conta.spec.ts`

### Convencoes deste projeto (aprendidas na US-01)
- Textos do TC em maiusculas sao `text-transform` CSS — comparar com regex case-insensitive, nunca com o texto exibido literal.
- API de contas do site: HTTP sempre 200; o status real e `responseCode` no JSON.
- Conta criada pela UI e sempre excluida no teardown por API (`newUser`), mesmo se o teste falhar.
