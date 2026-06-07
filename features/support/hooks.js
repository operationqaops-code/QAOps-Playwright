const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');
const { Before,After,AfterStep, BeforeStep,Status} = require('@cucumber/cucumber');
const { createLanguageService } = require('typescript');

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(function () {
    console.log("I am the last to execute");
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
   await  this.page.screenshot({path: 'screenshot1.png'});
  }
});