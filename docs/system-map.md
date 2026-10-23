# Mapa do Sistema — pos-graduacao-auto-web

**Gerado/atualizado por:** /qa-implementacao-teste, /qa-manutencao-suite,
/qa-reconstrucao-mapa — não edite manualmente.

Fonte única de verdade sobre o que o projeto de testes já exercita,
organizada por teste: uma seção `## <TC-ID> · <título>` por teste
implementado. Para saber "quem usa o artefato X?", busque a string X neste
arquivo e colete os títulos `##` das seções onde ela aparece.

Para consultar: `/qa-analise-demanda` e `/qa-analise-impacto` fazem busca
por artefato neste arquivo ao analisar novas USs.
Para reconstruir do zero a partir dos testes existentes: `/qa-reconstrucao-mapa`.

Formato de cada seção (as seis chaves são obrigatórias; use `—` quando vazio):

```
## TC-XXX · <título do teste>
- **US:** <ID> · <título da US>
- **Endpoints:** <MÉTODO /path>, ... ou —
- **Campos:** <campo (request)>, <campo (response)>, ... ou —
- **Regras:** <regra 1>; <regra 2> ou —
- **Elementos UI:** <elemento (contexto de tela)>, ... ou —
- **Atualizado:** <YYYY-MM-DD>
```

---

## TC01 · Register User
- **US:** US-01 · Cadastrar nova conta (TC 1)
- **Endpoints:** POST /signup (UI), GET /delete_account (UI), GET /api/getUserDetailByEmail (prova de exclusão), DELETE /api/deleteAccount (teardown)
- **Campos:** name, email, password, title, days, months, years, newsletter, optin, first_name, last_name, company, address1, address2, country, state, city, zipcode, mobile_number (request); email (request, teardown API)
- **Regras:** e-mail do signup preservado e bloqueado no formulário de conta; "Logged in as" exibe o campo Name; exclusão de conta encerra a sessão
- **Elementos UI:** logo e #slider (home); a[href="/login"], a[href="/delete_account"], "Logged in as" (menu do topo); heading "New User Signup!", [data-qa=signup-name], [data-qa=signup-email], [data-qa=signup-button] (/login); heading "Enter Account Information", #id_gender1, [data-qa=name], [data-qa=email], [data-qa=password], [data-qa=days], [data-qa=months], [data-qa=years], label "Sign up for our newsletter!", label "Receive special offers from our partners!", [data-qa=first_name], [data-qa=last_name], [data-qa=company], [data-qa=address], [data-qa=address2], [data-qa=country], [data-qa=state], [data-qa=city], [data-qa=zipcode], [data-qa=mobile_number], [data-qa=create-account] (/signup); [data-qa=account-created], [data-qa=account-deleted], [data-qa=continue-button] (/account_created, /delete_account)
- **Atualizado:** 2026-10-22

## US01-EXTRA · Required field empty blocks account creation
- **US:** US-01 · Cadastrar nova conta (TC 1)
- **Endpoints:** POST /signup (UI), GET /api/getUserDetailByEmail, DELETE /api/deleteAccount (teardown)
- **Campos:** password (request, vazio); email (request, consulta API); responseCode (response)
- **Regras:** campos obrigatórios do cadastro (atributo required) — senha vazia bloqueia o envio
- **Elementos UI:** [data-qa=password], [data-qa=create-account] (/signup); [data-qa=signup-name], [data-qa=signup-email], [data-qa=signup-button] (/login)
- **Atualizado:** 2026-10-22

## US01-EXTRA · Malformed email blocks signup
- **US:** US-01 · Cadastrar nova conta (TC 1)
- **Endpoints:** —
- **Campos:** email (request, sem "@")
- **Regras:** e-mail mal formado não avança o signup (validação nativa type=email)
- **Elementos UI:** [data-qa=signup-name], [data-qa=signup-email], [data-qa=signup-button] (/login); heading "Enter Account Information" (/signup, ausente)
- **Atualizado:** 2026-10-22

