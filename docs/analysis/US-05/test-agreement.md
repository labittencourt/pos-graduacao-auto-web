# Acordo de escopo de teste — US-05 (TC 4)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-03 | CT-05-01 | `TC04 Logout User` |
| R-04 | CT-05-02 (extra aprovado) | `US05-EXTRA Browser back after logout does not restore the session` |
| R-05 | CT-05-03 (extra aprovado) | `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)` — falha esperada |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Expiração de sessão por tempo.

## 3. Pronto (lente de QA)
- `TC04` passa em headless e headed, sem retry; a conta é excluída no teardown.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
