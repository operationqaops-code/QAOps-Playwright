function countOdds(numbers) {
 let count=0;
  //let numbers=[];
  for(let i=0;i<numbers.length;i++)
    {
        if(numbers[i] % 2 !==0){
          count++;
          //console.log(numbers[i]);
        }
    }
  
  return count;
  
}

const result=countOdds([1,5,2,6,5,3,9,2]);
//console.log(result);


function theGround(obj) {

    if(obj.name.length >= obj.Location.length){
        return obj.name;
    }

    return obj.Location;
  
}

const GrResult=theGround({name:"Netaji Stadium",Location:"kolkata"});

//console.log(GrResult);

//Two numbers are given a and b. Return true if one of the two numbers is 42 or the sum of the two numbers.

function is42(a, b) {

    if (a === 42 || b === 42 || a + b === 42) {
        return true;
    }
    return false;

  
}

const sum=is42(2,41);
//console.log(sum);

//Given is an array chars with different letters. Return the array in reverse order.

function reverseLetters(chars) {

    /*const reversed = [];

    for (let i = chars.length - 1; i >= 0; i--) {
    reversed.push(chars[i]);
    }
    return reversed; */

    return chars.reverse();
  
}

const revResult=reverseLetters(['b','d','x','p','w']);
//console.log(revResult);

/* Create an object with the following characteristics: 4 wheels (named wheels as integer),
 100PS power (named power and integer), 3 doors (named doors as integer). Return the built car.
 Expected:

 {"wheels":4,
"power":100,
"doors":3}

*/

const Cars={
    "wheels":4,
    "power":100,
    "doors":3

};

function buildingACar(obj) {

      return obj;
}


//console.log(JSON.stringify(buildingACar(Cars)));

/*A string url is given. It contains a URL with the HTTP protocol. Return this URL with the HTTPS protocol.

Examples:

http://jscodebox.com/ => https://jscodebox.com/ */

function http2https(url) {
    return url.replace("http://", "https://");
  
}


//console.log(http2https('http://jscodebox.com/'));

//A string string is given. Replace every occurrence of the word 'bug' with the word 'flower'.

function bugFix(string) {
  return string.replace("bug","flower");
}

//console.log(bugFix('xxbugYYX'));

//Given are two arrays a and b, both have three elements. Return a new array of length 2 containing both middle (index 1) elements of the arrays.

function goldenMiddle(a, b) {

    let resA;
    let resB;


    for(let i=0;i<a.length;i++){
        resA=a[1];
        
    }

    for(let j=0;j<b.length;j++){
            resB=b[1];
        }
    
    return [resA,resB];

}

//console.log(goldenMiddle([1,9,8],[4,6,2]));

//Code a for loop that runs through all numbers from 0-99 and append all numbers divisible by seven into a string. Return this string.

function easyLoop() {
      let result = '';

    for (let i=0;i<100;i++){
        if(i % 7==0){
            result += i;
        }
    }
  return result;
}

//console.log(easyLoop());

/*Given are two strings password and password_repeat. Check if the password is secure by the following critera:
- both passwords must match
- password must be at least 20 chars

Return true only if all criteria are met, otherwise return false. */


function checkPassword(password, password_repeat) {

    if(password===password_repeat && password.length>=20){
       return true;
    }else{
        return false;
    }
    

  
}

//console.log(checkPassword('omvdse@123','omvdse@123'));

//Given is an array n with integers. Return true if it contains more four than zero.

function more4than0(n) {

    let count=0;
    let count4=0;
    for(let i=0;i<n.length;i++){
        if(n[i]==0){
            count ++;

        }else if (n[i]==4) {
            count4 ++;
            
        }

    }
    if(count4 > count){
        return true;
    }else{
        return false;
    }
    
  
}

//console.log(more4than0([4,0,4,0]));

//The parameter n is given. Return the difference of n to the number 42. The number must be positive.

function difference42(n) {

    const num=42;
    let result;
    if(n>num){
        result=n-num;
    }else{
        result=num-n;
    }

    return result
}
//console.log(difference42(42));


