import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/login';
import { DEFAULT_TIMEOUT_IN_MS } from '../constants';

const username = 'standard_user';
const password = 'secret_sauce';
const wrongusername = 'locked_out_user';
const wrongpassword = 'wrong_pass';

//Test Scenario: User logins to a website 

test.describe('SauceDemo Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(login.loginBtn).toBeVisible({ timeout: DEFAULT_TIMEOUT_IN_MS });
  });

  test(' TS1_TC001 Login using valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.fillCredentials(username, password);
    await login.clickLogin();
    await expect(login.pageTitle).toBeVisible();
    await expect(login.inventoryHeader).toHaveText('Products');
  });

  test('TS1_TC002 Login using incorrect username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.fillCredentials(wrongusername, password);
    await login.clickLogin();
    await expect(login.errorMsg).toBeVisible();
  });

  test(' TS1_TC003 using incorrect password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.fillCredentials(username, wrongpassword);
    await login.clickLogin();
    await expect(login.errorMsg).toBeVisible();
  });

  test(' TS1_TC004 Login with empty username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.fillCredentials('', password);
    await login.clickLogin();
    await expect(login.errorMsg).toBeVisible();
  });

  test('TS1_TC005 Login with empty password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.fillCredentials(username, '');
    await login.clickLogin();
    await expect(login.errorMsg).toBeVisible();
  });

  test('TS1_TC006 Logout after successful login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.fillCredentials(username, password);
    await login.clickLogin();
    await expect(login.inventoryHeader).toBeVisible();
    await login.clickLogout();
    await expect(login.loginBtn).toBeVisible();
  });
});
