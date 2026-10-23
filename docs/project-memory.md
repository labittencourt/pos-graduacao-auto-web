# Memória do Projeto

Registro cumulativo de contexto que não pertence a nenhum outro índice deste
projeto — decisão de produto/negócio, gotcha de ambiente, convenção de time ou
limitação de ferramenta que não está ligada a um único bug, teste ou US, e que
custaria retrabalho descobrir de novo a cada sessão.

**Antes de registrar aqui, confirme que não pertence a um índice mais específico:**
achado que o time decidiu não ser bug → `docs/bugs-index.md` (Padrões aceitos);
gotcha ligado a um teste específico instável → `docs/flaky-index.md`; pendência de
qualidade de um teste específico → `docs/audit-index.md`; limite de cobertura de
uma US específica → `docs/coverage/<id-us>-coverage-report.md` (Fora de escopo);
achado de uma sessão exploratória pontual → `docs/exploratory-log/`.

**Ao propor uma entrada**: qualquer agente pode propor, mas nunca grava sozinho —
a confirmação final é sempre do usuário, mesma disciplina de quarentena
(Agente 6) e prioridade de endpoint (Agente 4). Confira o próximo ID livre
(`MEM-XXX`) antes de propor — nunca reinicie a numeração.
**Ao invalidar uma entrada**: nunca apague — mude o Status para
`⚫ Superado (<data>) — <motivo>` e mantenha a linha como histórico.

## Índice

| ID | Categoria | Resumo | Desde | Última confirmação | Status |
|----|-----------|--------|-------|---------------------|--------|
| MEM-004 | Ambiente | Anti-bot do site bloqueia runners do CI depois de tráfego contínuo: série de estabilidade espaçada (20 min) + pré-checagem `check-site-access.js`; nunca burlar o desafio | 2026-10-23 | 2026-10-23 | 🟢 Ativo |
| MEM-003 | Ambiente | Picos de latência do site: limite por teste 60 s, assertions 10 s, 2 workers locais (1 no CI), dimensionados pela medição da Fase 5 | 2026-10-22 | 2026-10-22 | 🟢 Ativo |
| MEM-002 | Ambiente | Anúncios do Google AdSense (vignette) interceptam cliques de navegação; a suíte bloqueia só os hosts de anúncio (fixture `blockThirdPartyAds`, `BLOCK_ADS=0` desliga) | 2026-10-22 | 2026-10-22 | 🟢 Ativo |
| MEM-001 | Convenção | Stories não voltam ao PO: testadas como estão; lacunas resolvidas por observação no site ou como suposição do QA documentada | 2026-10-22 | 2026-10-22 | 🟢 Ativo |

## Categorias

- **Produto** — comportamento real do sistema ou decisão de negócio/PO não ligada a um bug específico
- **Ambiente** — característica ou limitação do ambiente de teste (instabilidade por horário, rate limit, dados)
- **Convenção** — decisão operacional do time não coberta em nenhum outro doc
- **Ferramenta** — limitação conhecida de uma ferramenta (MCP, Allure, etc.) que causa falso positivo/negativo recorrente

## Detalhamento

### MEM-001 — Stories testadas como estão, sem retorno ao PO

- **Categoria:** Convenção
- **Origem:** decisão do usuário em 2026-10-22, durante a análise da US-01.
- **Regra:** nenhuma US volta ao PO para refinamento. O texto das stories não é alterado.
- **Como aplicar:** cada pergunta de refinamento é classificada como **Observar** (respondida pelo site real na engenharia reversa; divergência vai para `docs/divergencias.md`) ou **Suposição do QA** (decidida pelo QA com base registrada, listada na auditoria final). Os marcadores `[NEEDS PO CONFIRMATION]` dos agentes não ficam esperando resposta: são resolvidos por uma dessas duas vias.

### MEM-002 — Bloqueio de anúncios de terceiros na suíte

- **Categoria:** Ambiente
- **Origem:** diagnóstico FLK-001 (`docs/flaky-index.md`), confirmado pelo usuário em 2026-10-22.
- **Fato:** o site carrega o Google AdSense, que exibe um anúncio de tela cheia ("vignette", URL `#google_vignette`) em cliques de navegação interna, de forma intermitente (4 falhas em 71 execuções do TC08).
- **Regra:** a suíte aborta requisições para `googlesyndication.com`, `doubleclick.net`, `adtrafficquality.google` e `fundingchoicesmessages.google.com` (fixture automática `blockThirdPartyAds`). Não é retry nem espera: remove a interferência de terceiro, que não faz parte do sistema sob teste.
- **Como aplicar:** não usar retry, `waitForTimeout` nem timeout maior para lidar com anúncio. Para explorar com anúncios reais, rodar com `BLOCK_ADS=0`. O risco "anúncio cobre botão para o usuário real" continua como risco de produto, fora da automação.

### MEM-003 — Folga de tempo medida e carga reduzida no site compartilhado

- **Categoria:** Ambiente
- **Origem:** 2ª série de 10 execuções da Fase 5 (2026-10-22), decisão do usuário.
- **Fato:** o site tem picos de latência em requisições isoladas. Nas execuções 7 a 9, a mediana dos testes quase não mudou (1,1x), mas o teste mais lento passou de 14–17 s para 23–30,3 s, e 3 testes estouraram limites (teste 30 s, assertion 5 s, ação 10 s).
- **Regra:** limite por teste de 60 s (cerca de 2x o pico observado de 30,3 s); assertions com 10 s; 2 workers locais e 1 no CI, para não sobrecarregar o site. O limite por ação (10 s) **não** foi alterado.
- **Como aplicar:** não aumentar limites além disso sem nova medição e nova decisão. A duração de cada execução fica em `docs/execucoes.md` para expor degradação, em vez de escondê-la. Retry continua proibido.

### MEM-004 — Verificação anti-bot do site no CI

- **Categoria:** Ambiente
- **Origem:** 1ª série de 10 no GitHub Actions (2026-10-23), decisão do usuário.
- **Fato:** depois de cerca de 25 min de execuções seguidas, o site serviu aos runners do GitHub uma página de verificação anti-bot (HTTP 200, "Please wait while your request is being verified…", `failedChecks=webdriverCheck`). Todos os testes da execução falharam por isso.
- **Regra:** a série de estabilidade espera 20 min entre execuções. O `scripts/check-site-access.js` roda antes dos testes nos dois workflows e falha com "AMBIENTE BLOQUEADO" se o desafio for servido. **Nunca** esconder a automação nem tentar passar pelo desafio.
- **Como aplicar:** falha da pré-checagem = ambiente, não suíte. Registrar em `docs/execucoes.md` e não contar como defeito do produto nem do teste.
