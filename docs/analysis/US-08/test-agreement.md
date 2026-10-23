# Acordo de escopo de teste — US-08 (TC 9)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-05 | CT-08-01 | `TC09 Search Product` |
| R-06 | CT-08-02 (extra aprovado) | `US08-EXTRA Search is case-insensitive` |
| R-07 | CT-08-03 (extra aprovado) | `US08-EXTRA Search with no match shows no products` |
| R-08 | CT-08-04 (extra aprovado) | `US08-EXTRA Search ignores leading spaces (BUG-006)` — falha esperada |

Extras aprovados pelo usuário em 2026-10-22.

## 2. Fora de escopo (não é gap)
- Ordenação/relevância; busca por marca.

## 3. Pronto (lente de QA)
- `TC09` passa em headless e headed, sem retry. Não cria dados.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os extras
- Quando: 2026-10-22
