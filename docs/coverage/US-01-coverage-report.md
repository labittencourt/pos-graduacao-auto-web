# Relatório de cobertura — US-01 Cadastrar nova conta (TC 1)

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura (Passo 1) · **Fontes:** [gate](../analysis/US-01/gate.md), [cenários](../analysis/US-01/test-scenarios.md), [engenharia reversa](../reverse/cadastro-conta-us-reversa.md)

## Decomposição por categoria

| Categoria | Dimensão RST | Requisitos | Cobertos por cenário | % |
|-----------|--------------|-----------:|---------------------:|--:|
| Happy Path | Contrato/Promessa | 6 | 6 | 100% |
| Edge Cases | Limites | 1 | 1 | 100% |
| Error Handling | Tratamento de erro | 2 | 2 | 100% |
| Security | Autorização entre perfis (+ Consistência interna) | 2 | 2 | 100% |
| Performance | Determinismo | 1 | 1 | 100% |
| UX Variations | Consistência cruzada | 1 | 1 | 100% |
| **Total** | | **13** | **13** | **100%** |

## Matriz de rastreabilidade

| ID | Requisito | Categoria | Origem | Cenário(s) | Nível |
|----|-----------|-----------|--------|------------|-------|
| R-01 | Home exibida ao iniciar | Happy Path | TC 1 passo 3 (suposição do QA Q04) | CT-01-01 / RV-01 | E2E |
| R-02 | "New User Signup!" visível em Signup / Login | Happy Path | AC1 | CT-01-01 | E2E |
| R-03 | Signup com e-mail inédito leva a "Enter Account Information" | Happy Path | AC2 | CT-01-01 | E2E |
| R-04 | Criação com todos os campos leva a "Account Created!" | Happy Path | AC3 | CT-01-01 | E2E |
| R-05 | "Continue" leva a "Logged in as `<Name>`" | Happy Path | AC4 + DIV-02 | CT-01-01, CT-01-02 / RV-03 | E2E |
| R-06 | "Delete Account" leva a "Account Deleted!" e encerra a sessão | Happy Path | TC 1 passos 17–18, US-06 | CT-01-01 / RV-04 | E2E |
| R-07 | E-mail do signup preservado e bloqueado | Edge Cases | DIV-01 | CT-01-03 / RV-02 | E2E |
| R-08 | Campo obrigatório vazio recusado | Error Handling | gate (Completude) | CT-01-05 (extra) | E2E |
| R-09 | E-mail mal formado recusado no signup | Error Handling | gate (Completude) | CT-01-06 (extra) | E2E |
| R-10 | Senha mascarada | Security | norma externa | CT-01-08 (extra) | E2E |
| R-11 | Exclusão sem confirmação | Security | engenharia reversa | RV-07 (manual) | Manual |
| R-12 | E-mails únicos em execução paralela | Performance | premissa transversal | CT-01-04 | Infra de teste (factory) |
| R-13 | Formulário sem violação WCAG crítica | UX Variations | norma externa | CT-01-09 (extra) | E2E |

Observação: R-07 entrou em Edge Cases porque é o comportamento de um campo em estado incomum (desabilitado). Nome de borda (CT-01-07) fica como charter exploratório, não como requisito, porque não há oráculo de limite (`[ORÁCULO AUSENTE]`).

## Gaps

Nenhum gap: todo requisito tem ao menos um cenário. A decisão em aberto é **quais cenários extras viram automação** (R-08, R-09, R-10, R-13). Ela está no acordo de escopo.

## Requisitos assumidos a verificar

- R-01 (home visível) — suposição do QA Q04, porque o passo do TC virou pré-condição na story.

## Fora de escopo (não é gap)

- **Entrega de e-mail da newsletter ou das ofertas ao marcar as opções:** não é verificável na camada de UI; depende de provedor de e-mail externo.
- **Persistência dos dados de endereço:** a US-01 não verifica isso. A checagem "detalhes de endereço" pertence às US-10 e US-11 (checkout).
