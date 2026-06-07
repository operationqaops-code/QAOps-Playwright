// Array function with Filter Method

//Create a Array with even number of scores and multiply by 3

var marks=[10,20,30,34,37,56,87,99];
var evenMarks=[];

for(i=0;i<marks.length;i++){

    if(marks[i]%2==0)
    {
        evenMarks.push(marks[i]);
    }

}

//console.log(evenMarks);

var evenScores=marks.filter(score=>score%2==0)
console.log(evenScores);

//map

let mappedArray=evenScores.map(score=>score*3);

//sum of the mapped array

let sumofArray=mappedArray.reduce((sum,val)=>sum+val,0);

console.log(mappedArray);
console.log(sumofArray);

var MarksArr=[10,20,30,45,60];
let sumOfArrayElement=MarksArr.filter(score=>score%2==0).map(score=>score*3).reduce((sum,val)=>sum+val,0);

console.log(sumOfArrayElement);

//sorting in array

var fruits=["banana","mango","apple"];

let afterSort=fruits.sort();
console.log(afterSort);



//Function

/*
function Add(){

    return a+b;

}

let sum=Add(2,3);
console.log(sum)


Anonymous function

let addTwoNumber =function(a,b)
{
    return a+b;
}

console.log(addTwoNumber(4,3)); */

let sumTwoNumber =(c,d)=>c+d

console.log(sumTwoNumber(5,4));

console.log("JavaScript");


