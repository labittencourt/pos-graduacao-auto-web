# BUG-003 — Senha digitada é devolvida no HTML após login inválido

**Data:** 2026-10-22 · **US:** US-04 (extra CT-04-04) · **Severidade:** Medium (segurança) · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
`POST https://www.automationexercise.com/login`, caixa "Login to your account".

## Como reproduzir
1. Em `/login`, informar um e-mail sem conta e a senha `SecretProbe!987`.
2. Clicar em "Login".
3. Ver o HTML da resposta (código-fonte da página).

## Esperado
O campo de senha volta vazio e a senha não aparece em nenhum lugar da resposta. Oráculo: norma externa (OWASP: nunca repreencher campos de senha, para que a credencial não fique no código-fonte, no cache do navegador ou em proxies).

## Observado
A resposta (HTTP 200) contém:

```html
<input type="password" data-qa="login-password" placeholder="Password" name="password" value="SecretProbe!987" required/>
```

Controle: antes do envio, o atributo `value` estava vazio, e continuou vazio depois do `fill()` sem envio. Portanto o valor vem do servidor, não da automação.

## Evidência
- Sondagem ao vivo em 2026-10-22 (script exploratório capturando o corpo da resposta do POST).
- Teste `US04-EXTRA Password is not echoed back after failed login (BUG-003)` em `tests/conta.spec.ts`.

## Tratamento na suíte
O teste afirma o comportamento correto e está em `test.fail()` (decisão do usuário, 2026-10-22), no mesmo formato dos BUG-001 e BUG-002.
