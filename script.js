const calculatorDisplay = document.querySelector("h1"); // selects the single h1 that is on the page
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstvalue = 0;
let operatorValue = ""; // empty string
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    // the same as saying awaitingNextValue = true
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
    // After a number is entered, awaitingNextValue becomes false and will become true again only after another number is entered from the useOperator function.
  } else {
    // If current display value is 0, replace it. If not, add a number.
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
    // If display value is equal to the string of 0, replace textContent with a number.
    // If the display value is no 0, add the display value plus the next number entered.
  }
}

// The above code creates a NodeList (an array-like element) with 17 items, which you could use the forEach loop to iterate through.

function addDecimal() {
  // If an operator is pressed, don't add a decimal
  if ((awaitingNextValue = true)) return;

  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    // if calculatorDisplay text DOESN'T include "." , we're going to set the text content to what is already in the display plus a decimal behind it.
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  // Converts the string numbers entered into actual number values.
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // If we already have an operatorValue and awaitingNextValue is true, we're not gonna run the rest of the function since "return" stops the running of a function.

  // Assign firstValue is no value exists
  if (!firstvalue) {
    firstvalue = currentValue;
    // if there is no firstValue, currentValue is assigned to firstValue
  } else {
    const calculation = calculate[operatorValue](firstvalue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstvalue = calculation;
  }

  // Ready for next value, store operator
  awaitingNextValue = true; // becomes true after we trigger "operator"
  // Once operator is pressed, we are done inputting the first value and we are then ready for the second value.

  operatorValue = operator;
  // operatorValue (the empty string and global variable) becomes what is entered on-click
}

// Add Event Listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    // Checks to see if any button has the class of "operator"
    // If so, adds the EventListener which pulls the value from the element
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    // Checks to see if any button has the class of "decimal"
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset All Values, Display

function resetAll() {
  firstvalue = 0;
  operatorValue = ""; // empty string
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Event Listener
clearBtn.addEventListener("click", resetAll);
