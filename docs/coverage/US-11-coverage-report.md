# Relatório de cobertura — US-11 (TC 16)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 6 | 6 | 100% |
| Edge Cases | Limites | 0 | 0 | 0% |
| Error Handling | Tratamento de erro | 0 | 0 | 0% |
| Security | Autorização entre perfis | 1 | 1 | 100% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **9** | **9** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home → login → "Logged in as" | AC0 | CT-11-01 | E2E |
| R-02 | 2 produtos no carrinho com preço e quantidade | AC1 | CT-11-01 | E2E |
| R-03 | Endereços = conta | AC2 | CT-11-01 | E2E |
| R-04 | Revisão com itens e total = soma | AC2 | CT-11-01 | E2E |
| R-05 | Mensagem de sucesso no envio + "Order Placed!" | AC3 + DIV-04 | CT-11-01 | E2E |
| R-06 | Conta excluída (prova pela API) | AC4 / US-06 | CT-11-01 | E2E + API |
| R-07 | Conta não fixa (API, única por teste) | nota da story | CT-11-01 | fixture |
| R-08 | Carrinho de visitante mantido após o login | observado | CT-11-02 (extra) | E2E |
| R-09 | Checkout de visitante exige login | observado | CT-11-03 (extra) | E2E |

**Limites e Tratamento de erro em 0%:** já cobertos na US-10 (pagamento) e na US-04 (login). Não são gaps desta US.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Os mesmos da US-10.
