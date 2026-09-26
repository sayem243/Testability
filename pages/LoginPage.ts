import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("/login");
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    await expect(
      this.page.getByRole("link", { name: /New Article/ }),
    ).toBeVisible();
  }
}
