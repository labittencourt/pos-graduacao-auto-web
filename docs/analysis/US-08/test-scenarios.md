# Cenários de teste — US-08 Buscar produtos por nome (TC 9)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- O termo está "(a definir)" e "relacionados" não está definido (F-01, F-02). Resolvidos pela observação: nome **ou** categoria, sem diferenciar maiúsculas. Termo "Top".
- A story fala em "pelo nome", mas o site também busca pela categoria (F-03, DIV-03).

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | A busca não mostra "SEARCHED PRODUCTS" | `Então vejo o título "SEARCHED PRODUCTS"` |
| 2 | Consistência interna | Resultado sem relação com o termo | `vejo os produtos relacionados ao termo` |
| 3 | Integridade dos dados | Busca omite produtos que contêm o termo | (TC: "all the products related") |
| 4 | Consistência cruzada | A busca diferencia maiúsculas, mas o catálogo não | `digito "<termo>"` |
| 5 | Determinismo | Resultados mudam entre execuções | — coberto por CT-08-01 (oráculo relativo ao catálogo, não a uma lista fixa) |
| 6 | Limites | Espaços nas pontas e termo sem resultado | `digito "<termo>"` |
| 7 | Tratamento de erro | Termo sem resultado quebra a página | (ausência) |
| 8 | Autorização entre perfis | sem risco identificado nesta US: busca pública | — |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 9 passos 3–5) home → "Products" → "ALL PRODUCTS" |
| AC1 | Buscar o termo mostra "SEARCHED PRODUCTS" |
| AC2 | Os produtos relacionados ao termo estão visíveis |

### CT-08-01 — Busca por nome de produto (TC 9)
```gherkin
@TC09 @epico-catalogo
Cenário: Busca por nome de produto
  Dado que estou na home do site
  Então a home é exibida
  Quando clico em "Products"
  Então estou em "ALL PRODUCTS" e anoto os produtos cujo nome contém "Top"
  Quando digito "Top" no campo de busca e clico no botão de busca
  Então vejo o título "SEARCHED PRODUCTS"
  E vejo ao menos um resultado
  E todo produto do catálogo com "Top" no nome está nos resultados
  E todo resultado tem "Top" no nome ou na categoria
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Consistência interna, Integridade dos dados, Determinismo · Oráculo: AC0–AC2 + Q02/Q03 (comportamento observado + "all" do TC)

### CT-08-02 — Busca não diferencia maiúsculas — **EXTRA**
```gherkin
Cenário: Mesmo termo em caixas diferentes
  Quando busco "top" e depois "TOP"
  Então as duas buscas trazem os mesmos produtos da busca por "Top"
```
(Borda) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada · Oráculo: comportamento observado + consistência com o propósito ("encontrá-lo sem percorrer o catálogo") · **Extra aprovado** → `US08-EXTRA Search is case-insensitive`. Observado: passa.

### CT-08-03 — Termo sem resultado — **EXTRA**
```gherkin
Cenário: Busca sem resultado
  Quando busco um termo que não existe no catálogo
  Então vejo "SEARCHED PRODUCTS" e nenhum produto
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro, Limites · Oráculo: consistência interna (nada relacionado → nada exibido) · **Extra aprovado** → `US08-EXTRA Search with no match shows no products`. Observado: passa. A falta de mensagem "nenhum produto encontrado" é uma observação de UX, não uma promessa do produto, então não vira assertion.

### CT-08-04 — Espaços nas pontas do termo — **EXTRA**
```gherkin
Cenário: Termo com espaço acidental
  Quando busco " Top" (com espaço à esquerda)
  Então vejo os mesmos produtos da busca por "Top"
```
(Borda) · [AUTOMAÇÃO] · Dimensão: Limites · Oráculo: convenção de mercado (campos de busca ignoram espaços nas pontas) · **Extra aprovado** → `US08-EXTRA Search ignores leading spaces (BUG-006)`, em `test.fail()`. Observado (corrigido em 2026-10-22): ` Top` traz 12 em vez de 14, porque perde os resultados por categoria; `  Top` traz 0. O oráculo é convenção de mercado, mais fraco que os dos bugs anteriores.

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0, AC1, AC2 | CT-08-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato · Consistência interna · Integridade · Determinismo | CT-08-01 |
| Consistência cruzada | CT-08-02 (extra) |
| Tratamento de erro | CT-08-03 (extra) |
| Limites | CT-08-03, CT-08-04 (extras) |
| Autorização entre perfis | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Interna: todo resultado precisa ser relacionado, e todo relacionado precisa aparecer.
- Com o produto: o resultado é derivado do catálogo do TC08 na mesma execução, não de uma lista fixa (o catálogo é público e pode mudar).

## Seção 5 — Riscos não cobertos
- Relevância e ordenação dos resultados: não há promessa sobre ordem.
- Busca por marca ("Polo" traz só 1 produto, embora a marca tenha 6): a busca não olha a marca. Sem promessa de busca por marca, fica só registrado.

## Seção 6 — Charters
```
Explore a busca usando acentos, caracteres especiais e termos parciais (ex.: "Tsh", "T-Shirt", "Tshirt"), com o objetivo de descobrir normalizações que escondem produtos do usuário.
Duração sugerida: curta (30 min).
Pré-condição: nenhuma.
Sinal de parada: 10 termos testados, com o resultado registrado.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-08-02, CT-08-03 e CT-08-04 serão automatizados?
