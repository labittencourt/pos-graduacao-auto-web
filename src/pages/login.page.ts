import { expect, Locator, Page } from '@playwright/test';

/** /login — caixas "Login to your account" e "New User Signup!". */
export class LoginPage {
  readonly page: Page;
  readonly loginTitle: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  /** Mensagem de erro da caixa de login (<p style="color: red;">, sem data-qa). */
  readonly loginError: Locator;
  readonly signupTitle: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  /** Mensagem de erro da caixa de signup (<p style="color: red;">, sem data-qa). */
  readonly signupError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginTitle = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginError = page.locator('form:has([data-qa="login-button"]) p');
    this.signupTitle = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupError = page.locator('form:has([data-qa="signup-button"]) p');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async expectLoad() {
    await expect(this.page, 'deveria estar em /login').toHaveURL(/\/login$/);
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }
}
