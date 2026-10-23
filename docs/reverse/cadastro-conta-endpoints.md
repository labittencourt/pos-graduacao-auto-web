## Endpoints Capturados — Cadastro de conta

**Tela analisada:** Cadastro de conta (signup → criação → exclusão)
**URL observada:** https://www.automationexercise.com
**Data da captura:** 2026-10-22

O fluxo de UI não usa XHR/Fetch próprio: são navegações e submissões de formulário com página inteira. As linhas da API vêm da página "API Testing" (`/api_list`) e foram exercitadas com curl, com dados fictícios.

| Método | Endpoint | Ação que disparou | Autenticação | Payload (estrutura) | Response (estrutura) | Status |
|--------|----------|-------------------|--------------|--------------------|--------------------|--------|
| POST | /signup | clicar "Signup" | cookie de sessão + csrfmiddlewaretoken | form: name, email, form_type | HTML do formulário de conta | 200 |
| POST | /signup | clicar "Create Account" | cookie + csrf | form: title, name, email_address, password, days, months, years, newsletter, optin, first_name, last_name, company, address1, address2, country, state, city, zipcode, mobile_number, form_type=create_account | redirect `/account_created` | 302 → 200 |
| GET | /delete_account | clicar "Delete Account" | cookie de sessão | — | HTML "Account Deleted!" | 200 |
| POST | /api/createAccount | curl (API 11) | nenhuma | form: name, email, password, title, birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number | `{responseCode: 201, message: "User created!"}` | HTTP 200 |
| GET | /api/getUserDetailByEmail | curl (API 14) | nenhuma | query: email | `{responseCode: 200, user: {id, name, email, title, birth_day, ..., zipcode}}` ou `{responseCode: 404, message}` | HTTP 200 |
| DELETE | /api/deleteAccount | curl (API 12) | nenhuma | form: email, password | `{responseCode: 200, message: "Account deleted!"}`; senha errada → `{responseCode: 404, message: "Account not found!"}` | HTTP 200 |

### Observações de rede
- A API devolve **HTTP 200 sempre**. O sucesso ou erro real vem em `responseCode` no corpo JSON.
- `deleteAccount` exige e-mail e senha corretos, então o teardown precisa guardar a senha usada.
- Os status 302/200 da UI vêm do comportamento observado (POST seguido da página de destino). Não foram capturados header a header, porque `browser_network_requests` lista só XHR/Fetch por padrão.
