/* This is a simple JavaScript Calculator */

/* ========== Global Variables Declaration ========== */
//input fields
const numInput = document.querySelector(".numInput");
const result = document.querySelector(".result");

//calc buttons (all) - make an array
const calcButtonsArray = Array.from(document.querySelectorAll(".calc-button"));

//More functions
let tempClear = ""; //to remove zero in the input field
const operators = "+−×÷"; //to handle the case where multiple operators are input i.e. ++++- 
const plusMinus = "+−";//to eliminate the case where multiple operators are acceptable i.e. 2*-2
const mulDiv = "×÷";//to eliminate the case where multiple operators are acceptable i.e. 2*-2

/* ================== Functions Declaration ================== */
const replaceZeroToInputNum = () => {
  //replace the default input value "0" with the input number
  numInput.value = numInput.value.slice(1); //display only the second num 
  tempClear = "";
}
const clearInput = () => {
  numInput.value = ""; //clear the input
}
const tempClearSet = () => {
  tempClear = "cleared" //same status as when C is clicked
}

/* ================== Window Open ================== */
window.addEventListener("DOMContentLoaded", tempClearSet);

/* ================== Calculation ================== */
/* Array with map method: 
getting the class of the clicked button and
executing the action in each case */
calcButtonsArray.map((clickedBtn) => {
  clickedBtn.addEventListener("click", (event) => {

    switch (event.target.classList[1]) { //check the class of the clicked button
      case "number":
        numInput.value += event.target.innerText; //input the written text of the clicked button
        /* replace zero with the input number after "C" is clicked */
        if (tempClear === "cleared") {
          replaceZeroToInputNum();
        }
        break;

      case "operator":
        //********under construction
       
        numInput.value += event.target.innerText;
        //Check if the last two inputs are operators
        if ((operators.includes(numInput.value.substr(-2, 1))) && (operators.includes(numInput.value.substr(-1)))) {

          console.log("check before replacing")

          if ((mulDiv.includes(numInput.value.substr(-2, 1)) && plusMinus.includes(numInput.value.substr(-1))) || (numInput.value.substr(-2) === plusMinus) || (numInput.value.substr(-2) === plusMinus.split("").reverse().join(""))) {
            /* Check the content of the last two input. For the two cases below, operators won't be replaced. OK to calculate
            // pattern1--> first: * or /, second: + or -
            // OR
            // pattern2--> first: +, second: -
            // OR
            // pattern2--> first: -, second: + 
            */  
            ; 
          } else {
            console.log("replacng operator");
            //replace the first operator with the second operator  
            let secondFromTheLast = numInput.value.substr(-2, 1);
            console.log(secondFromTheLast)
            let secondOperator = numInput.value.substr(-1);
            console.log(secondOperator)
            numInput.value = numInput.value.replace(secondFromTheLast, secondOperator);
            //delete the second operator
            numInput.value = numInput.value.slice(0, -1); //delete 1 from the last

            console.log("after replace " + numInput.value);
            if ((operators.includes(numInput.value.substr(-2, 1))) && (operators.includes(numInput.value.substr(-1)))) {
            //delete the second operator
            numInput.value = numInput.value.slice(0, -1); //delete 1 from the last
            }else {
              console.log("I am here 2")
            }
          }
        } else {
          console.log("I am here")
        }
        break;

      case "clear": //clear 
        numInput.value = "0";
        result.value = "";
        tempClearSet();
        break;

      case "plusMinus": //+ and - change 
        result.value = "Under Const";
        break;

      case "percent": //calculate %
        result.value = "Under Const";
        break;

      case "equals": //calculate the result
        try {
          if ((numInput.value.indexOf("−") != -1) || (numInput.value.indexOf("×") != -1) || (numInput.value.indexOf("÷") != -1)) {
            numInput.value = numInput.value.replace(/−/g, "-"); //replace minus
            numInput.value = numInput.value.replace(/×/g, "*"); //replace times 
            numInput.value = numInput.value.replace(/÷/g, "/"); //replace divide
          }
          result.value = eval(numInput.value); //display the result 
          clearInput();
        } catch (error) {
          result.value = "ERROR";
          clearInput();
        }
        break;

      default:
        numInput.value += event.target.innerText;
        break;
    }
  })
})




