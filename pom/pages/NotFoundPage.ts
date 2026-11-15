import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class NotFoundPage extends BasePage {
  readonly page: Page
  readonly notFoundTitle: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.notFoundTitle = page.getByTestId('orderNotFound-title')
  }

  async checkNotFoundPageVisible(visible = true): Promise<void> {
    await expect(this.notFoundTitle).toBeVisible({ visible })
  }
}
