# Gate de qualidade — US-05 Encerrar sessão (TC 4)

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda — Modo A · **Escopo:** Frontend · MEM-001
**Fonte da US:** [docs/user-stories/US-05-encerrar-sessao.md](../../user-stories/US-05-encerrar-sessao.md)

<details>
<summary>Test Case 4: Logout User (texto original, lido em 2026-10-22)</summary>

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Logout' button
10. Verify that user is navigated to login page

</details>

## Alerta de impacto (passo 0.5b)
Artefatos compartilhados: login (TC02, extras da US-03/US-04), "Logged in as" e menu do topo (TC01, TC02). O link "Logout" ainda não é exercitado por nenhum teste. Não há mudança de comportamento, então nenhuma pergunta ao PO é gerada.

## Resultado

| Dimensão | Nota | Justificativa |
|----------|-----:|---------------|
| Coerência | 9 | AC e objetivo consistentes. |
| Completude | 6 | **Cap (regra rígida):** nenhum AC de erro. Faltam os passos 3–8 do TC (home, login) como critérios, e nada diz que a sessão termina de fato, apesar de o benefício ser "proteger meus dados". |
| Testabilidade | 7 | "Sou levado à página de login" não tem oráculo definido; a própria story deixa isso como lacuna (candidato: "Login to your account"). |

### Gate: **CONDITIONAL**

## Findings

| ID | Categoria | Dimensão | Severidade | Trecho da US (verbatim) | Recomendação |
|----|-----------|----------|-----------|--------------------------|--------------|
| F-01 | untestable | Testabilidade | Medium | `Então sou levado à página de login` | Oráculo: URL `/login` + "Login to your account" visível (observado ao vivo). |
| F-02 | missing-criteria | Completude | Medium | `para proteger meus dados em um dispositivo compartilhado` | O benefício exige que a sessão termine ("Logged in as" some, e Voltar não restaura). Derivar do propósito. |
| F-03 | missing-criteria | Completude | Low | `Dado que estou autenticado e vejo "Logged in as <nome>"` | Os passos 3–8 do TC 4 (home → login) viram pré-condição. O teste do TC 4 os executa. |

## Requer decisão humana
Nenhuma bloqueante (MEM-001).
