# BUG-007 — Assinatura da newsletter mostra sucesso sem enviar o e-mail

**Data:** 2026-10-22 · **US:** US-09 (extra CT-09-03) · **Severidade:** Medium · **Status:** Aberto (sistema de terceiros, sem expectativa de correção)

## Onde
Rodapé da home: `form.searchform` com `#susbscribe_email` e `#subscribe`; script `static/js/subscription.js`.

## Como reproduzir
1. Na home, rolar até o rodapé, informar um e-mail válido e clicar na seta.
2. Observar as requisições de rede (DevTools).

## Esperado
O e-mail é enviado ao site para registrar a assinatura. Oráculo: consistência com o propósito da US-09 ("para receber novidades do site") e com a própria mensagem ("You have been successfully subscribed!").

## Observado
- Nenhuma requisição com o e-mail é feita.
- O script cancela o envio no cliente e só alterna a mensagem:

```js
$(".searchform").on("submit", function() {
    $("#success-subscribe").removeClass('hide');
    setTimeout(function(){ $("#success-subscribe").addClass('hide'); document.getElementById("susbscribe_email").value = ''; }, 1500);
    return false;
});
```

- O campo `#susbscribe_email` não tem atributo `name`; mesmo sem o `return false`, o e-mail não iria no formulário.

## Evidência
- Código de `https://www.automationexercise.com/static/js/subscription.js` e marcação do rodapé (lidos em 2026-10-22).
- Sondagem com captura de rede: nenhuma requisição com o e-mail.

## Tratamento na suíte
Teste `US09-EXTRA Subscription sends the email to the site (BUG-007)` em `tests/newsletter.spec.ts`, em `test.fail()` (decisão do usuário, 2026-10-22).
