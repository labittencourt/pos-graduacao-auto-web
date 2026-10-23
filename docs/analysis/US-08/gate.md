# Gate de qualidade — US-08 Buscar produtos por nome (TC 9)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-08-buscar-produtos.md](../../user-stories/US-08-buscar-produtos.md)

<details>
<summary>Test Case 9: Search Product (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8. Verify all the products related to search are visible

</details>

## Alerta de impacto (passo 0.5b)
Artefatos compartilhados: página `/products`, título `.features_items h2.title` e itens da lista (TC08 e extras da US-07). A busca reaproveita o `ProductsPage`, sem duplicar seletores.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 8 | A story diz "buscar pelo nome", mas o site também busca pela categoria (observado). A story e o TC não definem "relacionados". |
| Completude | 6 | **Cap (regra rígida):** sem AC de erro ou borda (termo inexistente, vazio, com espaços). O termo de busca não está definido (`(a definir)`). |
| Testabilidade | 5 | "Vejo os produtos relacionados ao termo" não tem oráculo. A própria story deixa isso como lacuna. |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | untestable | Testabilidade | High | `E vejo os produtos relacionados ao termo` | Oráculo em duas partes: (a) cada resultado tem o termo no nome **ou** na categoria (observado); (b) nenhum produto do catálogo com o termo no nome fica de fora ("**all** the products related", TC passo 8). |
| F-02 | missing-criteria | Testabilidade | High | `| (a definir) |` | Termo escolhido: "Top", que exercita os dois caminhos (nome e categoria). Suposição do QA. |
| F-03 | contradiction | Coerência | Medium | `quero buscar um produto pelo nome` | O site também retorna produtos cuja **categoria** contém o termo ("Little Girls Mr. Panda Shirt", categoria "Kids > Tops & Shirts"). Não é defeito: "relacionado" é mais amplo que "nome". Registrado como divergência (DIV-03). |
| F-04 | missing-criteria | Completude | Low | `Dado que estou na página "ALL PRODUCTS"` | Os passos 3–5 do TC (home → Products) viram pré-condição; o teste os executa. |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
