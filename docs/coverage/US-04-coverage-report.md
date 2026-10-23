# Relatório de cobertura — US-04 (TC 3)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 2 | 2 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 2 | 2 | 100% |
| Security | Autorização entre perfis | 2 | 2 | 100% |
| Performance | Determinismo | 0 | 0 | 0% |
| UX Variations | Consistência cruzada | 0 | 0 | 0% |
| **Total** | | **7** | **7** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home exibida | TC 3 passo 3 | CT-04-01 | E2E |
| R-02 | "Login to your account" visível | AC1 | CT-04-01 | E2E |
| R-03 | E-mail sem conta + senha → "Your email or password is incorrect!" | AC2 | CT-04-01 | E2E |
| R-04 | Usuário não fica autenticado | propósito da story | CT-04-01 | E2E |
| R-05 | E-mail existente + senha errada → mesma mensagem, sem autenticar | lacuna da própria story / OWASP | CT-04-02 (extra) | E2E |
| R-06 | Senha diferencia maiúsculas | OWASP | CT-04-03 (extra) | E2E |
| R-07 | Senha não volta no HTML | OWASP | CT-04-04 (extra, BUG-003) | E2E (resposta do POST) |

**Performance e UX em 0%:** o TC 3 não cria estado (sem risco de determinismo) e não há variação de UI no erro. Não são gaps.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- **Bloqueio por força bruta:** testar isso num site público e compartilhado seria abusivo, e não há indício na UI.