## US01-EXTRA · Password field is masked
- **US:** US-01 · Cadastrar nova conta (TC 1)
- **Endpoints:** POST /signup (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** password (request)
- **Regras:** senha não exibida em texto aberto
- **Elementos UI:** [data-qa=password] (/signup)
- **Atualizado:** 2026-10-22

## US01-EXTRA · Account form has no critical a11y violations (BUG-001)
- **US:** US-01 · Cadastrar nova conta (TC 1)
- **Endpoints:** POST /signup (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** —
- **Regras:** formulário de conta sem violação WCAG crítica (falha esperada — BUG-001)
- **Elementos UI:** form[action="/signup"], #zipcode, #days, #months, #years (/signup)
- **Atualizado:** 2026-10-22

## TC05 · Register User with existing email
- **US:** US-02 · Impedir cadastro com e-mail já existente (TC 5)
- **Endpoints:** POST /api/createAccount (setup), POST /signup (UI), GET /api/getUserDetailByEmail, DELETE /api/deleteAccount (teardown)
- **Campos:** name, email (request); name (response, conta original)
- **Regras:** signup com e-mail já registrado é recusado com "Email Address already exist!"; a conta original não é alterada
- **Elementos UI:** logo e #slider (home); a[href="/login"] (menu do topo); heading "New User Signup!", [data-qa=signup-name], [data-qa=signup-email], [data-qa=signup-button], form:has([data-qa=signup-button]) p (/login, /signup após POST); heading "Enter Account Information" (ausente)
- **Atualizado:** 2026-10-22

## US02-EXTRA · Email with uppercase domain is recognized as existing (BUG-002)
- **US:** US-02 · Impedir cadastro com e-mail já existente (TC 5)
- **Endpoints:** POST /api/createAccount (setup), POST /signup (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email (request, domínio em maiúsculas)
- **Regras:** domínio do e-mail não diferencia maiúsculas (RFC 5321) — falha esperada, BUG-002
- **Elementos UI:** [data-qa=signup-name], [data-qa=signup-email], [data-qa=signup-button], form:has([data-qa=signup-button]) p (/login)
- **Atualizado:** 2026-10-22

## TC02 · Login User with correct email and password
- **US:** US-03 · Entrar com e-mail e senha válidos (TC 2)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /delete_account (UI), GET /api/getUserDetailByEmail (prova de exclusão), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request)
- **Regras:** login válido redireciona para a home autenticado; "Logged in as" exibe o name da conta; exclusão de conta pela UI
- **Elementos UI:** logo e #slider (home); a[href="/login"], "Logged in as", a[href="/delete_account"] (menu do topo); heading "Login to your account", [data-qa=login-email], [data-qa=login-password], [data-qa=login-button] (/login); [data-qa=account-deleted] (/delete_account)
- **Atualizado:** 2026-10-22

## US03-EXTRA · Session persists when navigating
- **US:** US-03 · Entrar com e-mail e senha válidos (TC 2)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /products (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request)
- **Regras:** sessão mantida ao navegar para outra página
- **Elementos UI:** [data-qa=login-email], [data-qa=login-password], [data-qa=login-button] (/login); a[href="/products"], "Logged in as" (menu do topo)
- **Atualizado:** 2026-10-22

## US03-EXTRA · Login accepts email with uppercase domain (BUG-002)
- **US:** US-03 · Entrar com e-mail e senha válidos (TC 2)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email (request, domínio em maiúsculas), password (request)
- **Regras:** domínio do e-mail não diferencia maiúsculas (RFC 5321) — falha esperada, BUG-002
- **Elementos UI:** [data-qa=login-email], [data-qa=login-password], [data-qa=login-button] (/login); "Logged in as" (menu do topo)
- **Atualizado:** 2026-10-22

## TC03 · Login User with incorrect email and password
- **US:** US-04 · Recusar login com credenciais inválidas (TC 3)
- **Endpoints:** POST /login (UI)
- **Campos:** email, password (request)
- **Regras:** falha de login mostra "Your email or password is incorrect!", mantém em /login e não autentica
- **Elementos UI:** logo e #slider (home); a[href="/login"], "Logged in as" (menu do topo, ausente); heading "Login to your account", [data-qa=login-email], [data-qa=login-password], [data-qa=login-button], form:has([data-qa=login-button]) p (/login)
- **Atualizado:** 2026-10-22

## US04-EXTRA · Wrong password for existing email shows the same generic error
- **US:** US-04 · Recusar login com credenciais inválidas (TC 3)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request, senha errada)
- **Regras:** mensagem genérica de falha de login, sem enumeração de contas
- **Elementos UI:** [data-qa=login-email], [data-qa=login-password], [data-qa=login-button], form:has([data-qa=login-button]) p (/login); "Logged in as" (ausente)
- **Atualizado:** 2026-10-22

## US04-EXTRA · Password is case-sensitive
- **US:** US-04 · Recusar login com credenciais inválidas (TC 3)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request, em maiúsculas)
- **Regras:** senha diferencia maiúsculas
- **Elementos UI:** [data-qa=login-email], [data-qa=login-password], [data-qa=login-button], form:has([data-qa=login-button]) p (/login); "Logged in as" (ausente)
- **Atualizado:** 2026-10-22

