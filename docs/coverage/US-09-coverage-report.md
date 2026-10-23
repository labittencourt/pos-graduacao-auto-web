# Relatório de cobertura — US-09 (TC 10)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 3 | 3 | 100% |
| Edge Cases | Limites | 0 | 0 | 0% |
| Error Handling | Tratamento de erro | 1 | 1 | 100% |
| Security | Autorização entre perfis | 0 | 0 | 0% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **6** | **6** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home exibida | TC 10 passo 3 | CT-09-01 | E2E |
| R-02 | "SUBSCRIPTION" no rodapé | AC1 | CT-09-01 | E2E |
| R-03 | Mensagem de sucesso após enviar o e-mail | AC2 | CT-09-01 | E2E |
| R-04 | Checagem dentro da janela de 1,5 s | observado | CT-09-01 | E2E |
| R-05 | E-mail mal formado não recebe sucesso | gate (Completude) | CT-09-02 (extra) | E2E |
| R-06 | E-mail enviado ao site | benefício da story | CT-09-03 (extra, BUG-007) | E2E (rede) |

Nota: R-06 foi classificado como UX Variations / Consistência cruzada porque compara o que a UI afirma com o que acontece na rede.

**Edge Cases e Security em 0%:** campo único sem limites declarados; rodapé público. Não são gaps.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Entrega real da newsletter por e-mail: depende de provedor externo e não é verificável na UI.
