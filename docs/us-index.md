# Índice de US — Backlog e Dependências

Fonte única de verdade de toda US/demanda já analisada neste projeto — status,
escopo, estágio no pipeline e como se relacionam entre si. Os arquivos
`docs/analysis/<id-us>/*.md` continuam sendo o detalhe de cada análise; para
saber "o que já existe, em que pé está, e o que depende do quê", a resposta é
sempre esta tabela.

**Escrita hoje (Fase 2):** Agente 1 cria a entrada e propõe relações; Agente 2
registra os testes vinculados e avança o estágio para "Em design"; Agente 5
avança para "Em execução" na primeira rodada de teste vinculado; Agente 7
incrementa "Bugs abertos" ao abrir um bug vinculado a esta US; Agente 8
decrementa ao confirmar correção e propõe "Concluída" quando o contador zera
e os testes vinculados passam.

## Estágios (ordem de progressão)

🔵 Em análise → 🟣 Em design/scaffold → 🟡 Em execução → ✅ Concluída
(⚫ Obsoleta pode ocorrer a partir de qualquer estágio)

Transições automáticas (fato objetivo, sem confirmação):
- 🔵 criada pelo Agente 1 ao concluir o Modo A
- 🟣 pelo Agente 2 ao gerar cobertura + esboços
- 🟡 pelo Agente 5 na primeira execução de teste vinculado a essa US
- "Bugs abertos" — incrementado pelo Agente 7 ao abrir bug vinculado,
  decrementado pelo Agente 8 ao confirmar correção; é um contador, não um
  estágio, sempre atualizado automaticamente

Transições que exigem confirmação humana (decisão, não fato):
- ✅ Concluída — proposta pelo Agente 8 quando os testes vinculados a esta US
  passaram na última execução E "Bugs abertos" chegou a zero
- ⚫ Obsoleta — proposta por qualquer agente, nunca aplicada sem confirmação

## Índice

| ID | Título | Escopo | Estágio | Gate | Bugs abertos | Depende de | Impacta |
|----|--------|--------|---------|------|---------------|------------|---------|
| US-01 | Cadastrar nova conta (TC 1) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-02 | Impedir cadastro com e-mail já existente (TC 5) | Frontend | 🟡 Em execução | PASS | 1 | — | — |
| US-03 | Entrar com e-mail e senha válidos (TC 2) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-04 | Recusar login com credenciais inválidas (TC 3) | Frontend | 🟡 Em execução | PASS | 1 | — | — |
| US-05 | Encerrar sessão (TC 4) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-06 | Excluir a própria conta (apoio TC 1, 2, 15, 16) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-07 | Lista de produtos e detalhe (TC 8) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-08 | Buscar produtos por nome (TC 9) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-09 | Assinar a newsletter pelo rodapé (TC 10) | Frontend | 🟡 Em execução | CONDITIONAL | 1 | — | — |
| US-10 | Comprar logo após criar a conta (TC 15) | Frontend | 🟡 Em execução | CONDITIONAL | 0 | — | — |
| US-11 | Comprar após entrar com uma conta existente (TC 16) | Frontend | 🟡 Em execução | CONDITIONAL | 0 | — | — |

## Relações propostas, aguardando confirmação

- **US-11 depende de US-03, US-06 e US-10 (proposta):** reusa o login, a exclusão e o fluxo de compra (helper `placeOrder`). Aguardando confirmação.
- **US-10 depende de US-01 e US-06 (proposta):** reusa o cadastro inteiro e a exclusão de conta. Aguardando confirmação.
- **US-08 depende de US-07 (proposta):** a busca usa a mesma página `/products` e o mesmo detalhe de produto. Aguardando confirmação.
- **US-02 depende de US-01 (proposta):** as duas usam a caixa de signup, e a US-02 só faz sentido se o cadastro da US-01 grava o e-mail. Aguardando confirmação.

## Detalhamento

### US-01

- **Story:** [docs/user-stories/US-01-cadastrar-nova-conta.md](user-stories/US-01-cadastrar-nova-conta.md)
- **Análise:** [gate](analysis/US-01/gate.md) · [perguntas](analysis/US-01/refinement-questions.md) · [sugestões](analysis/US-01/po-suggestions.md) · [cenários](analysis/US-01/test-scenarios.md) · [acordo](analysis/US-01/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 8 · Completude 6 · Testabilidade 7)
- **Testes vinculados:** `tests/conta.spec.ts` → `TC01 Register User`, `US01-EXTRA Required field empty blocks account creation`, `US01-EXTRA Malformed email blocks signup`, `US01-EXTRA Password field is masked`, `US01-EXTRA Account form has no critical a11y violations (BUG-001)`
- **Última execução:** [20261022-1640](runs/20261022-1640-run-report.md) — 15/15 dentro do esperado (12 passaram + 3 falhas esperadas do BUG-001)
- **Bugs:** BUG-001 (acessibilidade do formulário, terceiro, `test.fail()`)

