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

const Allowed = {};
// this function checks if what checkbox is checked and returns appropriate combination
function updateAllowed() {
  for (var key in Allowed) {
    delete Allowed[key];
  }

  if (uppercaseCheckbox.checked) {
    Allowed.Uppers = "QWERTYUIOPASDFGHJKLZXCVBNM";
  }
  if (lowercaseCheckbox.checked) {
    Allowed.Lowers = "qwertyuiopasdfghjklzxcvbnm";
  }
  if (numbersCheckbox.checked) {
    Allowed.Numbers = "1234567890";
  }
  if (symbolsCheckbox.checked) {
    Allowed.Symbols = "!@#$%^&*";
  }
}

//based on the input values (uppercase, lowercase,numbers or symbols) function returns random numbers characters from provided string
const getRandomCharFromString = (str) => {
  const randomIndex = Math.floor(
    (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
      str.length
  );
  return str.charAt(randomIndex);
};

//function will return a password that contains atleast one of selected characters
const generatePassword = (length = lengthInput.value) => {
  let pwd = "";
  if (uppercaseCheckbox.checked) pwd += getRandomCharFromString(Allowed.Uppers);
  if (lowercaseCheckbox.checked) pwd += getRandomCharFromString(Allowed.Lowers);
  if (numbersCheckbox.checked) pwd += getRandomCharFromString(Allowed.Numbers);
  if (symbolsCheckbox.checked) pwd += getRandomCharFromString(Allowed.Symbols);
  for (let i = pwd.length; i < length; i++)
    pwd += getRandomCharFromString(Object.values(Allowed).join(""));
  return pwd;
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

//change the color of password text to lower color h2.pw-text
document.addEventListener("DOMContentLoaded", function () {
  if (pwText) {
    pwText.classList.add("dimm");
  }
});

generateButton.addEventListener("click", function () {
  updateAllowed(); //check the combination and update Allowed object
  let password = generatePassword();
  pwText.innerHTML = password;
  const passwordStrength = getPasswordStrength(password);
  strengthText.innerHTML = passwordStrength;

  pwText.classList.remove("dimm");

  //remove all styles from strength meter
  for (var i = 0; i < scoreElements.length; i++) {
    scoreElements[i].classList.remove(
      "weak",
      "poor",
      "fair",
      "strong",
      "excellent"
    );
  }

  // and add the new styles based on the password strength
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

//set the initial value of password length when loading
document.addEventListener("DOMContentLoaded", function () {
  lengthIndicator.innerHTML = lengthInput.value;
});

//shows the selected  password length
lengthInput.addEventListener("input", function (event) {
  lengthIndicator.innerHTML = event.target.value;
});

//when clicking on the copy button this will add little animation (scale up) for 500ms
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(pwText.textContent);

  copyButton.classList.add("active");

  setTimeout(function () {
    copyButton.classList.remove("active");
  }, 500);
});

//this code is belongs to input[type="range"] amd ot will update the color befor and after the slider-thumb
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
