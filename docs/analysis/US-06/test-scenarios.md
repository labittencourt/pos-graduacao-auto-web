# Cenários de teste — US-06 Excluir a própria conta

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

Story de apoio: os cenários são **cobertos por testes que já existem**. Nenhum teste novo é criado (decisão do usuário, 2026-10-22).

## Modelagem de risco por dimensão

| # | Dimensão | Risco | Coberto por |
|---|----------|-------|-------------|
| 1 | Contrato/Promessa | A exclusão não acontece | TC01, TC02 (prova pela API 14) |
| 2 | Consistência interna | A mensagem afirma exclusão sem excluir | US05-EXTRA (BUG-004) |
| 3 | Integridade dos dados | A conta continua existindo depois de "ACCOUNT DELETED!" | TC01, TC02 (API 14) |
| 4 | Consistência cruzada | Excluir pela UI não reflete na API | TC01, TC02 (API 14) |
| 5 | Determinismo | Sessão continua depois da exclusão | TC01 (menu volta a "Signup / Login") |
| 6 | Limites | sem risco identificado nesta US | — |
| 7 | Tratamento de erro | Excluir sem sessão | US05-EXTRA (BUG-004) |
| 8 | Autorização entre perfis | Visitante exclui conta | US05-EXTRA (a conta continua existindo) |

## Critérios × testes existentes

| Critério da US-06 | Teste |
|-------------------|-------|
| Autenticado → "Delete Account" → "ACCOUNT DELETED!" | `TC01 Register User`, `TC02 Login User with correct email and password` |
| A conta deixa de existir (prova, AUD-002) | `TC01`, `TC02` (API 14) |
| "Continue" → não estou mais autenticado | `TC01 Register User` |
| (descoberto) Sem sessão, nada é excluído | `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)` |

Os TC 15 e 16 (US-10 e US-11) reusarão `NavBar.deleteAccount()` e a mesma prova pela API.