//A string string is given. Remove any occurrence of 'bug' by 'flower'. Attention: 'bug' can occur several times in the string.

function bugFixFinal(string) {
  return string.replaceAll("bug", "flower");
}

//console.log(bugFixFinal('xxbugXbugbugYYy'));

//Given is a word word. Run through the word and merge every second letter into a new word.

function strangeWord(word) {
    let newWord="";
    for(let i=0;i<word.length;i++){
        if(i%2==0){
            newWord += word[i];
        }

    }

    return newWord;
  
}

//console.log(strangeWord('JSCodebox'));

/* Read the first name and last name from the inputs (#firstname and #lastname) and write the full name into the #fullname input. 
If an input is not filled add this placeholder #. */

function whatIsMyName() {
    const firstName = document.querySelector('#firstname').value || '#';
    const lastName = document.querySelector('#lastname').value || '#';

    document.querySelector('#fullname').value = `${firstName} ${lastName}`;
}

//Two numbers are given a and b. Return their sum. If both numbers are equal, return their product.

function totalProduct(a, b) {
    if(a===b){
        return a*b;
    }else{
        return a+b;
    }
  
}

//console.log(totalProduct(7,7))

//Given is a text headline. Write this string in a h1 HTML tag and append it to the HTML body.
/*
function printHeadline(headline) {
    const h1 = document.createElement('h1');
    h1.textContent = headline;
    document.body.appendChild(h1);
}
*/

//Given is a string hangmanString. Replace every second letter with an underscore and return the result as a string.
// The first character must be an underscore.

function hangman(hangmanString) {
    let newStr=""
  
    for(let i=0;i<hangmanString.length;i++){
        if(i%2==0){
           newStr += "_";
          // console.log(newStr);
        }else{
            newStr += hangmanString[i];
           // console.log(newStr);
        }
    }

    return newStr;
}

//console.log(hangman("TestString"));

//Write a JavaScript function that calculates the average grade of a student based on the scores they achieved in different subjects.
//  Given is the array scores. Return the calculated average rounded to two decimal places. The length of the array will be at least 1.

function calculateAverageGrade(scores) {
    let sum=0;
    let avg;
    
    for(let i=0;i<scores.length;i++){
        sum+=scores[i];
        

    }

      avg = sum / scores.length;

    return Number(avg.toFixed(2));
  
}

//console.log(calculateAverageGrade([85,90,92,88,76]));

function removeObjectProperties(object, removeProperties) {
    const clone = { ...object };

    for (let i = 0; i < removeProperties.length; i++) {
        delete clone[removeProperties[i]];
    }

    return clone;
}

// Example
const object = {
    name: "John",
    age: 25,
    city: "London"
};

const removeProperties = ["age"];

//console.log(removeObjectProperties(object, removeProperties));

//A string sentence is given. Return true if the block starts with "Hello".

function firstHello(sentence) {

    if(sentence.startsWith("Hello")){
        return true;
    }else{
        return false;
    }

  
}

//console.log(firstHello('Hello world!'));

//Given is a string n. The task is to return the sentence in CamelCase notation. 
//This means that each new word is capitalized and immediately appended to the old word. Start with a lowercase letter.


//Given is a String string and a number n. Return a string with the section from 0 to n in a row. In each run n is to be decremented.

function repeater(string, n) {
    let result="";

    for(let i=n;i>0;i--){
        result += string.substring(0,i);
    }
  return result;
}

//console.log(repeater("Hello coder!",5));

// let expenses=[10,20,30,40,50]
// let Sum=0;
// let Highest;
// let Lowest;
// for(let i=0;i<expenses.length;i++){
    
//     Sum+=expenses[i];
    
// }


// Highest=Math.max(...expenses);
// Lowest=Math.min(...expenses);
// console.log("sum of the expenses: "+ Sum);
// console.log("Highest expenses is: " + Highest);
// console.log("Lowest expenses is: " + Lowest);
