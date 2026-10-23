# Gate de qualidade — US-06 Excluir a própria conta (apoio aos TC 1, 2, 15 e 16)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-06-excluir-propria-conta.md](../../user-stories/US-06-excluir-propria-conta.md)

Story de apoio: não tem caso de teste próprio no site. Os passos vêm do TC 1 (17–18) e do TC 2 (9–10), e serão reusados pelos TC 15 e 16.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | Consistente com os TCs de origem. |
| Completude | 6 | **Cap (regra rígida):** sem AC de erro. O caminho "exclusão sem sessão" foi descoberto na US-05 (BUG-004). |
| Testabilidade | 8 | "ACCOUNT DELETED!" é verificável, mas **não prova a exclusão** (BUG-004). O último critério ("não estou mais autenticado") era suposição e foi confirmado ao vivo. |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | untestable | Testabilidade | Medium | `Então vejo "ACCOUNT DELETED!"` | A mensagem aparece mesmo sem exclusão (BUG-004). Prova complementar: a API 14 deixa de encontrar a conta (AUD-002). |
| F-02 | ambiguity | Completude | Low | `Então não estou mais autenticado` | Marcada na própria story como suposição. Confirmada ao vivo: o menu volta a "Signup / Login" (US-01). |
| F-03 | dependency-gap | Coerência | Low | `@TC01 @TC02 @TC15 @TC16` | O TC 2 termina em "ACCOUNT DELETED!" sem clicar em "Continue". O critério "não estou mais autenticado" só é exercitado no TC 1. |

## Requer decisão humana
Nenhuma.
