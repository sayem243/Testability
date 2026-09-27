import { expect, test } from "../../fixtures/test.fixture";

test.describe("Update User Settings", () => {
  test.describe.configure({ mode: "serial" });

  test("updates supported user information", async ({
    page,
    settingsPage,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "This test mutates the shared account profile",
    );

    const timestamp = Date.now();
    const updatedProfile = {
      email: `playwright.${timestamp}@example.com`,
      bio: `Playwright settings test bio ${timestamp}`,
    };
    const profileResponse = page.waitForResponse((response) => {
      const request = response.request();
      return (
        /\/user(?:\/|$)/.test(response.url()) &&
        request.method() === "GET" &&
        response.ok()
      );
    });

    await page.goto("/");
    const originalProfile = (
      (await (await profileResponse).json()) as { user: { bio: string } }
    ).user as { email: string; bio: string };
    await settingsPage.open();

    try {
      await settingsPage.updateProfile(updatedProfile);

      const reloadedProfileResponse = page.waitForResponse((response) => {
        const request = response.request();
        return (
          /\/user(?:\/|$)/.test(response.url()) &&
          request.method() === "GET" &&
          response.ok()
        );
      });
      await page.goto("/");
      await settingsPage.open();
      const reloadedProfile = (await (
        await reloadedProfileResponse
      ).json()) as {
        user: { email: string; bio: string };
      };
      expect(reloadedProfile.user.email).toBe(updatedProfile.email);
      expect(reloadedProfile.user.bio).toBe(updatedProfile.bio);
      //await expect(settingsPage.emailInput()).toHaveValue(updatedProfile.email);
      //await expect(settingsPage.bioInput()).toHaveValue(updatedProfile.bio);
    } finally {
      await page.goto("/settings");
      await settingsPage.updateProfile(originalProfile);
    }
  });

  test("does not save an invalid email address", async ({
    page,
    settingsPage,
  }) => {
    await page.goto("/settings");
    await settingsPage.open();
    await page.getByRole("textbox", { name: "Email" }).fill("not-an-email");
    await page.getByRole("button", { name: "Update Settings" }).click();

    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(
      "not-an-email",
    );
    await expect(page).toHaveURL(/\/settings$/);
  });
});
