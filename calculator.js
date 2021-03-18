/* This is a simple JavaScript Calculator */

/* ========== Global Variables Declaration ========== */
//input fields
const numInput = document.querySelector(".numInput");
const result = document.querySelector(".result");

//calc buttons (all) - make an array
const calcButtonsArray = Array.from(document.querySelectorAll(".calc-button"));

//More functions
let tempClear = ""; //to remove zero in the input field
const operators = "+−×÷"; //to handle the case multiple operators are input i.e. ++++- 

/* ================== Functions Declaration ================== */
const replaceZeroToInputNum = () => {
  //replace the default input value "0" with the input number

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
execute the action in each case */
calcButtonsArray.map((clickedBtn) => {
  clickedBtn.addEventListener("click", (event) => {


    switch (event.target.classList[1]) { //check the class of the clicked button
      case "number":
        numInput.value += event.target.innerText;
        /* replace zero with the input number after "C" clicked */
        if (tempClear === "cleared") {
          numInput.value = numInput.value.slice(1);
          tempClear = "";
        }
        break;

      case "operator":
        //********under construction
        console.log("clicked button is " + event.target.classList[1])
        console.log("before " + numInput.value)

        numInput.value += event.target.innerText;

        console.log("after operator clicked " + numInput.value); //8×

        if (numInput.value.slice(-1).includes(operators)) {
          console.log("operator clicked twice");
          //need to replace or delete the first operator

        } else {

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




