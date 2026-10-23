# Sugestões para o PO — US-10 (TC 15)

> ⚠️ Estas são sugestões, não decisões. Cada uma precisa da confirmação
> explícita do PO antes de virar regra — nunca trate como resolvida
> silenciosamente, mesmo que pareça óbvia.

**Status:** sem retorno ao PO (MEM-001). Adotadas como **suposições do QA**.

| ID da pergunta | Sugestão | Base | Fonte |
|-----------------|----------|------|-------|
| Q01 | Os 2 primeiros produtos da home, com nome e preço anotados e conferidos no carrinho. | Precedente de outra US | docs/user-stories/US-10-comprar-apos-cadastro.md, lacunas: "Sugestão: dois itens, validando o carrinho antes do checkout" |
| Q02 | Endereços de entrega e cobrança com os dados do cadastro. | Convenção do projeto | CLAUDE.md ("nunca uma assertion só de presença quando o cenário fala de conteúdo") |
| Q03 | Revisão com os produtos adicionados e total = soma. | Convenção do projeto | mesma regra do CLAUDE.md |
| Q04 | Cartão de teste público `4111 1111 1111 1111`, CVC `123`, validade `12/2030`, nome "QA Automation". | Convenção do projeto + Convenção de mercado | prompt-automation-exercise.md ("Nada de dados reais: cartão... fictícios"); 4111… é o número de teste Visa amplamente documentado por gateways |

Sem sugestão (comportamento observado): Q05, Q06, Q07.
