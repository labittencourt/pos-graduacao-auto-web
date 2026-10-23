# Acordo de escopo de teste — US-01 Cadastrar nova conta (TC 1)

**Data:** 2026-10-22 · **Agente:** /qa-acordo-cobertura (Passo 4)

## 1. O que a automação vai cobrir

| Requisito | Cenário | Teste |
|-----------|---------|-------|
| R-01 a R-06 | CT-01-01 | `TC01 Register User` |
| R-05 | CT-01-02 | assertion dentro de `TC01` |
| R-07 | CT-01-03 | assertion dentro de `TC01` |
| R-12 | CT-01-04 | factory de usuário + execução paralela |

| R-08 | CT-01-05 (extra aprovado) | `US01-EXTRA Required field empty blocks account creation` |
| R-09 | CT-01-06 (extra aprovado) | `US01-EXTRA Malformed email blocks signup` |
| R-10 | CT-01-08 (extra aprovado) | `US01-EXTRA Password field is masked` |
| R-13 | CT-01-09 (extra aprovado) | `US01-EXTRA Account form has no critical a11y violations` |

Extras aprovados pelo usuário em 2026-10-22 ("sim, vamos criar os 4").

## 2. Fora de escopo (não é gap)

- Entrega de e-mail da newsletter ou das ofertas: não é verificável na UI; depende de provedor externo.
- Persistência dos dados de endereço: coberta nas US-10 e US-11.
- R-11 (exclusão sem confirmação): registrada como risco [MANUAL], porque o TC 1 espera exatamente esse comportamento.

## 3. O que conta como pronto (lente de QA)

- `TC01 Register User` passa em headless e headed, sem retry.
- A conta criada é removida mesmo se o teste falhar antes da exclusão pela UI (teardown por API).
- DIV-01 e DIV-02 registradas em `docs/divergencias.md`.
- As suposições do QA (Q02, Q04 a Q08) ficam listadas para a auditoria final.

## Aceite
- Quem concordou: usuário (dono do trabalho), ao aprovar os 4 extras
- Quando: 2026-10-22
