# Acordo de escopo de teste — US-09 (TC 10)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-04 | CT-09-01 | `TC10 Verify Subscription in home page` |
| R-05 | CT-09-02 (extra aprovado) | `US09-EXTRA Malformed email is not subscribed` |
| R-06 | CT-09-03 (extra aprovado) | `US09-EXTRA Subscription sends the email to the site (BUG-007)` — falha esperada |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Entrega real da newsletter por e-mail.

## 3. Pronto (lente de QA)
- `TC10` passa em headless e headed, sem retry, inclusive em execução repetida (janela de 1,5 s).

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