### US-02

- **Story:** [docs/user-stories/US-02-impedir-cadastro-email-existente.md](user-stories/US-02-impedir-cadastro-email-existente.md)
- **Análise:** [gate](analysis/US-02/gate.md) · [perguntas](analysis/US-02/refinement-questions.md) · [sugestões](analysis/US-02/po-suggestions.md) · [cenários](analysis/US-02/test-scenarios.md) · [acordo](analysis/US-02/test-agreement.md) · [mapa](analysis/US-02/system-map-matches.md)
- **Gate:** PASS (Coerência 9 · Completude 7 · Testabilidade 8)
- **Testes vinculados:** `tests/conta.spec.ts` → `TC05 Register User with existing email`, `US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002)`
- **Bugs:** BUG-002 (e-mail diferenciando maiúsculas, terceiro, `test.fail()`)
- **Última execução:** [20261022-1700](runs/20261022-1700-run-report.md) — 11/11 (TC05) + suíte do arquivo 12/12 dentro do esperado

### US-03

- **Story:** [docs/user-stories/US-03-entrar-credenciais-validas.md](user-stories/US-03-entrar-credenciais-validas.md)
- **Análise:** [gate](analysis/US-03/gate.md) · [perguntas](analysis/US-03/refinement-questions.md) · [sugestões](analysis/US-03/po-suggestions.md) · [cenários](analysis/US-03/test-scenarios.md) · [acordo](analysis/US-03/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 9 · Completude 6 · Testabilidade 8)
- **Testes vinculados:** `tests/conta.spec.ts` → `TC02 Login User with correct email and password`, `US03-EXTRA Session persists when navigating`, `US03-EXTRA Login accepts email with uppercase domain (BUG-002)`
- **Última execução:** [20261022-1720](runs/20261022-1720-run-report.md) — TC02 11/11; extras 10/10 dentro do esperado
- **Bugs:** BUG-002 (manifestação no login)

### US-04

- **Story:** [docs/user-stories/US-04-recusar-login-invalido.md](user-stories/US-04-recusar-login-invalido.md)
- **Análise:** [gate](analysis/US-04/gate.md) · [perguntas](analysis/US-04/refinement-questions.md) · [sugestões](analysis/US-04/po-suggestions.md) · [cenários](analysis/US-04/test-scenarios.md) · [acordo](analysis/US-04/test-agreement.md)
- **Gate:** PASS (Coerência 9 · Completude 7 · Testabilidade 9)
- **Testes vinculados:** `tests/conta.spec.ts` → `TC03 Login User with incorrect email and password`, `US04-EXTRA Wrong password for existing email shows the same generic error`, `US04-EXTRA Password is case-sensitive`, `US04-EXTRA Password is not echoed back after failed login (BUG-003)`
- **Última execução:** [20261022-1740](runs/20261022-1740-run-report.md) — TC03 11/11; extras 15/15 dentro do esperado
- **Bugs:** BUG-003 (senha devolvida no HTML — encontrado na análise)

### US-05

- **Story:** [docs/user-stories/US-05-encerrar-sessao.md](user-stories/US-05-encerrar-sessao.md)
- **Análise:** [gate](analysis/US-05/gate.md) · [perguntas](analysis/US-05/refinement-questions.md) · [sugestões](analysis/US-05/po-suggestions.md) · [cenários](analysis/US-05/test-scenarios.md) · [acordo](analysis/US-05/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 9 · Completude 6 · Testabilidade 7)
- **Testes vinculados:** `tests/conta.spec.ts` → `TC04 Logout User`, `US05-EXTRA Browser back after logout does not restore the session`, `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)`
- **Última execução:** [20261022-1800](runs/20261022-1800-run-report.md) — TC04 11/11; extras 10/10 dentro do esperado
- **Bugs:** BUG-004 (encontrado na análise — confirmação falsa em `/delete_account` sem sessão)

### US-06

- **Story:** [docs/user-stories/US-06-excluir-propria-conta.md](user-stories/US-06-excluir-propria-conta.md)
- **Análise:** [gate](analysis/US-06/gate.md) · [cenários](analysis/US-06/test-scenarios.md) · [acordo](analysis/US-06/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 9 · Completude 6 · Testabilidade 8)
- **Testes vinculados:** sem teste próprio — coberta por `TC01 Register User`, `TC02 Login User with correct email and password`, `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)`
- **Bugs:** BUG-004

### US-07

