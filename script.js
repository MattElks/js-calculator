//handles values
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//inputs digits
const inputDigit = (digit) => {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
};

//inputs decimal
const decimal = document.querySelector(".decimal");
const inputDecimal = (dec) => {
  if (!calculator.displayValue.includes(dec)) {
    calculator.displayValue += dec;
  }
};

//updates displayed value
const updateDisplay = () => {
  const display = document.querySelector(".display");
  display.innerHTML = calculator.displayValue;
};
updateDisplay();

//handles keys pressed
const keys = document.querySelector("main");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("div") || target.classList.contains("display")) {
    return;
  }
  if (target.classList.contains("operator")) {
    console.log("operator: ", target.innerHTML);
    return;
  }
  if (target.classList.contains("decimal")) {
    inputDecimal(target.innerHTML);
    updateDisplay();
    return;
  }
  if (target.classList.contains("clear")) {
    console.log("clear: ", target.innerHTML);
    return;
  }
  inputDigit(target.innerHTML);
  updateDisplay();
});
