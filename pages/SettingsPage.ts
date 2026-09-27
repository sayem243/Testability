import { expect, type Page } from "@playwright/test";

export class SettingsPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole("link", { name: /Settings/ }).click();
    await expect(
      this.page.getByRole("heading", { name: "Your Settings" }),
    ).toBeVisible();
  }

  async updateProfile(profile: { email: string; bio: string }): Promise<void> {
    await this.page.getByRole("textbox", { name: "Email" }).fill(profile.email);
    await this.page
      .getByRole("textbox", { name: "Short bio about you" })
      .fill(profile.bio);

    const updateResponse = this.page.waitForResponse((response) => {
      const request = response.request();
      return (
        /\/user(?:\/|$)/.test(response.url()) &&
        request.method() === "PUT" &&
        response.ok()
      );
    });

    await this.page.getByRole("button", { name: "Update Settings" }).click();
    const response = await updateResponse;
    const result = (await response.json()) as {
      user: { email: string; bio: string };
    };
    expect(result.user.email).toBe(profile.email);
    expect(result.user.bio).toBe(profile.bio);
  }

  emailInput() {
    return this.page.getByRole("textbox", { name: "Email" });
  }

  bioInput() {
    return this.page.getByRole("textbox", { name: "Short bio about you" });
  }
}
