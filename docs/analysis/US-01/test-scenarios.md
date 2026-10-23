# Cenários de teste — US-01 Cadastrar nova conta (TC 1)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Modo A, Passo 3) · **Escopo:** Frontend
**Regra do projeto:** MEM-001, a story é testada como está. Lacunas viram observação no site ou suposição do QA ([gate.md](gate.md#resolução-2026-10-22)).

## Seção 1 — Leitura crítica

- A story copia o TC 1 quase literalmente, mas transforma o passo 3 ("Verify that home page is visible successfully") em pré-condição (F-03). **Suposição do QA (Q04):** a verificação entra no teste, com oráculo definido na engenharia reversa.
- `<nome>` em "Logged in as `<nome>`" é ambíguo (F-01). **A observar:** usar valores distintos para o nome do signup, Name e First name, para descobrir qual aparece.
- `[INFERIDO]` O e-mail digitado no signup deveria ser o mesmo do formulário de conta (Q03). A story não diz isso.
- Os passos 17–18 do TC 1 (excluir conta) pertencem à US-06, mas fazem parte do TC 1. Eles entram no mesmo teste, como fechamento do caso.
- Sem referências visuais (Figma).

## Seção 2 — Modelagem de risco por dimensão

| # | Dimensão | O que pode dar errado nesta US | Trecho que sustenta |
|---|----------|-------------------------------|---------------------|
| 1 | Contrato/Promessa | O cadastro não conclui ou não autentica o usuário no fim | `Então vejo "ACCOUNT CREATED!"` / `Então vejo "Logged in as <nome>"` |
| 2 | Consistência interna | O nome exibido no topo não corresponde ao nome informado | `Então vejo "Logged in as <nome>" no topo` |
| 3 | Integridade dos dados | O e-mail do signup não é o mesmo gravado na conta | `informo nome e um e-mail ainda não cadastrado` + `preencho ... e-mail` |
| 4 | Consistência cruzada | A conta criada não fica utilizável no resto do site (exclusão falha, sessão inconsistente) | `Nota: ... A exclusão ao final do TC 1 é a US-06.` |
| 5 | Determinismo | Execuções paralelas ou repetidas colidem no e-mail ("e-mail ainda não cadastrado" deixa de ser verdade) | `um e-mail ainda não cadastrado` |
| 6 | Limites | Nomes longos ou com caracteres especiais quebram o cadastro ou a exibição em "Logged in as" | `preencho nome, sobrenome, empresa...` |
| 7 | Tratamento de erro | Campo obrigatório vazio ou e-mail mal formado não é rejeitado | (ausência de AC de erro — Completude 6 no gate) |
| 8 | Autorização entre perfis | sem risco identificado nesta US: há um único perfil (visitante → cliente), sem grupos | — |

## Seção 3 — Cenários

### Critérios de aceite (AC) da story

| AC | Texto |
|----|-------|
| AC1 | Ao acessar "Signup / Login", vejo "New User Signup!" |
| AC2 | Ao informar nome + e-mail inédito e clicar "Signup", vejo "ENTER ACCOUNT INFORMATION" |
| AC3 | Ao preencher todos os dados, marcar as duas opções e clicar "Create Account", vejo "ACCOUNT CREATED!" |
| AC4 | Ao clicar "Continue", vejo "Logged in as `<nome>`" no topo |
| AC0 | (do TC 1, passo 3 — suposição do QA Q04) A home é exibida ao iniciar |
| AC-TC1-fim | (do TC 1, passos 17–18, via US-06) "Delete Account" leva a "ACCOUNT DELETED!" e "Continue" |

### CT-01-01 — Cadastro completo com e-mail inédito (TC 1 de ponta a ponta)

```gherkin
@TC01 @epico-conta
Cenário: Cadastro completo com e-mail inédito
  Dado que estou na home do site
  Então a home é exibida
  Quando acesso "Signup / Login"
  Então vejo "New User Signup!"
  Quando informo nome e um e-mail ainda não cadastrado e clico em "Signup"
  Então vejo "ENTER ACCOUNT INFORMATION"
  Quando preencho título, nome, senha e data de nascimento
  E marco "Sign up for our newsletter!" e "Receive special offers from our partners!"
  E preencho nome, sobrenome, empresa, endereço, endereço 2, país, estado, cidade, CEP e celular
  E clico em "Create Account"
  Então vejo "ACCOUNT CREATED!"
  Quando clico em "Continue"
  Então vejo "Logged in as <nome>" no topo
  Quando clico em "Delete Account"
  Então vejo "ACCOUNT DELETED!"
  E clico em "Continue"
```
(Funcional) · [AUTOMAÇÃO] · Dimensão: Contrato/Promessa · Oráculo: AC0–AC4 + AC-TC1-fim (texto do TC 1)
> Atualizado em 2026-10-22 (AUD-002): além de "ACCOUNT DELETED!", o teste confirma pela API 14 que a conta deixou de existir. A mensagem sozinha não prova a exclusão (BUG-004).

### CT-01-02 — "Logged in as" exibe o campo Name do formulário de conta

```gherkin
Cenário: Nome exibido após o cadastro
  Dado que concluí o cadastro informando um valor no campo Name do formulário de conta
  Quando vejo o topo da página
  Então "Logged in as" exibe exatamente o valor do campo Name
```
(Funcional) · [AUTOMAÇÃO] (assertion dentro do TC01) · Dimensão: Consistência interna · Oráculo: AC4 + comportamento observado (`regra:logged-in-as-usa-campo-name`, DIV-02)
> Atualizado em 2026-10-22 depois da engenharia reversa. A versão anterior era "mostra um dos três nomes", antes de se saber qual. Na automação, o nome do signup e o Name são iguais (a factory usa o mesmo valor). A distinção entre os três nomes foi provada uma vez, na observação ao vivo.

### CT-01-03 — O e-mail do signup vem preenchido e bloqueado no formulário de conta

```gherkin
Cenário: E-mail preservado entre signup e formulário de conta
  Dado que informei um e-mail no "New User Signup!"
  Quando vejo "ENTER ACCOUNT INFORMATION"
  Então o campo de e-mail mostra o mesmo e-mail informado
  E o campo de e-mail está desabilitado
```
(Funcional) · [AUTOMAÇÃO] (assertion dentro do TC01) · Dimensão: Integridade dos dados · Oráculo: comportamento observado (`regra:email-signup-preservado`, DIV-01)
> Atualizado em 2026-10-22: deixou de ser [INFERIDO], confirmado ao vivo.

### CT-01-04 — Execuções paralelas não colidem no e-mail

```gherkin
Cenário: Dados únicos por execução
  Dado que dois testes de cadastro rodam ao mesmo tempo
  Quando cada um gera seu e-mail
  Então os e-mails são distintos e ambos os cadastros concluem
```
(Concorrência) · [AUTOMAÇÃO] (garantido pela factory e verificado nas rodadas paralelas da Fase 5) · Dimensão: Determinismo · Oráculo: premissa transversal "E-mail único por execução"

### CT-01-05 — Campo obrigatório vazio no formulário de conta — **EXTRA**

```gherkin
Cenário: Criação recusada com campo obrigatório vazio
  Dado que estou em "ENTER ACCOUNT INFORMATION"
  Quando preencho tudo exceto a senha e clico em "Create Account"
  Então continuo em "/signup"
  E o navegador sinaliza a senha como obrigatória (validação nativa, "Please fill out this field.")
  E a conta não existe na API de consulta por e-mail
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro · Oráculo: `regra:campos-obrigatorios-cadastro` (atributo `required`, observado ao vivo) · **Extra aprovado em 2026-10-22** → `US01-EXTRA Required field empty blocks account creation`

### CT-01-06 — E-mail mal formado no signup — **EXTRA**

```gherkin
Cenário: Signup recusado com e-mail mal formado
  Dado que estou em "Signup / Login" vendo "New User Signup!"
  Quando informo um nome e o e-mail "qa-sem-arroba" e clico em "Signup"
  Então continuo em "/login"
  E o navegador sinaliza o e-mail como inválido (validação nativa de input type=email)
  E não vejo "ENTER ACCOUNT INFORMATION"
```
(Negativo) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro · Oráculo: consistência com o propósito da feature; comportamento observado ao vivo em 2026-10-22 · **Extra aprovado** → `US01-EXTRA Malformed email blocks signup`

### CT-01-07 — Nome longo e com caracteres especiais — **EXTRA**

```gherkin
Cenário: Cadastro com nome de borda
  Dado que estou em "Signup / Login"
  Quando faço o cadastro com um nome de 100 caracteres contendo acentos e apóstrofo
  Então o cadastro conclui e "Logged in as" exibe o nome sem corrompê-lo
```
(Borda) · [MANUAL] · Dimensão: Limites · Oráculo: [ORÁCULO AUSENTE — requer confirmação] (a story não define limite de tamanho) · **Extra**

### CT-01-08 — Senha mascarada — **EXTRA**

```gherkin
Cenário: Senha não exibida em texto aberto
  Dado que estou em "ENTER ACCOUNT INFORMATION"
  Quando digito a senha
  Então o campo não exibe os caracteres digitados
```
(Segurança) · [AUTOMAÇÃO] · Dimensão: Tratamento de erro · Oráculo: norma externa (prática OWASP de não exibir credenciais) · **Extra aprovado** → `US01-EXTRA Password field is masked` (verifica `type="password"`)

### CT-01-09 — Acessibilidade do formulário de cadastro — **EXTRA**

```gherkin
Cenário: Scan de acessibilidade do formulário
  Dado que estou em "ENTER ACCOUNT INFORMATION"
  Quando executo o scan WCAG
  Então não há violações críticas nos campos do formulário
```
(Acessibilidade) · [AUTOMAÇÃO] · Dimensão: Consistência cruzada · Oráculo: norma externa (WCAG 2.1 AA) · **Extra aprovado** → `US01-EXTRA Account form has no critical a11y violations (BUG-001)`
> Atualizado em 2026-10-22: o scan é restrito a `form[action="/signup"]` (o resto da página não é desta story) e encontrou 2 violações críticas reais (BUG-001). O teste afirma "sem violações críticas" e está em `test.fail()`, decisão do usuário: falha esperada até o site corrigir.

### Rastreabilidade

| Critério de aceite | Cenário(s) |
|--------------------|------------|
| AC0 | CT-01-01 |
| AC1 | CT-01-01 |
| AC2 | CT-01-01, CT-01-03 |
| AC3 | CT-01-01 |
| AC4 | CT-01-01, CT-01-02 |
| AC-TC1-fim | CT-01-01 |

| Dimensão | Cenário(s) |
|----------|------------|
| Contrato/Promessa | CT-01-01 |
| Consistência interna | CT-01-02 |
| Integridade dos dados | CT-01-03 |
| Consistência cruzada | CT-01-01 (exclusão da conta criada), CT-01-09 (extra) |
| Determinismo | CT-01-04 |
| Limites | CT-01-07 (extra) |
| Tratamento de erro | CT-01-05, CT-01-06, CT-01-08 (extras) |
| Autorização entre perfis | sem risco identificado nesta US |

Todos os AC estão cobertos. As dimensões Limites e Tratamento de erro só têm cenários extras: se os extras não forem aprovados, elas ficam descobertas, como risco aceito.

## Seção 4 — Oráculos de consistência

- **Interna:** a story não se contradiz. A tensão está no `<nome>` indefinido (F-01).
- **Com o produto:** comportamento observado na engenharia reversa vira o oráculo do que a story não define.
- **Com o propósito:** cadastrar e ficar autenticado. CT-01-02 e CT-01-03 protegem isso.
- **Com normas:** senha mascarada (CT-01-08) e WCAG (CT-01-09), os dois extras.
- **Entre regras:** US-02 (e-mail duplicado) depende de a US-01 gravar o e-mail corretamente (CT-01-03).

## Seção 5 — Riscos não cobertos pelos cenários formais

- **Anúncios e iframes de terceiros** sobre os botões "Signup", "Create Account" e "Continue". Investigar na engenharia reversa se cobrem os botões e se a página redireciona para anúncio (vignette).
- **Contas residuais no site compartilhado** quando o teste falha antes da exclusão. Mitigação: teardown garantido (Q08).
- **Valores do formulário que o site recusa sem mensagem** (ex.: CEP ou celular com letras). Fica para exploração.

## Seção 6 — Charters exploratórios

```
Explore o formulário "ENTER ACCOUNT INFORMATION" usando campos vazios e valores de borda, com o objetivo de descobrir quais campos são obrigatórios e como o site sinaliza erro.
Duração sugerida: curta (30 min) — formulário único, poucos campos obrigatórios prováveis.
Pré-condição: e-mail fictício inédito.
Sinal de parada: todos os campos testados vazios uma vez e o tipo de sinalização registrado.
```

```
Explore a home e o fluxo de cadastro usando execução headed e headless, com o objetivo de descobrir quando anúncios ou vignettes cobrem botões.
Duração sugerida: normal (60 min) — comportamento de anúncio varia por carga e por região.
Pré-condição: nenhuma.
Sinal de parada: 5 cadastros completos observados e cada bloqueio por anúncio registrado.
```

```
Explore "Logged in as" usando nomes distintos em signup, Name e First name, com o objetivo de descobrir qual valor o site exibe.
Duração sugerida: curta (30 min) — pergunta única e fechada.
Pré-condição: e-mail fictício inédito.
Sinal de parada: o valor exibido foi identificado de forma inequívoca.
```

## Seção 7 — Perguntas antes de testar (DoR pela lente de QA)

- Os extras CT-01-05 a CT-01-09 serão automatizados? (decisão do usuário no acordo de cobertura)
- A exclusão no teardown pode ser feita por API? (engenharia reversa da página "API Testing")
