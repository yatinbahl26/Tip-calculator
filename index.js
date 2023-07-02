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

function peopleInputFun() {
  peopleValue = parseFloat(inputBillPeople.value);
  if (peopleValue < 1) {
    error.style.display = "flex";
    inputBillPeople.style.border = "solid 1px red";

    displayTip.innerHTML = setCurrency(0.0);
    displayTotal.innerHTML = setCurrency(0.0);

    // displayTip.innerHTML = "$" + (0.0).toFixed(2);
    // displayTotal.innerHTML = "$" + (0.0).toFixed(2);
  } else {
    error.style.display = "none";
    inputBillPeople.style.border = "none";
    calculateTip();
  }
}

function tipInputFun(event) {
  tipValue = parseFloat(event.target.value) / 100;
  tipPercentage.forEach(function (val) {
    val.classList.remove("tip-percentage--active");
  });
  // setting up if condition to ensure if custom tip input field is empty
  if (customTipPercentage.textContent === "") {
    displayTip.innerHTML = setCurrency(0.0);
    displayTotal.innerHTML = setCurrency(0.0);
  }
  calculateTip();
}

tipPercentage.forEach(function (val) {
  val.addEventListener("click", handleClick);
});

function handleClick(event) {
  tipPercentage.forEach(function (val) {
    val.classList.remove("tip-percentage--active");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("tip-percentage--active");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    displayTip.textContent = setCurrency(tipAmount);
    displayTotal.textContent = setCurrency(total);

    // displayTip.textContent = "$" + tipAmount.toFixed(2);
    // displayTotal.textContent = "$" + total.toFixed(2);
  }
}

function resetCalculator() {
  // setting values of both input fields to empty
  inputBillAmount.value = "";
  inputBillPeople.value = "";
  customTipPercentage.value = "";

  displayTip.innerHTML = setCurrency(0.0);
  displayTotal.innerHTML = setCurrency(0.0);

  // displayTip.innerHTML = "$" + (0.0).toFixed(2);
  // displayTotal.innerHTML = "$" + (0.0).toFixed(2);
  tipPercentage.forEach((val) => {
    val.classList.remove("tip-percentage--active");
  });
}

function setCurrency(curr) {
  const userCurrency = "en-US";
  const currencyFormatter = new Intl.NumberFormat(userCurrency, {
    style: "currency",
    currency: userCurrency,
  });
  return currencyFormatter.format(curr);
}
