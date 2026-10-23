# US-03 — Entrar com e-mail e senha válidos (TC 2)

- **Épico:** A — Conta e Autenticação
- **Caso de origem:** TC 2 — Login com e-mail e senha corretos
- **Stories de apoio:** US-06
- **Tags:** `@TC02` `@epico-conta`

**Como** cliente cadastrado, **quero** entrar com meu e-mail e senha, **para** acessar minha conta.

## Critérios de aceitação

```gherkin
@TC02 @epico-conta
Cenário: Login com credenciais corretas
  Dado que tenho uma conta cadastrada
  E estou em "Signup / Login" vendo "Login to your account"
  Quando informo e-mail e senha corretos e clico em "login"
  Então vejo "Logged in as <nome>" no topo
```

## Notas

- A exclusão da conta ao final do TC 2 é a [US-06](US-06-excluir-propria-conta.md).

## Lacunas e perguntas em aberto

- Nenhuma lacuna específica registrada no documento de origem.

Premissas transversais: ver [README.md](README.md#premissas-transversais).
