import { test } from "../../fixtures/test.fixture";
import { generateArticleData } from "../../utils/dataGenerator";

test("edits an existing article created through the API", async ({
  page,
  articleApi,
  articlePage,
  newArticlePage,
}) => {
  const original = generateArticleData("Editable Article");
  const updated = generateArticleData("Updated Article");
  const created = await articleApi.createArticle(original);
  let currentSlug = created.slug;

  try {
    await articlePage.open(created.slug);
    await articlePage.expectTitle(original.title);
    await articlePage.edit();
    await newArticlePage.fillArticle(updated);
    currentSlug = await newArticlePage.publish();
    await articlePage.open(currentSlug);
    await articlePage.expectTitle(updated.title);
    await page.reload();
    await articlePage.expectTitle(updated.title);
  } finally {
    await articleApi.deleteArticle(currentSlug).catch(() => undefined);
  }
});
