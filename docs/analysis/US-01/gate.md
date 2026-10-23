# Gate de qualidade — US-01 Cadastrar nova conta (TC 1)

**Analisado em:** 2026-10-22
**Agente:** /qa-analise-demanda — Modo A (nova US)
**Formato:** ACs estruturados (Gherkin) · **Escopo:** Frontend
**Fonte da US:** [docs/user-stories/US-01-cadastrar-nova-conta.md](../../user-stories/US-01-cadastrar-nova-conta.md)
**Referência de rastreabilidade:** texto do Test Case 1 lido em https://www.automationexercise.com/test_cases em 2026-10-22 (transcrito abaixo).

<details>
<summary>Test Case 1: Register User (texto original)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and email address
7. Click 'Signup' button
8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
9. Fill details: Title, Name, Email, Password, Date of birth
10. Select checkbox 'Sign up for our newsletter!'
11. Select checkbox 'Receive special offers from our partners!'
12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
13. Click 'Create Account button'
14. Verify that 'ACCOUNT CREATED!' is visible
15. Click 'Continue' button
16. Verify that 'Logged in as username' is visible
17. Click 'Delete Account' button
18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

</details>

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 8 | Os passos são consistentes entre si e com o objetivo. Única tensão: "nome" aparece em três pontos (signup, Name, First name) e o AC final não diz qual deles é o `<nome>` exibido. |
| Completude | 6 | **Cap aplicado (regra rígida):** nenhum AC trata erro ou entrada inválida. Além disso, a verificação do passo 3 do TC ("home page is visible") não virou critério, e os valores de título/país/estado/data não estão definidos. |
| Testabilidade | 7 | As checagens de texto ("New User Signup!", "ENTER ACCOUNT INFORMATION", "ACCOUNT CREATED!") são pass/fail claros. O AC "Logged in as `<nome>`" não tem oráculo único enquanto o `<nome>` não for definido. |

### Gate: **CONDITIONAL**

A story pode seguir para cenários e implementação depois de respondidas as perguntas F-01 e F-02 (abaixo). O cap de Completude reflete o escopo do TC 1, que é só caminho feliz. Isso não é defeito de redação: cobrir caminhos de erro excederia o caso original e depende da sua decisão (Q06).

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | ambiguity | Testabilidade | High | `Então vejo "Logged in as <nome>" no topo` | Definir qual valor é o `<nome>`: o nome digitado no "New User Signup!", o campo Name do formulário ou o First name. O TC diz apenas "username". `[NEEDS PO CONFIRMATION: qual dos nomes deve aparecer em "Logged in as"?]` — pode ser resolvido por observação no site (Fase 3). |
| F-02 | missing-criteria | Completude | Medium | `Quando preencho título, nome, e-mail, senha e data de nascimento` / `E preencho nome, sobrenome, empresa, endereço, endereço 2, país, estado, cidade, CEP e celular` | Definir os valores de título, data de nascimento, país e estado e quais campos são obrigatórios. Já listado em "Lacunas" da story. `[NEEDS PO CONFIRMATION: valores e obrigatoriedade dos campos]` |
| F-03 | missing-criteria | Completude | Low | `Dado que estou na home do site` | O TC 1 tem uma verificação explícita no passo 3 ("Verify that home page is visible successfully"). Na story ela virou pré-condição, sem resultado verificável. Recomenda-se um `Então a home é exibida`, com o oráculo definido (Q04). |
| F-04 | ambiguity | Testabilidade | Medium | `Quando preencho título, nome, e-mail, senha e data de nascimento` | O e-mail já foi informado no signup. A story manda "preencher" de novo, copiando o passo 9 do TC. Não está claro se o campo vem pré-preenchido ou bloqueado. Não supor; observar no site (Q03). |
| F-05 | ambiguity | Testabilidade | Low | `E marco as opções de newsletter e ofertas de parceiros` | A story parafraseia os rótulos que o TC dá literalmente ('Sign up for our newsletter!', 'Receive special offers from our partners!'). Recomenda-se usar os rótulos literais como oráculo (Q05). |
| F-06 | dependency-gap | Coerência | Low | `Nota: e-mail único por execução. A exclusão ao final do TC 1 é a US-06.` | Os passos 17–18 do TC 1 dependem da US-06, cujo último critério ("não estou mais autenticado") é suposição não confirmada. O TC 1 só fecha quando a US-06 for analisada. Também falta garantir a limpeza quando o teste falha antes da exclusão (Q08). |

## Resolução (2026-10-22)

**Sem retorno ao PO:** as stories serão testadas como estão (decisão do usuário, ver MEM-001 em `docs/project-memory.md`). O texto da US-01 não muda e o gate permanece CONDITIONAL. As pendências abaixo são tratadas assim:

- **Observação no site (Fase 3):** F-01/Q01, F-04/Q03, Q09, Q10 e as opções/obrigatoriedade da Q02. O comportamento observado vira oráculo; divergência com a story vai para `docs/divergencias.md`.
- **Suposição do QA:** Q02 (valores), Q04, Q05, Q06, Q07 e Q08 seguem as sugestões de [po-suggestions.md](po-suggestions.md). São suposições do QA, não regras do PO, e serão listadas na auditoria final.

## Requer decisão humana (original — resolvido acima)

- `[NEEDS PO CONFIRMATION: qual dos nomes deve aparecer em "Logged in as"?]` (F-01, Q01)
- `[NEEDS PO CONFIRMATION: valores de título, data de nascimento, país, estado e quais campos são obrigatórios]` (F-02, Q02)
- `[NEEDS PO CONFIRMATION: o critério "home visível" do TC 1 entra na story e com qual oráculo?]` (F-03, Q04)
- `[NEEDS PO CONFIRMATION: a US-01 cobre caminhos de erro (campo obrigatório vazio, etc.) além do TC 1?]` (Q06)
