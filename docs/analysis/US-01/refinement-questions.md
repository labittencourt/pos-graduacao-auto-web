# Perguntas de refinamento — US-01 Cadastrar nova conta (TC 1)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Modo A, Passo 2) · **Escopo:** Frontend

Coluna "Como resolver": **Observar** = a resposta vem do site real (Fase 3, engenharia reversa), sem decisão sua; **Decidir** = escolha sua, porque muda o que é testado.

## Lote 1 (ordenado por criticidade)

| ID | Pergunta | Trecho da US que originou | Risco mitigado | Como resolver |
|----|----------|---------------------------|----------------|---------------|
| Q01 | Qual valor aparece em "Logged in as `<nome>`": o nome digitado no "New User Signup!", o campo Name do formulário ou o First name? | `Então vejo "Logged in as <nome>" no topo` | Oráculo errado: o teste passa ou falha pelo motivo errado se os três nomes forem iguais nos dados de teste. | Observar (usar três valores diferentes para descobrir) |
| Q02 | Quais valores usar para título, data de nascimento, país e estado? Quais campos são obrigatórios? | `Quando preencho título, nome, e-mail, senha e data de nascimento` | Cadastro falhar por campo obrigatório não preenchido, ou dado escolhido não existir nas opções do site. | Observar (opções e obrigatoriedade) + Decidir (valores) |
| Q03 | No formulário "ENTER ACCOUNT INFORMATION", o e-mail vem pré-preenchido/bloqueado, ou precisa ser digitado de novo? | `Quando preencho título, nome, e-mail, senha e data de nascimento` | Teste tentar digitar em campo bloqueado, ou não verificar que o e-mail do signup foi mantido. | Observar |
| Q04 | O passo 3 do TC 1 ("Verify that home page is visible successfully") entra como critério? Se sim, o que prova que a home está visível? | `Dado que estou na home do site` | Perder uma checagem que o caso original exige (rastreabilidade incompleta), ou usar um oráculo frágil. | Decidir |
| Q05 | As checagens das opções devem usar os rótulos literais do TC ('Sign up for our newsletter!', 'Receive special offers from our partners!')? | `E marco as opções de newsletter e ofertas de parceiros` | Marcar a caixa errada sem perceber. | Decidir |
| Q06 | A US-01 deve cobrir caminhos de erro (campo obrigatório vazio, e-mail inválido no signup) além do TC 1? | (ausência: nenhum AC de erro) | Completude da story; escopo do trabalho (o prompt pede para não mudar o escopo dos TCs). | Decidir |
| Q07 | Há restrição de formato para o e-mail gerado (domínio, tamanho)? | `Quando informo nome e um e-mail ainda não cadastrado` | Colisão entre execuções paralelas; uso acidental de domínio real. | Decidir |
| Q08 | Se o teste falhar antes da exclusão (passos 17–18), como a conta é removida? | `Nota: e-mail único por execução. A exclusão ao final do TC 1 é a US-06.` | Acúmulo de contas no site compartilhado; teardown não garantido. | Decidir + Observar (API de exclusão) |
| Q09 | Existe regra de senha (tamanho mínimo, caracteres)? | `Quando preencho título, nome, e-mail, senha` | Cadastro recusado por senha gerada fora da regra. | Observar |
| Q10 | Os textos de checagem ("ENTER ACCOUNT INFORMATION", "ACCOUNT CREATED!") devem bater exatamente como no TC, inclusive maiúsculas? | `Então vejo "ENTER ACCOUNT INFORMATION"` / `Então vejo "ACCOUNT CREATED!"` | Falso negativo se o site exibe em maiúsculas via estilo e o texto real for diferente. | Observar |
