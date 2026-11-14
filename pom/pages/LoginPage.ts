import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'
import { Button } from '../atoms/Button'

export class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Button
  readonly usernameField: Locator
  readonly passwordField: Locator


  constructor(page: Page) {
    this.page = page
    this.signInButton = new Button(page, 'signIn-button') // page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
  }
}
