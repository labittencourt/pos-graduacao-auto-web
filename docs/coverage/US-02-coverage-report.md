# Relatório de cobertura — US-02 (TC 5)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 3 | 3 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 1 | 1 | 100% |
| Security | Autorização entre perfis | 0 | 0 | 0% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **7** | **7** | **100%** |

| ID | Requisito | Origem | Cenário(s) | Nível |
|----|-----------|--------|------------|-------|
| R-01 | Home exibida | TC 5 passo 3 (suposição do QA) | CT-02-01 | E2E |
| R-02 | "New User Signup!" visível | AC1 | CT-02-01 | E2E |
| R-03 | "Email Address already exist!" para e-mail registrado | AC2 | CT-02-01 | E2E |
| R-04 | Signup duplicado não avança e não altera a conta original | benefício da story | CT-02-02 | E2E + consulta API |
| R-05 | Conta criada pela API reconhecida pela UI | nota da story | CT-02-03 | E2E |
| R-06 | E-mail "conhecido" único por teste | premissa transversal | CT-02-04 | fixture |
| R-07 | Variação de caixa do domínio reconhecida | RFC 5321 | CT-02-05 (extra) | E2E |

**Security em 0%:** não há requisito de autorização nesta US (um único perfil). A enumeração de contas é um risco registrado na Seção 5 dos cenários, porque é o comportamento exigido pelo TC 5.

## Gaps
Nenhum. A decisão em aberto é o extra CT-02-05.

## Fora de escopo (não é gap)
- **Enumeração de contas pela mensagem de erro:** o TC 5 exige exatamente esse comportamento; mudá-lo contrariaria o caso de origem.
