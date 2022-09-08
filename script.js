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
    console.log("decimal: ", target.innerHTML);
    return;
  }
  if (target.classList.contains("clear")) {
    console.log("clear: ", target.innerHTML);
    return;
  }
  console.log("digit: ", target.innerHTML);
  console.log(event);
});
