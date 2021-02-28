const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitngNextValue = false;

const sendNumberValue = (number) => {
  // Replace current display value if first value is entered
  if (awaitngNextValue) {
    calculatorDisplay.textContent = number;
    awaitngNextValue = false;
  } else {
    // If currebt dispaly value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
};

const addDecimal = () => {
  // If operator pressed, don't add decimal
  if (awaitngNextValue) return;
  //   If no addDecimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

// Calaculate first and secund valuse depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  //   Prevent multiple operator
  if (operatorValue && awaitngNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //   Raedy for next value, store operator
  awaitngNextValue = true;
  operatorValue = operator;
};

// Add event lesteners for number, operators, decimal nuttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset all values, display
const resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  awaitngNextValue = false;
  calculatorDisplay.textContent = "0";
};

// Event Listener
clearBtn.addEventListener("click", resetAll);
