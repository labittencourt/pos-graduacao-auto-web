# Cenários observados — Cadastro de conta

**Fonte:** [cadastro-conta-us-reversa.md](cadastro-conta-us-reversa.md) · **Data:** 2026-10-22

Os cenários oficiais da US-01 estão em [docs/analysis/US-01/test-scenarios.md](../analysis/US-01/test-scenarios.md). Esta lista registra o que a engenharia reversa acrescenta ou confirma, sem duplicar.

| ID | Cenário | Tipo | Execução | Oráculo | Relação com a US-01 |
|----|---------|------|----------|---------|---------------------|
| RV-01 | Home exibe logo, carrossel e "Signup / Login" | Funcional | [AUTOMAÇÃO] | CA01 | dá o oráculo de AC0 (CT-01-01) |
| RV-02 | O e-mail do signup aparece desabilitado no formulário de conta | Funcional | [AUTOMAÇÃO] | CA02 | confirma CT-01-03 (deixa de ser [INFERIDO]) |
| RV-03 | "Logged in as" mostra o valor do campo Name | Funcional | [AUTOMAÇÃO] | CA04 | resolve CT-01-02 |
| RV-04 | Depois de excluir, o menu volta a "Signup / Login" | Funcional | [AUTOMAÇÃO] | CA05 | confirma a suposição da US-06 |
| RV-05 | Criar conta com campo obrigatório vazio | Negativo | [AUTOMAÇÃO] | regra:campos-obrigatorios-cadastro | = CT-01-05 (extra) |
| RV-06 | Scan WCAG do formulário de conta | Acessibilidade | [AUTOMAÇÃO] | norma externa (WCAG 2.1 AA) | = CT-01-09 (extra) |
| RV-07 | Exclusão sem confirmação: um clique em "Delete Account" já exclui | Segurança | [MANUAL] | consistência com o propósito (ação destrutiva sem confirmação) | risco novo, fora dos critérios — registrar, não automatizar |

| Elemento/ação observado | Cenário(s) | CA |
|-------------------------|------------|----|
| Home | RV-01 | CA01 |
| Signup | RV-02 | CA02 |
| Create Account | RV-05 | CA03 |
| Logged in as | RV-03 | CA04 |
| Delete Account | RV-04, RV-07 | CA05 |
| Formulário de conta (a11y) | RV-06 | — (oráculo: WCAG) |
