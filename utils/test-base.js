const base=require('@playwright/test');

exports.customtest=base.test.extend({

    testDataForOrder:{
        userName     : "awalom.official@gmail.com",
        userPassword : "Abdul@786",
        productName  : "ZARA COAT 3"
    }



})