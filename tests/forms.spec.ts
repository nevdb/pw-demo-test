import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/");
  await page.getByText("Text Input").click();
});

test("Find input", async ({ page }) => {
  await page.locator("#newButtonName").click();
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Set New Button Name" }).click();
  await page
    .getByRole("button", {
      name: "Button That Should Change it's Name Based on Input Value",
    })
    .click();
});

test("extracting values", async ({ page }) => {
  //single test value
  const basicForm = page.locator(".form-group");
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toEqual(
    "Button That Should Change it's Name Based on Input Value"
  );

  //all h4 tags
  const allH4HtmlTags = await page.locator(".container h4").allTextContents();
  expect(allH4HtmlTags).toContain("Playground");

  //input value
  const myInputButtonField = basicForm.getByRole("textbox", {
    name: "Set New Button Name",
  });
  await myInputButtonField.fill("change input value");
  const myInputValue = await myInputButtonField.inputValue();
  expect(myInputValue).toEqual("change input value");

  const placeholderValue = await myInputButtonField.getAttribute("placeholder");
  expect(placeholderValue).toEqual("MyButton");
});

test("Change button text", async ({ page }) => {
  await page
    .locator(".form-group")
    .getByPlaceholder("MyButton")
    .fill("change my button text");

  await page.locator(".form-group").getByRole("button").click();

  await expect(page.locator(".form-group").getByRole("button")).toHaveText(
    "change my button text"
  );
});

test("assertions", async ({ page }) => {
  const basicFormButton = page.locator(".form-group").getByRole("button");
  const buttonText = await basicFormButton.textContent();
  expect(buttonText).toEqual(
    "Button That Should Change it's Name Based on Input Value"
  );
});
