# Gate de qualidade — US-09 Assinar a newsletter pelo rodapé da home (TC 10)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-09-assinar-newsletter.md](../../user-stories/US-09-assinar-newsletter.md)

<details>
<summary>Test Case 10: Verify Subscription in home page (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down to footer
5. Verify text 'SUBSCRIPTION'
6. Enter email address in input and click arrow button
7. Verify success message 'You have been successfully subscribed!' is visible

</details>

## Alerta de impacto (passo 0.5b)
Nenhum artefato compartilhado com testes existentes (o rodapé ainda não é exercitado). Novo épico (C — Newsletter).

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 7 | O benefício ("para receber novidades") exige que a assinatura seja registrada, mas o único AC é a mensagem na tela. O site só mostra a mensagem, sem registrar nada (BUG-007). |
| Completude | 6 | **Cap (regra rígida):** sem AC de erro (e-mail inválido ou vazio). |
| Testabilidade | 7 | A mensagem é exata, mas fica visível só 1,5 s (observado). A checagem precisa começar logo após o clique. |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | contradiction | Coerência | High | `**para** receber novidades do site` × `Então vejo a mensagem "You have been successfully subscribed!"` | O AC só verifica a mensagem; o benefício exige que o e-mail seja registrado. No site, nada é enviado (BUG-007). O TC 10 fica fiel ao AC; a verificação do envio vira extra. |
| F-02 | untestable | Testabilidade | Medium | `Então vejo a mensagem "You have been successfully subscribed!"` | A mensagem some em 1,5 s (`setTimeout` em `subscription.js`). A assertion começa logo após o clique, sem espera fixa. |
| F-03 | missing-criteria | Completude | Low | `Quando informo um e-mail e clico no botão de seta` | Nada sobre e-mail inválido ou vazio. Extra. |
| F-04 | missing-criteria | Completude | Low | `Dado que estou na home do site` | Passo 3 do TC (home visível), como nas US anteriores. |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
