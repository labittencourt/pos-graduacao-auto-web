# Gate de qualidade — US-04 Recusar login com credenciais inválidas (TC 3)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-04-recusar-login-invalido.md](../../user-stories/US-04-recusar-login-invalido.md)

<details>
<summary>Test Case 3: Login User with incorrect email and password (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter incorrect email address and password
7. Click 'login' button
8. Verify error 'Your email or password is incorrect!' is visible

</details>

## Alerta de impacto (passo 0.5b)
Artefatos compartilhados com testes existentes: caixa de login (`[data-qa=login-*]`, TC02 e extras da US-03) e a mensagem "Your email or password is incorrect!" (observada na US-03, BUG-002). Não há mudança de comportamento, então nenhuma pergunta ao PO é gerada.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | AC consistente com o objetivo. |
| Completude | 7 | O AC é o caminho de erro (sem cap). Não define qual combinação é "incorreta" (e-mail inexistente, senha errada, as duas). A própria story deixa isso como lacuna. Falta o passo 3 (home). |
| Testabilidade | 9 | Mensagem exata e única. |

### Gate: **PASS**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | ambiguity | Completude | Medium | `Quando informo um e-mail e uma senha incorretos` | O TC 3 usa os dois incorretos (e-mail sem conta). Os casos "e-mail existente + senha errada" e "senha com caixa trocada" excedem o TC e já estão na lacuna da própria story. Viram extras. |
| F-02 | missing-criteria | Completude | Low | `Dado que estou em "Signup / Login" vendo "Login to your account"` | Passo 3 do TC (home), mesmo tratamento das US anteriores. |
| F-03 | missing-criteria | Completude | Low | `para corrigir os dados sem acessar conta alheia` | O benefício implica "não fica autenticado", mas nenhum AC verifica isso. Deriva-se do propósito. |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
