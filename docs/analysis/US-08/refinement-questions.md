# Perguntas de refinamento — US-08 (TC 9)

**Analisado em:** 2026-10-22 · MEM-001: **Observar** ou **Suposição do QA**.

| ID | Pergunta | Trecho da US | Risco mitigado | Como resolver |
|----|----------|--------------|----------------|---------------|
| Q01 | Qual termo usar? | `| (a definir) |` | Termo que não exercita a regra real | Suposição do QA: "Top" |
| Q02 | O que é "produto relacionado"? | `vejo os produtos relacionados ao termo` | Oráculo ausente | Observar → nome **ou** categoria contém o termo, sem diferenciar maiúsculas |
| Q03 | "Todos os relacionados" exige que nenhum fique de fora? | (TC passo 8: "all the products related") | Busca que omite resultados passa | Suposição do QA: sim, nenhum produto com o termo no nome pode faltar |
| Q04 | A busca diferencia maiúsculas? | `digito "<termo>"` | Usuário não acha o produto | Observar (extra) → não diferencia |
| Q05 | Termo sem resultados: o que aparece? | (ausência) | Tela quebrada | Observar (extra) → título "SEARCHED PRODUCTS", lista vazia, sem mensagem |
| Q06 | Espaços nas pontas do termo são ignorados? | `digito "<termo>"` | Usuário não acha o produto por um espaço acidental | Observar (extra) → **não são** à esquerda (" Top" → 12 de 14; "  Top" → 0); à direita, o espaço não chega ao servidor |
| Q07 | Como provar "SEARCHED PRODUCTS"? | `Então vejo o título "SEARCHED PRODUCTS"` | Texto exato por CSS | Observar → HTML "Searched Products", maiúsculas por CSS |
