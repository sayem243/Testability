import { expect, type Page } from "@playwright/test";
import type { ArticleData } from "../utils/dataGenerator";

export class NewArticlePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole("link", { name: /New Article/ }).click();
    await expect(
      this.page.getByRole("textbox", { name: "Article Title" }),
    ).toBeVisible();
  }

  async fillArticle(article: ArticleData): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Article Title" })
      .fill(article.title);
    await this.page
      .getByRole("textbox", { name: "What's this article about?" })
      .fill(article.description);
    await this.page
      .getByRole("textbox", { name: "Write your article (in markdown)" })
      .fill(article.body);
    await this.page
      .getByRole("textbox", { name: "Enter tags" })
      .fill(article.tag);
  }

  async publish(): Promise<void> {
    await this.page.getByRole("button", { name: "Publish Article" }).click();
  }
}
