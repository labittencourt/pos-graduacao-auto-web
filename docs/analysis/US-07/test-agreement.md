# Acordo de escopo de teste — US-07 (TC 8)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-06 | CT-07-01 | `TC08 Verify All Products and product detail page` |
| R-07 | CT-07-02 (extra aprovado) | `US07-EXTRA Every listed product is complete with a unique detail link` |
| R-08 | CT-07-03 (extra aprovado) | `US07-EXTRA Nonexistent product is not offered for sale (BUG-005)` — falha esperada |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Filtros e avaliações.

## 3. Pronto (lente de QA)
- `TC08` passa em headless e headed, sem retry. Não cria dados.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
