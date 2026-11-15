import { Locator, Page } from '@playwright/test'
import { BaseAtom } from './BaseAtom'

export class Link extends BaseAtom {
  constructor(container: Page | Locator, dataTestId: string) {
    super(container, dataTestId)
  }

  async click(): Promise<void> {
    await this.atomLoc.click()
  }

}
