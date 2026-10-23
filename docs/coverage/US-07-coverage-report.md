# Relatório de cobertura — US-07 (TC 8)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 5 | 5 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 1 | 1 | 100% |
| Security | Autorização entre perfis | 0 | 0 | 0% |
| Performance | Determinismo | 0 | 0 | 0% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **8** | **8** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home exibida | TC 8 passo 3 | CT-07-01 | E2E |
| R-02 | "Products" → `/products` com "ALL PRODUCTS" | AC1 | CT-07-01 | E2E |
| R-03 | Lista visível (≥ 1 item completo) | AC2 + Q02 | CT-07-01 | E2E |
| R-04 | Detalhe do produto clicado (mesmo nome e preço) | AC3 + Q03 | CT-07-01 | E2E |
| R-05 | Seis dados do detalhe com valor | AC4 + Q04 | CT-07-01 | E2E |
| R-06 | Preço da lista = preço do detalhe | propósito | CT-07-01 | E2E |
| R-07 | Todo item da lista completo, com id único | consistência interna | CT-07-02 (extra) | E2E |
| R-08 | Produto inexistente não oferecido | propósito | CT-07-03 (extra, BUG-005) | E2E |

**Security e Performance em 0%:** catálogo público, sem estado criado. Não são gaps.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Filtros por categoria/marca e avaliações: fora dos TCs do trabalho.