## US04-EXTRA · Password is not echoed back after failed login (BUG-003)
- **US:** US-04 · Recusar login com credenciais inválidas (TC 3)
- **Endpoints:** POST /login (UI, corpo da resposta inspecionado)
- **Campos:** email, password (request); HTML da resposta (response)
- **Regras:** senha não volta preenchida no HTML após falha — falha esperada, BUG-003
- **Elementos UI:** [data-qa=login-email], [data-qa=login-password], [data-qa=login-button], form:has([data-qa=login-button]) p (/login)
- **Atualizado:** 2026-10-22

## TC04 · Logout User
- **US:** US-05 · Encerrar sessão (TC 4)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /logout (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request)
- **Regras:** logout leva a /login com "Login to your account" e encerra a sessão
- **Elementos UI:** logo e #slider (home); a[href="/login"], a[href="/logout"], "Logged in as" (menu do topo); heading "Login to your account", [data-qa=login-email], [data-qa=login-password], [data-qa=login-button] (/login)
- **Atualizado:** 2026-10-22

## US05-EXTRA · Browser back after logout does not restore the session
- **US:** US-05 · Encerrar sessão (TC 4)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /logout (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request)
- **Regras:** Voltar no navegador após logout não restaura a sessão
- **Elementos UI:** [data-qa=login-email], [data-qa=login-password], [data-qa=login-button] (/login); a[href="/logout"], a[href="/login"], "Logged in as" (menu do topo)
- **Atualizado:** 2026-10-22

## US05-EXTRA · Delete account page without session does not claim deletion (BUG-004)
- **US:** US-05 · Encerrar sessão (TC 4)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /logout (UI), GET /delete_account (UI, sem sessão), GET /api/getUserDetailByEmail, DELETE /api/deleteAccount (teardown)
- **Campos:** email (request, consulta API)
- **Regras:** sem sessão, a conta não é excluída e a página não afirma exclusão — falha esperada, BUG-004
- **Elementos UI:** [data-qa=account-deleted] (/delete_account, deveria estar ausente)
- **Atualizado:** 2026-10-22

## TC08 · Verify All Products and product detail page
- **US:** US-07 · Lista de produtos e detalhe (TC 8)
- **Endpoints:** GET /products (UI), GET /product_details/{id} (UI)
- **Campos:** —
- **Regras:** "View Product" abre o detalhe do mesmo produto (nome e preço iguais); os seis dados do detalhe têm valor
- **Elementos UI:** logo e #slider (home); a[href="/products"] (menu do topo); .features_items h2.title, .features_items .product-image-wrapper, .productinfo p, .productinfo h2, a[href^="/product_details/"] (/products); .product-information h2, .product-information span > span, p "Category:", p "Availability:", p "Condition:", p "Brand:" (/product_details/{id})
- **Atualizado:** 2026-10-22

## US07-EXTRA · Every listed product is complete with a unique detail link
- **US:** US-07 · Lista de produtos e detalhe (TC 8)
- **Endpoints:** GET /products (UI)
- **Campos:** —
- **Regras:** todo item tem nome, preço "Rs. N" e link /product_details/{id} exclusivo
- **Elementos UI:** .features_items .product-image-wrapper, .productinfo p, .productinfo h2, a[href^="/product_details/"] (/products)
- **Atualizado:** 2026-10-22

