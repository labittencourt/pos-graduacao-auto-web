# US-04 — Recusar login com credenciais inválidas (TC 3)

- **Épico:** A — Conta e Autenticação
- **Caso de origem:** TC 3 — Login com e-mail e senha incorretos
- **Stories de apoio:** —
- **Tags:** `@TC03` `@epico-conta`

**Como** cliente, **quero** ser informado quando e-mail ou senha estão errados, **para** corrigir os dados sem acessar conta alheia.

## Critérios de aceitação

```gherkin
@TC03 @epico-conta
Cenário: Login com e-mail e senha incorretos
  Dado que estou em "Signup / Login" vendo "Login to your account"
  Quando informo um e-mail e uma senha incorretos e clico em "login"
  Então vejo o erro "Your email or password is incorrect!"
```

## Lacunas e perguntas em aberto

- Cobrir também "e-mail inexistente" e "e-mail válido com senha errada"? Excede o caso original.

Premissas transversais: ver [README.md](README.md#premissas-transversais).
