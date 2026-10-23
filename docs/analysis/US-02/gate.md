# Gate de qualidade — US-02 Impedir cadastro com e-mail já existente (TC 5)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Formato:** ACs em Gherkin · **Escopo:** Frontend
**Fonte da US:** [docs/user-stories/US-02-impedir-cadastro-email-existente.md](../../user-stories/US-02-impedir-cadastro-email-existente.md)
**Regra do projeto:** MEM-001, a story é testada como está.

<details>
<summary>Test Case 5: Register User with existing email (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and already registered email address
7. Click 'Signup' button
8. Verify error 'Email Address already exist!' is visible

</details>

## Alerta de impacto (passo 0.5b)
A story usa artefatos já exercitados pela US-01 (caixa de signup). Detalhes em [system-map-matches.md](system-map-matches.md). É um caminho novo, sem mudança de comportamento: nenhuma pergunta ao PO é gerada.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | O objetivo ("não criar cadastro duplicado") e o AC (erro no signup) são consistentes. |
| Completude | 7 | O AC é o próprio caminho de erro (sem cap). Faltam: a verificação "home visível" do TC (F-01), o que acontece depois do erro (F-03) e a regra para variações do mesmo e-mail (F-04). |
| Testabilidade | 8 | Mensagem exata e única. A pré-condição está definida pela nota (conta criada pelo teste). |

### Gate: **PASS**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | missing-criteria | Completude | Low | `E estou em "Signup / Login" vendo "New User Signup!"` | O passo 3 do TC 5 ("home page is visible") não está na story. Mesmo tratamento da US-01 (Q04): verificar a home na entrada. |
| F-02 | ambiguity | Testabilidade | Low | `Nota: a conta pré-existente é criada pelo próprio teste (UI ou API) e removida no fim.` | Escolher o meio de criação. A API 11 foi verificada na US-01 (`docs/reverse/cadastro-conta-endpoints.md`). |
| F-03 | missing-criteria | Completude | Low | `Então vejo o erro "Email Address already exist!"` | Não diz se o usuário continua na página nem se o formulário de conta é aberto. A story só garante "não criar cadastro duplicado" pelo benefício declarado. |
| F-04 | missing-criteria | Completude | Low | `Quando informo um nome e esse e-mail` | Não define se o mesmo e-mail em outra caixa (maiúsculas) também é "já existente". Exploração ou extra. |

## Requer decisão humana
Nenhuma bloqueante. As pendências seguem a MEM-001 (observar no site ou suposição do QA); ver [refinement-questions.md](refinement-questions.md).
