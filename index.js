"use strict";

const inputBillAmount = document.querySelector(".input--bill__amount");
const inputBillPeople = document.querySelector(".input--bill__person");

const tipPercentage = document.querySelectorAll(".tip-percentage");
const customTipPercentage = document.querySelector(".custom--tip");

const displayTip = document.querySelector(".tip-per--person");
const displayTotal = document.querySelector(".total--amount");

const btnReset = document.querySelector(".reset--btn");
const error = document.querySelector(".cannot--zero");

inputBillAmount.addEventListener("input", billInputFun);
inputBillPeople.addEventListener("input", peopleInputFun);
customTipPercentage.addEventListener("input", tipInputFun);
btnReset.addEventListener("click", resetCalculator);

let billValue;
let peopleValue;
let tipValue;

function billInputFun() {
  billValue = parseFloat(inputBillAmount.value);
  calculateTip();
}

function peopleInputFun(event) {
  peopleValue = parseFloat(inputBillPeople.value);
  if (peopleValue < 1) {
    error.style.visibility = "visible";
    inputBillPeople.style.border = "solid 1px red";

    displayTip.textContent = setCurrency(0.0);
    displayTotal.textContent = setCurrency(0.0);
  } else if (event.target.value === "") {
    error.style.visibility = "hidden";
    inputBillPeople.style.border = "none";

    displayTip.textContent = setCurrency(0.0);
    displayTotal.textContent = setCurrency(0.0);
  } else {
    error.style.visibility = "hidden";
    inputBillPeople.style.border = "none";
  }
  calculateTip();
}

function tipInputFun() {
  tipValue = parseFloat(event.target.value) / 100;
  tipPercentage.forEach(function (val) {
    val.classList.remove("tip-percentage--active");
  });

  calculateTip();
  // setting up if condition to ensure if custom tip input field is empty
  if (customTipPercentage.value === "") {
    displayTip.textContent = setCurrency(0.0);
    displayTotal.textContent = setCurrency(0.0);
  }
}

tipPercentage.forEach(function (val) {
  val.addEventListener("click", handleClick);
});

function handleClick(event) {
  tipPercentage.forEach(function (val) {
    val.classList.remove("tip-percentage--active");
    if (event.target.textContent == val.textContent) {
      val.classList.add("tip-percentage--active");
      tipValue = parseFloat(val.textContent) / 100;
      calculateTip();
    }
  });
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    displayTip.textContent = setCurrency(tipAmount);
    displayTotal.textContent = setCurrency(total);
  }
}

function resetCalculator() {
  // setting values of both input fields to empty
  inputBillAmount.value = "";
  inputBillPeople.value = "";
  customTipPercentage.value = "";

  displayTip.textContent = setCurrency(0.0);
  displayTotal.textContent = setCurrency(0.0);

  tipPercentage.forEach((val) => {
    val.classList.remove("tip-percentage--active");
  });
}

function setCurrency(curr) {
  const userCurrency = navigator.language;
  const currencyFormatter = new Intl.NumberFormat(userCurrency, {
    style: "currency",
    currency: "USD",
  });
  return currencyFormatter.format(curr);
}
