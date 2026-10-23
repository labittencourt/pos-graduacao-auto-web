import { expect, Locator, Page } from '@playwright/test';
import type { User } from '../fixtures/factories/user.factory';

/** /signup — formulario "Enter Account Information" + "Address Information". */
export class SignupPage {
  readonly page: Page;
  // O HTML diz "Enter Account Information"; o "ENTER ACCOUNT INFORMATION" do TC e text-transform CSS.
  readonly accountInfoTitle: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly birthDay: Locator;
  readonly birthMonth: Locator;
  readonly birthYear: Locator;
  readonly newsletter: Locator;
  readonly specialOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountInfoTitle = page.getByRole('heading', { name: /enter account information/i });
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.name = page.locator('[data-qa="name"]');
    this.email = page.locator('[data-qa="email"]');
    this.password = page.locator('[data-qa="password"]');
    this.birthDay = page.locator('[data-qa="days"]');
    this.birthMonth = page.locator('[data-qa="months"]');
    this.birthYear = page.locator('[data-qa="years"]');
    // Checkboxes sem data-qa: o rotulo literal do TC e o seletor acessivel (suposicao do QA Q05).
    this.newsletter = page.getByLabel('Sign up for our newsletter!');
    this.specialOffers = page.getByLabel('Receive special offers from our partners!');
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.company = page.locator('[data-qa="company"]');
    this.address1 = page.locator('[data-qa="address"]');
    this.address2 = page.locator('[data-qa="address2"]');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipcode = page.locator('[data-qa="zipcode"]');
    this.mobileNumber = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  async expectLoad() {
    await expect(this.accountInfoTitle, 'titulo "Enter Account Information" deveria estar visivel').toBeVisible();
  }

  /** Titulo, Name, senha e data de nascimento. O e-mail ja vem bloqueado do signup (DIV-01). */
  async fillAccountInformation(user: User) {
    await (user.title === 'Mr' ? this.titleMr : this.titleMrs).check();
    await this.name.fill(user.name);
    await this.password.fill(user.password);
    await this.birthDay.selectOption(user.birthDay);
    await this.birthMonth.selectOption(user.birthMonth);
    await this.birthYear.selectOption(user.birthYear);
  }

  async checkSubscriptions() {
    await this.newsletter.check();
    await this.specialOffers.check();
  }

  async fillAddressInformation(user: User) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address1.fill(user.address1);
    await this.address2.fill(user.address2);
    await this.country.selectOption(user.country);
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }
}
