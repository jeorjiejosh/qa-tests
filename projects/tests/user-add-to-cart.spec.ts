import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/login.ts';
import { Store } from '../models/store.ts';
import { DEFAULT_TIMEOUT_IN_MS } from '../constants.ts';

test.describe(' User orders an item to a shop ', () => {
  test('User logs in and adds an item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const storePage = new Store(page);

    await loginPage.goto();
    await loginPage.fillCredentials('standard_user', 'secret_sauce');
    await loginPage.clickLogin();
    await storePage.validateOnInventoryPage();

    await storePage.addProductToCartByName('Sauce Labs Backpack');
    await storePage.addProductToCartByName('Sauce Labs Bike Light');
    
    const count = await storePage.getCartCount();
    expect(count).toBe(2);

    await storePage.goToCart();
    const product1 = page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Backpack',});
    const product2 = page.locator('.inventory_item_name').filter({hasText: 'Sauce Labs Bike Light',});

    await expect(product1).toBeVisible({ timeout: DEFAULT_TIMEOUT_IN_MS });
    await expect(product2).toBeVisible({ timeout: DEFAULT_TIMEOUT_IN_MS });
  });   
});
