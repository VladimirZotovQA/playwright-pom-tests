import { Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Button
  readonly usernameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly createOrderButton: Button
  readonly successfullyPopUp: Locator
  readonly successPopupButton: Button
  readonly phoneError: Locator
  readonly logoutButton: Button

  constructor(page: Page) {
    this.page = page
    this.statusButton = new Button(page, 'openStatusPopup-button')//page.getByTestId('openStatusPopup-button')
    this.usernameField = new Input(page, 'username-input')
    this.phoneField = new Input(page, 'phone-input')
    this.commentField = new Input(page, 'comment-input')
    this.createOrderButton = new Button(page, 'createOrder-button')
    this.successfullyPopUp = page.getByTestId('orderSuccessfullyCreated-popup')
    this.successPopupButton = new Button(page, 'orderSuccessfullyCreated-popup-ok-button')
    this.phoneError = page.getByTestId('phone-input-error')
    this.logoutButton = new Button(page, 'logout-button')
  }
}
