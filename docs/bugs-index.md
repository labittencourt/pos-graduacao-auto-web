# Índice de Bugs e Claims

Fonte única de verdade para o **status atual** de cada bug e claim encontrado pelos testes automatizados. Os arquivos `bug-report-*.md` continuam existindo como registro histórico da investigação (como reproduzir, evidências, raciocínio) — mas para saber "isso está aberto, corrigido ou aceito hoje?", a resposta é sempre esta tabela, não os relatórios individuais.

**Ao fechar/aceitar um bug ou claim**: atualize o Status aqui. Não precisa editar o `bug-report-*.md` original.
**Ao abrir um novo bug/claim**: adicione uma linha aqui e confira o próximo ID livre antes de criar o relatório.
**Ao descobrir que um bug era falso positivo**: não apague a linha — mude o Status para
`Invalidado (<data>) — <causa raiz em uma frase>` e mantenha o texto riscado (`~~...~~`).
É histórico de investigação, não lixo: evita que a mesma dúvida seja reinvestigada do zero
(ex: uma ferramenta de inspeção que deu falso-negativo numa investigação anterior).

## Bugs funcionais

| ID | Resumo | Severidade | Status | Teste(s) | Fonte |
|----|--------|-----------|--------|----------|-------|
| BUG-001 | Formulário de conta (`/signup`): Zipcode sem label e selects de data de nascimento sem nome acessível (axe `label`, `select-name`, críticos) | Medium | Aberto — terceiro, teste em `test.fail()` | tests/conta.spec.ts — `US01-EXTRA Account form has no critical a11y violations (BUG-001)` | [bug-report-2026-10-22-a11y-formulario-conta.md](bug-report-2026-10-22-a11y-formulario-conta.md) |
| BUG-002 | E-mail comparado diferenciando maiúsculas, inclusive no domínio: `x@DOMINIO` cria uma segunda conta para a mesma caixa postal | Medium | Aberto — terceiro, teste em `test.fail()` | tests/conta.spec.ts — `US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002)`, `US03-EXTRA Login accepts email with uppercase domain (BUG-002)` | [bug-report-2026-10-22-email-case-sensitive.md](bug-report-2026-10-22-email-case-sensitive.md) |
| BUG-003 | Login inválido devolve a senha digitada no HTML (`value` do campo de senha) | Medium | Aberto — terceiro, teste em `test.fail()` | tests/conta.spec.ts — `US04-EXTRA Password is not echoed back after failed login (BUG-003)` | [bug-report-2026-10-22-senha-devolvida-no-html.md](bug-report-2026-10-22-senha-devolvida-no-html.md) |
| BUG-004 | `/delete_account` acessado sem sessão exibe "Account Deleted!" sem excluir nada (confirmação falsa) | Low | Aberto — terceiro, teste em `test.fail()` | tests/conta.spec.ts — `US05-EXTRA Delete account page without session does not claim deletion (BUG-004)` | [bug-report-2026-10-22-delete-account-sem-sessao.md](bug-report-2026-10-22-delete-account-sem-sessao.md) |
| BUG-005 | Produto inexistente (`/product_details/99999`) responde 200 com dados vazios, mas "In Stock", "New" e "Add to cart" | Low | Aberto — terceiro, teste em `test.fail()` | tests/catalogo.spec.ts — `US07-EXTRA Nonexistent product is not offered for sale (BUG-005)` | [bug-report-2026-10-22-produto-inexistente.md](bug-report-2026-10-22-produto-inexistente.md) |
| BUG-006 | Busca não ignora espaços à esquerda: " Top" traz 12 em vez de 14 e "  Top" traz 0 (oráculo: convenção de mercado) | Low | Aberto — terceiro, teste em `test.fail()` | tests/catalogo.spec.ts — `US08-EXTRA Search ignores leading spaces (BUG-006)` | [bug-report-2026-10-22-busca-sem-trim.md](bug-report-2026-10-22-busca-sem-trim.md) |
| BUG-007 | Newsletter: "You have been successfully subscribed!" aparece sem enviar o e-mail (envio cancelado no cliente, campo sem `name`) | Medium | Aberto — terceiro, teste em `test.fail()` | tests/newsletter.spec.ts — `US09-EXTRA Subscription sends the email to the site (BUG-007)` | [bug-report-2026-10-22-newsletter-nao-envia.md](bug-report-2026-10-22-newsletter-nao-envia.md) |

## Padrões aceitos (não reportar como bug novo)

Decisões do time sobre categorias inteiras de achado — não é pra cada ocorrência nova virar
um BUG-ID novo, só citar o padrão aqui. Normalmente nasce de um bug invalidado acima cuja
causa raiz pode se repetir (ex: uma limitação conhecida de uma ferramenta de teste, um
comportamento intencional que parece bug à primeira vista).

| Padrão | Decisão | Desde | Referência |
|--------|---------|-------|------------|

## Claims (comportamento documentado vs realidade)

Oráculo Claims do Bolton aplicado ao frontend: qualquer afirmação que o
produto faz sobre si mesmo (texto de ajuda, tooltip, documentação de
design, regra de negócio descrita em US) e que os testes confirmam ou
derrubam. Não depende de um spec formal (Swagger) como no stack de API.

| ID | Resumo | Severidade | Status | Fonte |
|----|--------|-----------|--------|-------|

## Pendências abertas para o time de desenvolvimento

_(nenhuma ainda — preencher conforme bugs abertos surgirem, ordenado por prioridade)_
