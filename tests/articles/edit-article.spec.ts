import { test, expect } from '../../fixtures/test.fixture';
import { generateArticleData } from '../../utils/dataGenerator';

test('edits an existing article created through the API', async ({ page, articleApi, articlePage, newArticlePage }) => {
  const original = generateArticleData('Editable Article');
  const updated = generateArticleData('Updated Article');
  const created = await articleApi.createArticle(original);

  try {
    await articlePage.open(created.slug);
    await articlePage.expectTitle(original.title);
    await articlePage.edit();
    await newArticlePage.fillArticle(updated);
    await newArticlePage.publish();

    await expect(page).toHaveURL(/\/article\/.+/);
    await articlePage.expectTitle(updated.title);
    await page.reload();
    await articlePage.expectTitle(updated.title);
  } finally {
    await articleApi.deleteArticle(created.slug).catch(() => undefined);
  }
});