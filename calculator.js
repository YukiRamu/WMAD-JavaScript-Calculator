/* This is a simple JavaScript Calculator */

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

//Validation check
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
const deleteTheLast = () => {
  //delete the last operator
  numInput.value = numInput.value.slice(0, -1);
}
const deleteSecondFromTheLast = () => {
  //delete the operator second from the last = replace it with the last operator
  numInput.value = numInput.value.replace(numInput.value.substr(-2, 1), "");
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
            console.log("THIRD from the last is " + operators.includes(numInput.value.substr(-3, 1)));
            console.log(numInput.value.substr(-3, 1));
            //Below is for the case where "pattern 1 above" plus "THIRD from the last is * or /". i.e)6 * - +, 6 + - +
            if (operators.includes(numInput.value.substr(-3, 1))) {
              //delete the operator second from the last 
              deleteSecondFromTheLast();
              if ((plusMinus.includes(numInput.value.substr(-2, 1))) && (plusMinus.includes(numInput.value.substr(-1)))) {
                //i.e) 6-- after the replacement above
                deleteSecondFromTheLast();
              }
            } else {
              //Go ahead with the calculation
              ;
            }
          } else {
            console.log("replacng operator");
            console.log("second from the last is " + numInput.value.substr(-2, 1));
            console.log("last operator is  " + numInput.value.substr(-1));
            console.log("before replace " + numInput.value);

            //delete the operator second from the last i.e)6 * / , 6 / *, 6 - -, 6 + +
            deleteSecondFromTheLast();

            console.log("after replace. Input is " + numInput.value);

            //check if multiple and devide operators come consecutively at the very last i.e) 9*/ or 9/*
            if ((operators.includes(numInput.value.substr(-2, 1))) && (operators.includes(numInput.value.substr(-1)))) {
              console.log("I am here2");
              /* Two validation check patterns are prepared. Both works. Pick whichever you want
              //Pattern 1: delete the last operator and make a user input a proper operator or number
              //i.e) user input 9*-/ => 9*
              //deleteTheLast(); */
              //Pattern 2: delete the operator second from the last 
              deleteSecondFromTheLast();
              /* Patterm 2 issue why?
              // before replace => 9×−6×÷
              // after replace => 9−6×÷
              // why does it delete "x" second from the FIRST?
              */
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
            numInput.value = numInput.value.replace(/\−/g, "-"); //replace minus
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






