import{test as baseTest } from '@playwright/test';

interface TestDataForOrder{
    userName : string;
    userPassword : string;
    productName : string;

};

export const customtest=baseTest.extend<{testDataForOrder:TestDataForOrder}>({

    testDataForOrder:{
        userName     : "awalom.official@gmail.com",
        userPassword : "Abdul@786",
        productName  : "ZARA COAT 3"
    }



})