const pwText = document.querySelector(".pw-text");
const copyButton = document.querySelector(".copy");
const lengthInput = document.getElementById("length");
const lengthIndicator = document.querySelector(".pw-length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.querySelector(".generate");
const weakIndicator = document.querySelector(".weak");
const fairIndicator = document.querySelector(".fair");
const goodIndicator = document.querySelector(".good");
const excellentIndicator = document.querySelector(".excellent");

const generatePassword = (
  length = lengthInput.value,
  characters = getPasswordCombination()
) => {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");
};

uppercaseCheckbox.addEventListener("checked", function () {});

generateButton.addEventListener("click", function () {
  pwText.innerHTML = generatePassword();
  console.log(generatePassword());
});

lengthInput.addEventListener("input", function (event) {
  lengthIndicator.innerHTML = event.target.value;
  console.log(event.target.value);
});

document.addEventListener("DOMContentLoaded", function () {
  lengthIndicator.innerHTML = lengthInput.value;
});

function getPasswordCombination() {
  const combinedArray = [];

  if (numbersCheckbox.checked) {
    combinedArray.push(...numbersArray);
  }

  if (uppercaseCheckbox.checked) {
    combinedArray.push(...uppercaseArray);
  }

  if (lowercaseCheckbox.checked) {
    combinedArray.push(...lowercaseArray);
  }

  if (symbolsCheckbox.checked) {
    combinedArray.push(...symbolsArray);
  }
  return combinedArray.join("");
}

const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const uppercaseArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lowercaseArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const symbolsArray = ["~", "!", "@", "-", "#", "$"];

// console.log(getPasswordCombination());
