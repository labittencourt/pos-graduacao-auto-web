# Cenários de teste — US-02 Impedir cadastro com e-mail já existente (TC 5)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Passo 3) · **Escopo:** Frontend · MEM-001

## Seção 1 — Leitura crítica
- O passo 3 do TC 5 ("home visible") virou pré-condição (F-01). Suposição do QA, por precedente da US-01: verificar a home.
- `[INFERIDO]` Depois do erro, o usuário não chega a "Enter Account Information" (F-03). Deriva do benefício "para não criar cadastro duplicado".
- `[INFERIDO]` A conta original não é alterada pela tentativa (Q06). Mesma origem.

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho |
|---|----------|-------------------------------|--------|
| 1 | Contrato/Promessa | A mensagem não aparece e o signup duplicado segue adiante | `Então vejo o erro "Email Address already exist!"` |
| 2 | Consistência interna | A mensagem aparece, mas o formulário de conta abre mesmo assim | `para não criar cadastro duplicado` |
| 3 | Integridade dos dados | A tentativa sobrescreve o nome da conta original | `para não criar cadastro duplicado` |
| 4 | Consistência cruzada | Uma conta criada pela API não é reconhecida como existente pela UI | `Nota: a conta pré-existente é criada pelo próprio teste (UI ou API)` |
| 5 | Determinismo | Testes paralelos usam o mesmo e-mail "conhecido" e um apaga a conta do outro | `existe uma conta cadastrada com um e-mail conhecido` |
| 6 | Limites | O mesmo e-mail em maiúsculas passa como inédito | `Quando informo um nome e esse e-mail` |
| 7 | Tratamento de erro | É o próprio AC: o erro de e-mail duplicado | `Então vejo o erro ...` |
| 8 | Autorização entre perfis | sem risco identificado nesta US: um único perfil (visitante) | — |

## Seção 3 — Cenários

| AC | Texto |
|----|-------|
| AC0 | (TC 5 passo 3, suposição do QA) a home é exibida |
| AC1 | Em "Signup / Login" vejo "New User Signup!" |
| AC2 | Com nome + e-mail já registrado, "Signup" mostra "Email Address already exist!" |

### CT-02-01 — Signup rejeitado para e-mail já registrado (TC 5)

```gherkin
@TC05 @epico-conta
Cenário: Cadastro rejeitado para e-mail já registrado
  Dado que existe uma conta cadastrada com um e-mail conhecido
  E estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login"
  Então vejo "New User Signup!"
  Quando informo um nome e esse e-mail e clico em "Signup"
  Então vejo o erro "Email Address already exist!"
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa, Tratamento de erro · Oráculo: AC0–AC2

### CT-02-02 — A tentativa não avança nem altera a conta original

```gherkin
Cenário: Nenhum cadastro duplicado
  Dado que o signup com e-mail já registrado mostrou o erro
  Então continuo vendo a caixa "New User Signup!"
  E não vejo "ENTER ACCOUNT INFORMATION"
  E a conta original mantém o nome cadastrado
```
(Negativo) · [AUTOMAÇÃO] (assertions dentro do TC05) · Dimensão: Consistência interna, Integridade dos dados · Oráculo: consistência com o propósito da feature + `regra:email-existente-bloqueia-signup` (observada ao vivo)
> Atualizado em 2026-10-22 depois da engenharia reversa: deixou de ser [INFERIDO]. "Continuo na página de login" não é checado pela URL, que vira `/signup` depois do POST (GAP 7 da US reversa). O oráculo é o conteúdo exibido.

### CT-02-03 — Conta criada pela API é reconhecida pela UI

Coberto pelo próprio CT-02-01: a pré-condição cria a conta pela API, e a UI precisa reconhecê-la.
(Funcional) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada · Oráculo: AC2

### CT-02-04 — E-mail único por teste

Cada teste cria a sua conta "conhecida" com e-mail único (factory) e a exclui no teardown, sem usuário fixo.
(Concorrência) · [AUTOMAÇÃO] (propriedade da fixture) · Dimensão: Determinismo · Oráculo: premissa transversal "Nenhum usuário fixo"

### CT-02-05 — Mesmo e-mail em maiúsculas — **EXTRA**

```gherkin
Cenário: Variação de caixa do e-mail já registrado
  Dado que existe uma conta com um e-mail conhecido em minúsculas
  Quando faço o signup com o mesmo e-mail em MAIÚSCULAS
  Então vejo o erro "Email Address already exist!"
```
(Borda) · [AUTOMAÇÃO] · Dimensão: Limites · Oráculo: norma externa (RFC 5321, seção 2.4: o domínio não diferencia maiúsculas) · **Extra — só implementar com aprovação**
> Observado em 2026-10-22: **o site NÃO reconhece** a variação. Pela UI, o formulário de conta abre. Pela API, tanto o e-mail todo em maiúsculas quanto só o domínio em maiúsculas criam uma segunda conta. Para o oráculo ficar irrefutável, o teste deve variar **só o domínio**. Aprovado: `US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002)`, em `test.fail()`. Confirmado em 2026-10-22 que ele falha pelo motivo certo (a mensagem não aparece).

### Rastreabilidade

| Critério | Cenário(s) |
|----------|------------|
| AC0, AC1, AC2 | CT-02-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato/Promessa | CT-02-01 |
| Consistência interna | CT-02-02 |
| Integridade dos dados | CT-02-02 |
| Consistência cruzada | CT-02-03 |
| Determinismo | CT-02-04 |
| Limites | CT-02-05 (extra) |
| Tratamento de erro | CT-02-01 |
| Autorização entre perfis | sem risco identificado nesta US |

## Seção 4 — Oráculos de consistência
- Interna: a story não se contradiz.
- Com o produto: a mensagem deve aparecer na mesma caixa de signup usada pela US-01.
- Com normas: a mensagem revela que o e-mail já tem conta (enumeração de contas, OWASP). O TC exige esse comportamento, então ele fica registrado como risco, não como cenário.
- Entre regras: depende da US-01 gravar o e-mail corretamente.

## Seção 5 — Riscos não cobertos
- **Enumeração de contas:** qualquer visitante descobre se um e-mail tem cadastro. É o comportamento pedido pelo TC 5, por isso fica registrado aqui e não vira teste.

## Seção 6 — Charters
```
Explore o signup com e-mail existente usando variações (maiúsculas, espaços nas pontas, alias com "+"), com o objetivo de descobrir como o site normaliza e-mails.
Duração sugerida: curta (30 min) — poucas variações, resposta imediata.
Pré-condição: conta criada pela API com e-mail único.
Sinal de parada: cada variação testada uma vez, com o resultado registrado.
```

## Seção 7 — Perguntas antes de testar
- O extra CT-02-05 será automatizado? (decisão do usuário)
