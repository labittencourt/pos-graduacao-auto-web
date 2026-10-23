# Gate de qualidade — US-03 Entrar com e-mail e senha válidos (TC 2)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-03-entrar-credenciais-validas.md](../../user-stories/US-03-entrar-credenciais-validas.md)

<details>
<summary>Test Case 2: Login User with correct email and password (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Delete Account' button
10. Verify that 'ACCOUNT DELETED!' is visible

</details>

## Alerta de impacto (passo 0.5b)
Artefatos compartilhados com testes existentes: "Signup / Login" (`a[href="/login"]`) e "Logged in as" (TC01, US-01); "Delete Account" e `[data-qa=account-deleted]` (TC01). A US-03 não altera comportamento, então nenhuma pergunta ao PO é gerada. O efeito é reaproveitar `NavBar`, `LoginPage` e `AccountStatusPage`.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | AC e objetivo consistentes. |
| Completude | 6 | **Cap (regra rígida):** nenhum AC de erro (os erros de login são da US-04). Além disso, os passos 3 (home) e 9–10 (excluir conta) do TC 2 não estão na story. |
| Testabilidade | 8 | "Login to your account" e "Logged in as" são verificáveis. `<nome>` resolvido pelo precedente DIV-02 (campo Name). |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | missing-criteria | Completude | Medium | `Então vejo "Logged in as <nome>" no topo` (fim do cenário) | Os passos 9–10 do TC 2 (Delete Account → "ACCOUNT DELETED!") só aparecem pela rastreabilidade (US-06). O teste do TC 2 precisa incluí-los para ser fiel ao caso. |
| F-02 | missing-criteria | Completude | Low | `E estou em "Signup / Login" vendo "Login to your account"` | O passo 3 (home visível) virou pré-condição. Mesmo tratamento das US-01 e US-02. |
| F-03 | ambiguity | Testabilidade | Low | `Dado que tenho uma conta cadastrada` | Meio de criação não definido. Precedente: API (US-02). |
| F-04 | ambiguity | Testabilidade | Low | `Então vejo "Logged in as <nome>"` | `<nome>` = campo Name (DIV-02). Para conta criada pela API, é o parâmetro `name` (confirmado ao vivo). |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
