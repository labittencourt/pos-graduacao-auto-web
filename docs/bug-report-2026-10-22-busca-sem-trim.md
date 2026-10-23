# BUG-006 — Busca não ignora espaços nas pontas do termo

**Data:** 2026-10-22 · **US:** US-08 (extra CT-08-04) · **Severidade:** Low · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
Busca em `/products` (`#search_product` + `#submit_search`), que gera `GET /products?search=<termo>`.

## Como reproduzir
1. Em `/products`, digitar ` Top` (um espaço à esquerda) e clicar na lupa; repetir com `  Top` (dois espaços).

## Esperado
Os mesmos 14 resultados da busca por `Top`. Oráculo: **convenção de mercado**. Campos de busca normalmente ignoram espaços nas pontas, porque o espaço acidental é comum, principalmente ao colar texto. É um oráculo mais fraco que norma ou regra declarada: não há promessa explícita do site sobre isso.

## Observado
O servidor compara o termo **literalmente, com os espaços à esquerda**:

| Termo digitado | URL | Resultados | Diferença para `Top` (14) |
|----------------|-----|-----------:|---------------------------|
| `Top` | `?search=Top` | 14 | — |
| ` Top` (1 espaço) | `?search=%20Top` | 12 | Somem os 2 produtos que só batiam pela categoria ("Little Girls Mr. Panda Shirt", "Colour Blocked Shirt – Sky Blue") |
| `  Top` (2 espaços) | `?search=%20%20Top` | 0 | Somem todos |
| `Top ` (espaço à direita) | `?search=Top` | 14 | Nenhuma (o espaço à direita não chega ao servidor) |

> Correção em 2026-10-22: a primeira versão deste relatório dizia que ` Top` trazia 0 resultados. Isso valia para dois espaços. Ver OC-14 em `docs/agentes-ocorrencias.md`.

## Evidência
- Sondagem ao vivo em 2026-10-22 (script exploratório com 10 termos).

## Tratamento na suíte
Teste `US08-EXTRA Search ignores leading spaces (BUG-006)` em `tests/catalogo.spec.ts`, em `test.fail()` (decisão do usuário, 2026-10-22). Ele compara o conjunto de resultados de ` Top` com o de `Top`.
