# Índice de telas — engenharia reversa

| Slug | Nome da tela | URL | Data da análise | Status | Artefatos | Consumido por |
|------|-------------|-----|-----------------|--------|-----------|----------------|
| cadastro-conta | Cadastro de conta (signup → criação → exclusão) | /login, /signup, /account_created, /delete_account | 2026-10-22 | Com GAPs — sem pandoc (só .md) | [US reversa](cadastro-conta-us-reversa.md) · [Cenários](cadastro-conta-test-scenarios.md) · [Endpoints](cadastro-conta-endpoints.md) | US-01 |
| login | Login ("Login to your account") | /login | 2026-10-22 | Com GAPs — sem pandoc (só .md) | [US reversa](login-us-reversa.md) | US-03 |
| produtos | Produtos (lista "All Products" e detalhe) | /products, /product_details/{id} | 2026-10-22 | Com GAPs — sem pandoc (só .md) | [US reversa](produtos-us-reversa.md) | US-07 |
| newsletter | Assinatura da newsletter (rodapé) | / (rodapé) | 2026-10-22 | Com GAPs — sem pandoc (só .md) | [US reversa](newsletter-us-reversa.md) | US-09 |
| compra | Compra (carrinho → checkout → pagamento) | /view_cart, /checkout, /payment, /payment_done/{total} | 2026-10-22 | Com GAPs — sem pandoc (só .md) | [US reversa](compra-us-reversa.md) | US-10, US-11 |
