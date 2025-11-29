import { test, expect } from '@playwright/test';

test.describe( 'SauceDemo', () => {
  
test('Login, add cart, checkout', async ({ page }) =>  {
  // buka saucedemo
await page.goto('https://www.saucedemo.com/');

// isi form login
await page.locator("//input[@id='user-name']").fill('standard_user');
await page.locator("//input[@id='password']").fill('secret_sauce');
await page.locator("//input[@id='login-button']").click();

// pilih  produk
await page.locator('//button[@id="add-to-cart-sauce-labs-onesie"]').click();

//buka cart
await page.locator('//a[@class="shopping_cart_link"]').click();
await expect(page).toHaveURL(/cart.html/);

// verifikasi produk
await expect(page.locator('//div[@class="inventory_item_name"]')).toHaveText('Sauce Labs Onesie');

//checkout
await page.locator('//button[@id="checkout"]').click();
await expect(page).toHaveURL(/checkout-step-one.html/);

// isi form
await page.locator('//input[@id="first-name"]').fill('Yoga');
await page.locator('//input[@id="last-name"]').fill('Pratama');
await page.locator('//input[@id="postal-code"]').fill('12345');
await page.locator('//input[@id="continue"]').click();

// konfirmasi order
await expect(page).toHaveURL(/checkout-step-two.html/);
await page.locator('//button[@id="finish"]').click();

//order selesai
await expect(page.locator('//h2[@class="complete-header"]')).toHaveText('Thank you for your order!');

})


});

