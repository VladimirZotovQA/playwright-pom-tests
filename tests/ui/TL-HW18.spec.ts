import { test } from '@playwright/test'
import { LoginPage } from '../../pom/pages/LoginPage'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../../pom/pages/OrderPage'
import { NotFoundPage } from '../../pom/pages/NotFoundPage'
import { FoundPage } from '../../pom/pages/FoundPage'

const TD = {
  createdOrderId: 21025,
}

test.describe('TL-18 e2e', () => {
  let loginPage: LoginPage
  let orderPage: OrderPage
  let notFoundPage: NotFoundPage
  let foundPage: FoundPage
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    orderPage = new OrderPage(page)
    notFoundPage = new NotFoundPage(page)
    foundPage = new FoundPage(page)
    await loginPage.open()
  })

  test('TL-18-1 Not found page test', async ({ page }) => {
    await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.checkVisible()
    await orderPage.statusButton.click()
    await orderPage.searchOrderInput.fill('0')
    await orderPage.searchOrderButton.click()
    await notFoundPage.checkNotFoundPageVisible()
  })

  test('TL-18-2 found page test', async ({ page }) => {
    await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.checkVisible()
    await orderPage.statusButton.click()
    await orderPage.searchOrderInput.fill(TD.createdOrderId)
    await orderPage.searchOrderButton.click()
    await foundPage.checkFoundPageVisible()
  })
})

