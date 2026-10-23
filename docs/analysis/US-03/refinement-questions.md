# Perguntas de refinamento — US-03 (TC 2)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | Para onde o login leva? | `clico em "login"` | Oráculo de destino indefinido | Observar → home `/` |
| Q02 | Para conta criada pela API, qual valor aparece em "Logged in as"? | `Então vejo "Logged in as <nome>"` | Oráculo errado | Observar → parâmetro `name` da API |
| Q03 | O teste do TC 2 inclui os passos 9–10 (excluir conta)? | (ausência — F-01) | Rastreabilidade incompleta com o TC | Suposição do QA: sim (o TC é a referência) |
| Q04 | A conta é criada por API? | `Dado que tenho uma conta cadastrada` | Setup lento e frágil | Suposição do QA: sim (precedente US-02) |
| Q05 | A sessão se mantém ao navegar para outra página? | `para acessar minha conta` | Login que "funciona" só na página de destino | Observar (extra) → sim |
| Q06 | O login aceita o mesmo e-mail com o domínio em maiúsculas? | `informo e-mail e senha corretos` | Inconsistência com a normalização de e-mail | Observar (extra) → **não** (BUG-002) |
