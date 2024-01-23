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
const strongIndicator = document.querySelector(".good");
const poorIndicator = document.querySelector(".poor");
const excellentIndicator = document.querySelector(".excellent");
const strengthText = document.querySelector(".strength-text");

const generatePassword = (
  length = lengthInput.value,
  characters = getPasswordCombination()
) => {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");
};

function getPasswordStrength(password) {
  var lengthScore = password.length >= 8 ? 1 : 0;
  var uppercaseScore = /[A-Z]/.test(password) ? 1 : 0;
  var lowercaseScore = /[a-z]/.test(password) ? 1 : 0;
  var digitScore = /\d/.test(password) ? 1 : 0;
  var specialCharScore = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0;

  var totalScore =
    lengthScore +
    uppercaseScore +
    lowercaseScore +
    digitScore +
    specialCharScore;

  console.log(specialCharScore);

  switch (totalScore) {
    case 0:
      return "Weak";
    case 1:
      return "Poor";
    case 2:
      return "Fair";
    case 3:
      return "Strong";
    case 4:
      return "Excellent";
  }
}

uppercaseCheckbox.addEventListener("checked", function () {});

generateButton.addEventListener("click", function () {
  let password = generatePassword();
  pwText.innerHTML = password;
  const passwordStrength = getPasswordStrength(password);
  strengthText.innerHTML = passwordStrength;

  switch (passwordStrength) {
    case "Weak":
      div.style.backgroundColor = "red";
      break;
    case "Poor":
      div.style.backgroundColor = "blue";
      break;
    case "Fair":
      div.style.backgroundColor = "green";
      break;
    case "Strong":
      div.style.backgroundColor = "yellow";
      break;
    case "Excellent":
      div.style.backgroundColor = "purple";
      break;
    default:
      div.style.backgroundColor = "gray";
  }
});

lengthInput.addEventListener("input", function (event) {
  lengthIndicator.innerHTML = event.target.value;
  console.log(event.target.value);
});

document.addEventListener("DOMContentLoaded", function () {
  lengthIndicator.innerHTML = lengthInput.value;
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(pwText.textContent);

  copyButton.classList.add("active");

  setTimeout(function () {
    copyButton.classList.remove("active");
  }, 500);
});

function getPasswordCombination() {
  let combinedChars = "";

  const symbolSet = "!@#$%^&*()_-+=[]{}<>?";
  const upperCaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseSet = "abcdefghijklmnopqrstuvwxyz";
  const numberSet = "0123456789";

  if (numbersCheckbox.checked) {
    combinedChars += numberSet;
  }

  if (uppercaseCheckbox.checked) {
    combinedChars += upperCaseSet;
  }

  if (lowercaseCheckbox.checked) {
    combinedChars += lowerCaseSet;
  }

  if (symbolsCheckbox.checked) {
    combinedChars += symbolSet;
  }
  console.log(combinedChars);
  return combinedChars;
}

const slider = lengthInput;
const min = slider.min;
const max = slider.max;
const value = slider.value;

slider.style.background = `linear-gradient(to right, #a5ffaf 0%, #a5ffaf ${
  ((value - min) / (max - min)) * 100
}%, #18171e ${((value - min) / (max - min)) * 100}%, #18171e 100%)`;

slider.oninput = function () {
  this.style.background = `linear-gradient(to right, #a5ffaf 0%, #a5ffaf ${
    ((this.value - this.min) / (this.max - this.min)) * 100
  }%, #18171e ${
    ((this.value - this.min) / (this.max - this.min)) * 100
  }%, #18171e 100%)`;
};
