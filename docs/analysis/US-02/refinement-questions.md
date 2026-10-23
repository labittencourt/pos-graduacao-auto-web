# Perguntas de refinamento — US-02 (TC 5)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 2) · Pela MEM-001, cada pergunta é **Observar** (site real) ou **Suposição do QA**.

| ID | Pergunta | Trecho da US que originou | Risco mitigado | Como resolver |
|----|----------|---------------------------|----------------|---------------|
| Q01 | Onde e como a mensagem "Email Address already exist!" aparece, e com que texto exato? | `Então vejo o erro "Email Address already exist!"` | Checar o texto errado ou outro elemento | Observar |
| Q02 | Depois do erro, o usuário continua na página de login, sem abrir o formulário de conta? | (ausência — F-03) | Um teste "passa" vendo a mensagem mesmo se o cadastro duplicado avançasse | Observar |
| Q03 | A conta pré-existente é criada por API ou por UI? | `Nota: a conta pré-existente é criada pelo próprio teste (UI ou API)` | Teste lento e frágil se depender do fluxo de cadastro inteiro como setup | Suposição do QA |
| Q04 | A verificação "home visível" do TC 5 entra no teste? | `E estou em "Signup / Login" vendo "New User Signup!"` | Rastreabilidade incompleta com o TC | Suposição do QA |
| Q05 | O mesmo e-mail em maiúsculas é tratado como já existente? | `Quando informo um nome e esse e-mail` | Contas duplicadas por variação de caixa | Observar (extra) |
| Q06 | A tentativa duplicada altera a conta original (ex.: o nome)? | `para não criar cadastro duplicado` | Sobrescrita silenciosa dos dados da conta existente | Observar |
