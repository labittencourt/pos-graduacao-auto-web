# Relatório de cobertura — US-03 (TC 2)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 4 | 4 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 0 | 0 | 0% |
| Security | Autorização entre perfis | 0 | 0 | 0% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **7** | **7** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home exibida | TC 2 passo 3 | CT-03-01 | E2E |
| R-02 | "Login to your account" visível | AC1 | CT-03-01 | E2E |
| R-03 | Login correto → "Logged in as `<name>`" | AC2 | CT-03-01 | E2E |
| R-04 | "Delete Account" → "ACCOUNT DELETED!" | TC 2 passos 9–10 | CT-03-01 | E2E |
| R-05 | Sessão persiste ao navegar | propósito da story | CT-03-02 (extra) | E2E |
| R-06 | Domínio do e-mail em maiúsculas aceito | RFC 5321 | CT-03-03 (extra, BUG-002) | E2E |
| R-07 | Conta criada pela API loga pela UI | nota de setup | CT-03-01 | E2E |

**Error Handling e Security em 0%:** os erros de login são escopo da US-04, e não há perfis distintos. Não são gaps desta US.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Credenciais inválidas: escopo da US-04.
