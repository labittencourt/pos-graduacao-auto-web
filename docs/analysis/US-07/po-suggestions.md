# Sugestões para o PO — US-07 (TC 8)

> ⚠️ Estas são sugestões, não decisões. Cada uma precisa da confirmação
> explícita do PO antes de virar regra — nunca trate como resolvida
> silenciosamente, mesmo que pareça óbvia.

**Status:** sem retorno ao PO (MEM-001). Adotadas como **suposições do QA**.

| ID da pergunta | Sugestão | Base | Fonte |
|-----------------|----------|------|-------|
| Q02 | Lista visível = ao menos 1 item, cada item com nome, preço e "View Product". | Convenção de mercado | conhecimento geral de QA (lista "visível" sem conteúdo não serve ao usuário) |
| Q03 | O nome e o preço do detalhe devem ser iguais aos do primeiro item da lista. | Convenção do projeto | trecho da story "desse produto"; CLAUDE.md ("nunca uma assertion só de presença quando o cenário fala de conteúdo") |
| Q04 | Cada rótulo de detalhe precisa ter valor não vazio. | Convenção do projeto | mesma regra do CLAUDE.md; BUG-005 mostra que o site exibe rótulos vazios |
| Q05 | Não fixar a quantidade de produtos. | Convenção de mercado | conhecimento geral de QA (catálogo público muda) |

Sem sugestão (comportamento observado): Q01, Q06.
