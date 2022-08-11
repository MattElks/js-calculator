//symbols
const result = document.querySelector(".btn-1");
const cancel = document.querySelector(".btn-2");
const negPos = document.querySelector(".btn-3");
const divByHun = document.querySelector(".btn-4");
const divide = document.querySelector(".btn-5");
const multiply = document.querySelector(".btn-9");
const minus = document.querySelector(".btn-13");
const add = document.querySelector(".btn-17");
const decimal = document.querySelector(".btn-19");
const equals = document.querySelector(".btn-20");

const addInfo = (button) => {
  result.innerHTML === "0"
    ? (result.innerHTML = button.innerHTML)
    : (result.innerHTML += button.innerHTML);
  console.log(button.innerHTML);
  console.log(result.innerHTML);
};

const button = document.querySelectorAll(".btn");
button.forEach((button) => {
  button.addEventListener("click", () => {
    addInfo(button);
  });
});
