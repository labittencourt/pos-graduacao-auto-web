# BUG-002 — E-mail comparado diferenciando maiúsculas permite conta duplicada

**Data:** 2026-10-22 · **US:** US-02 (extra CT-02-05) · **Severidade:** Medium · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
Signup (`/login` → caixa "New User Signup!") e API `POST /api/createAccount`.

## Como reproduzir
1. Criar uma conta com `qa-automation-x@example-test.invalid`.
2. Em `/login`, fazer signup com `qa-automation-x@EXAMPLE-TEST.INVALID` (só o domínio em maiúsculas).

## Esperado
"Email Address already exist!", como para o e-mail idêntico. Oráculos:
- **RFC 5321, seção 2.4:** nomes de domínio não diferenciam maiúsculas, então os dois endereços são a mesma caixa postal.
- **Benefício da US-02:** "para não criar cadastro duplicado".

## Observado
- **UI (e-mail todo em maiúsculas):** sem erro; abre o formulário "Enter Account Information" com o e-mail em maiúsculas.
- **API:** tanto o e-mail todo em maiúsculas quanto só o domínio em maiúsculas retornam `{"responseCode": 201, "message": "User created!"}`, criando uma **segunda conta** com outro id (ex.: 3098083 original e 3098085 duplicada).

## Outras manifestações
- **Login (US-03, 2026-10-22):** com a conta `x@example-test.invalid`, o login com `x@EXAMPLE-TEST.INVALID` e a senha correta é recusado com "Your email or password is incorrect!". Mesma causa raiz: comparação de e-mail que diferencia maiúsculas.

## Evidência
- Sondagem ao vivo em 2026-10-22: MCP Playwright (UI) e curl (API). As contas de sondagem foram excluídas.
- Testes `US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002)` e `US03-EXTRA Login accepts email with uppercase domain (BUG-002)` em `tests/conta.spec.ts`.

## Tratamento na suíte
O teste afirma o comportamento correto e está em `test.fail()` (decisão do usuário, 2026-10-22). A suíte fica verde e o defeito continua visível como "falha esperada". Se o site for corrigido, o teste passa como inesperado e o bug deve ser retestado.
