import { expect, type Page } from "@playwright/test";

export class SettingsPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole("link", { name: /Settings/ }).click();
    await expect(
      this.page.getByRole("heading", { name: "Your Settings" }),
    ).toBeVisible();
  }

  async updateBio(bio: string): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Short bio about you" })
      .fill(bio);
    await this.page.getByRole("button", { name: "Update Settings" }).click();
  }

  bioInput() {
    return this.page.getByRole("textbox", { name: "Short bio about you" });
  }
}
