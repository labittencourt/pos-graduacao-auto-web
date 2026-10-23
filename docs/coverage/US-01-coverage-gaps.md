# Casos recomendados para gaps — US-01

**Gerado em:** 2026-10-22 · **Agente:** /qa-acordo-cobertura (Passos 1 e 2)

Nenhum gap foi encontrado no relatório de cobertura: todo requisito já tem cenário em [test-scenarios.md](../analysis/US-01/test-scenarios.md). Por isso não há caso recomendado novo.

## Nível de verificação dos cenários existentes

| Cenário | Nível | Critério |
|---------|-------|----------|
| CT-01-01, CT-01-02, CT-01-03 | E2E de frontend | Dependem de navegação entre telas e do texto exibido no menu. A API não expõe "Logged in as". |
| CT-01-04 | Infra de teste | É uma propriedade da factory (e-mail único), observada nas rodadas paralelas. Não é um teste próprio. |
| CT-01-05, CT-01-06, CT-01-08, CT-01-09 (extras) | E2E de frontend | Validação nativa do navegador e atributos do formulário só são observáveis na UI. |
| Setup e teardown de conta | Contrato/API | `POST /api/createAccount` e `DELETE /api/deleteAccount` (verificados com curl). Servem de apoio, não como verificação da US-01, que exige o cadastro pela UI. |

## Recomendado para teste de unidade

Nenhum: o sistema é de terceiros, sem acesso ao código.
