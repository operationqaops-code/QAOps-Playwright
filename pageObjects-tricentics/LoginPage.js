const {test}=require('@playwright/test');
class LoginPage{

    constructor(page){

        this.page=page;
        this.userName=page.locator('#Email');
        this.passWord=page.locator('#Password');
        this.SignIn=page.locator(".ico-login");
        this.Login=page.getByRole("button",{name:"Log in"});

    }

    async goTo(){

        await this.page.goto("https://demowebshop.tricentis.com/");
    }

    async loginWithValidCred(username,password){
    await this.SignIn.click();
    await this.page.waitForLoadState('networkidle');
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.Login.click();

    await this.page.waitForLoadState('networkidle');

    }
}

module.exports={LoginPage};