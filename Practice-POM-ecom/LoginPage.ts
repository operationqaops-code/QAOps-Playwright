import {Locator,Page} from '@playwright/test';
export class LoginPage{

    username:Locator;
    password:Locator;
    loginBtn:Locator;
    page:Page;

    constructor(page:Page){

        this.page=page;
        this.username=page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password=page.getByRole('textbox', { name: 'Password' });
        this.loginBtn=page.getByRole('button', { name: 'Login' });
    }

    async goTo(){

        await this.page.goto("https://tutorialsninja.com/demo/index.php?route=account/login");
    }

    async signUpUser(username:string, password:string){
            
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');

    }
}

export default LoginPage;