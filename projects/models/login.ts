import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly inventoryHeader: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMsg = page.locator('[data-test="error"]');
    this.inventoryHeader = page.locator('.title');
    this.pageTitle = page.locator('.title');
  }

  async goto() {
    //this is a free test website :) 
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async clickLogout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }
}
