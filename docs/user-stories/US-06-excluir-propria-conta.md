# US-06 — Excluir a própria conta (apoio aos TC 1, 2, 15 e 16)

- **Épico:** A — Conta e Autenticação
- **Casos de origem:** apoio aos TC 1, 2, 15 e 16
- **Tags:** `@TC01` `@TC02` `@TC15` `@TC16` `@epico-conta`

**Como** cliente autenticado, **quero** excluir minha conta, **para** remover meus dados do site.

## Critérios de aceitação

```gherkin
@TC01 @TC02 @TC15 @TC16 @epico-conta
Cenário: Exclusão de conta
  Dado que estou autenticado
  Quando clico em "Delete Account"
  Então vejo "ACCOUNT DELETED!"
  Quando clico em "Continue"
  Então não estou mais autenticado
```

## Notas

- "não estou mais autenticado" NÃO está literal nos casos de teste; é suposição a confirmar no site.

## Lacunas e perguntas em aberto

- Estado após excluir a conta (suposição acima).

Premissas transversais: ver [README.md](README.md#premissas-transversais).
