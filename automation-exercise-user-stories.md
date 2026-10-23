# User Stories — Automation Exercise (TCs 1, 2, 3, 4, 5, 8, 9, 10, 15, 16)

Fonte: https://www.automationexercise.com/test_cases (lida em 22/10/2026).
Convenções: IDs `US-NN`; tags `@TCnn` (caso de origem) e `@epico-*`; critérios em Gherkin PT-BR.
Os critérios vêm só do texto dos casos de teste. O que o site não declara está em "Lacunas".

## Rastreabilidade

| TC | Caso de teste | Story principal | Apoio | Épico |
| --- | --- | --- | --- | --- |
| 1 | Register User | US-01 | US-06 | A — Conta e Autenticação |
| 2 | Login com e-mail e senha corretos | US-03 | US-06 | A |
| 3 | Login com e-mail e senha incorretos | US-04 | — | A |
| 4 | Logout | US-05 | US-03 | A |
| 5 | Cadastro com e-mail já existente | US-02 | — | A |
| 8 | Todos os produtos e página de detalhe | US-07 | — | B — Catálogo |
| 9 | Buscar produto | US-08 | — | B |
| 10 | Assinatura na home | US-09 | — | C — Newsletter |
| 15 | Pedido: cadastro antes do checkout | US-10 | US-01, US-06 | D — Compra |
| 16 | Pedido: login antes do checkout | US-11 | US-03, US-06 | D |

---

## Épico A — Conta e Autenticação

### US-01 — Cadastrar nova conta (TC 1)
**Como** visitante, **quero** criar uma conta informando meus dados, **para** poder comprar e acompanhar pedidos.

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
Nota: e-mail único por execução. A exclusão ao final do TC 1 é a US-06.

### US-02 — Impedir cadastro com e-mail já existente (TC 5)
**Como** visitante, **quero** ser avisado quando o e-mail já tem conta, **para** não criar cadastro duplicado.

```gherkin
@TC05 @epico-conta
Cenário: Cadastro rejeitado para e-mail já registrado
  Dado que existe uma conta cadastrada com um e-mail conhecido
  E estou em "Signup / Login" vendo "New User Signup!"
  Quando informo um nome e esse e-mail e clico em "Signup"
  Então vejo o erro "Email Address already exist!"
```
Nota: a conta pré-existente é criada pelo próprio teste (UI ou API) e removida no fim.

### US-03 — Entrar com e-mail e senha válidos (TC 2)
**Como** cliente cadastrado, **quero** entrar com meu e-mail e senha, **para** acessar minha conta.

```gherkin
@TC02 @epico-conta
Cenário: Login com credenciais corretas
  Dado que tenho uma conta cadastrada
  E estou em "Signup / Login" vendo "Login to your account"
  Quando informo e-mail e senha corretos e clico em "login"
  Então vejo "Logged in as <nome>" no topo
```

### US-04 — Recusar login com credenciais inválidas (TC 3)
**Como** cliente, **quero** ser informado quando e-mail ou senha estão errados, **para** corrigir os dados sem acessar conta alheia.

```gherkin
@TC03 @epico-conta
Cenário: Login com e-mail e senha incorretos
  Dado que estou em "Signup / Login" vendo "Login to your account"
  Quando informo um e-mail e uma senha incorretos e clico em "login"
  Então vejo o erro "Your email or password is incorrect!"
```

### US-05 — Encerrar sessão (TC 4)
**Como** cliente autenticado, **quero** sair da minha conta, **para** proteger meus dados em um dispositivo compartilhado.

```gherkin
@TC04 @epico-conta
Cenário: Logout leva à página de login
  Dado que estou autenticado e vejo "Logged in as <nome>"
  Quando clico em "Logout"
  Então sou levado à página de login
```

### US-06 — Excluir a própria conta (apoio aos TC 1, 2, 15 e 16)
**Como** cliente autenticado, **quero** excluir minha conta, **para** remover meus dados do site.

```gherkin
@TC01 @TC02 @TC15 @TC16 @epico-conta
Cenário: Exclusão de conta
  Dado que estou autenticado
  Quando clico em "Delete Account"
  Então vejo "ACCOUNT DELETED!"
  Quando clico em "Continue"
  Então não estou mais autenticado
```
Nota: "não estou mais autenticado" NÃO está literal nos casos de teste; é suposição a confirmar no site.

---

## Épico B — Catálogo de Produtos

### US-07 — Consultar a lista de produtos e o detalhe de um produto (TC 8)
**Como** visitante, **quero** ver todos os produtos e abrir o detalhe de um deles, **para** decidir o que comprar.

