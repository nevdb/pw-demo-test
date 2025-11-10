import { expect, test } from "@playwright/test";
import { beforeEach } from "node:test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
});

test.describe("Form Layouts page", async () => {
  test("input fields", async ({ page }) => {
    const usingTheNameInput = page
      .locator(".form-group")
      .nth(0)
      .getByRole("textbox", { name: "Name" });

    await usingTheNameInput.fill("Jane Doe");
  });
});
