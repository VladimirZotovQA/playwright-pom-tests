import { expect, Locator, Page } from '@playwright/test'
import { BaseAtom } from './BaseAtom'

export class Button extends BaseAtom {


  constructor(container: Page | Locator, dataTestId: string) {
    super(container, dataTestId)

  }

  async click(): Promise<void> {
    await this.atomLoc.click()
  }

  async checkEnabled(enabled = true): Promise<void> {
    await expect(this.atomLoc).toBeEnabled({ enabled: enabled })
  }
}