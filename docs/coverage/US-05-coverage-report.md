# Relatório de cobertura — US-05 (TC 4)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura

| Categoria | Dimensão RST | Requisitos | Cobertos | % |
|-----------|--------------|-----------:|---------:|--:|
| Happy Path | Contrato/Promessa | 3 | 3 | 100% |
| Edge Cases | Limites | 0 | 0 | 0% |
| Error Handling | Tratamento de erro | 0 | 0 | 0% |
| Security | Autorização entre perfis | 2 | 2 | 100% |
| Performance | Determinismo | 0 | 0 | 0% |
| UX Variations | Consistência cruzada | 0 | 0 | 0% |
| **Total** | | **5** | **5** | **100%** |

| ID | Requisito | Origem | Cenário | Nível |
|----|-----------|--------|---------|-------|
| R-01 | Home → login → "Logged in as" | TC 4 passos 3–8 | CT-05-01 | E2E |
| R-02 | Logout leva a `/login` com "Login to your account" | AC1 + Q01 | CT-05-01 | E2E |
| R-03 | Sessão termina (sem "Logged in as") | propósito da story | CT-05-01 | E2E |
| R-04 | Voltar não restaura a sessão | propósito ("dispositivo compartilhado") | CT-05-02 (extra) | E2E |
| R-05 | Página de conta sem sessão não afirma exclusão nem exclui | propósito ("proteger meus dados") | CT-05-03 (extra, BUG-004) | E2E + API |

**Categorias em 0%:** o logout não tem entrada de dados (sem limites nem erros) nem variação de UI. Não são gaps.

## Gaps
Nenhum.

## Fora de escopo (não é gap)
- Expiração de sessão por tempo: não observável em tempo útil de teste.
