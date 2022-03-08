
// Burger ingredients list
var ingredients={
    patty: 5,
	chicken: 5,
    bun: 5,
    lettuce: 5,
    pickle: 5,
	onion: 5,
	tomato: 5,
	fries: 5,
	coke: 5,
    sauce: 5,
};

// Preferable cooking selection for customer
var cookingSelection={
    rare: 2000,
    medium: 3000,
    wellDone: 4000,
    chicken: 3000,
}

//  Preperation processess for burger order
var process = [
    // 0
    {description: "Order Taken ", time: 1000},
    // 1
    {description: "Stock Check ", time: 3000},
    // 2
    {description: "Patty / Chicken ", time: 1000},
    // 3
    {description: "Potato Fries ", time: 5000},
    // 4
    {description: "Beverage Preperation ", time: 2000},
    // 5
    {description: "Sauces & Tray Preperation ", time: 1000},
    // 6
    {description: "Serving ", time: 1000},
    // 7
    {description: "Burger Preperation ", time: 2000},

];

// order function takes process from object and time | Promise
function order(process, time){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(process())
        }, time);
    });
}

// stock check for elements and returns availability 
function checkStock(ingredients) {
    return new Promise((resolve, reject) => {
        if(Object.values(ingredients).every((element) => element > 0)){
            setTimeout(()=>{
                resolve(console.log("Stock Exist"))
            }, process[1].time)
        }
        else{
            reject(console.log("Stock-Out"));
        }
}
)};

// meat type control from user and meat selection time input from process object
function meatControl(meatType) {
    return new Promise((resolve, reject) => {
        if(meatType == "Patty"){
            setTimeout(()=>{
                resolve(console.log("Patty Selected"))
            }, process[2].time)
        }
        else if(meatType == "Chicken"){
            setTimeout(()=>{
                resolve(console.log("Chicken Selected"))
            }, process[2].time)
        }else{
            reject(console.log("Not Existed"));
        }
}
)};

// cookint tenderness input & cooking time from cookingSelection object & stock decrease for related type of meat
function cookControl(cookType) {
    return new Promise((resolve, reject) => {
        if(cookType == "Rare"){
            setTimeout(()=>{
                resolve(console.log("Rare Cook Patty Selected"), ingredients.patty--)
            }, cookingSelection.rare)
        }
        else if(cookType == "Medium"){
            setTimeout(()=>{
                resolve(console.log("Medium Cook Patty Selected"),ingredients.patty--)
            }, cookingSelection.medium)
        }
        else if(cookType == "wellDone"){
            setTimeout(()=>{
                resolve(console.log("Well-Done Cook Patty Selected"),ingredients.patty--)
            }, cookingSelection.wellDone)
        } 
        else if(cookType == "Chicken"){
            setTimeout(()=>{
                resolve(console.log("Chicken Cooking Selected"),ingredients.chicken--)
            }, cookingSelection.chicken)
        }else{
            reject(console.log("Not a Suitable Meat Type"))
        }
    }
)};

// to show final ingredient stock after burger order
function ingredientsConsole(ingredients){
    return console.log(ingredients);
}

// takes meat type, cook type from customer and ingredients list from stock and runs the preperation process
async function burgerPrep(meatType, cookType, ingredients){
    // Order Taken and Time
    await order(()=>{console.log(process[0].description)}, process[0].time)

    // Stock Check and Check Time
    await checkStock(ingredients)

    //  Meat Type Input and Selection Time
    await meatControl(meatType)

    // Default Fries Time and Returns Related Description with Time | no await due to project requirements
    order(()=>{console.log(process[3].description), ingredients.fries--}, process[3].time)

    // Default Beverage Prep Time and Return Related Description with Time | no await due to project requirements
    order(()=>{console.log(process[4].description), ingredients.coke--}, process[4].time)

    // Calls cookControl function to determine cooking time and stock decrement
    await cookControl(cookType)

    // Get Together Ingredients and reduce related ingredients in ingredients object
    await order(()=> {console.log(process[7].description), ingredients.bun--, ingredients.onion--, ingredients.pickle--, ingredients.tomato--, ingredients.lettuce--}, process[7].time)

    //  Sauce and Tray preperation & time return
    await order(()=>{console.log(process[5].description), ingredients.sauce--}, process[5].time)

    // Serving Process
    await order(()=>{console.log(process[6].description)}, process[6].time)

    // Return of Ingredients and Stock Amounts after Process
    await ingredientsConsole(ingredients)
}


// Order Function Calling via Related Inouts

let meat = "Patty"; /* Patty || Chicken */
let cooking = "Medium"; /* Patty -> Rare / Medim / wellDone | Not required for chicken  */

if(meat == "Chicken"){
    cooking = "Chicken";
}

burgerPrep(meat, cooking, ingredients)
