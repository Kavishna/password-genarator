import {
  numbersArray,
  uppercaseArray,
  lowercaseArray,
  symbolsArray,
} from "./characters.js";

const pwText = document.querySelector(".pw-text");
const copyButton = document.querySelector(".copy");
const lengthInput = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.querySelector(".generate");
const weakIndicator = document.querySelector(".weak");
const fairIndicator = document.querySelector(".fair");
const goodIndicator = document.querySelector(".good");
const excellentIndicator = document.querySelector(".excellent");
