# Acordo de escopo de teste — US-04 (TC 3)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-04 | CT-04-01 | `TC03 Login User with incorrect email and password` |
| R-05 | CT-04-02 (extra aprovado) | `US04-EXTRA Wrong password for existing email shows the same generic error` |
| R-06 | CT-04-03 (extra aprovado) | `US04-EXTRA Password is case-sensitive` |
| R-07 | CT-04-04 (extra aprovado) | `US04-EXTRA Password is not echoed back after failed login (BUG-003)` — falha esperada |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Bloqueio por força bruta (site compartilhado).

## 3. Pronto (lente de QA)
- `TC03` passa em headless e headed, sem retry. Não cria nenhum dado.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