```gherkin
@TC08 @epico-catalogo
Cenário: Lista de produtos e detalhe do primeiro item
  Dado que estou na home do site
  Quando clico em "Products"
  Então estou na página "ALL PRODUCTS"
  E a lista de produtos está visível
  Quando clico em "View Product" do primeiro produto
  Então estou na página de detalhe desse produto
  E vejo nome, categoria, preço, disponibilidade, condição e marca
```

### US-08 — Buscar produtos por nome (TC 9)
**Como** visitante, **quero** buscar um produto pelo nome, **para** encontrá-lo sem percorrer o catálogo inteiro.

```gherkin
@TC09 @epico-catalogo
Esquema do Cenário: Busca por nome de produto
  Dado que estou na página "ALL PRODUCTS"
  Quando digito "<termo>" no campo de busca e clico no botão de busca
  Então vejo o título "SEARCHED PRODUCTS"
  E vejo os produtos relacionados ao termo

  Exemplos:
    | termo |
    | (a definir) |
```

---

## Épico C — Newsletter

### US-09 — Assinar a newsletter pelo rodapé da home (TC 10)
**Como** visitante, **quero** assinar a newsletter pelo rodapé, **para** receber novidades do site.

```gherkin
@TC10 @epico-newsletter
Cenário: Assinatura com e-mail válido
  Dado que estou na home do site
  Quando rolo a página até o rodapé
  Então vejo o texto "SUBSCRIPTION"
  Quando informo um e-mail e clico no botão de seta
  Então vejo a mensagem "You have been successfully subscribed!"
```

---

## Épico D — Compra

### US-10 — Comprar logo após criar a conta (TC 15)
**Como** novo cliente, **quero** concluir um pedido logo depois do cadastro, **para** comprar sem precisar entrar de novo.

```gherkin
@TC15 @epico-compra
Cenário: Pedido com cadastro antes do checkout
  Dado que estou na home do site
  Quando acesso "Signup / Login" e concluo o cadastro (US-01)
  Então vejo "ACCOUNT CREATED!"
  Quando clico em "Continue"
  Então vejo "Logged in as <nome>" no topo
  Quando adiciono produtos ao carrinho e clico em "Cart"
  Então a página do carrinho é exibida
  Quando clico em "Proceed To Checkout"
  Então vejo os detalhes de endereço e a revisão do pedido
  Quando escrevo um comentário e clico em "Place Order"
  E informo nome no cartão, número, CVC e validade
  E clico em "Pay and Confirm Order"
  Então vejo "Your order has been placed successfully!"
  E excluo a conta (US-06)
```

### US-11 — Comprar após entrar com uma conta existente (TC 16)
**Como** cliente cadastrado, **quero** entrar e concluir um pedido, **para** comprar com os dados que já tenho no site.

```gherkin
@TC16 @epico-compra
Cenário: Pedido com login antes do checkout
  Dado que tenho uma conta cadastrada
  Quando acesso "Signup / Login", informo e-mail e senha e clico em "Login"
  Então vejo "Logged in as <nome>" no topo
  Quando adiciono produtos ao carrinho e clico em "Cart"
  Então a página do carrinho é exibida
  Quando clico em "Proceed To Checkout"
  Então vejo os detalhes de endereço e a revisão do pedido
  Quando escrevo um comentário e clico em "Place Order"
  E informo nome no cartão, número, CVC e validade
  E clico em "Pay and Confirm Order"
  Então vejo "Your order has been placed successfully!"
  E excluo a conta (US-06)
```
Nota: o TC 16 exclui a conta ao final; a conta do login não pode ser fixa e compartilhada. Cada execução cria a sua antes do login.

---

## Premissas transversais
- E-mail único por execução (timestamp/UUID). Nenhum usuário fixo.
- Cada teste cria a própria conta no setup e a remove no teardown. A página "API Testing" do site pode oferecer criação/exclusão de conta por API (a confirmar).
- Dados de cartão fictícios; os casos de teste não definem os valores.
- Testes independentes entre si.
- Anúncios e iframes podem cobrir botões em sites de prática (confiança média, verificar na execução real).

## Lacunas e perguntas em aberto
- US-08: qual termo de busca e o que é "produtos relacionados" (todo resultado contém o termo no nome, ou basta haver resultados?).
- US-10/11: quais e quantos produtos adicionar. Sugestão: dois itens, validando o carrinho antes do checkout.
- US-10/11: valores dos dados de cartão (fictícios).
- US-01: campos obrigatórios e valores de título, país e estado.
- US-04: cobrir também "e-mail inexistente" e "e-mail válido com senha errada"? Excede o caso original.
- US-05: como verificar "página de login" (candidato: título "Login to your account").
- US-06: estado após excluir a conta (suposição acima).
- O material "Perguntas e Respostas" do trabalho pode alterar escopo, ferramenta ou relatório.
