//startMachine
//boilWater
//addMilk
//addCoffePowder
//pourIntoCup

async function startMachine(){
    setTimeout(()=>{
        console.log("Machine Started");
        
    },4000)

}

async function boilWater(){
    setTimeout(()=>{
        console.log("Boil Water");
        
    },8000)
}

async function  addMilk(){
    setTimeout(()=>{
        console.log("Add milk");
     
    },2000)
}

async function addCoffePowder(){
    setTimeout(()=>{
        console.log("Add Coffe Powder");
        
    },3000)
}

async function pourIntoCup(){
    setTimeout(()=>{
        console.log("pour into the cup");
        
    },4000)
}



for (let i = 1; i <= 5; i++) {
    let pattern = "";
    for (let j = 1; j <= i; j++) {
        pattern += "*";
    }
    console.log(pattern);
}

for(let i=4;i>=1;i--){
    let pattern = "";
    for(let j=1;j<=i;j++){
        pattern+="*";
    }
    console.log(pattern);
}


for (let i = 1; i <= 5; i++) {
    console.log("*".repeat(i));
}

// Lower half
for (let i = 4; i >= 1; i--) {
    console.log("*".repeat(i));
}

