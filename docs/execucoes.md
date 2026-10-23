# Execuções — Fase 5 (estabilidade)

**Meta (prompt do trabalho):** 0 falhas em 10 execuções consecutivas da suíte completa, local e no GitHub Actions. Retry proibido; instabilidade é diagnosticada na causa.

**Suíte:** 33 testes (10 TCs + 23 extras) em 4 specs. Destes, 8 são falhas esperadas (`test.fail()`) de bugs conhecidos do site (BUG-001 a BUG-007). Na coluna "Passou", 25 é o resultado completo.

Colunas: "Falha esperada" = teste de bug conhecido que falhou como esperado; "Falhou" = falha inesperada; "Instável" = passou só depois de falhar (impossível aqui, sem retry).

## Resultado local

| Ambiente | Série | Resultado |
|----------|-------|-----------|
| Local (Windows 11, Chromium headless) | 3ª série, execuções 2 a 11 | ✅ **10 consecutivas sem falha inesperada** |
| GitHub Actions | 1ª execução (push do commit `4f2522e`), [run 39884571898](https://github.com/labittencourt/pos-graduacao-auto-web/actions/runs/39884571898) | ✅ verde: todos os passos com sucesso; artefatos `playwright-report` e `allure-report` publicados |
| GitHub Actions | 10 consecutivas (`e2e-stability`, disparo manual) | pendente |

## 1ª série — 2026-10-22, 4 workers, limites originais (teste 30 s, assertion 5 s)

| # | Início | Fim | Duração (s) | Total | Passou | Falha esperada | Falhou | Instável | Pulado | Exit |
|---|--------|-----|------------:|------:|-------:|---------------:|-------:|---------:|-------:|-----:|
| 1 | 21:29:58 | 21:30:40 | 39.4 | 33 | 24 | 8 | 1 | 0 | 0 | 1 |
| 2 | 21:30:40 | 21:31:18 | 36.0 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 3 | 21:31:18 | 21:31:59 | 38.9 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 4 | 21:31:59 | 21:32:39 | 37.4 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 5 | 21:32:39 | 21:33:21 | 40.8 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 6 | 21:33:21 | 21:34:01 | 38.2 | 33 | 24 | 8 | 1 | 0 | 0 | 1 |
| 7 | 21:34:01 | 21:34:38 | 34.9 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 8 | 21:34:38 | 21:35:19 | 39.1 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 9 | 21:35:19 | 21:36:06 | 44.8 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 10 | 21:36:06 | 21:36:45 | 37.1 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |

**Triagem**
- **Execução 1 — `US11-EXTRA Guest cart is kept after login`:** a lista de produtos da home não apareceu em 10 s. **Não classificada:** os artefatos foram sobrescritos pela execução seguinte (OC-16). Pelo padrão das séries seguintes, é compatível com instabilidade do site, mas sem evidência própria.
- **Execução 6 — `US10-EXTRA Payment without card number is blocked`:** **teste incorreto** (FLK-003). Clique em "Proceed To Checkout" antes de o script do site ligar o handler. Corrigido na causa; a varredura achou o mesmo padrão na busca.

## 2ª série — 2026-10-22, 4 workers, limites originais, depois do FLK-003

| # | Início | Fim | Duração (s) | Total | Passou | Falha esperada | Falhou | Instável | Pulado | Exit |
|---|--------|-----|------------:|------:|-------:|---------------:|-------:|---------:|-------:|-----:|
| 1 | 21:38:55 | 21:39:37 | 39.9 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 2 | 21:39:37 | 21:40:15 | 36.7 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 3 | 21:40:15 | 21:40:57 | 40.3 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 4 | 21:40:57 | 21:41:44 | 44.9 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 5 | 21:41:44 | 21:42:24 | 37.7 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 6 | 21:42:24 | 21:43:04 | 37.5 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 7 | 21:43:04 | 21:44:03 | 56.5 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 8 | 21:44:03 | 21:45:07 | 61.4 | 33 | 24 | 8 | 1 | 0 | 0 | 1 |
| 9 | 21:45:07 | 21:46:10 | 61.1 | 33 | 23 | 8 | 2 | 0 | 0 | 1 |
| 10 | 21:46:11 | 21:46:51 | 37.8 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |

**Triagem**
- **Execuções 8 e 9 — `TC02` (limite de 30 s numa chamada à API), `US10-EXTRA Cart is empty after the order` (modal "Added!" sem aparecer em 5 s) e `US11-EXTRA Guest cart is kept after login` (clique em Login sem navegar em 10 s):** **ambiente**, picos de latência do site. Evidência: nas execuções 7 a 9, a mediana dos testes quase não mudou (1,1x), mas o teste mais lento passou de 14–17 s para 23–30,3 s, inclusive entre os que **passaram**. São três caminhos diferentes do servidor lentos ao mesmo tempo.
- **Decisão (usuário, MEM-003):** limite por teste 60 s (cerca de 2x o pico), assertions 10 s, 2 workers locais (1 no CI). O limite por ação (10 s) **não** foi alterado. Trace passou a ser gravado em toda falha.

## 3ª série — 2026-10-22, 2 workers, limites da MEM-003

| # | Início | Fim | Duração (s) | Total | Passou | Falha esperada | Falhou | Instável | Pulado | Exit |
|---|--------|-----|------------:|------:|-------:|---------------:|-------:|---------:|-------:|-----:|
| 1 | 22:03:45 | 22:06:20 | 153.3 | 33 | 24 | 8 | 1 | 0 | 0 | 1 |
| 2 | 22:06:20 | 22:08:20 | 117.8 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 3 | 22:08:20 | 22:10:21 | 119.8 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 4 | 22:10:22 | 22:12:37 | 132.9 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 5 | 22:12:37 | 22:14:50 | 131.1 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 6 | 22:14:50 | 22:16:43 | 110.5 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 7 | 22:16:43 | 22:18:41 | 116.3 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 8 | 22:18:41 | 22:20:31 | 108.7 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 9 | 22:20:31 | 22:22:21 | 107.3 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 10 | 22:22:21 | 22:24:09 | 106.3 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |
| 11 | 22:24:41 | 22:26:31 | 108.3 | 33 | 25 | 8 | 0 | 0 | 0 | 0 |

**Triagem**
- **Execução 1 — `TC15 Place Order: Register before Checkout`:** **ambiente**. O print/snapshot mostra a página da Cloudflare *"Web server is returning an unknown error — Error code 520"* no lugar de `/payment`: o servidor de origem do site falhou naquele instante. Não é defeito do produto nem do teste.
- **Execuções 2 a 11:** 10 consecutivas, 25 passaram + 8 falhas esperadas, **0 falhas inesperadas**. Mesmo código e mesma configuração em todas.

## O que mudou entre as séries (rastreabilidade)
| Depois da série | Mudança | Registro |
|-----------------|---------|----------|
| 1ª | `CartPage.proceedToCheckout()` e `ProductsPage.search()` esperam `DOMContentLoaded` | FLK-003 · OC-17 |
| 1ª | Pasta de saída separada por execução | OC-16 |
| 2ª | Limites 60 s / 10 s, 2 workers, trace em toda falha | MEM-003 |
| 3ª | (nenhuma mudança de código entre as execuções 2 e 11) | — |
| 3ª (depois da sequência) | Fixture automática `serverErrorAnnotation`: navegação com resposta 5xx anota o teste como `ambiente` (status + URL). Não muda resultado de teste. Verificada com um 520 simulado e com uma execução completa da suíte (25 passaram + 8 falhas esperadas) | triagem da execução 1 da 3ª série |

## Observação sobre a duração
Com 2 workers, cada execução leva cerca de 110 s (contra cerca de 40 s com 4). É o custo de não sobrecarregar um site público e compartilhado.
