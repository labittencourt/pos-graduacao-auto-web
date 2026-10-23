# Perguntas de refinamento — US-05 (TC 4)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | O que prova "página de login"? | `Então sou levado à página de login` | Oráculo frágil ou ausente | Observar → URL `/login` + "Login to your account" |
| Q02 | A sessão termina (o "Logged in as" some)? | `para proteger meus dados` | Logout cosmético | Observar → some |
| Q03 | O botão Voltar do navegador restaura a área logada? | `dispositivo compartilhado` | Próxima pessoa no dispositivo vê a conta | Observar (extra) → não restaura |
| Q04 | Uma ação de conta (ex.: `/delete_account`) feita depois do logout tem efeito ou mostra algo enganoso? | `proteger meus dados` | Ação sem sessão com efeito, ou confirmação falsa | Observar (extra) → nada é excluído, mas mostra "Account Deleted!" (BUG-004) |
| Q05 | O TC 4 executa os passos de login (3–8) no próprio teste? | `Dado que estou autenticado` | Rastreabilidade com o TC | Suposição do QA: sim |
