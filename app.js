const pwText = document.querySelector(".pw-text");
const copyButton = document.querySelector(".copy");
const lengthInput = document.getElementById("length");
const lengthIndicator = document.querySelector(".pw-length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.querySelector(".generate");
const scoreElements = document.querySelectorAll(".score");
const strengthText = document.querySelector(".strength-text");

const Chars = {
  Uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
  Lowers: "qwertyuiopasdfghjklzxcvbnm",
  Numbers: "1234567890",
  Symbols: "!@#$%^&*",
};

const Allowed = {};

const getRandomCharFromString = (str) => {
  console.log(str);
  str.charAt(Math.floor(crypto.randomInt(0, str.length)));
};

const generatePassword = (length = lengthInput.value) => {
  let pwd = "";
  pwd += getRandomCharFromString(Allowed.Uppers); // pwd will have at least one upper
  pwd += getRandomCharFromString(Allowed.Lowers); // pwd will have at least one lower
  pwd += getRandomCharFromString(Allowed.Numbers); // pwd will have at least one number
  pwd += getRandomCharFromString(Allowed.Symbols); // pwd will have at least one symbol
  for (let i = pwd.length; i < length; i++)
    pwd += getRandomCharFromString(Object.values(Allowed).join("")); // fill the rest of the pwd with random characters
  return pwd;
};

document.addEventListener("DOMContentLoaded", function () {
  if (pwText) {
    pwText.classList.add("dimm");
  }
});

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

  console.log(totalScore);

  switch (totalScore) {
    case 1:
      return "Weak";
    case 2:
      return "Poor";
    case 3:
      return "Fair";
    case 4:
      return "Strong";
    case 5:
      return "Excellent";
    default:
      return "Invalid";
  }
}

uppercaseCheckbox.addEventListener("checked", function () {});

generateButton.addEventListener("click", function () {
  let password = generatePassword();
  pwText.innerHTML = password;
  const passwordStrength = getPasswordStrength(password);
  strengthText.innerHTML = passwordStrength;

  pwText.classList.remove("dimm");

  for (var i = 0; i < scoreElements.length; i++) {
    scoreElements[i].classList.remove(
      "weak",
      "poor",
      "fair",
      "strong",
      "excellent"
    );
  }

  switch (passwordStrength) {
    case "Weak":
      for (var i = 0; i < 1 && i < scoreElements.length; i++) {
        scoreElements[i].classList.add("weak");
      }
      break;
    case "Poor":
      for (var i = 0; i < 2 && i < scoreElements.length; i++) {
        scoreElements[i].classList.add("poor");
      }
      break;
    case "Fair":
      for (var i = 0; i < 3 && i < scoreElements.length; i++) {
        scoreElements[i].classList.add("fair");
      }
      break;
    case "Strong":
      for (var i = 0; i < 4 && i < scoreElements.length; i++) {
        scoreElements[i].classList.add("strong");
      }
      break;
    case "Excellent":
      for (var i = 0; i < 5 && i < scoreElements.length; i++) {
        scoreElements[i].classList.add("excellent");
      }
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

function updateAllowed(charType, isChecked) {
  if (isChecked) {
    Allowed[charType] = Chars[charType];
  } else {
    delete Allowed[charType];
  }
}

uppercaseCheckbox.addEventListener("change", function () {
  updateAllowed("Uppers", this.checked);
});

lowercaseCheckbox.addEventListener("change", function () {
  updateAllowed("Lowers", this.checked);
});

numbersCheckbox.addEventListener("change", function () {
  updateAllowed("Numbers", this.checked);
});

symbolsCheckbox.addEventListener("change", function () {
  updateAllowed("Symbols", this.checked);
});

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
