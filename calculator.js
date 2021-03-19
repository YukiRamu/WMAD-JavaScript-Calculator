/* This is a simple JavaScript Calculator 
// One case is still under construction ....
// the case where + and - are clicked consecutively 
// and another operator (not a number) is clicked again
// i.e 9 - + ÷ 
// if it is 9 - + 6, this calculator can give you 3 as a result
*/

/* ========== Global Variables Declaration ========== */
//input fields
const numInput = document.querySelector(".numInput");
const result = document.querySelector(".result");

//calc buttons (all) - make an array
const calcButtonsArray = Array.from(document.querySelectorAll(".calc-button"));

//Initial declaration --- still not yet used
const calculator = {
  currentCalc: "0", //to be assigned when the user input either num or op
  currentNum: "0",  //set the input value
  currentOperator: "", //set the input value
  decimalPresed: false //default: not clicked. to be changed to true when clicked
}

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
        //**************** under construction ****************//
        //should I follow evel() function way?
        // or should I follow a real-life calculator?

        tempClear = "";// to keep the default 0 for * and / calculation
        numInput.value += event.target.innerText;

        //Check if the last two inputs are operators
        if ((operators.includes(numInput.value.substr(-2, 1))) && (operators.includes(numInput.value.substr(-1)))) {

          console.log("two consecutive operators are clicked. check before replacing");

          /* Check the content of the last two input. For the two cases below, operators won't be replaced. OK to calculate
          // pattern1--> first: * or /, second: + or -
          // OR
          // pattern2--> first: +, second: -
          // OR
          // pattern2--> first: -, second: + 
          */
          if ((mulDiv.includes(numInput.value.substr(-2, 1)) && plusMinus.includes(numInput.value.substr(-1))) || (numInput.value.substr(-2) === plusMinus) || (numInput.value.substr(-2) === plusMinus.split("").reverse().join(""))) {
            console.log("Leave as it is. OK to calculate");
            //under construnction
            //How to hundle the case => 9 * + - => check the last three input?  
          } else {
            console.log("replacng operator");

            //replace the first operator with the second operator  
            let secondFromTheLast = numInput.value.substr(-2, 1);
            let secondOperator = numInput.value.substr(-1);

            console.log("second from the last is " + secondFromTheLast);
            console.log("last operator is  " + secondOperator);
            console.log("before replace " + numInput.value);

            //delete the operator second from the last 
            numInput.value = numInput.value.replace(secondFromTheLast, "");
            /* issue why?
            // before replace => 0×9××
            // after replace => 09××
            // why does it delete "x" second from the FIRST as well?
            */

            console.log("after replace. Input is " + numInput.value);

            //check if multiple and device operators come consecutively i.e) 9*/ or 9/*
            if ((operators.includes(numInput.value.substr(-2, 1))) && (operators.includes(numInput.value.substr(-1)))) {
              console.log("I am here2");
              //delete the last operator and make a user input a proper operator or number
              //i.e) user input 9*-/ => 9*
              numInput.value = numInput.value.slice(0, -1); //delete the last operator
            } else {
              //operators are already replaced. Go ahead with the calculation
              ;
            }
          }
        } else {
          //Normal Operation. Go ahead with the calculation
          ;
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
          result.value = "ERROR"; //catch all invalid formula
          clearInput();
        }
        break;

      default:
        numInput.value += event.target.innerText;
        break;
    }
  })
})


//===========================-EOF=================================
//numInput.value = numInput.value.replace(secondFromTheLast, secondOperator);
//delete the second operator
// numInput.value = numInput.value.slice(0, -2); //delete 2 from the last





