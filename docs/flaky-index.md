# Índice de Flakiness — Testes Instáveis

Rastreia o histórico de instabilidade de cada teste ao longo do tempo — a pergunta que uma
única execução não responde é "isso falha de vez em quando, ou foi um caso isolado?". Este
arquivo é cumulativo; os relatórios de triage em `docs/runs/<timestamp>-triage.md` são o
histórico detalhado de cada investigação que classificou um teste como flaky.

**Critério de quarentena (sugestão, nunca automática):** 3 ou mais classificações FLAKY nas
últimas 5 execuções em que o teste rodou.
**Critério de reintegração (sugestão, nunca automática):** 5 execuções consecutivas
estáveis (sem flaky) depois de entrar em quarentena.

Um teste em quarentena não é excluído da suite — continua rodando e sendo registrado aqui,
só sai da contagem de "resultado oficial" do Agente 5 (Executor). É assim que a
reintegração consegue ser observada: se o teste parasse de rodar, nunca teríamos sinal de
que estabilizou.

| ID | Arquivo | Teste | Últimas execuções (mais recente → mais antiga) | Taxa de flaky (últimas 5) | Status | Desde |
|----|---------|-------|--------------------------------------------------|----------------------------|--------|-------|
| FLK-003 | tests/compra.spec.ts, tests/catalogo.spec.ts | US10-EXTRA Payment without card number is blocked (falhou); TC09 Search Product e todos os que usam "Proceed To Checkout" (expostos) | 1 falha na 1ª série de 10 execuções da suíte (execução 6) | — | Causa raiz corrigida (2026-10-22) — nova série de 10 em andamento | 2026-10-22 |
| FLK-002 | tests/compra.spec.ts | TC15 Place Order: Register before Checkout | antes: 7/11 e 7/12 passaram; depois: 21/21 | 0/5 após a correção | Causa raiz corrigida (2026-10-22) — não entrou em quarentena | 2026-10-22 |
| FLK-001 | tests/catalogo.spec.ts | TC08 Verify All Products and product detail page | sem bloqueio: 4 falhas em 71 execuções; com bloqueio: 0 em 60 + suíte 36/36 | 0/5 após a correção | Causa raiz corrigida (2026-10-22) — não entrou em quarentena | 2026-10-22 |

## Diagnósticos

### FLK-001 — Vignette do Google AdSense intercepta cliques de navegação
- **Sintoma:** depois de clicar em "Products", a URL era `https://www.automationexercise.com/#google_vignette` e a navegação não acontecia (`expect(page).toHaveURL(/\/products$/)` falhava).
- **Classificação:** problema de ambiente (script de anúncio de terceiro), não defeito do site nem do teste.
- **Causa raiz:** o AdSense (`pagead2.googlesyndication.com`) exibe um anúncio de tela cheia ("vignette") em cliques de navegação interna, com frequência limitada, e segura a navegação até o anúncio ser fechado.
- **Hipótese testada (uma variável):** bloquear só os hosts de anúncio. Sem bloqueio: 4 falhas em 71 execuções. Com bloqueio: 0 em 60, e a suíte inteira 36/36 dentro do esperado.
- **Correção:** fixture automática `blockThirdPartyAds` em `src/fixtures/index.ts`, que aborta requisições para `googlesyndication.com`, `doubleclick.net`, `adtrafficquality.google` e `fundingchoicesmessages.google.com`. `BLOCK_ADS=0` desliga o bloqueio, para exploração com anúncios reais.
- **Não é mascaramento:** sem retry, sem espera fixa, sem timeout maior. O que se remove é a interferência de terceiro que não faz parte do sistema sob teste. O risco "anúncio cobre botão para o usuário real" continua registrado como risco de produto, fora da automação.
- **Escopo:** afeta todos os testes, porque os de Conta também clicam em links internos e estavam expostos ao mesmo risco.

### FLK-002 — Teste interagia com /payment antes de o script do site ligar o handler de submit
- **Sintoma:** a mensagem "Your order has been placed successfully!" era registrada no envio como `visible: false`, de forma intermitente (5 de 12).
- **Classificação:** TESTE INCORRETO (corrida no próprio teste), não defeito do site nem do ambiente.
- **Evidência (instrumentação temporária):** todas as falhas tinham `siteHandlerBound: false` e `readyState: "loading"` no momento em que o ouvinte do teste foi registrado; todas as execuções que passaram tinham `siteHandlerBound: true`.
- **Causa raiz:** `PaymentPage.expectLoad()` só conferia a URL, que muda quando a navegação é confirmada, antes do fim da leitura do HTML. O handler de `submit` do site é um script inline no fim do HTML; o teste preenchia e enviava antes de ele existir. Um usuário real não é tão rápido.
- **Correção:** `PaymentPage.expectLoad()` espera `DOMContentLoaded` (todos os scripts do HTML já rodaram). É espera por condição, não por tempo. Antes: 7/11 e 7/12. Depois: 21/21.
- **Varredura do mesmo risco:** ~~outras interações com comportamento em JavaScript (rodapé, "Add to cart") acontecem depois de `goto`, que já espera `load`; busca, login e signup são formulários sem JavaScript. Sem outra ocorrência.~~ **Afirmação errada, corrigida no FLK-003:** a varredura foi feita olhando o tipo de formulário, não o código das páginas, e deixou passar "Proceed To Checkout" e a lupa da busca, que navegam por JavaScript.

### FLK-003 — Cliques em controles que navegam por JavaScript antes do handler existir
- **Sintoma:** na 1ª série de 10 execuções da Fase 5 (execução 6), o `US10-EXTRA Payment without card number is blocked` clicou em "Proceed To Checkout" e continuou em `/view_cart` (`expect(page).toHaveURL(/\/checkout$/)` recebeu `.../view_cart`).
- **Classificação:** TESTE INCORRETO, a mesma família do FLK-002.
- **Causa raiz:** "Proceed To Checkout" não é link; o código inline do fim de `/view_cart` faz `$(".check_out").on("click", ...)` com `window.location = '/checkout'`. O teste chegava ao carrinho por clique e clicava antes de o script rodar. A varredura de todas as páginas usadas pela suíte (`grep` por `.on("click"`, `.on("submit"` e `window.location`) achou o mesmo padrão na lupa da busca (`#submit_search` → `window.location = '/products?search=...'`), que o TC09 usa depois de chegar a `/products` por clique.
- **Correção:** `CartPage.proceedToCheckout()` e `ProductsPage.search()` esperam `DOMContentLoaded` antes de agir (espera por condição, não por tempo). Regra que fica: **ação que depende de JavaScript do site espera o parse da página antes de agir**.
- **Mapa completo:** pagar (FLK-002), "Proceed To Checkout" e busca (FLK-003) corrigidos. Rodapé e "Add to cart" só são usados depois de `goto` (espera `load`). Avaliação de produto e "Contact us" têm handlers, mas não são usados pela suíte.
- **Evidência:** JSON da execução 6. Os prints e vídeos foram sobrescritos pela execução seguinte (OC-16).

### Falha da execução 1 (1ª série) — investigação pendente
- `US11-EXTRA Guest cart is kept after login`: depois de `homePage.goto()`, `.features_items .product-image-wrapper .productinfo p` não apareceu em 10 s (`locator.textContent: Timeout 10000ms exceeded`).
- **Sem evidência para classificar:** os artefatos foram sobrescritos (OC-16), e não há hipótese confirmada. Não foi corrigida "no escuro". A nova série grava a saída de cada execução numa pasta própria para capturar print, vídeo e trace se ela voltar.
