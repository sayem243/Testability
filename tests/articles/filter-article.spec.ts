import { expect, test } from "../../fixtures/test.fixture";

test.describe("Filter Articles by Tag", () => {
  test("filters articles by an existing tag", async ({ page, homePage }) => {
    await homePage.open();
    await homePage.filterByTag("Test");

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText("Test", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("does not show a false empty state for an unsupported tag URL", async ({
    page,
  }) => {
    await page.goto("/?tag=tag-that-does-not-exist-automation");

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(
      page.getByText("No articles are here... yet.", { exact: true }),
    ).toHaveCount(0);
  });
});
