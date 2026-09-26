import { expect, type APIRequestContext } from "@playwright/test";
import type { ArticleData } from "../utils/dataGenerator";

export type CreatedArticle = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export class ArticleApi {
  private readonly apiBaseUrl =
    process.env.CONDUIT_API_URL ?? "https://conduit-api.bondaracademy.com/api";

  constructor(
    private readonly request: APIRequestContext,
    private readonly token: string,
  ) {}

  async createArticle(article: ArticleData): Promise<CreatedArticle> {
    const response = await this.request.post(`${this.apiBaseUrl}/articles/`, {
      headers: { Authorization: `Token ${this.token}` },
      data: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: [article.tag],
        },
      },
    });
    await expect(response).toBeOK();
    return (await response.json()).article as CreatedArticle;
  }

  async deleteArticle(slug: string): Promise<void> {
    const response = await this.request.delete(
      `${this.apiBaseUrl}/articles/${slug}`,
      { headers: { Authorization: `Token ${this.token}` } },
    );
    await expect(response).toBeOK();
  }
}
