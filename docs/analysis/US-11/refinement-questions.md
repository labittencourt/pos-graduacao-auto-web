# Perguntas de refinamento — US-11 (TC 16)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | Como criar a conta do login? | `Dado que tenho uma conta cadastrada` | Usuário fixo compartilhado (a story proíbe) | Suposição do QA: API no setup (`registeredUser`) |
| Q02 | Produtos, cartão, endereço e revisão: os mesmos oráculos da US-10? | (herdado) | Divergência entre TC 15 e TC 16 | Suposição do QA: sim, mesmo helper `placeOrder` |
| Q03 | Um carrinho montado antes do login continua depois dele? | (ausência) | Cliente perde o carrinho ao entrar | Observar (extra) → continua |
| Q04 | O checkout sem login é barrado? | `para comprar com os dados que já tenho no site` | Pedido sem conta / sem endereço | Observar (extra) → modal "Register / Login account to proceed on checkout" |
