class LoginPage{

    constructor(page){

        this.page=page;
        this.signInButton=page.locator('input#login');
        this.userName=page.locator('#userEmail');
        this.passWord=page.locator('#userPassword');

    }

    async goTo(){

        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username,password){
            
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.signInButton.click();

    await this.page.waitForLoadState('networkidle');

    }
}

module.exports={LoginPage};