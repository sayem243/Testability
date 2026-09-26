import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly articles: Locator;

  constructor(private readonly page: Page) {
    this.articles = page.locator("main article");
  }

  async open(): Promise<void> {
    await this.page.goto("/");
    await expect(this.page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      this.page.getByText("Popular Tags", { exact: true }),
    ).toBeVisible();
  }

  async filterByTag(tag: string): Promise<void> {
    const popularTags = this.page
      .getByText("Popular Tags", { exact: true })
      .locator("..");
    await popularTags.getByText(tag, { exact: true }).click();
  }

  articleHeading(title: string): Locator {
    return this.page.getByRole("heading", { name: title, exact: true });
  }
}
