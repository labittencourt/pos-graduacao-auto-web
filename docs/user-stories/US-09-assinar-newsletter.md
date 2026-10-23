# US-09 — Assinar a newsletter pelo rodapé da home (TC 10)

- **Épico:** C — Newsletter
- **Caso de origem:** TC 10 — Assinatura na home
- **Stories de apoio:** —
- **Tags:** `@TC10` `@epico-newsletter`

**Como** visitante, **quero** assinar a newsletter pelo rodapé, **para** receber novidades do site.

## Critérios de aceitação

```gherkin
@TC10 @epico-newsletter
Cenário: Assinatura com e-mail válido
  Dado que estou na home do site
  Quando rolo a página até o rodapé
  Então vejo o texto "SUBSCRIPTION"
  Quando informo um e-mail e clico no botão de seta
  Então vejo a mensagem "You have been successfully subscribed!"
```

## Lacunas e perguntas em aberto

- Nenhuma lacuna específica registrada no documento de origem.

Premissas transversais: ver [README.md](README.md#premissas-transversais).
