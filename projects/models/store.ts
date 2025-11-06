import { Page, Locator, expect } from '@playwright/test';

export class Store {
  readonly page: Page;
  readonly inventoryTitle: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.locator('.title');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async validateOnInventoryPage() {
    await expect(this.inventoryTitle).toHaveText('Products');
  }

  async addProductToCartByName(productName: string) {
    const addButton = this.page.locator(
      `xpath=//div[text()="${productName}"]/ancestor::div[@class="inventory_item"]//button[contains(@data-test, "add-to-cart")]`
    );
    await addButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartCount(): Promise<number> {
    const countText = await this.cartBadge.textContent();
    return countText ? parseInt(countText) : 0;
  }
}
