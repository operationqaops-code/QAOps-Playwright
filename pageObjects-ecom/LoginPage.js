class LoginPage{

    constructor(page){

        this.page=page;
        this.username=page.locator('#userEmail');
        this.password=page.locator('#userPassword');
        this.loginBtn=page.locator('#login');
       
    }

    async goTo(){

        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async signUpUser(username, password){
            
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');

    }
}

module.exports={LoginPage};