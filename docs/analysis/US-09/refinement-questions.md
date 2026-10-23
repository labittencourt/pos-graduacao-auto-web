# Perguntas de refinamento — US-09 (TC 10)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | A assinatura é registrada em algum lugar? | `para receber novidades do site` | Mensagem de sucesso sem efeito | Observar → **não**: `return false` cancela o envio e o campo não tem `name` (BUG-007) |
| Q02 | Por quanto tempo a mensagem fica visível? | `Então vejo a mensagem` | Teste instável por timing | Observar → 1,5 s, depois some e o campo é apagado |
| Q03 | E-mail inválido ou vazio é recusado? | `informo um e-mail` | Mensagem de sucesso para dado inválido | Observar (extra) → bloqueado pela validação nativa; nenhuma mensagem |
| Q04 | Que e-mail usar? | `informo um e-mail` | Dados reais | Suposição do QA: e-mail único da factory (`@example-test.invalid`) |
| Q05 | Como provar "SUBSCRIPTION"? | `Então vejo o texto "SUBSCRIPTION"` | Texto por CSS | Observar → HTML "Subscription", maiúsculas por CSS |
