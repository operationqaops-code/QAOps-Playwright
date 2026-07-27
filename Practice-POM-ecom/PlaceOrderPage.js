import{test,expect} from '@playwright/test'

test('Purchase Product', async ({ page}) => {

  await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");

})