# Acordo de escopo de teste — US-03 (TC 2)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-04, R-07 | CT-03-01 | `TC02 Login User with correct email and password` |
| R-05 | CT-03-02 (extra aprovado) | `US03-EXTRA Session persists when navigating` |
| R-06 | CT-03-03 (extra aprovado) | `US03-EXTRA Login accepts email with uppercase domain (BUG-002)` — falha esperada |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Credenciais inválidas: US-04.

## 3. Pronto (lente de QA)
- `TC02` passa em headless e headed, sem retry; a conta é removida pela UI (passo do TC) ou pelo teardown.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
