import { Button } from '../atoms/Button'
import { Link } from '../atoms/Link'
import { Locator, Page, expect } from '@playwright/test'

export abstract class BasePage {
  readonly footer: Locator;
  readonly langRuBtn: Button;
  readonly langEnBtn: Button;
  readonly politicsLink: Link;
  readonly cookieLink: Link;
  readonly conditionsLink: Link;

  protected constructor(page: Page) {
    this.footer = page.locator('.Footer');
    this.langRuBtn = new Button(this.footer, 'language-ru');
    this.langEnBtn = new Button(this.footer, 'language-en')
    this.politicsLink = new Link(this.footer, 'privacy-policy')
    this.cookieLink = new Link(this.footer, 'cookie-policy')
    this.conditionsLink = new Link(this.footer, 'terms-of-service')
  }

  async checkFooter(): Promise<void> {
    await expect(this.footer).toBeVisible()
  }
}