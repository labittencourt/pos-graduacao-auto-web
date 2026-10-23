# US-05 — Encerrar sessão (TC 4)

- **Épico:** A — Conta e Autenticação
- **Caso de origem:** TC 4 — Logout
- **Stories de apoio:** US-03
- **Tags:** `@TC04` `@epico-conta`

**Como** cliente autenticado, **quero** sair da minha conta, **para** proteger meus dados em um dispositivo compartilhado.

## Critérios de aceitação

```gherkin
@TC04 @epico-conta
Cenário: Logout leva à página de login
  Dado que estou autenticado e vejo "Logged in as <nome>"
  Quando clico em "Logout"
  Então sou levado à página de login
```

## Lacunas e perguntas em aberto

- Como verificar "página de login" (candidato: título "Login to your account").

Premissas transversais: ver [README.md](README.md#premissas-transversais).
