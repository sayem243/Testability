import { test, expect } from '../../fixtures/test.fixture';
import { generateArticleData } from '../../utils/dataGenerator';

test.describe('Create New Article', () => {
  test('creates an article with valid data', async ({ page, newArticlePage }) => {
    const article = generateArticleData();

    await page.goto('/');
    await newArticlePage.open();
    await newArticlePage.fillArticle(article);
    await newArticlePage.publish();

    await expect(page).toHaveURL(/\/article\/.+/);
    await expect(page.getByRole('heading', { name: article.title, exact: true })).toBeVisible();
    await expect(page.getByText(article.body, { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { name: article.title, exact: true })).toBeVisible();
  });

  test('does not create an article when the title is missing', async ({ page, newArticlePage }) => {
    const article = generateArticleData();

    await page.goto('/');
    await newArticlePage.open();
    await page.getByRole('textbox', { name: "What's this article about?" }).fill(article.description);
    await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill(article.body);
    await page.getByRole('textbox', { name: 'Enter tags' }).fill(article.tag);
    await newArticlePage.publish();

    await expect(page).toHaveURL(/\/editor$/);
    await expect(page.getByRole('textbox', { name: 'Article Title' })).toBeVisible();
  });
});