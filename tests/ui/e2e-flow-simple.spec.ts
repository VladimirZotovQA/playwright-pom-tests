import { expect, test } from '@playwright/test'
import { LoginPage } from '../../pom/pages/LoginPage'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../../pom/pages/OrderPage'

test('TL-17-1 signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkVisible();
  await loginPage.signInButton.checkEnabled(false);
})

test('TL-17-2 login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const orderCreationPage = new OrderPage(page)

  await loginPage.open()
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.usernameField.checkVisible()
  await orderCreationPage.phoneField.checkVisible()
  await orderCreationPage.commentField.checkVisible()
})

test('TL-17-3 login and create order', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const orderPage = new OrderPage(page)

  await loginPage.open()
  await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.usernameField.fill(faker.lorem.word(2))
  await orderPage.phoneField.fill(faker.lorem.word(8))
  await orderPage.commentField.fill(faker.lorem.word(7))
  await orderPage.createOrderButton.click()

  await expect(orderPage.successfullyPopUp).toContainText(/Tracking code: \d+/)
})

test('TL-17-4 incorrect numbers in phone fields', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const orderPage = new OrderPage(page)

  await loginPage.open()
  await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.usernameField.fill(faker.lorem.word(2))
  await orderPage.phoneField.fill(faker.string.numeric(2))
  await orderPage.commentField.fill(faker.lorem.word(7))
  await orderPage.createOrderButton.checkEnabled(false)

  await expect(orderPage.phoneError).toContainText(
    'The field must contain at least of characters: 6',
  )
})

test('TL-17-5 logout from page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const orderPage = new OrderPage(page)

  await loginPage.open()
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.checkVisible()

  await orderPage.logoutButton.click()

  await expect(page).toHaveURL(/signin/)
  await loginPage.signInButton.checkVisible()
})