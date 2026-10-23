# Acordo de escopo de teste — US-10 (TC 15)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-09 | CT-10-01 | `TC15 Place Order: Register before Checkout` |
| R-10 | CT-10-02 (extra aprovado) | `US10-EXTRA Cart is empty after the order` |
| R-11 | CT-10-03 (extra aprovado) | `US10-EXTRA Payment without card number is blocked` |

Extras aprovados pelo usuário em 2026-10-22. Os dois usam conta criada pela API + login (o cadastro pela UI já é coberto pelo TC15).

## 2. Fora de escopo (não é gap)
- Cartão recusado; "Download Invoice".

## 3. Pronto (lente de QA)
- `TC15` passa em headless e headed, sem retry; a conta criada é excluída pela UI e, se o teste falhar antes, pelo teardown.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
