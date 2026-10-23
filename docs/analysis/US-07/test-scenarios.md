# Cenários de teste — US-07 Lista de produtos e detalhe (TC 8)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- "Visível" é subjetivo (F-01, F-03). Oráculos de conteúdo nas suposições do QA Q02–Q04.
- "Desse produto" exige comparar o detalhe com o item clicado (F-02).

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | "Products" não leva à lista | `Então estou na página "ALL PRODUCTS"` |
| 2 | Consistência interna | O detalhe aberto é de outro produto | `detalhe desse produto` |
| 3 | Integridade dos dados | Rótulos do detalhe sem valor | `vejo nome, categoria, preço, disponibilidade, condição e marca` |
| 4 | Consistência cruzada | Preço da lista diferente do preço do detalhe | `para decidir o que comprar` |
| 5 | Determinismo | O "primeiro produto" muda entre execuções | `"View Product" do primeiro produto` |
| 6 | Limites | Item da lista sem nome, preço ou link | `a lista de produtos está visível` |
| 7 | Tratamento de erro | Produto inexistente exibido como produto à venda | (ausência) |
| 8 | Autorização entre perfis | sem risco identificado nesta US: catálogo público | — |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 8 passo 3) home exibida |
| AC1 | "Products" leva à página "ALL PRODUCTS" |
| AC2 | A lista de produtos está visível |
| AC3 | "View Product" do primeiro produto leva ao detalhe **desse** produto |
| AC4 | O detalhe mostra nome, categoria, preço, disponibilidade, condição e marca |

### CT-07-01 — Lista de produtos e detalhe do primeiro item (TC 8)
```gherkin
@TC08 @epico-catalogo
Cenário: Lista de produtos e detalhe do primeiro item
  Dado que estou na home do site
  Então a home é exibida
  Quando clico em "Products"
  Então estou em "/products" vendo "ALL PRODUCTS"
  E vejo ao menos um produto com nome, preço e "View Product"
  Quando clico em "View Product" do primeiro produto
  Então estou na página de detalhe desse produto (mesmo nome e mesmo preço do item da lista)
  E vejo nome, categoria, preço, disponibilidade, condição e marca, todos com valor
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Consistência interna, Integridade dos dados, Consistência cruzada · Oráculo: AC0–AC4 + Q02–Q04

### CT-07-02 — Todo item da lista está completo — **EXTRA**
```gherkin
Cenário: Itens da lista completos
  Dado que estou em "ALL PRODUCTS"
  Então todo item tem nome, preço no formato "Rs. N" e um "View Product" para "/product_details/<id>" exclusivo
```
(Borda) · [AUTOMAÇÃO] · Dimensão: Limites, Determinismo · Oráculo: consistência interna da lista · **Extra aprovado** → `US07-EXTRA Every listed product is complete with a unique detail link`. Observado: 34 itens, todos completos, ids únicos (passa).

### CT-07-03 — Produto inexistente não é oferecido como à venda — **EXTRA**
```gherkin
Cenário: Detalhe de produto inexistente
  Quando acesso "/product_details/99999"
  Então não vejo "Availability: In Stock"
  E não vejo o botão "Add to cart"
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro · Oráculo: consistência com o propósito ("decidir o que comprar": não se compra o que não existe) · **Extra aprovado** → `US07-EXTRA Nonexistent product is not offered for sale (BUG-005)`, em `test.fail()`. Observado: HTTP 200, nome/categoria/marca vazios, "In Stock", "New" e "Add to cart" visíveis. Conferido: falha pelo motivo certo.

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0–AC4 | CT-07-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato · Consistência interna · Integridade · Consistência cruzada | CT-07-01 |
| Determinismo · Limites | CT-07-02 (extra) |
| Tratamento de erro | CT-07-03 (extra) |
| Autorização entre perfis | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Interna: o detalhe precisa corresponder ao item clicado.
- Com o propósito: um produto inexistente não deveria ser oferecido (BUG-005).

## Seção 5 — Riscos não cobertos
- **Anúncios de tela cheia (vignette):** apareceram nas execuções do TC08 (4 em 71), interceptando o clique em "Products". Diagnóstico FLK-001; tratados pelo bloqueio dos hosts de anúncio (MEM-002). Para o usuário real, o risco continua.

## Seção 6 — Charters
```
Explore os detalhes de produtos de categorias e marcas diferentes, com o objetivo de descobrir rótulos vazios ou inconsistentes com a lista.
Duração sugerida: curta (30 min).
Pré-condição: nenhuma.
Sinal de parada: 1 produto por categoria visitado.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-07-02 e CT-07-03 serão automatizados?