- **Story:** [docs/user-stories/US-07-lista-e-detalhe-de-produto.md](user-stories/US-07-lista-e-detalhe-de-produto.md)
- **Análise:** [gate](analysis/US-07/gate.md) · [perguntas](analysis/US-07/refinement-questions.md) · [sugestões](analysis/US-07/po-suggestions.md) · [cenários](analysis/US-07/test-scenarios.md) · [acordo](analysis/US-07/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 9 · Completude 6 · Testabilidade 7)
- **Testes vinculados:** `tests/catalogo.spec.ts` → `TC08 Verify All Products and product detail page`, `US07-EXTRA Every listed product is complete with a unique detail link`, `US07-EXTRA Nonexistent product is not offered for sale (BUG-005)`
- **Última execução:** [20261022-1840](runs/20261022-1840-run-report.md) — 15/15 dentro do esperado
- **Bugs:** BUG-005 · **Instabilidade:** FLK-001 (vignette de anúncio, causa raiz corrigida — MEM-002)

### US-08

- **Story:** [docs/user-stories/US-08-buscar-produtos.md](user-stories/US-08-buscar-produtos.md)
- **Análise:** [gate](analysis/US-08/gate.md) · [perguntas](analysis/US-08/refinement-questions.md) · [sugestões](analysis/US-08/po-suggestions.md) · [cenários](analysis/US-08/test-scenarios.md) · [acordo](analysis/US-08/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 8 · Completude 6 · Testabilidade 5)
- **Testes vinculados:** `tests/catalogo.spec.ts` → `TC09 Search Product`, `US08-EXTRA Search is case-insensitive`, `US08-EXTRA Search with no match shows no products`, `US08-EXTRA Search ignores leading spaces (BUG-006)`
- **Última execução:** [20261022-1900](runs/20261022-1900-run-report.md) — TC09 11/11; extras 15/15 dentro do esperado
- **Bugs:** BUG-006 (encontrado na análise) · **Divergência:** DIV-03

### US-09

- **Story:** [docs/user-stories/US-09-assinar-newsletter.md](user-stories/US-09-assinar-newsletter.md)
- **Análise:** [gate](analysis/US-09/gate.md) · [perguntas](analysis/US-09/refinement-questions.md) · [sugestões](analysis/US-09/po-suggestions.md) · [cenários](analysis/US-09/test-scenarios.md) · [acordo](analysis/US-09/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 7 · Completude 6 · Testabilidade 7)
- **Testes vinculados:** `tests/newsletter.spec.ts` → `TC10 Verify Subscription in home page`, `US09-EXTRA Malformed email is not subscribed`, `US09-EXTRA Subscription sends the email to the site (BUG-007)`
- **Última execução:** [20261022-1920](runs/20261022-1920-run-report.md) — TC10 21/21; arquivo 30/30 dentro do esperado
- **Bugs:** BUG-007 (encontrado na análise — assinatura só visual)

### US-10

- **Story:** [docs/user-stories/US-10-comprar-apos-cadastro.md](user-stories/US-10-comprar-apos-cadastro.md)
- **Análise:** [gate](analysis/US-10/gate.md) · [perguntas](analysis/US-10/refinement-questions.md) · [sugestões](analysis/US-10/po-suggestions.md) · [cenários](analysis/US-10/test-scenarios.md) · [acordo](analysis/US-10/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 8 · Completude 6 · Testabilidade 6)
- **Testes vinculados:** `tests/compra.spec.ts` → `TC15 Place Order: Register before Checkout`, `US10-EXTRA Cart is empty after the order`, `US10-EXTRA Payment without card number is blocked`
- **Última execução:** [20261022-2000](runs/20261022-2000-run-report.md) — TC15 21/21 depois da correção do FLK-002; extras 10/10
- **Divergência:** DIV-04 · **Instabilidade:** FLK-002 (corrigida na causa raiz)

### US-11

- **Story:** [docs/user-stories/US-11-comprar-apos-login.md](user-stories/US-11-comprar-apos-login.md)
- **Análise:** [gate](analysis/US-11/gate.md) · [perguntas](analysis/US-11/refinement-questions.md) · [sugestões](analysis/US-11/po-suggestions.md) · [cenários](analysis/US-11/test-scenarios.md) · [acordo](analysis/US-11/test-agreement.md)
- **Gate:** CONDITIONAL (Coerência 9 · Completude 6 · Testabilidade 6)
- **Testes vinculados:** `tests/compra.spec.ts` → `TC16 Place Order: Login before Checkout`, `US11-EXTRA Guest cart is kept after login`, `US11-EXTRA Guest checkout asks for login`
- **Última execução:** [20261022-2030](runs/20261022-2030-run-report.md) — TC16 11/11; extras 10/10
