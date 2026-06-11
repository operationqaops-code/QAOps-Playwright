const { test, expect } = require('@playwright/test');

class checkoutPage {

    constructor(page) {
        this.page = page;
        this.Email = page.locator("#BillingNewAddress_Email");
        this.options = page.locator('#BillingNewAddress_CountryId option');
        this.countryDropdown = page.locator('#BillingNewAddress_CountryId');
        this.city = page.locator("#BillingNewAddress_City");
        this.address1 = page.locator("#BillingNewAddress_Address1");
        this.postalCode = page.locator("#BillingNewAddress_ZipPostalCode");
        this.phoneNumber = page.locator("#BillingNewAddress_PhoneNumber");
        this.continueButton = page.locator("//input[@onclick='Billing.save()']")
        this.confirmOrder = page.getByRole("button", { name: "Continue" });
        //address locators
        this.addressDropdown = page.locator('#billing-address-select');
        this.addressOptions = page.locator('option');


    }

    //filling the mandatory details in checkout page and assertion of email address

    async checkOutProduct(userName, countryName, city, address1, pinCode, phoneNumber) {
        //assertion of  email address in checkout page
        const EmailAddress = await this.Email.inputValue();
        console.log(EmailAddress);
        await expect(EmailAddress).toBe(userName);

        let addressExists = false;

        const addressOptions = this.addressDropdown.locator('option');
        const countAddress = await addressOptions.count();

        for (let i = 0; i < countAddress; i++) {

            const address = await addressOptions.nth(i).textContent();

            console.log(address);

            // Skip New Address option
            if (address?.trim() === 'New Address') {
                continue;
            }

            // Check whether the saved address matches
            if (
                address?.includes(address1) &&
                address?.includes(city)
            ) {
                console.log("Matching address found");
                addressExists = true;
                break;
            }
        }

        // After checking all addresses
        if (!addressExists) {

            console.log("Address not found. Creating new address");

            await this.addressDropdown.selectOption({ label: 'New Address' });

            await this.countryDropdown.selectOption({ label: countryName });

            await this.city.fill(city);
            await this.address1.fill(address1);
            await this.postalCode.fill(pinCode);
            await this.phoneNumber.fill(phoneNumber);

        } else {

            console.log("Address already exists. Using existing address.");
        }

        // Common step
        await this.continueButton.click();
        await this.confirmOrder.click();


    }
}
module.exports = { checkoutPage };
