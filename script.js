//handles values
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//updates displayed value
const updateDisplay = () => {
  const display = document.querySelector(".display");
  display.innerHTML = calculator.displayValue;
};
updateDisplay();
