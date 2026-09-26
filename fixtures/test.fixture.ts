import { test as base } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { ArticleApi } from "../api/ArticleApi";
import { ArticlePage } from "../pages/ArticlePage";
import { HomePage } from "../pages/HomePage";
import { NewArticlePage } from "../pages/NewArticlePage";
import { SettingsPage } from "../pages/SettingsPage";

type Fixtures = {
  articleApi: ArticleApi;
  articlePage: ArticlePage;
  homePage: HomePage;
  newArticlePage: NewArticlePage;
  settingsPage: SettingsPage;
};

export const test = base.extend<Fixtures>({
  articleApi: async ({ request }, use) => {
    const authFile = path.join(
      process.cwd(),
      "playwright",
      ".auth",
      "user.json",
    );
    const authState = JSON.parse(await fs.readFile(authFile, "utf8")) as {
      origins?: Array<{
        localStorage?: Array<{ name: string; value: string }>;
      }>;
    };
    const token = authState.origins
      ?.flatMap((origin) => origin.localStorage ?? [])
      .find((entry) => entry.name === "jwtToken")?.value;

    if (!token) {
      throw new Error(`jwtToken was not found in ${authFile}`);
    }

    await use(new ArticleApi(request, token));
  },
  articlePage: async ({ page }, use) => use(new ArticlePage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  newArticlePage: async ({ page }, use) => use(new NewArticlePage(page)),
  settingsPage: async ({ page }, use) => use(new SettingsPage(page)),
});

export { expect } from "@playwright/test";