## US07-EXTRA · Nonexistent product is not offered for sale (BUG-005)
- **US:** US-07 · Lista de produtos e detalhe (TC 8)
- **Endpoints:** GET /product_details/99999 (UI)
- **Campos:** —
- **Regras:** produto inexistente não é oferecido para compra — falha esperada, BUG-005
- **Elementos UI:** .product-information button.cart, p "Availability:" (/product_details/{id})
- **Atualizado:** 2026-10-22

## TC09 · Search Product
- **US:** US-08 · Buscar produtos por nome (TC 9)
- **Endpoints:** GET /products (UI), GET /products?search={termo} (UI), GET /product_details/{id} (UI, resultados por categoria)
- **Campos:** search (request, "Top")
- **Regras:** a busca retorna produtos com o termo no nome ou na categoria, sem diferenciar maiúsculas; nenhum produto com o termo no nome fica de fora
- **Elementos UI:** logo e #slider (home); a[href="/products"] (menu do topo); #search_product, #submit_search, .features_items h2.title, .features_items .product-image-wrapper, .productinfo p, a[href^="/product_details/"] (/products); p "Category:" (/product_details/{id})
- **Atualizado:** 2026-10-22

## US08-EXTRA · Search is case-insensitive
- **US:** US-08 · Buscar produtos por nome (TC 9)
- **Endpoints:** GET /products?search={termo} (UI)
- **Campos:** search (request, "Top", "top", "TOP")
- **Regras:** a busca não diferencia maiúsculas
- **Elementos UI:** #search_product, #submit_search, .features_items h2.title, a[href^="/product_details/"] (/products)
- **Atualizado:** 2026-10-22

## US08-EXTRA · Search with no match shows no products
- **US:** US-08 · Buscar produtos por nome (TC 9)
- **Endpoints:** GET /products?search={termo} (UI)
- **Campos:** search (request, termo inexistente)
- **Regras:** termo sem correspondência mostra "SEARCHED PRODUCTS" e nenhum produto
- **Elementos UI:** #search_product, #submit_search, .features_items h2.title, .features_items .product-image-wrapper (/products)
- **Atualizado:** 2026-10-22

## US08-EXTRA · Search ignores leading spaces (BUG-006)
- **US:** US-08 · Buscar produtos por nome (TC 9)
- **Endpoints:** GET /products?search={termo} (UI)
- **Campos:** search (request, " Top")
- **Regras:** espaços à esquerda ignorados (convenção de mercado) — falha esperada, BUG-006
- **Elementos UI:** #search_product, #submit_search, .features_items h2.title, a[href^="/product_details/"] (/products)
- **Atualizado:** 2026-10-22

## TC10 · Verify Subscription in home page
- **US:** US-09 · Assinar a newsletter pelo rodapé (TC 10)
- **Endpoints:** — (o envio é cancelado no cliente, BUG-007)
- **Campos:** e-mail digitado em #susbscribe_email (não enviado)
- **Regras:** "SUBSCRIPTION" no rodapé; mensagem de sucesso visível por 1,5 s após o envio
- **Elementos UI:** logo e #slider (home); #footer h2, #susbscribe_email, #subscribe, #success-subscribe (rodapé)
- **Atualizado:** 2026-10-22

