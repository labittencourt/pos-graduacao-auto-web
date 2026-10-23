# Cenários de teste — US-05 Encerrar sessão (TC 4)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- "Página de login" sem oráculo (F-01) → URL `/login` + "Login to your account" (Q01).
- `[INFERIDO]` "proteger meus dados" implica que a sessão termina (F-02). Confirmado ao vivo.

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | O logout não leva à página de login | `Então sou levado à página de login` |
| 2 | Consistência interna | Leva à página de login, mas o menu continua "Logged in as" | `para proteger meus dados` |
| 3 | Integridade dos dados | Ação de conta depois do logout tem efeito sobre a conta | `proteger meus dados` |
| 4 | Consistência cruzada | Uma página de conta acessada sem sessão afirma algo falso ("Account Deleted!") | `proteger meus dados` |
| 5 | Determinismo | Voltar no navegador restaura a área logada | `dispositivo compartilhado` |
| 6 | Limites | sem risco identificado nesta US | — |
| 7 | Tratamento de erro | sem risco identificado nesta US: o logout não tem entrada do usuário | — |
| 8 | Autorização entre perfis | Visitante (sem sessão) executa ação de cliente autenticado | `dispositivo compartilhado` — coberto por CT-05-03 |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 4 passos 3–8) home → login → "Logged in as `<nome>`" |
| AC1 | "Logout" leva à página de login |

### CT-05-01 — Logout leva à página de login (TC 4)
```gherkin
@TC04 @epico-conta
Cenário: Logout leva à página de login
  Dado que tenho uma conta cadastrada
  E estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login"
  Então vejo "Login to your account"
  Quando informo e-mail e senha corretos e clico em "login"
  Então vejo "Logged in as <nome>"
  Quando clico em "Logout"
  Então estou em "/login" vendo "Login to your account"
  E não vejo mais "Logged in as"
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Consistência interna · Oráculo: AC0–AC1 + Q01 (oráculo observado) + propósito ("proteger meus dados")

### CT-05-02 — Voltar não restaura a sessão — **EXTRA**
```gherkin
Cenário: Voltar depois do logout
  Dado que fiz logout
  Quando uso o botão Voltar do navegador
  Então a página exibida não mostra "Logged in as"
```
(Segurança) · [AUTOMAÇÃO] · Dimensão: Determinismo · Oráculo: propósito da story ("dispositivo compartilhado") · **Extra aprovado** → `US05-EXTRA Browser back after logout does not restore the session`. Observado: passa.

### CT-05-03 — `/delete_account` sem sessão não afirma exclusão — **EXTRA**
```gherkin
Cenário: Página de exclusão acessada sem sessão
  Dado que fiz logout
  Quando acesso "/delete_account" diretamente
  Então não vejo "Account Deleted!"
  E a conta continua existindo
```
(Segurança) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada, Integridade dos dados, Autorização entre perfis · Oráculo: consistência com o propósito (uma confirmação de exclusão só é verdadeira se algo foi excluído) · **Extra aprovado** → `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)`, em `test.fail()`. A checagem "a conta continua existindo" vem antes da que falha e roda sempre. Conferido: falha pelo motivo certo (a mensagem aparece).

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0, AC1 | CT-05-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato/Promessa · Consistência interna | CT-05-01 |
| Determinismo | CT-05-02 (extra) |
| Integridade · Consistência cruzada · Autorização | CT-05-03 (extra) |
| Limites · Tratamento de erro | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Com o produto: o logout leva ao mesmo `/login` da US-03/US-04.
- Entre regras: "Account Deleted!" é usado como prova de exclusão no TC 1 e no TC 2. Como a página mostra isso mesmo sem excluir nada, a mensagem sozinha não é prova (ver auditoria AUD-002).

## Seção 5 — Riscos não cobertos
- Expiração de sessão por tempo: não observável em tempo útil.

## Seção 6 — Charters
```
Explore páginas que dependem de sessão (/delete_account, /view_cart, /checkout) acessadas diretamente após o logout, com o objetivo de descobrir confirmações falsas ou ações executadas sem sessão.
Duração sugerida: curta (30 min).
Pré-condição: conta criada pela API, login e logout.
Sinal de parada: cada página visitada uma vez, com o resultado registrado.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-05-02 e CT-05-03 serão automatizados?
