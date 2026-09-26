import { expect, type Page } from "@playwright/test";

export class ArticlePage {
  constructor(private readonly page: Page) {}

  async open(slug: string): Promise<void> {
    await this.page.goto(`/article/${slug}`);
  }

  async expectTitle(title: string): Promise<void> {
    await expect(
      this.page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }

  async edit(): Promise<void> {
    await this.page
      .getByRole("link", { name: /Edit Article/ })
      .first()
      .click();
  }

  async delete(): Promise<void> {
    await this.page
      .getByRole("button", { name: /Delete Article/ })
      .first()
      .click();
  }
}
