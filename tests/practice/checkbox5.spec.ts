import { Locator, test } from '@playwright/test';

test.skip('checkbox handling', async ({ page }) => {

    await page.goto("https://www.testmuai.com/selenium-playground/checkbox-demo/");

    let arr = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    let getAllLocators: Locator[] = arr.map(a => page.getByLabel(a).nth(0));

    for (const element of getAllLocators) {

        if (await element.isDisabled()) {
            continue;
        } else {
            await element.check();
        }

    }

    await page.pause();

});

test('All checkbox handling', async ({ page }) => {

    await page.goto(
        'https://www.testmuai.com/selenium-playground/checkbox-demo/'
    );

    const arr = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    for (const option of arr) {

        let checkboxes = page.getByLabel(option);
        let count = await checkboxes.count();
        for (let i = 0; i < count; i++) {

            const checkbox = checkboxes.nth(i);

            if (await checkbox.isDisabled()) {
                continue;
            }

            if (!(await checkbox.isChecked())) {
                await checkbox.check();
            }
        }
    }



    await page.pause();
});