/// <reference types="node" />

import { expect, test as setup } from "@playwright/test";
import * as fs from "fs/promises";
import * as path from "path";
import * as process from "process";

const authFile = path.resolve("playwright", ".auth", "user.json");

setup("authenticate user", async ({ page }) => {
  await fs.mkdir(path.dirname(authFile), { recursive: true });
  await page.goto("/login");
  await page
    .getByRole("textbox", { name: "Email" })
    .fill(process.env.CONDUIT_EMAIL ?? "sayemiub00@gmail.com");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.CONDUIT_PASSWORD ?? "12345678");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("link", { name: /New Article/ })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
