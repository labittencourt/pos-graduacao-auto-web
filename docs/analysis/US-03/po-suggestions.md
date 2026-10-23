# Sugestões para o PO — US-03 (TC 2)

> ⚠️ Estas são sugestões, não decisões. Cada uma precisa da confirmação
> explícita do PO antes de virar regra — nunca trate como resolvida
> silenciosamente, mesmo que pareça óbvia.

**Status:** sem retorno ao PO (MEM-001). Adotadas como **suposições do QA**.

| ID da pergunta | Sugestão | Base | Fonte |
|-----------------|----------|------|-------|
| Q03 | Incluir "Delete Account" → "ACCOUNT DELETED!" no teste do TC 2. | Convenção do projeto | prompt-automation-exercise.md: "Os casos de teste originais são a referência de rastreabilidade"; precedente do TC01 (US-01) |
| Q04 | Conta criada pela API 11 no setup (`registeredUser`), excluída no teardown se ainda existir. | Precedente de outra US | docs/analysis/US-02/po-suggestions.md (Q03) |

Sem sugestão (comportamento observado): Q01, Q02, Q05, Q06.
