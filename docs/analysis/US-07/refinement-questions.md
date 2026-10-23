# Perguntas de refinamento — US-07 (TC 8)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | O que prova a página "ALL PRODUCTS"? | `Então estou na página "ALL PRODUCTS"` | Oráculo frágil | Observar → URL `/products` + título "All Products" (exibido em maiúsculas por CSS) |
| Q02 | O que conta como "lista visível"? | `E a lista de produtos está visível` | Checar só o contêiner vazio | Suposição do QA: ≥ 1 item, cada um com nome, preço e "View Product" |
| Q03 | "Desse produto" exige que nome e preço do detalhe sejam os do item clicado? | `estou na página de detalhe desse produto` | Abrir o detalhe de outro produto e passar | Suposição do QA: sim |
| Q04 | "Vejo categoria..." exige valor não vazio? | `vejo nome, categoria, preço, disponibilidade, condição e marca` | Rótulo presente sem dado passa | Suposição do QA: sim (BUG-005 mostra rótulos vazios) |
| Q05 | Quantos produtos a lista deve ter? | (ausência) | Falso alarme se o catálogo mudar | Suposição do QA: não fixar quantidade (observado: 34) |
| Q06 | Produto inexistente: o que acontece? | (ausência) | Página quebrada ou enganosa | Observar (extra) → BUG-005 |
