# Perguntas de refinamento — US-04 (TC 3)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | "Incorretos" significa e-mail sem conta + qualquer senha? | `informo um e-mail e uma senha incorretos` | Testar outra combinação e chamar de TC 3 | Suposição do QA: sim (texto do TC 3) |
| Q02 | E-mail existente com senha errada mostra a mesma mensagem? | `ser informado quando e-mail ou senha estão errados` | Mensagem que revela se o e-mail tem conta (enumeração) | Observar (extra) → mesma mensagem |
| Q03 | A senha diferencia maiúsculas? | `senha` | Senha aceita com caixa trocada | Observar (extra) → diferencia |
| Q04 | Depois do erro, o usuário fica fora da conta e na página de login? | `sem acessar conta alheia` | Erro exibido, mas sessão criada | Observar → URL `/login`, sem "Logged in as" |
| Q05 | O formulário mantém o que foi digitado? | (ausência) | Vazamento de credencial | Observar → **a senha volta no HTML (BUG-003)** |
| Q06 | Verificar a home na entrada? | `Dado que estou em "Signup / Login"` | Rastreabilidade com o TC | Suposição do QA: sim (precedente US-01) |
