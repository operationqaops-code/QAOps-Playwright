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
        this.confirmOrder = page.locator("input[onclick='Shipping.save()']");
        //address locators
        this.addressDropdown = page.locator('#billing-address-select');
        this.addressOptions = page.locator('option');
        this.pickpCheckbox = page.locator("label[for='PickUpInStore']");
        //shipping method locators
        this.shippingOptions = page.locator("input[name='shippingoption']");
        this.confirmShipping = page.locator(".shipping-method-next-step-button");
        //payment method locators
        this.paymentOptions = page.locator('input[name="paymentmethod"]');
        this.paymentLabels = page.locator('.payment-details label');
        this.confirmPaymentMethod = page.locator("input[class='button-1 payment-method-next-step-button']");

        //card details locators
        this.cardType = page.locator("#CreditCardType");
        this.cardholderName = page.locator("#CardholderName");
        this.cardNumber = page.locator("#CardNumber");
        this.expireMonth = page.locator("#ExpireMonth");
        this.expireYear = page.locator("#ExpireYear");
        this.cardCode = page.locator("#CardCode");

        //order confirmation locators
        this.confirmOrderButton=page.getByRole('button',{name:'Continue'});
        this.placeOrderButton=page.getByRole('button',{name:'Confirm'});
        this.continueAfterOrdere=page.getByRole('button',{name:'Continue'});

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
        await this.page.waitForLoadState('networkidle');
        // await this.pickpCheckbox.check();


    }

    async getShippingMethod(ExpectedShippingMethod) {
        //await this.shippingOptions.waitFor();
        const count = await this.shippingOptions.count();


        for (let i = 0; i < count; i++) {
            const radio = await this.shippingOptions.nth(i);
            const value = await radio.getAttribute('value');


            if (value?.trim().includes(ExpectedShippingMethod)) {
                await radio.click();
                break;
            }
        }

        await this.confirmShipping.click();

    }

    async getPaymentMethod(PaymentMethod) {
        await this.paymentOptions.first().waitFor();
        const count = await this.paymentOptions.count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            const radio = await this.paymentOptions.nth(i);
            const label = await this.paymentLabels.nth(i).textContent();
            if (label?.trim().includes(PaymentMethod)) {
                await radio.click();
                break;
            }
        }
        await this.confirmPaymentMethod.click();

    }

    async getCardDetails(cardType, cardholderName, cardNumber, expireMonth, expireYear, cardCode) {

        await this.cardType.selectOption({ label: cardType });
        await this.cardholderName.fill(cardholderName);
        await this.cardNumber.fill(cardNumber);
        await this.expireMonth.selectOption({ label: expireMonth });
        await this.expireYear.selectOption({ label: expireYear });
        await this.cardCode.fill(cardCode);

    }

    async confirmOrderr() {
        await this.page.waitForLoadState('networkidle');
        await this.confirmOrderButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText('Your order has been successfully processed!')).toBeVisible();
        await this.continueAfterOrdere.click();
        



    }
}

module.exports = { checkoutPage };
