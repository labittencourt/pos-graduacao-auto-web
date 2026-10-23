# Acordo de escopo de teste — US-02 (TC 5)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

## 1. O que a automação vai cobrir
| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-03, R-05 | CT-02-01, CT-02-03 | `TC05 Register User with existing email` |
| R-04 | CT-02-02 | assertions dentro de `TC05` |
| R-06 | CT-02-04 | fixture `registeredUser` (API, e-mail único, teardown) |
| R-07 | CT-02-05 (extra aprovado) | `US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002)` — falha esperada (`test.fail()`) |

Extra aprovado pelo usuário em 2026-10-22, no formato do BUG-001.

## 2. Fora de escopo (não é gap)
- Enumeração de contas pela mensagem de erro: exigida pelo TC 5.

## 3. Pronto (lente de QA)
- `TC05` passa em headless e headed, sem retry; a conta pré-existente é removida no teardown.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar o extra
- Quando: 2026-10-22
