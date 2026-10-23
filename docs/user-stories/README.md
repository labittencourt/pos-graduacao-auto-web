# User Stories — Automation Exercise (TCs 1, 2, 3, 4, 5, 8, 9, 10, 15, 16)

Fonte: https://www.automationexercise.com/test_cases (lida em 22/10/2026).
Convenções: IDs `US-NN`; tags `@TCnn` (caso de origem) e `@epico-*`; critérios em Gherkin PT-BR.
Os critérios vêm só do texto dos casos de teste. O que o site não declara está nas lacunas de cada story.

Documento consolidado de origem: [automation-exercise-user-stories.md](../../automation-exercise-user-stories.md).

## Índice

| Story | Título | Épico |
| --- | --- | --- |
| [US-01](US-01-cadastrar-nova-conta.md) | Cadastrar nova conta | A |
| [US-02](US-02-impedir-cadastro-email-existente.md) | Impedir cadastro com e-mail já existente | A |
| [US-03](US-03-entrar-credenciais-validas.md) | Entrar com e-mail e senha válidos | A |
| [US-04](US-04-recusar-login-invalido.md) | Recusar login com credenciais inválidas | A |
| [US-05](US-05-encerrar-sessao.md) | Encerrar sessão | A |
| [US-06](US-06-excluir-propria-conta.md) | Excluir a própria conta | A |
| [US-07](US-07-lista-e-detalhe-de-produto.md) | Consultar a lista de produtos e o detalhe de um produto | B |
| [US-08](US-08-buscar-produtos.md) | Buscar produtos por nome | B |
| [US-09](US-09-assinar-newsletter.md) | Assinar a newsletter pelo rodapé da home | C |
| [US-10](US-10-comprar-apos-cadastro.md) | Comprar logo após criar a conta | D |
| [US-11](US-11-comprar-apos-login.md) | Comprar após entrar com uma conta existente | D |

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

## Premissas transversais

- E-mail único por execução (timestamp/UUID). Nenhum usuário fixo.
- Cada teste cria a própria conta no setup e a remove no teardown. A página "API Testing" do site pode oferecer criação/exclusão de conta por API (a confirmar).
- Dados de cartão fictícios; os casos de teste não definem os valores.
- Testes independentes entre si.
- Anúncios e iframes podem cobrir botões em sites de prática (confiança média, verificar na execução real).

## Lacuna geral

- O material "Perguntas e Respostas" do trabalho pode alterar escopo, ferramenta ou relatório.
