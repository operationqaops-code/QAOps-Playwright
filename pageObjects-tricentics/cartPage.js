const{test,expect}=require('@playwright/test');

class cartPage{

    constructor(page){
        this.page=page;
        this.options = page.locator('#CountryId option');
        this.countryDropdown = page.locator('#CountryId');
        this.postalCode=page.locator("#ZipPostalCode");
        this.checkBoxAgree=page.locator("#termsofservice");
        this.checkOut=page.locator("#checkout");

    }

    async getCountry(countryName){

        const count = await this.options.count();
        for(let i=0;i<count;i++){
            const country=await this.options.nth(i).textContent();
            //console.log(country);
            if(country?.trim()==countryName){
                const value = await this.options.nth(i).getAttribute('value');
                await this.countryDropdown.selectOption(value);
                break;

            }
        }

    }

    async fillPostalCode(pinCode){

        await this.postalCode.fill(pinCode);
        await this.checkBoxAgree.check();
        await this.checkOut.click();
    }

    
}

module.exports={cartPage};