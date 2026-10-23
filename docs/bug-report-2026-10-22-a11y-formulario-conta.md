# BUG-001 — Formulário de conta com violações críticas de acessibilidade

**Data:** 2026-10-22 · **US:** US-01 (extra CT-01-09) · **Severidade:** Medium · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
`https://www.automationexercise.com/signup`, formulário "Enter Account Information" / "Address Information" (`form[action="/signup"]`), depois de um signup com e-mail inédito.

## Como reproduzir
1. Em `/login`, informar nome e e-mail inéditos e clicar em "Signup".
2. Rodar o axe-core (WCAG) restrito a `form[action="/signup"]`.

## Esperado
Nenhuma violação de impacto `critical`. Oráculo: norma externa, WCAG 2.1 AA (1.3.1 Info and Relationships, 4.1.2 Name, Role, Value).

## Observado
| Regra axe | Impacto | Elementos |
|-----------|---------|-----------|
| `label` | critical | `#zipcode`: o campo Zipcode não tem `<label>` associado (os outros campos têm) |
| `select-name` | critical | `#days`, `#months`, `#years`: os selects de data de nascimento não têm nome acessível |

Efeito: um leitor de tela anuncia o Zipcode e os três selects sem dizer o que são.

## Evidência
- Sondagem ao vivo em 2026-10-22 (script exploratório; resultado no histórico desta sessão).
- Teste `US01-EXTRA Account form has no critical a11y violations (BUG-001)` em `tests/conta.spec.ts`. Ele anexa o JSON `accessibility-scan` ao relatório.

## Tratamento na suíte
O teste afirma o comportamento correto e está marcado com `test.fail()`, decisão do usuário em 2026-10-22. A suíte fica verde e o defeito continua visível como "falha esperada". Se o site for corrigido, o teste passa, o Playwright o reporta como inesperado, e o BUG-001 deve ser retestado e fechado.

## Fora deste bug
A página inteira tem outras violações (contraste, `button-name`, `region`), fora do formulário da US-01. Não foram reportadas aqui porque o escopo é a story.
