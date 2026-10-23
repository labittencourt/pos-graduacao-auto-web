# Acordo de escopo de teste — US-11 (TC 16)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-07 | CT-11-01 | `TC16 Place Order: Login before Checkout` |
| R-08 | CT-11-02 (extra aprovado) | `US11-EXTRA Guest cart is kept after login` |
| R-09 | CT-11-03 (extra aprovado) | `US11-EXTRA Guest checkout asks for login` |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Os mesmos da US-10.

## 3. Pronto (lente de QA)
- `TC16` passa em headless e headed, sem retry; a conta é excluída pela UI (passo do TC) ou pelo teardown.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
