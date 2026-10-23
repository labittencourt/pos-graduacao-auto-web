# Relatório de cobertura — US-08 (TC 9)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 4 | 4 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 1 | 1 | 100% |
| Security | Autorização entre perfis | 0 | 0 | 0% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **8** | **8** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home → "Products" → "ALL PRODUCTS" | TC 9 passos 3–5 | CT-08-01 | E2E |
| R-02 | Busca mostra "SEARCHED PRODUCTS" | AC1 | CT-08-01 | E2E |
| R-03 | Todo resultado é relacionado (nome ou categoria) | AC2 + Q02 | CT-08-01 | E2E |
| R-04 | Nenhum produto com o termo no nome fica de fora | TC passo 8 + Q03 | CT-08-01 | E2E |
| R-05 | Oráculo relativo ao catálogo da mesma execução | Determinismo | CT-08-01 | E2E |
| R-06 | Busca não diferencia maiúsculas | observado | CT-08-02 (extra) | E2E |
| R-07 | Termo sem resultado → nenhum produto | observado | CT-08-03 (extra) | E2E |
| R-08 | Espaços nas pontas ignorados | convenção de mercado | CT-08-04 (extra, BUG-006) | E2E |

**Security em 0%:** busca pública. Não é gap.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Ordenação e relevância dos resultados: sem promessa.
- Busca por marca: o site não busca por marca, e nada promete isso.
