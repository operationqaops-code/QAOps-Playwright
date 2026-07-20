import{test} from '@playwright/test'

test.only('Registering user',async({page})=>{

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");
    await page.getByRole('textbox',{name:'First Name'}).fill("Abdul");
    await page.getByRole('textbox',{name:'Last Name'}).fill("Alom");
    await page.getByRole('textbox',{name:'E-Mail'}).fill("abdul.walom@gmail.com");
    await page.getByRole('textbox',{name:'Telephone'}).fill("987653421");
    await page.getByRole('textbox',{name:'Password'}).fill('AB@123');
    await page.getByRole('textbox',{name:'* Password Confirm'}).fill('AB@123');
    await page.getByRole('radio',{name:'No'}).check();
    await page.getByRole('checkbox').check();
    await page.getByRole('button',{name:'Continue'}).click();

    await page.waitForTimeout(2000);
})
