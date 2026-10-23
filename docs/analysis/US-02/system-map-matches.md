# Mapa do Sistema — correspondências para US-02

**Consultado em:** 2026-10-22
**Fonte:** docs/system-map.md

| Artefato buscado | Tipo | Encontrado em (ID · título do teste) | US · fluxo |
|------------------|------|---------------------------------------|------------|
| "Signup / Login" (`a[href="/login"]`) | elemento UI | TC01 · Register User | US-01 · Cadastro |
| "New User Signup!" | elemento UI | TC01 · Register User | US-01 · Cadastro |
| `[data-qa=signup-name]`, `[data-qa=signup-email]`, `[data-qa=signup-button]` | elemento UI | TC01 · Register User; US01-EXTRA · Required field empty blocks account creation; US01-EXTRA · Malformed email blocks signup; US01-EXTRA · Password field is masked; US01-EXTRA · Account form has no critical a11y violations | US-01 · Cadastro |
| e-mail único no signup | regra | TC01 · Register User (e-mail inédito avança para o formulário) | US-01 · Cadastro |

**Leitura:** a US-02 exercita a mesma caixa de signup da US-01, no caminho oposto (e-mail existente). Não há mudança de comportamento, só um novo caminho. A pergunta de impacto ("as mudanças se aplicam aos outros fluxos?") não se aplica a uma story que não altera nada. Pela MEM-001, não há rodada com o PO. O efeito prático é reaproveitar o `LoginPage` sem duplicar seletores.
