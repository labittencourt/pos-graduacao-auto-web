# US-08 — Buscar produtos por nome (TC 9)

- **Épico:** B — Catálogo de Produtos
- **Caso de origem:** TC 9 — Buscar produto
- **Stories de apoio:** —
- **Tags:** `@TC09` `@epico-catalogo`

**Como** visitante, **quero** buscar um produto pelo nome, **para** encontrá-lo sem percorrer o catálogo inteiro.

## Critérios de aceitação

```gherkin
@TC09 @epico-catalogo
Esquema do Cenário: Busca por nome de produto
  Dado que estou na página "ALL PRODUCTS"
  Quando digito "<termo>" no campo de busca e clico no botão de busca
  Então vejo o título "SEARCHED PRODUCTS"
  E vejo os produtos relacionados ao termo

  Exemplos:
    | termo |
    | (a definir) |
```

## Lacunas e perguntas em aberto

- Qual termo de busca e o que é "produtos relacionados" (todo resultado contém o termo no nome, ou basta haver resultados?).

Premissas transversais: ver [README.md](README.md#premissas-transversais).
