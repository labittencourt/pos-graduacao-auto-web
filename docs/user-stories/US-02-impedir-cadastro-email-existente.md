# US-02 — Impedir cadastro com e-mail já existente (TC 5)

- **Épico:** A — Conta e Autenticação
- **Caso de origem:** TC 5 — Cadastro com e-mail já existente
- **Stories de apoio:** —
- **Tags:** `@TC05` `@epico-conta`

**Como** visitante, **quero** ser avisado quando o e-mail já tem conta, **para** não criar cadastro duplicado.

## Critérios de aceitação

```gherkin
@TC05 @epico-conta
Cenário: Cadastro rejeitado para e-mail já registrado
  Dado que existe uma conta cadastrada com um e-mail conhecido
  E estou em "Signup / Login" vendo "New User Signup!"
  Quando informo um nome e esse e-mail e clico em "Signup"
  Então vejo o erro "Email Address already exist!"
```

## Notas

- A conta pré-existente é criada pelo próprio teste (UI ou API) e removida no fim.

## Lacunas e perguntas em aberto

- Nenhuma lacuna específica registrada no documento de origem.

Premissas transversais: ver [README.md](README.md#premissas-transversais).