## US09-EXTRA · Malformed email is not subscribed
- **US:** US-09 · Assinar a newsletter pelo rodapé (TC 10)
- **Endpoints:** —
- **Campos:** e-mail sem "@" (#susbscribe_email)
- **Regras:** e-mail mal formado é bloqueado pela validação nativa; sem mensagem de sucesso
- **Elementos UI:** #susbscribe_email, #subscribe, #success-subscribe (rodapé)
- **Atualizado:** 2026-10-22

## US09-EXTRA · Subscription sends the email to the site (BUG-007)
- **US:** US-09 · Assinar a newsletter pelo rodapé (TC 10)
- **Endpoints:** (qualquer requisição contendo o e-mail — nenhuma observada)
- **Campos:** e-mail (#susbscribe_email)
- **Regras:** a assinatura envia o e-mail ao site — falha esperada, BUG-007
- **Elementos UI:** #susbscribe_email, #subscribe, #success-subscribe (rodapé)
- **Atualizado:** 2026-10-22

## TC15 · Place Order: Register before Checkout
- **US:** US-10 · Comprar logo após criar a conta (TC 15)
- **Endpoints:** POST /signup (UI), GET /view_cart, GET /checkout, POST /payment (UI), GET /payment_done/{total}, GET /delete_account (UI), GET /api/getUserDetailByEmail (prova de exclusão), DELETE /api/deleteAccount (teardown)
- **Campos:** dados de cadastro (request); comentário `message`; name_on_card, card_number, cvc, expiry_month, expiry_year (request)
- **Regras:** carrinho com os produtos e preços da home; endereço do checkout = cadastro; total = soma; mensagem de sucesso no envio; "Order Placed!" na página final
- **Elementos UI:** cadastro (ver TC01); .features_items .productinfo a.add-to-cart, #cartModal button.close-modal (home); a[href="/view_cart"] (menu); #cart_info_table tbody tr, .cart_description h4 a, .cart_price p, .cart_quantity button, .check_out (/view_cart); heading "Address Details", heading "Review Your Order", #address_delivery, #address_invoice, #cart_info tbody tr, textarea[name=message], a[href="/payment"] (/checkout); [data-qa=name-on-card], [data-qa=card-number], [data-qa=cvc], [data-qa=expiry-month], [data-qa=expiry-year], [data-qa=pay-button], #payment-form, #success_message (/payment); [data-qa=order-placed] (/payment_done)
- **Atualizado:** 2026-10-22

## US10-EXTRA · Cart is empty after the order
- **US:** US-10 · Comprar logo após criar a conta (TC 15)
- **Endpoints:** POST /api/createAccount (setup), POST /login, GET /view_cart, GET /checkout, POST /payment, GET /payment_done/{total} (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** dados do cartão (request)
- **Regras:** o pedido esvazia o carrinho
- **Elementos UI:** os mesmos do TC15 (carrinho, checkout, pagamento); #cart_info_table tbody tr (/view_cart, vazio)
- **Atualizado:** 2026-10-22

## US10-EXTRA · Payment without card number is blocked
- **US:** US-10 · Comprar logo após criar a conta (TC 15)
- **Endpoints:** POST /api/createAccount (setup), POST /login, GET /view_cart, GET /checkout, GET /payment (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** card_number (request, vazio)
- **Regras:** número do cartão obrigatório (atributo required)
- **Elementos UI:** .productinfo a.add-to-cart, #cartModal (home); .check_out (/view_cart); textarea[name=message], a[href="/payment"] (/checkout); [data-qa=card-number], [data-qa=pay-button] (/payment)
- **Atualizado:** 2026-10-22

## TC16 · Place Order: Login before Checkout
- **US:** US-11 · Comprar após entrar com uma conta existente (TC 16)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /view_cart, GET /checkout, POST /payment (UI), GET /payment_done/{total}, GET /delete_account (UI), GET /api/getUserDetailByEmail (prova de exclusão), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request); comentário `message`; dados do cartão (request)
- **Regras:** as mesmas do TC15, com login no lugar do cadastro; endereço do checkout = conta criada pela API
- **Elementos UI:** login (ver TC02); carrinho, checkout, pagamento e final (ver TC15)
- **Atualizado:** 2026-10-22

## US11-EXTRA · Guest cart is kept after login
- **US:** US-11 · Comprar após entrar com uma conta existente (TC 16)
- **Endpoints:** POST /api/createAccount (setup), POST /login (UI), GET /view_cart (UI), DELETE /api/deleteAccount (teardown)
- **Campos:** email, password (request)
- **Regras:** o carrinho montado como visitante continua depois do login
- **Elementos UI:** .productinfo a.add-to-cart, #cartModal (home); [data-qa=login-*] (/login); a[href="/view_cart"] (menu); #cart_info_table tbody tr, .cart_description h4 a (/view_cart)
- **Atualizado:** 2026-10-22

## US11-EXTRA · Guest checkout asks for login
- **US:** US-11 · Comprar após entrar com uma conta existente (TC 16)
- **Endpoints:** GET /view_cart (UI)
- **Campos:** —
- **Regras:** visitante não chega ao checkout; "Proceed To Checkout" pede login
- **Elementos UI:** .productinfo a.add-to-cart, #cartModal (home); a[href="/view_cart"] (menu); .check_out, #checkoutModal (/view_cart)
- **Atualizado:** 2026-10-22
