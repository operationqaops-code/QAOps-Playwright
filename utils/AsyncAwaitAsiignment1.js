/* Assignment 1: Online Shopping Process
Objective:
Control the order of execution of an online shopping workflow.
Functions:
1.	login() - Login to application - 2000ms
2.	searchProduct() - Search for a product - 3000ms
3.	addToCart() - Add product to cart - 1000ms
4.	checkout() - Complete the purchase - 4000ms */

const { rejects } = require("node:assert");
const { resolve } = require("node:dns");

function login() {
    return new Promise((resolve, reject) => {


        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("login User Successfull");
                resolve()
            } else {
                console.log("login Failed");
                reject();
            }

        }, 2000)
    })
}

function searchProduct() {
    return new Promise((resolve, reject) => {


        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("product found");
                resolve()
            } else {
                console.log("no product found!");
                reject();
            }

        }, 3000)
    })
}

function addToCart() {
    return new Promise((resolve, reject) => {


        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("product added to Cart");
                resolve()
            } else {
                console.log("product not added to cart!");
                reject();
            }

        }, 1000)
    })
}

function checkOut() {
    return new Promise((resolve, reject) => {


        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Checkout order successfully");
                resolve()
            } else {
                console.log("Failed to checkout product");
                reject();
            }

        }, 4000)
    })
}

const loginUser = async () => {
    try {
        await login();
        await searchProduct();
        await addToCart();
        await checkOut();
    }
    catch {
        console.log("Failed!");
    }
}

//loginUser();

/* Assignment 2: Student Examination Portal
Objective:
Control the execution of exam portal activities.
Functions:
1.	launchPortal() - Open exam portal - 3000ms
2.	enterCredentials() - Enter username/password - 2000ms
3.	startExam() - Start examination - 1000ms
4.	submitExam() - Submit examination - 5000ms
 */

function launchPortal() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Portal Launched");
                resolve();
            }
            else {
                console.log("Portal Launch Failed!");
                reject();
            }
        }, 3000)

    })
}

function enterCredentials() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Enter your Credentials");
                resolve();
            }
            else {
                console.log("Failed to enter Credentials!");
                reject();
            }
        }, 2000)

    })

}

function startExam() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Start the Exam");
                resolve();
            } else {
                console.log("Wrong Credentials,Failed to Start the Exam!");
                reject();
            }
        }, 1000)
    })

}

function submitExam() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Submit The Exam Paper");
                resolve();
            } else {
                console.log("Sumbit Exam Failed!");
                reject();
            }
        }, 5000)
    })

}

let studentExam = async () => {
    try {
        await launchPortal();
        await enterCredentials();
        await startExam();
        await submitExam();
    }
    catch {
        console.log("Student Registration Failed");
    }
}

//studentExam();

/* Assignment 3: ATM Transaction Process
Objective:
Control the sequence of ATM operations.
Functions:
1.	insertCard() - Insert ATM card - 2000ms
2.	enterPin() - Enter PIN number - 1000ms
3.	withdrawCash() - Withdraw money - 4000ms
4.	printReceipt() - Print transaction receipt - 2000ms */




function insertCard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Card Inserted into the ATM Machine");
                resolve();
            } else {
                console.log("Card Insertion Failed!");
                reject();
            }
        }, 2000)
    })

}

function enterPin() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Pin entered Successfully!");
                resolve();
            } else {
                console.log("Pin not entered!");
                reject();
            }
        }, 1000)
    })
}

function withdrawCash() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = false;
            if (success) {
                console.log("Cash Withdrawl Successfull!");
                resolve();
            } else {
                console.log("Cash Withdrawl Failed!");
                reject();
            }
        }, 4000)
    })
}

function printReceipt() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Print Receipt successfully");
                resolve();
            } else {
                console.log("Receipt not printed!");
                reject();
            }
        }, 2000)
    })
}

const atmTransaction = async () => {

    await insertCard();
    await enterPin();
    await withdrawCash();
    await printReceipt();

}

//atmTransaction();

/* Assignment 4: Food Delivery Application
Objective:
Execute food delivery operations sequentially.
Functions:
1.	selectRestaurant() - Select restaurant - 2000ms
2.	placeOrder() - Place food order - 3000ms
3.	trackOrder() - Track delivery partner - 4000ms
4.	receiveOrder() - Receive the order - 1000ms */

function selectRestaurant() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Restaurnet selected!");
                resolve();
            } else {
                console.log("Restaureant selection Failed!");
                reject();
            }
        }, 2000)
    })
}
function placeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Order Placed!");
                resolve();
            } else {
                console.log("Placing Order Failed!");
                reject();
            }
        }, 3000)
    })
}
function trackOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Order Tracked Successfully");
                resolve();
            } else {
                console.log("Track Order Failed!");
                reject();
            }
        }, 4000)
    })
}
function receiveOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Received Order Successfully");
                resolve();
            } else {
                console.log("Order not Received!");
                reject();
            }
        }, 1000)
    })
}


const foodDelivery = async () => {
    try {
        await selectRestaurant();
        await placeOrder();
        await trackOrder();
        await receiveOrder();
    } catch {
        console.log("Order Booking Failed!");
    }
}

//foodDelivery();

/* Assignment 5: Software Testing Workflow
Objective:
Simulate a QA Engineer's testing process.
Functions:
1.	launchBrowser() - Open browser - 2000ms
2.	navigateToApplication() - Open application URL - 3000ms
3.	executeTestCases() - Execute test cases - 5000ms
4.	generateReport() - Generate test report - 2000ms */


function launchBrowser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Launch Browser Successfully");
                resolve();
            } else {
                console.log("Browser Not Launched!");
                reject();
            }
        }, 2000)
    })
}
function navigateToApplication() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Navigation to APPs Successfull");
                resolve();
            } else {
                console.log("Navigation to APP Failed!");
                reject();
            }
        }, 3000)
    })
}

function executeTestCases() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Start executing TestCases");
                resolve();
            } else {
                console.log("Test Case not Executed!");
                reject();
            }
        }, 5000)
    })
}

function generateReport() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                console.log("Report Generated Successfully");
                resolve();
            } else {
                console.log("Report not Generated!");
                reject();
            }
        }, 2000)
    })
}

const executeTest = async () => {

    await launchBrowser();
    await navigateToApplication();
    await executeTestCases();
    await generateReport();
    console.log("----------------------------");
    console.log("Testing completed successfully");

}

executeTest();