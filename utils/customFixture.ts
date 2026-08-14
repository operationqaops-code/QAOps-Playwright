import { test as base } from '@playwright/test';
import { expect,request } from '@playwright/test';

const loginPayload = { email: "awalom.official4@gmail.com", password: "Abdul@7866" };

type MyFixtures = {
  token: string;
};


export const customTest = base.extend<MyFixtures>({

    token: async ({}, use) => {

        let apiContext = await request.newContext();
        const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            {
                data: loginPayload
            })
        console.log(loginResponse.status());
        //console.log(await loginResponse.text());
        expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJSON: any = await loginResponse.json();
        console.log(loginResponseJSON);
        const token = loginResponseJSON.token;
        await use(token);


    }

});

export { expect };