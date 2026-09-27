/// <reference types="node" />

import { expect, test as setup } from "@playwright/test";
import * as fs from "fs/promises";
import * as path from "path";
import * as process from "process";

const authFile = path.resolve("playwright", ".auth", "user.json");

setup("authenticate user", async ({ page }) => {
  const email = process.env.CONDUIT_EMAIL;
  const password = process.env.CONDUIT_PASSWORD;

  if (!email || !password) {
    throw new Error("CONDUIT_EMAIL and CONDUIT_PASSWORD must be configured.");
  }

  await fs.mkdir(path.dirname(authFile), { recursive: true });
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("link", { name: /New Article/ })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
