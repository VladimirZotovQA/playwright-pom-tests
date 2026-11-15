import { expect, Locator, Page } from '@playwright/test'

export abstract class BaseAtom {
  container: Page | Locator
  atomLoc: Locator

  protected constructor(container: Page | Locator, dataTestId: string) {
    this.container = container
    this.atomLoc = container.getByTestId(dataTestId)
  }

  async checkVisible(visible = true): Promise<void> {
    await expect(this.atomLoc).toBeVisible({ visible: visible })
  }


  async checkAttached(attached = true): Promise<void> {
    await expect(this.atomLoc).toBeAttached({ attached })
  }
}
