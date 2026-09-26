import { test, expect } from '../../fixtures/test.fixture';
import { generateBio } from '../../utils/dataGenerator';

test.describe('Update User Settings', () => {
  test('updates supported user information', async ({ page, settingsPage }) => {
    const bio = generateBio();

    await page.goto('/');
    await settingsPage.open();
    await settingsPage.updateBio(bio);

    await expect(page).toHaveURL(/\/(settings)?$/);
    await page.goto('/settings');
    await expect(settingsPage.bioInput()).toHaveValue(bio);
  });

  test('does not save an invalid email address', async ({ page, settingsPage }) => {
    await page.goto('/settings');
    await settingsPage.open();
    await page.getByRole('textbox', { name: 'Email' }).fill('not-an-email');
    await page.getByRole('button', { name: 'Update Settings' }).click();

    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('not-an-email');
    await expect(page).toHaveURL(/\/settings$/);
  });
});