import { test, expect } from '../src/fixtures';
import { epic, feature, story, severity, owner } from 'allure-js-commons';
import type { LoginPage } from '../src/pages/login.page';
import type { SignupPage } from '../src/pages/signup.page';
import { buildUser, type User } from '../src/fixtures/factories/user.factory';
import { accountExists, getAccountByEmail } from '../src/utils/account-api';
import { checkAccessibility, formatViolations } from '../src/fixtures/accessibility';

// Epico A — Conta e Autenticacao (docs/user-stories/README.md)
// Textos do TC aparecem em maiusculas so por CSS (ex.: HTML "Account Created!" exibido
// "ACCOUNT CREATED!") — as assertions comparam sem diferenciar maiusculas
// (docs/reverse/cadastro-conta-us-reversa.md, GAP 2).

test.describe('Account', { tag: ['@epico-conta'] }, () => {
  // US-01 · CT-01-01 (+ CT-01-02, CT-01-03 como assertions) — docs/analysis/US-01/test-scenarios.md
  test('TC01 Register User', { tag: ['@TC01', '@smoke'] }, async ({
    request,
    homePage,
    loginPage,
    signupPage,
    accountStatusPage,
    navBar,
    newUser,
  }) => {
    await epic('Conta e Autenticação');
    await feature('Cadastro');
    await story('US-01 Cadastrar nova conta');
    await severity('critical');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Go to Signup / Login', async () => {
      await navBar.goToSignupLogin();
      await expect(loginPage.signupTitle, '"New User Signup!" deveria estar visivel').toBeVisible();
    });

    await test.step('Sign up with name and new email', async () => {
      await loginPage.signup(newUser.signupName, newUser.email);
      await signupPage.expectLoad();
    });

    await test.step('Check email carried over from signup', async () => {
      // CT-01-03 / DIV-01: o e-mail vem do signup e nao pode ser editado.
      await expect(signupPage.email, 'e-mail do signup deveria vir preenchido').toHaveValue(newUser.email);
      await expect(signupPage.email, 'campo e-mail deveria estar bloqueado').toBeDisabled();
    });

    await test.step('Fill account and address information', async () => {
      await signupPage.fillAccountInformation(newUser);
      await signupPage.checkSubscriptions();
      await signupPage.fillAddressInformation(newUser);
    });

    await test.step('Create account', async () => {
      await signupPage.createAccount();
      await expect(accountStatusPage.accountCreatedTitle, '"ACCOUNT CREATED!" deveria estar visivel')
        .toHaveText(/account created!/i);
    });

    await test.step('Continue as logged-in user', async () => {
      await accountStatusPage.continue();
      // CT-01-02 / DIV-02: "Logged in as" exibe o campo Name do formulario de conta.
      await expect(navBar.loggedInAs, '"Logged in as" deveria estar visivel').toBeVisible();
      await expect(navBar.loggedInUserName, '"Logged in as" deveria exibir o Name informado')
        .toHaveText(newUser.name);
    });

    await test.step('Delete account', async () => {
      await navBar.deleteAccount();
      await expect(accountStatusPage.accountDeletedTitle, '"ACCOUNT DELETED!" deveria estar visivel')
        .toHaveText(/account deleted!/i);
      // AUD-002: a mensagem aparece ate sem exclusao (BUG-004) — a prova e a API.
      expect(await accountExists(request, newUser.email), 'a conta deveria ter sido excluida').toBe(false);
      await accountStatusPage.continue();
      await expect(navBar.signupLoginLink, 'apos excluir, deveria voltar ao estado de visitante')
        .toBeVisible();
    });
  });

  // US-03 · CT-03-01 — docs/analysis/US-03/test-scenarios.md. Inclui os passos 9–10 do TC 2
  // (excluir conta), ausentes da story mas presentes no caso de origem (suposicao do QA Q03).
  test('TC02 Login User with correct email and password', { tag: ['@TC02', '@smoke'] }, async ({
    request,
    homePage,
    loginPage,
    accountStatusPage,
    navBar,
    registeredUser,
  }) => {
    await epic('Conta e Autenticação');
    await feature('Login');
    await story('US-03 Entrar com e-mail e senha válidos');
    await severity('critical');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Go to Signup / Login', async () => {
      await navBar.goToSignupLogin();
      await expect(loginPage.loginTitle, '"Login to your account" deveria estar visivel').toBeVisible();
    });

    await test.step('Log in with correct email and password', async () => {
      await loginPage.login(registeredUser.email, registeredUser.password);
      await expect(navBar.loggedInUserName, '"Logged in as" deveria exibir o nome cadastrado')
        .toHaveText(registeredUser.name);
    });

    await test.step('Delete account', async () => {
      await navBar.deleteAccount();
      await expect(accountStatusPage.accountDeletedTitle, '"ACCOUNT DELETED!" deveria estar visivel')
        .toHaveText(/account deleted!/i);
      // AUD-002: a mensagem aparece ate sem exclusao (BUG-004) — a prova e a API.
      expect(await accountExists(request, registeredUser.email), 'a conta deveria ter sido excluida').toBe(false);
    });
  });

  // US-05 · CT-05-01 — docs/analysis/US-05/test-scenarios.md
  test('TC04 Logout User', { tag: ['@TC04', '@security'] }, async ({
    page,
    homePage,
    loginPage,
    navBar,
    registeredUser,
  }) => {
    await epic('Conta e Autenticação');
    await feature('Logout');
    await story('US-05 Encerrar sessão');
    await severity('critical');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Go to Signup / Login', async () => {
      await navBar.goToSignupLogin();
      await expect(loginPage.loginTitle, '"Login to your account" deveria estar visivel').toBeVisible();
    });

    await test.step('Log in with correct email and password', async () => {
      await loginPage.login(registeredUser.email, registeredUser.password);
      await expect(navBar.loggedInUserName, '"Logged in as" deveria exibir o nome cadastrado')
        .toHaveText(registeredUser.name);
    });

    await test.step('Log out', async () => {
      await navBar.logout();
    });

    await test.step('Check user is on the login page and logged out', async () => {
      // Oraculo de "pagina de login" (suposicao do QA Q01): URL + titulo da caixa de login.
      await expect(page, 'deveria estar em /login').toHaveURL(/\/login$/);
      await expect(loginPage.loginTitle, '"Login to your account" deveria estar visivel').toBeVisible();
      await expect(navBar.loggedInAs, 'a sessao deveria ter terminado').toBeHidden();
    });
  });

  // US-04 · CT-04-01 — docs/analysis/US-04/test-scenarios.md. Nenhuma conta e criada: o e-mail
  // unico da factory nunca foi cadastrado (suposicao do QA Q01).
  test('TC03 Login User with incorrect email and password', { tag: ['@TC03', '@validation'] }, async ({
    page,
    homePage,
    loginPage,
    navBar,
  }) => {
    await epic('Conta e Autenticação');
    await feature('Login');
    await story('US-04 Recusar login com credenciais inválidas');
    await severity('critical');
    await owner('QA Team');
    const unregistered = buildUser();

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Go to Signup / Login', async () => {
      await navBar.goToSignupLogin();
      await expect(loginPage.loginTitle, '"Login to your account" deveria estar visivel').toBeVisible();
    });

    await test.step('Log in with incorrect email and password', async () => {
      await loginPage.login(unregistered.email, unregistered.password);
    });

    await test.step('Check the login is refused', async () => {
      await expect(loginPage.loginError, 'erro de credencial deveria aparecer')
        .toHaveText('Your email or password is incorrect!');
      await expect(page, 'deveria continuar em /login').toHaveURL(/\/login$/);
      await expect(navBar.loggedInAs, 'nao deveria ficar autenticado').toBeHidden();
    });
  });

  // US-02 · CT-02-01 (+ CT-02-02, CT-02-03 como assertions) — docs/analysis/US-02/test-scenarios.md
  test('TC05 Register User with existing email', { tag: ['@TC05', '@validation'] }, async ({
    request,
    homePage,
    loginPage,
    signupPage,
    navBar,
    registeredUser,
  }) => {
    await epic('Conta e Autenticação');
    await feature('Cadastro');
    await story('US-02 Impedir cadastro com e-mail já existente');
    await severity('critical');
    await owner('QA Team');

    await test.step('Open home page', async () => {
      await homePage.goto();
      await homePage.expectLoad();
    });

    await test.step('Go to Signup / Login', async () => {
      await navBar.goToSignupLogin();
      await expect(loginPage.signupTitle, '"New User Signup!" deveria estar visivel').toBeVisible();
    });

    await test.step('Sign up with an already registered email', async () => {
      // Nome diferente do cadastrado: prova que o bloqueio e pelo e-mail, nao pelo nome.
      await loginPage.signup(`${registeredUser.name} Duplicate`, registeredUser.email);
    });

    await test.step('Check the duplicate signup is rejected', async () => {
      await expect(loginPage.signupError, 'erro de e-mail existente deveria aparecer')
        .toHaveText('Email Address already exist!');
      // CT-02-02: a URL vira /signup (POST), entao o oraculo e o conteudo exibido.
      await expect(loginPage.signupTitle, 'deveria continuar na caixa "New User Signup!"').toBeVisible();
      await expect(signupPage.accountInfoTitle, 'nao deveria abrir o formulario de conta').toBeHidden();
    });

    await test.step('Check the original account is unchanged', async () => {
      const account = await getAccountByEmail(request, registeredUser.email);
      expect(account?.name, 'a conta original deveria manter o nome cadastrado').toBe(registeredUser.name);
    });
  });

  // US-05 · extras aprovados em 2026-10-22 (docs/analysis/US-05/test-agreement.md).
  test.describe('US-05 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async ({ loginPage, navBar, registeredUser }) => {
      await epic('Conta e Autenticação');
      await feature('Logout');
      await story('US-05 Encerrar sessão — extras');
      await owner('QA Team');
      await test.step('Log in and log out', async () => {
        await loginPage.goto();
        await loginPage.login(registeredUser.email, registeredUser.password);
        await expect(navBar.loggedInUserName, 'pre-condicao: login').toHaveText(registeredUser.name);
        await navBar.logout();
        await expect(navBar.loggedInAs, 'pre-condicao: logout').toBeHidden();
      });
    });

    // CT-05-02 — dispositivo compartilhado: Voltar nao pode devolver a area logada.
    test('US05-EXTRA Browser back after logout does not restore the session', { tag: ['@security'] }, async ({
      page,
      navBar,
    }) => {
      await severity('normal');

      await test.step('Go back in browser history and reload', async () => {
        await page.goBack();
        await page.reload();
      });

      await test.step('Check the session is not restored', async () => {
        await expect(navBar.signupLoginLink, 'deveria continuar como visitante').toBeVisible();
        await expect(navBar.loggedInAs, 'nao deveria voltar a ficar autenticado').toBeHidden();
      });
    });

    // CT-05-03 — afirma o correto e falha ate o site corrigir BUG-004. A checagem de que a conta
    // NAO foi excluida vem antes da que falha, para continuar rodando sempre.
    test('US05-EXTRA Delete account page without session does not claim deletion (BUG-004)', {
      tag: ['@security', '@regression'],
      annotation: { type: 'issue', description: 'BUG-004 — docs/bug-report-2026-10-22-delete-account-sem-sessao.md' },
    }, async ({ page, request, accountStatusPage, registeredUser }) => {
      test.fail(true, 'BUG-004: /delete_account sem sessao exibe "Account Deleted!" sem excluir nada');
      await severity('minor');

      await test.step('Open /delete_account without a session', async () => {
        await page.goto('/delete_account');
      });

      await test.step('Check nothing was deleted and nothing is claimed', async () => {
        expect(await accountExists(request, registeredUser.email), 'sem sessao, a conta nao pode ser excluida').toBe(true);
        await expect(accountStatusPage.accountDeletedTitle, 'nao deveria afirmar exclusao a um visitante').toBeHidden();
      });
    });
  });

  // US-04 · extras aprovados em 2026-10-22 (docs/analysis/US-04/test-agreement.md).
  test.describe('US-04 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async () => {
      await epic('Conta e Autenticação');
      await feature('Login');
      await story('US-04 Recusar login com credenciais inválidas — extras');
      await owner('QA Team');
    });

    // CT-04-02 — mensagem generica: nao revela que o e-mail tem conta (OWASP).
    test('US04-EXTRA Wrong password for existing email shows the same generic error', { tag: ['@security'] }, async ({
      loginPage,
      navBar,
      registeredUser,
    }) => {
      await severity('normal');

      await test.step('Log in with the registered email and a wrong password', async () => {
        await loginPage.goto();
        await loginPage.login(registeredUser.email, `${registeredUser.password}-wrong`);
      });

      await test.step('Check the same generic error and no session', async () => {
        await expect(loginPage.loginError, 'deveria ser a mesma mensagem do e-mail inexistente')
          .toHaveText('Your email or password is incorrect!');
        await expect(navBar.loggedInAs, 'nao deveria ficar autenticado').toBeHidden();
      });
    });

    // CT-04-03 — senha diferencia maiusculas.
    test('US04-EXTRA Password is case-sensitive', { tag: ['@boundary'] }, async ({
      loginPage,
      navBar,
      registeredUser,
    }) => {
      await severity('normal');

      await test.step('Log in with the right password in uppercase', async () => {
        await loginPage.goto();
        await loginPage.login(registeredUser.email, registeredUser.password.toUpperCase());
      });

      await test.step('Check the login is refused', async () => {
        await expect(loginPage.loginError, 'senha com caixa trocada deveria ser recusada')
          .toHaveText('Your email or password is incorrect!');
        await expect(navBar.loggedInAs, 'nao deveria ficar autenticado').toBeHidden();
      });
    });

    // CT-04-04 — afirma o correto (a senha nao volta na resposta) e falha ate o site corrigir BUG-003.
    test('US04-EXTRA Password is not echoed back after failed login (BUG-003)', {
      tag: ['@security', '@regression'],
      annotation: { type: 'issue', description: 'BUG-003 — docs/bug-report-2026-10-22-senha-devolvida-no-html.md' },
    }, async ({ page, loginPage }) => {
      test.fail(true, 'BUG-003: o servidor devolve a senha digitada no atributo value apos login invalido');
      await severity('normal');
      const unregistered = buildUser();

      await loginPage.goto();
      const responseBody = await test.step('Submit an invalid login and capture the response', async () => {
        const [response] = await Promise.all([
          page.waitForResponse((r) => r.url().endsWith('/login') && r.request().method() === 'POST'),
          loginPage.login(unregistered.email, unregistered.password),
        ]);
        return response.text();
      });

      await test.step('Check the password is not in the response', async () => {
        await expect(loginPage.loginError, 'pre-condicao: o login deveria ter falhado')
          .toHaveText('Your email or password is incorrect!');
        expect(responseBody.includes(unregistered.password), 'a senha nao deveria voltar no HTML da resposta')
          .toBe(false);
      });
    });
  });

  // US-03 · extras aprovados em 2026-10-22 (docs/analysis/US-03/test-agreement.md).
  test.describe('US-03 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async () => {
      await epic('Conta e Autenticação');
      await feature('Login');
      await story('US-03 Entrar com e-mail e senha válidos — extras');
      await owner('QA Team');
    });

    // CT-03-02 — a sessao vale alem da pagina de destino do login.
    test('US03-EXTRA Session persists when navigating', { tag: ['@ux'] }, async ({
      page,
      loginPage,
      navBar,
      registeredUser,
    }) => {
      await severity('normal');

      await test.step('Log in', async () => {
        await loginPage.goto();
        await loginPage.login(registeredUser.email, registeredUser.password);
        await expect(navBar.loggedInUserName, 'login deveria autenticar').toHaveText(registeredUser.name);
      });

      await test.step('Navigate to Products', async () => {
        await navBar.goToProducts();
        await expect(page, 'deveria estar em /products').toHaveURL(/\/products$/);
      });

      await test.step('Check the session is kept', async () => {
        await expect(navBar.loggedInUserName, '"Logged in as" deveria continuar em outra pagina')
          .toHaveText(registeredUser.name);
      });
    });

    // CT-03-03 — mesma causa raiz do BUG-002 (signup), aqui no login. Falha esperada.
    test('US03-EXTRA Login accepts email with uppercase domain (BUG-002)', {
      tag: ['@boundary', '@regression'],
      annotation: { type: 'issue', description: 'BUG-002 — docs/bug-report-2026-10-22-email-case-sensitive.md' },
    }, async ({ loginPage, navBar, registeredUser }) => {
      test.fail(true, 'BUG-002: o login compara e-mails diferenciando maiusculas, inclusive no dominio');
      await severity('normal');

      const sameMailboxEmail = registeredUser.email.replace(/@(.+)$/, (_, domain: string) => `@${domain.toUpperCase()}`);

      await test.step('Log in with the domain in uppercase', async () => {
        await loginPage.goto();
        await loginPage.login(sameMailboxEmail, registeredUser.password);
      });

      await test.step('Check the user is logged in', async () => {
        await expect(navBar.loggedInUserName, 'mesma caixa postal deveria autenticar').toHaveText(registeredUser.name);
      });
    });
  });

  // US-02 · extra aprovado em 2026-10-22 (docs/analysis/US-02/test-agreement.md).
  test.describe('US-02 extras', { tag: ['@extra'] }, () => {
    // CT-02-05 — afirma o correto (RFC 5321 2.4: dominio nao diferencia maiusculas) e falha ate o
    // site corrigir BUG-002. So o dominio varia, para o oraculo nao depender da parte local.
    test('US02-EXTRA Email with uppercase domain is recognized as existing (BUG-002)', {
      tag: ['@boundary', '@regression'],
      annotation: { type: 'issue', description: 'BUG-002 — docs/bug-report-2026-10-22-email-case-sensitive.md' },
    }, async ({ loginPage, registeredUser }) => {
      test.fail(true, 'BUG-002: o site compara e-mails diferenciando maiusculas, inclusive no dominio');
      await epic('Conta e Autenticação');
      await feature('Cadastro');
      await story('US-02 Impedir cadastro com e-mail já existente — extras');
      await severity('normal');
      await owner('QA Team');

      const sameMailboxEmail = registeredUser.email.replace(/@(.+)$/, (_, domain: string) => `@${domain.toUpperCase()}`);

      await test.step('Sign up with the registered email, domain in uppercase', async () => {
        await loginPage.goto();
        await loginPage.signup(`${registeredUser.name} Duplicate`, sameMailboxEmail);
      });

      await test.step('Check it is rejected as an existing email', async () => {
        await expect(loginPage.signupError, 'mesma caixa postal deveria ser reconhecida como e-mail existente')
          .toHaveText('Email Address already exist!');
      });
    });
  });

  // US-01 · extras aprovados em 2026-10-22 (docs/analysis/US-01/test-agreement.md).
  // Excedem o TC 1 — nao sao casos do site, por isso nao levam tag @TCnn.
  test.describe('US-01 extras', { tag: ['@extra'] }, () => {
    test.beforeEach(async () => {
      await epic('Conta e Autenticação');
      await feature('Cadastro');
      await story('US-01 Cadastrar nova conta — extras');
      await owner('QA Team');
    });

    // CT-01-05 — validacao nativa do navegador (atributo required), observada em 2026-10-22.
    test('US01-EXTRA Required field empty blocks account creation', { tag: ['@validation'] }, async ({
      page,
      request,
      loginPage,
      signupPage,
      newUser,
    }) => {
      await severity('normal');
      await openAccountForm(loginPage, signupPage, newUser);

      await test.step('Fill everything except the password and submit', async () => {
        await signupPage.fillAccountInformation({ ...newUser, password: '' });
        await signupPage.fillAddressInformation(newUser);
        await signupPage.createAccount();
      });

      await test.step('Check the form was not submitted', async () => {
        await expect(page, 'deveria continuar no formulario de conta').toHaveURL(/\/signup$/);
        const valueMissing = await signupPage.password.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
        expect(valueMissing, 'senha vazia deveria ser sinalizada como obrigatoria').toBe(true);
        expect(await accountExists(request, newUser.email), 'a conta nao deveria ter sido criada').toBe(false);
      });
    });

    // CT-01-06 — input type=email: o navegador bloqueia o envio sem "@".
    test('US01-EXTRA Malformed email blocks signup', { tag: ['@validation'] }, async ({
      page,
      loginPage,
      signupPage,
    }) => {
      await severity('normal');

      await test.step('Sign up with an email without "@"', async () => {
        await loginPage.goto();
        await loginPage.signup('QA Automation User', 'qa-sem-arroba');
      });

      await test.step('Check signup did not proceed', async () => {
        await expect(page, 'deveria continuar em /login').toHaveURL(/\/login$/);
        const typeMismatch = await loginPage.signupEmail.evaluate((el: HTMLInputElement) => el.validity.typeMismatch);
        expect(typeMismatch, 'e-mail sem "@" deveria ser sinalizado como invalido').toBe(true);
        await expect(signupPage.accountInfoTitle, 'nao deveria abrir o formulario de conta').toBeHidden();
      });
    });

    // CT-01-08 — senha nao exibida em texto aberto.
    test('US01-EXTRA Password field is masked', { tag: ['@security'] }, async ({
      loginPage,
      signupPage,
      newUser,
    }) => {
      await severity('normal');
      await openAccountForm(loginPage, signupPage, newUser);

      await test.step('Type the password', async () => {
        await signupPage.password.fill(newUser.password);
      });

      await test.step('Check the password is masked', async () => {
        await expect(signupPage.password, 'campo de senha deveria ser type="password"')
          .toHaveAttribute('type', 'password');
      });
    });

    // CT-01-09 — afirma o comportamento correto e falha ate o site corrigir BUG-001
    // (Zipcode sem label; selects de data de nascimento sem nome acessivel). test.fail() mantem a
    // suite verde sem esconder o defeito: se o site for corrigido, o teste passa e o Playwright
    // acusa "expected to fail" — sinal para retestar e fechar o BUG-001 (docs/bugs-index.md).
    test('US01-EXTRA Account form has no critical a11y violations (BUG-001)', {
      tag: ['@a11y', '@regression'],
      annotation: { type: 'issue', description: 'BUG-001 — docs/bug-report-2026-10-22-a11y-formulario-conta.md' },
    }, async ({ page, loginPage, signupPage, newUser }, testInfo) => {
      test.fail(true, 'BUG-001: violacoes criticas de acessibilidade conhecidas no formulario de conta');
      await severity('minor');
      await openAccountForm(loginPage, signupPage, newUser);

      await test.step('Scan the account form with axe-core', async () => {
        // Escopo: so o formulario da US-01 — o resto da pagina (anuncios, menu) nao e desta story.
        const results = await checkAccessibility(page, testInfo, { include: ['form[action="/signup"]'] });
        const critical = results.violations.filter((v) => v.impact === 'critical');
        expect(critical, formatViolations(critical)).toEqual([]);
      });
    });
  });
});

async function openAccountForm(loginPage: LoginPage, signupPage: SignupPage, user: User) {
  await test.step('Open account form via signup', async () => {
    await loginPage.goto();
    await loginPage.signup(user.signupName, user.email);
    await signupPage.expectLoad();
  });
}
