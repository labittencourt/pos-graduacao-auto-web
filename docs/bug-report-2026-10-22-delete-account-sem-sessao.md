# BUG-004 — `/delete_account` sem sessão exibe "Account Deleted!" sem excluir nada

**Data:** 2026-10-22 · **US:** US-05 (extra CT-05-03) · **Severidade:** Low · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
`GET https://www.automationexercise.com/delete_account`, por um visitante sem sessão (por exemplo, logo depois do logout).

## Como reproduzir
1. Criar uma conta e fazer login; depois clicar em "Logout" (ou abrir uma aba anônima).
2. Acessar `/delete_account` diretamente.

## Esperado
Uma página que não afirme uma exclusão que não aconteceu: redirecionar para o login, ou exibir que é preciso estar autenticado. Oráculo: consistência com o propósito (uma confirmação só é verdadeira se a ação aconteceu).

## Observado
- A página mostra o h2 `[data-qa="account-deleted"]` "Account Deleted!" (exibido "ACCOUNT DELETED!") e o menu de visitante ("Signup / Login").
- A conta **continua existindo**: a API 14 (`getUserDetailByEmail`) responde `responseCode: 200` com os dados da conta. Portanto não há exclusão indevida, só a confirmação falsa.
- Print: [04-delete-account-logged-out.png](reverse/login-screenshots/04-delete-account-logged-out.png).

## Impacto na suíte
A mensagem "ACCOUNT DELETED!", que o TC 1 e o TC 2 usam como prova de exclusão, aparece mesmo sem exclusão. Por isso, os testes TC01 e TC02 passaram a confirmar a exclusão também pela API (auditoria AUD-002).

## Tratamento na suíte
O teste `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)` afirma o comportamento correto e está em `test.fail()` (decisão do usuário, 2026-10-22). Antes, ele confirma que a conta continua existindo, checagem que passa e roda sempre.
