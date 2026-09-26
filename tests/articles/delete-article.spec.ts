import { expect, test } from "../../fixtures/test.fixture";
import { generateArticleData } from "../../utils/dataGenerator";

test.describe("Delete Article", () => {
  test("deletes an existing article created through the API", async ({
    page,
    articleApi,
    articlePage,
  }) => {
    const article = generateArticleData("Deletable Article");
    const created = await articleApi.createArticle(article);

    await articlePage.open(created.slug);
    await articlePage.expectTitle(article.title);
    await articlePage.delete();

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { name: article.title, exact: true }),
    ).toHaveCount(0);
  });

  test("shows the not-found state for a non-existing article", async ({
    page,
  }) => {
    await page.goto("/article/article-that-does-not-exist-automation");

    await expect(
      page.getByRole("heading", {
        name: "article-that-does-not-exist-automation",
        exact: true,
      }),
    ).toHaveCount(0);
  });
});
