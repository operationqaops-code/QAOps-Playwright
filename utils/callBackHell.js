//startMachine
//boilWater
//addMilk
//addCoffePowder
//pourIntoCup

function startMachine(callBack){
    setTimeout(()=>{
        console.log("Machine Started");
        callBack();
    },4000)

}

function boilWater(callBack){
    setTimeout(()=>{
        console.log("Boil Water");
        callBack();
    },8000)
}

function  addMilk(callBack){
    setTimeout(()=>{
        console.log("Add milk");
        callBack();
    },2000)
}

function addCoffePowder(callBack){
    setTimeout(()=>{
        console.log("Add Coffe Powder");
        callBack();
    },3000)
}

function pourIntoCup(){
    setTimeout(()=>{
        console.log("pour into the cup");
        
    },4000)
}

/*startMachine();
boilWater();
addMilk();
addCoffePowder();
pourIntoCup(); */

startMachine(()=>{

    boilWater(()=>{
        addMilk(()=>{
            addCoffePowder(()=>{
                pourIntoCup()
            })
        })
    });
})
