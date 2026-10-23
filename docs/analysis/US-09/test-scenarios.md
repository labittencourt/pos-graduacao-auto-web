# Cenários de teste — US-09 Assinar a newsletter pelo rodapé (TC 10)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- O AC verifica só a mensagem; o benefício exige registro (F-01). O site não registra nada (BUG-007).
- A mensagem dura 1,5 s (F-02): a checagem começa logo após o clique e usa a espera por condição do Playwright, sem espera fixa.

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | A mensagem não aparece | `Então vejo a mensagem "You have been successfully subscribed!"` |
| 2 | Consistência interna | A mensagem afirma uma assinatura que não aconteceu | `para receber novidades do site` |
| 3 | Integridade dos dados | O e-mail não chega ao servidor | `informo um e-mail` |
| 4 | Consistência cruzada | sem risco identificado nesta US: a assinatura não aparece em nenhuma outra tela | — |
| 5 | Determinismo | A checagem perde a janela de 1,5 s da mensagem | (observado) |
| 6 | Limites | E-mail vazio aceito | `informo um e-mail` |
| 7 | Tratamento de erro | E-mail mal formado recebe mensagem de sucesso | `informo um e-mail` |
| 8 | Autorização entre perfis | sem risco identificado nesta US: rodapé público | — |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 10 passo 3) home exibida |
| AC1 | Rolando até o rodapé, vejo "SUBSCRIPTION" |
| AC2 | Com um e-mail, a seta mostra "You have been successfully subscribed!" |

### CT-09-01 — Assinatura com e-mail válido (TC 10)
```gherkin
@TC10 @epico-newsletter
Cenário: Assinatura com e-mail válido
  Dado que estou na home do site
  Então a home é exibida
  Quando rolo a página até o rodapé
  Então vejo o texto "SUBSCRIPTION"
  Quando informo um e-mail e clico no botão de seta
  Então vejo a mensagem "You have been successfully subscribed!"
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Determinismo (janela de 1,5 s) · Oráculo: AC0–AC2

### CT-09-02 — E-mail mal formado não é aceito — **EXTRA**
```gherkin
Cenário: E-mail sem "@"
  Quando informo "qa-sem-arroba" e clico na seta
  Então o navegador sinaliza o e-mail como inválido
  E não vejo a mensagem de sucesso
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro, Limites · Oráculo: consistência com o propósito (não se assina um endereço inválido); validação nativa observada · **Extra aprovado** → `US09-EXTRA Malformed email is not subscribed`. O oráculo principal é `validity.typeMismatch`; "mensagem escondida" sozinha não provaria nada, já que ela começa escondida. Observado: passa.

### CT-09-03 — A assinatura envia o e-mail ao servidor — **EXTRA**
```gherkin
Cenário: Assinatura registrada
  Quando informo um e-mail válido e clico na seta
  Então uma requisição com esse e-mail é enviada ao site
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Consistência interna, Integridade dos dados · Oráculo: consistência com o propósito ("para receber novidades": sem registro, não há novidade a receber) · **Extra aprovado** → `US09-EXTRA Subscription sends the email to the site (BUG-007)`, em `test.fail()`. Sincroniza pelo ciclo completo da mensagem (aparece e some), sem espera fixa. Conferido: falha só na checagem da requisição; as pré-condições passam.

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0, AC1, AC2 | CT-09-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato/Promessa · Determinismo | CT-09-01 |
| Consistência interna · Integridade dos dados | CT-09-03 (extra) |
| Tratamento de erro · Limites | CT-09-02 (extra) |
| Consistência cruzada · Autorização | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Interna: a mensagem de sucesso deveria corresponder a uma ação real (BUG-007).

## Seção 5 — Riscos não cobertos
- Entrega efetiva da newsletter por e-mail: fora da camada de UI.

## Seção 6 — Charters
```
Explore o rodapé de assinatura em outras páginas (/products, /view_cart) usando o mesmo fluxo, com o objetivo de descobrir se o comportamento (só mensagem, sem envio) é o mesmo em todo o site.
Duração sugerida: curta (30 min).
Pré-condição: nenhuma.
Sinal de parada: 3 páginas verificadas.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-09-02 e CT-09-03 serão automatizados?
