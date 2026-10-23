# Relatório de cobertura — US-10 (TC 15)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 6 | 6 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 1 | 1 | 100% |
| Security | Autorização entre perfis | 0 | 0 | 0% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 2 | 2 | 100% |
| **Total** | | **11** | **11** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home → cadastro → "Logged in as" | AC0 | CT-10-01 | E2E |
| R-02 | 2 produtos no carrinho com preço e quantidade | AC1 + Q01 | CT-10-01 | E2E |
| R-03 | Endereços = cadastro | AC2 + Q02 | CT-10-01 | E2E |
| R-04 | Revisão com itens e total = soma | AC2 + Q03 | CT-10-01 | E2E |
| R-05 | Mensagem "Your order has been placed successfully!" no envio | AC3 + DIV-04 | CT-10-01 | E2E |
| R-06 | "Order Placed!" na página final | Q06 | CT-10-01 | E2E |
| R-07 | Conta excluída (prova pela API) | AC4 / US-06 | CT-10-01 | E2E + API |
| R-08 | Captura determinística da mensagem transitória | Determinismo | CT-10-01 | E2E |
| R-09 | Preço da home = preço no carrinho | consistência cruzada | CT-10-01 | E2E |
| R-10 | Carrinho vazio depois do pedido | propósito | CT-10-02 (extra) | E2E |
| R-11 | Número do cartão obrigatório | `required` observado | CT-10-03 (extra) | E2E |

**Security em 0%:** um único cliente. Não é gap.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Cartão recusado pelo servidor: não foi possível provocar.
- "Download Invoice": fora do TC.
