# US-01 — Cadastrar nova conta (TC 1)

- **Épico:** A — Conta e Autenticação
- **Caso de origem:** TC 1 — Register User
- **Stories de apoio:** US-06
- **Tags:** `@TC01` `@epico-conta`

**Como** visitante, **quero** criar uma conta informando meus dados, **para** poder comprar e acompanhar pedidos.

## Critérios de aceitação

```gherkin
@TC01 @epico-conta
Cenário: Cadastro completo com e-mail inédito
  Dado que estou na home do site
  Quando acesso "Signup / Login"
  Então vejo "New User Signup!"
  Quando informo nome e um e-mail ainda não cadastrado e clico em "Signup"
  Então vejo "ENTER ACCOUNT INFORMATION"
  Quando preencho título, nome, e-mail, senha e data de nascimento
  E marco as opções de newsletter e ofertas de parceiros
  E preencho nome, sobrenome, empresa, endereço, endereço 2, país, estado, cidade, CEP e celular
  E clico em "Create Account"
  Então vejo "ACCOUNT CREATED!"
  Quando clico em "Continue"
  Então vejo "Logged in as <nome>" no topo
```

## Notas

- E-mail único por execução. A exclusão ao final do TC 1 é a [US-06](US-06-excluir-propria-conta.md).

## Lacunas e perguntas em aberto

- Campos obrigatórios e valores de título, país e estado.

Premissas transversais: ver [README.md](README.md#premissas-transversais).
