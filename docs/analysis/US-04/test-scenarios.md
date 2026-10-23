# Cenários de teste — US-04 Recusar login com credenciais inválidas (TC 3)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- "Incorretos" no TC 3 = e-mail sem conta + senha qualquer (Q01).
- `[INFERIDO]` "sem acessar conta alheia" implica que o usuário não fica autenticado (F-03). Confirmado ao vivo.

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | A mensagem não aparece | `Então vejo o erro "Your email or password is incorrect!"` |
| 2 | Consistência interna | A mensagem aparece, mas o usuário fica autenticado | `sem acessar conta alheia` |
| 3 | Integridade dos dados | A credencial digitada vaza na resposta (BUG-003) | `para corrigir os dados` |
| 4 | Consistência cruzada | A mensagem para "e-mail existente + senha errada" difere da de "e-mail inexistente" (enumeração) | `quando e-mail ou senha estão errados` |
| 5 | Determinismo | sem risco identificado nesta US: o TC não cria estado | — |
| 6 | Limites | A senha com caixa trocada é aceita | `senha` |
| 7 | Tratamento de erro | É o próprio AC | — |
| 8 | Autorização entre perfis | Acesso à conta de outra pessoa com a senha errada | `sem acessar conta alheia` — coberto por CT-04-02 |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 3 passo 3) home exibida |
| AC1 | Em "Signup / Login" vejo "Login to your account" |
| AC2 | Com e-mail e senha incorretos, "login" mostra "Your email or password is incorrect!" |

### CT-04-01 — Login com e-mail e senha incorretos (TC 3)
```gherkin
@TC03 @epico-conta
Cenário: Login com e-mail e senha incorretos
  Dado que estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login"
  Então vejo "Login to your account"
  Quando informo um e-mail sem conta e uma senha qualquer e clico em "login"
  Então vejo o erro "Your email or password is incorrect!"
  E não estou autenticado
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Tratamento de erro, Consistência interna · Oráculo: AC0–AC2; "não autenticado" pelo propósito da story

### CT-04-02 — E-mail existente com senha errada — **EXTRA**
```gherkin
Cenário: Senha errada para conta existente
  Dado que existe uma conta
  Quando faço login com o e-mail dela e uma senha errada
  Então vejo "Your email or password is incorrect!" (a mesma mensagem do e-mail inexistente)
  E não estou autenticado
```
(Segurança) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada, Autorização entre perfis · Oráculo: norma externa (OWASP Authentication Cheat Sheet: mensagem genérica, sem enumeração) · **Extra aprovado** → `US04-EXTRA Wrong password for existing email shows the same generic error`. Observado: passa.

### CT-04-03 — Senha com caixa trocada — **EXTRA**
```gherkin
Cenário: Senha diferencia maiúsculas
  Dado que existe uma conta
  Quando faço login com a senha certa em MAIÚSCULAS
  Então vejo "Your email or password is incorrect!"
```
(Borda) · [AUTOMAÇÃO] · Dimensão: Limites · Oráculo: norma externa (OWASP: senhas diferenciam maiúsculas) · **Extra aprovado** → `US04-EXTRA Password is case-sensitive`. Observado: passa.

### CT-04-04 — A senha não volta preenchida após falha — **EXTRA**
```gherkin
Cenário: Senha não é devolvida pelo servidor
  Dado que fiz um login que falhou
  Quando a página de login é exibida de novo
  Então a senha digitada não aparece no HTML da resposta
```
(Segurança) · [AUTOMAÇÃO] · Dimensão: Integridade dos dados · Oráculo: norma externa (OWASP: não repreencher campos de senha) · **Extra aprovado** → `US04-EXTRA Password is not echoed back after failed login (BUG-003)`, em `test.fail()`. Conferido em 2026-10-22: falha pelo motivo certo (a senha está no corpo da resposta).

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0, AC1, AC2 | CT-04-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato/Promessa · Consistência interna · Tratamento de erro | CT-04-01 |
| Integridade dos dados | CT-04-04 (extra) |
| Consistência cruzada · Autorização entre perfis | CT-04-02 (extra) |
| Limites | CT-04-03 (extra) |
| Determinismo | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Com o produto: a mesma mensagem aparece no login com o domínio em maiúsculas (US-03, BUG-002).
- Com normas: mensagem genérica (bom); senha devolvida no HTML (ruim, BUG-003).

## Seção 5 — Riscos não cobertos
- Bloqueio por tentativas repetidas (força bruta): não há indício na tela, e testar isso num site compartilhado seria abusivo. Fica fora.

## Seção 6 — Charters
```
Explore o login com e-mails no limite de formato (com "+", subdomínio, espaços) usando a caixa de login, com o objetivo de descobrir normalizações divergentes do signup.
Duração sugerida: curta (30 min).
Pré-condição: conta criada pela API.
Sinal de parada: cada variação testada uma vez.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-04-02, CT-04-03 e CT-04-04 serão automatizados?
