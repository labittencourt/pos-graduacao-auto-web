# US-07 — Consultar a lista de produtos e o detalhe de um produto (TC 8)

- **Épico:** B — Catálogo de Produtos
- **Caso de origem:** TC 8 — Todos os produtos e página de detalhe
- **Stories de apoio:** —
- **Tags:** `@TC08` `@epico-catalogo`

**Como** visitante, **quero** ver todos os produtos e abrir o detalhe de um deles, **para** decidir o que comprar.

## Critérios de aceitação

```gherkin
@TC08 @epico-catalogo
Cenário: Lista de produtos e detalhe do primeiro item
  Dado que estou na home do site
  Quando clico em "Products"
  Então estou na página "ALL PRODUCTS"
  E a lista de produtos está visível
  Quando clico em "View Product" do primeiro produto
  Então estou na página de detalhe desse produto
  E vejo nome, categoria, preço, disponibilidade, condição e marca
```

## Lacunas e perguntas em aberto

- Nenhuma lacuna específica registrada no documento de origem.

Premissas transversais: ver [README.md](README.md#premissas-transversais).
