//handles values
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//inputs digits
const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
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

//handles operators > Add functionality to / by 100
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  const dividedByHun = inputValue / 100;
  const firstOperandDividedByHun = firstOperand / 100;

  if (nextOperator === "%" && calculator.waitingForSecondOperand) {
    calculator.displayValue = String(firstOperandDividedByHun);
    calculator.firstOperand = firstOperandDividedByHun;
    calculator.waitingForSecondOperand = true;
    console.log(calculator);
    return;
  }
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  }
  if (nextOperator === "%") {
    calculator.displayValue = String(dividedByHun);
    calculator.firstOperand = dividedByHun;
    calculator.waitingForSecondOperand = true;
    console.log(calculator);
    return;
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

/* 
add functionality to +/- btn
add functionality % btn */
