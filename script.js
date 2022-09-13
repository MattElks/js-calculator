//handles values
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//inputs digits
//waiting for 2nd op === true > add - to display value

const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand, operator } = calculator;

  //handles digit input after %
  if (operator === "%" && calculator.waitingForSecondOperand) {
    console.log("digit");
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
    calculator.firstOperand = null;
    console.log(calculator);
    return;
  }
  //handles
  if (displayValue === "-0") {
    calculator.displayValue = "".concat("-", digit);
    console.log(calculator);
    return;
  }

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  // when display === -0 > digit should replace 0 > -digit > waitingForSecondOp === true??
  // Needs to account for just adding .digit aswell as 0.digit > tutorial covers this
  else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
    console.log(calculator);
  }
};

//inputs decimal
const decimal = document.querySelector(".decimal");
const inputDecimal = (dec) => {
  if (!calculator.displayValue.includes(dec)) {
    calculator.displayValue += dec;
  }
};

//handles operators
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  const dividedByHun = inputValue / 100;

  //prepends "-" to display value when calculator.waiting... === true
  if (
    nextOperator === "+/-" &&
    !displayValue.includes("-") &&
    calculator.waitingForSecondOperand
  ) {
    const minus = "-";
    const negValue = minus.concat("", displayValue);
    calculator.displayValue = negValue;
    calculator.firstOperand = parseFloat(negValue);
    console.log(calculator);
    return;
  }

  //removes "-" from display value when calculator.waiting... === true
  if (
    nextOperator === "+/-" &&
    displayValue.includes("-") &&
    calculator.waitingForSecondOperand
  ) {
    const posValue = displayValue.slice(1, displayValue.length);
    calculator.displayValue = posValue;
    calculator.firstOperand = parseFloat(posValue);
    console.log(calculator);
    return;
  }

  //prepends "-" to display value
  if (nextOperator === "+/-" && !displayValue.includes("-")) {
    const minus = "-";
    const negValue = minus.concat("", displayValue);
    calculator.displayValue = negValue;
    console.log(calculator);
    return;
  }
  //removes "-" from display value
  if (nextOperator === "+/-" && displayValue.includes("-")) {
    const posValue = displayValue.slice(1, displayValue.length);
    calculator.displayValue = posValue;
    console.log(calculator);
    return;
  }

  //handles operators other than "+/-" being clicked before digit
  if (nextOperator && displayValue === "0") {
    console.log(calculator);
    return;
  }

  //divides display value by 100
  if (nextOperator === "%") {
    calculator.displayValue = String(dividedByHun);
    calculator.firstOperand = dividedByHun;
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  //handles operators being clicked repeatedly
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  //sets initial value for firstOperand
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
};
//calculates value to be displayed
const calculate = (firstOperand, secondOperand, operator) => {
  switch (true) {
    case operator === "+":
      return firstOperand + secondOperand;
    case operator === "-":
      return firstOperand - secondOperand;
    case operator === "÷":
      return firstOperand / secondOperand;
    case operator === "x":
      return firstOperand * secondOperand;
    default:
      return secondOperand;
  }
};

//reset calculator
const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
};

//updates displayed value
const updateDisplay = () => {
  const display = document.querySelector(".display");
  display.innerHTML = calculator.displayValue;
  const clear = document.querySelector(".clear");
  display.innerHTML === "0"
    ? (clear.innerHTML = "A/C")
    : (clear.innerHTML = "C");
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
    handleOperator(target.innerHTML);
    updateDisplay();
    return;
  }
  if (target.classList.contains("decimal")) {
    inputDecimal(target.innerHTML);
    updateDisplay();
    return;
  }
  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.innerHTML);
  updateDisplay();
});
