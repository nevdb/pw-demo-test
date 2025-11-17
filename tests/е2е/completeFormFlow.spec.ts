import { expect, test } from "@playwright/test";

test("End-To-End test on Test Automation Practice", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.locator("#name").fill("Jane Doe");
  await page.locator("#email").fill("test@test.com");
  await page.locator("#phone").fill("+35988888888");
  await page.locator("#textarea").fill("BG, Varna");

  await page.locator("input[type='radio'][value='female']").check();

  await page.locator("input[type='checkbox'][value='friday']").check();

  const countryDropdown = page.locator("#country");
  await countryDropdown.selectOption({ label: "France" });
  expect(countryDropdown).toHaveValue("france");

  const colorsSelectList = page.locator("#colors");
  expect(colorsSelectList.locator('option[value="blue"]')).toHaveCSS(
    "color",
    "rgb(73, 80, 87)"
  );
  await colorsSelectList.selectOption({ label: "Blue" });
  expect(colorsSelectList.locator('option[value="blue"]')).toHaveCSS(
    "color",
    "rgb(16, 16, 16)"
  );

  const datePickerDate1Field = page.locator("#datepicker");
  await datePickerDate1Field.click();
  await page
    .locator("#ui-datepicker-div")
    .getByText("17", { exact: true })
    .click();
  const selectedDateDatePicker1 = await datePickerDate1Field.inputValue();
  expect(selectedDateDatePicker1).toContain("11/17/2025");
});
