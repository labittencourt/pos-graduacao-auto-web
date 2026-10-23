# Cenários de teste — US-03 Entrar com e-mail e senha válidos (TC 2)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · MEM-001

## Seção 1 — Leitura crítica
- A story termina no "Logged in as"; o TC 2 continua até "ACCOUNT DELETED!" (F-01). Suposição do QA Q03: o teste segue o TC.
- `<nome>`: campo Name, ou o `name` da API (DIV-02, confirmado ao vivo para conta criada pela API).

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | Credenciais corretas não autenticam | `Então vejo "Logged in as <nome>"` |
| 2 | Consistência interna | Autentica, mas mostra o nome de outra pessoa | `Logged in as <nome>` |
| 3 | Integridade dos dados | O nome exibido não é o nome cadastrado | `Logged in as <nome>` |
| 4 | Consistência cruzada | Conta criada pela API não loga pela UI; login aceita o e-mail com variação que o cadastro não reconhece (ou vice-versa) | `Dado que tenho uma conta cadastrada` |
| 5 | Determinismo | A sessão não persiste ao navegar | `para acessar minha conta` |
| 6 | Limites | sem risco identificado nesta US: os limites de entrada são da US-04 (credenciais inválidas) | — |
| 7 | Tratamento de erro | sem risco identificado nesta US: o erro de login é o escopo da US-04 | — |
| 8 | Autorização entre perfis | sem risco identificado nesta US: um único perfil | — |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 2 passo 3) home exibida |
| AC1 | Em "Signup / Login" vejo "Login to your account" |
| AC2 | Com e-mail e senha corretos, "login" leva a "Logged in as `<nome>`" |
| AC-TC2-fim | (TC 2 passos 9–10) "Delete Account" leva a "ACCOUNT DELETED!" |

### CT-03-01 — Login com credenciais corretas (TC 2)
```gherkin
@TC02 @epico-conta
Cenário: Login com credenciais corretas
  Dado que tenho uma conta cadastrada
  E estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login"
  Então vejo "Login to your account"
  Quando informo e-mail e senha corretos e clico em "login"
  Então vejo "Logged in as <nome>" no topo
  Quando clico em "Delete Account"
  Então vejo "ACCOUNT DELETED!"
```
> Atualizado em 2026-10-22 (AUD-002): além de "ACCOUNT DELETED!", o teste confirma pela API 14 que a conta deixou de existir (BUG-004).

(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Consistência interna, Integridade dos dados, Consistência cruzada (conta da API logando pela UI) · Oráculo: AC0–AC2, AC-TC2-fim; `<nome>` = `name` cadastrado (DIV-02)

### CT-03-02 — Sessão persiste ao navegar — **EXTRA**
```gherkin
Cenário: Sessão mantida em outra página
  Dado que fiz login com credenciais corretas
  Quando navego para "Products"
  Então continuo vendo "Logged in as <nome>"
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Determinismo · Oráculo: consistência com o propósito ("para acessar minha conta"); observado ao vivo · **Extra aprovado** → `US03-EXTRA Session persists when navigating`

### CT-03-03 — Login com domínio do e-mail em maiúsculas — **EXTRA**
```gherkin
Cenário: Mesmo e-mail com domínio em maiúsculas
  Dado que tenho uma conta com e-mail em minúsculas
  Quando faço login com o domínio do e-mail em maiúsculas e a senha correta
  Então vejo "Logged in as <nome>"
```
(Borda) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada · Oráculo: norma externa (RFC 5321, seção 2.4) · **Extra aprovado** → `US03-EXTRA Login accepts email with uppercase domain (BUG-002)`, em `test.fail()`. Observado: o site recusa com "Your email or password is incorrect!". É a mesma causa raiz do BUG-002 e nasceria como falha esperada.

### Rastreabilidade
| Critério | Cenário(s) |
|----------|------------|
| AC0, AC1, AC2, AC-TC2-fim | CT-03-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato/Promessa · Consistência interna · Integridade | CT-03-01 |
| Consistência cruzada | CT-03-01, CT-03-03 (extra) |
| Determinismo | CT-03-02 (extra) |
| Limites · Tratamento de erro · Autorização | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Com o produto: o "Logged in as" deve ser igual ao do cadastro (US-01).
- Entre regras: o login e o signup deveriam normalizar o e-mail do mesmo jeito; os dois diferenciam maiúsculas (BUG-002).

## Seção 5 — Riscos não cobertos
- Expiração de sessão e "lembrar-me": não há elemento na tela; fora do escopo.

## Seção 6 — Charters
```
Explore o login usando e-mail com espaços nas pontas e senha com caracteres especiais, com o objetivo de descobrir normalizações não documentadas.
Duração sugerida: curta (30 min) — poucas variações.
Pré-condição: conta criada pela API.
Sinal de parada: cada variação testada uma vez.
```

## Seção 7 — Perguntas antes de testar
- Os extras CT-03-02 e CT-03-03 serão automatizados?
