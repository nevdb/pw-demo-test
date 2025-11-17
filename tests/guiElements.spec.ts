import { expect, test } from "@playwright/test";
import { assert } from "console";
import { beforeEach } from "node:test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
});

test.describe("Form Layouts page - GUI Elements", async () => {
  test("input field Name", async ({ page }) => {
    const usingTheNameInput = page
      .locator(".form-group")
      .nth(0)
      .getByRole("textbox", { name: "Name" });

    await usingTheNameInput.fill("Jane Doe");
    await usingTheNameInput.clear();
  });

  test("input field Email", async ({ page }) => {
    const usingTheEmailInput = page
      .locator(".form-group")
      .getByPlaceholder("Enter EMail");

    await usingTheEmailInput.fill("test@test.com");
    await usingTheEmailInput.clear();
    await usingTheEmailInput.pressSequentially("test@test.com", { delay: 500 });

    //generic assertion
    const inputValue = await usingTheEmailInput.inputValue();
    expect(inputValue).toEqual("test@test.com");

    //locator assertion
    await expect(usingTheEmailInput).toHaveValue("test@test.com");
  });

  test("input field Phone", async ({ page }) => {
    const usingThePhoneInput = page
      .locator(".form-group")
      .getByRole("textbox", { name: "phone" });
    await usingThePhoneInput.fill("+35988888888");
    await usingThePhoneInput.clear();
  });

  test("input field Address", async ({ page }) => {
    const usingTheAddressInput = page
      .locator(".form-group")
      .getByLabel("Address:");
    await usingTheAddressInput.fill("BG, Varna");
    await usingTheAddressInput.clear();
  });

  test("radio buttons", async ({ page }) => {
    const usingGUIElements = page.locator(".form-group");

    //await usingGUIElements.getByLabel("Female").check();

    // await usingGUIElements
    //   .locator('input[name="gender"][value="female"]')
    //   .check();

    await usingGUIElements.getByRole("radio", { name: "female" }).check();
    const radioButtonFemale = usingGUIElements.getByRole("radio", {
      name: "female",
    });
    expect(radioButtonFemale).toBeChecked();

    await usingGUIElements
      .locator('input[name="gender"][value="male"]')
      .check();
    const radioButtonMale = usingGUIElements.locator(
      'input[name="gender"][value="male"]'
    );
    expect(await radioButtonFemale.isChecked()).toBeFalsy();
    expect(await radioButtonMale.isChecked()).toBeTruthy();
  });

  test("checkboxes", async ({ page }) => {
    await page.locator(".form-group");

    await page.getByRole("checkbox", { name: "Sunday" }).click();
    await page.getByRole("checkbox", { name: "Monday" }).check();
    await page.getByRole("checkbox", { name: "Saturday" }).click();

    expect(
      await page.getByRole("checkbox", { name: "Sunday" }).isChecked()
    ).toBeTruthy();
    expect(
      await page.getByRole("checkbox", { name: "Monday" }).isChecked()
    ).toBeTruthy();
    expect(
      await page.getByRole("checkbox", { name: "Saturday" }).isChecked()
    ).toBeTruthy();
    expect(
      await page.getByRole("checkbox", { name: "Tuesday" }).isChecked()
    ).toBeFalsy();
    expect(
      await page.getByRole("checkbox", { name: "Wednesday" }).isChecked()
    ).toBeFalsy();
    expect(
      await page.getByRole("checkbox", { name: "Thursday" }).isChecked()
    ).toBeFalsy();
    expect(
      await page.getByRole("checkbox", { name: "Friday" }).isChecked()
    ).toBeFalsy();

    const allBoxes = page.locator(".form-group").nth(3).getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.check();
      expect(await box.isChecked).toBeTruthy();
    }
  });

  test("lists and dropdowns - Country", async ({ page }) => {
    const dropdownMenu = page.locator("select[id='country']");
    await dropdownMenu.click();

    const optionCountryList = page.locator("select[id='country'] option");
    await expect(optionCountryList).toHaveCount(10);

    await expect(optionCountryList.filter({ hasText: "France" })).toHaveCount(
      1
    );

    await dropdownMenu.selectOption({ label: "Brazil" });
    await expect(dropdownMenu).toHaveValue("brazil");

    const countries = {
      usa: "United States",
      canada: "Canada",
      uk: "United Kingdom",
      germany: "Germany",
      france: "France",
      australia: "Australia",
      japan: "Japan",
      china: "China",
      brazil: "Brazil",
      india: "India",
    };

    await dropdownMenu.click();
    for (const country in countries) {
      await dropdownMenu.selectOption({ label: countries[country] });
      const selectedOption = page.locator(
        "select[id='country'] option:checked"
      );
      await expect(selectedOption).toHaveText(countries[country]);
      if (country != "india") {
        await dropdownMenu.click();
      }
    }
  });

  test("Colors list", async ({ page }) => {
    const colorList = page.locator(".form-group").getByLabel("Colors:");
    await expect(colorList.locator("option")).toHaveCount(7);

    await colorList.selectOption({ label: "White" });
    await expect(colorList).toHaveValue("white");
  });

  test("Sorted list", async ({ page }) => {
    const animalsList = page.locator(".form-group").getByLabel("Sorted List:");
    await expect(animalsList.locator("option")).toHaveCount(10);

    await animalsList.selectOption({ label: "Fox" });
    await expect(animalsList).toHaveValue("fox");
  });

  test("select date in Date Picker 1", async ({ page }) => {
    const datePicker1Field = page.locator("#datepicker");
    await datePicker1Field.click();

    const datePickerContainer = page.locator("#ui-datepicker-div");
    await expect(datePickerContainer).toHaveCSS("display", "block");

    await datePickerContainer.getByText("17", { exact: true }).click();

    await datePicker1Field.click();

    const todayDateLocator = page.locator(
      "td.ui-datepicker-today a.ui-state-highlight"
    );

    await expect(todayDateLocator).toHaveCSS(
      "background-color",
      "rgb(255, 250, 144)"
    );

    const selectedDateLocator = page.locator(
      "td.ui-datepicker-current-day a.ui-state-active",
      { hasText: "17" }
    );
    await expect(selectedDateLocator).toBeVisible;

    await expect(selectedDateLocator).toHaveCSS(
      "background-color",
      "rgb(255, 250, 144)"
    );

    await selectedDateLocator.click();

    const selectDate = await datePicker1Field.inputValue();
    expect(selectDate).toContain("11/17/2025");

    expect(
      page.locator(".ui-datepicker-title span.ui-datepicker-month")
    ).toHaveText("November");

    await datePicker1Field.click();

    const datepickerNextArrow = page.locator(
      "div.ui-datepicker-header a.ui-datepicker-next"
    );
    await datepickerNextArrow.click();

    await datePicker1Field.click();
    expect(
      page.locator(".ui-datepicker-title span.ui-datepicker-month")
    ).toHaveText("December");
  });

  test("select date in date picker date2", async ({ page }) => {
    const datePicker2Field = page.locator("#txtDate");

    await datePicker2Field.click();
    expect(page.locator("#ui-datepicker-div")).toBeVisible();

    await page
      .locator("#ui-datepicker-div table tbody tr td a[data-date='27']")
      .click();
    expect(
      page.locator("#ui-datepicker-div table tbody tr td a[data-date='27']")
    ).toHaveCSS("background-color", "rgb(0, 127, 255)");

    await datePicker2Field.click();
    await page.locator(".ui-datepicker-next").click();
    expect(
      page.locator('.ui-datepicker-title select option[value="11"]')
    ).toHaveAttribute("selected");

    await page
      .locator("#ui-datepicker-div table tbody tr td a[data-date='24']")
      .click();
    await page.locator("#txtDate");

    await datePicker2Field.click();
    expect(
      page.locator(
        "#ui-datepicker-div table tbody tr td[data-month='11'] a[data-date='24']"
      )
    ).toHaveClass("ui-state-default ui-state-active");
  });
});
