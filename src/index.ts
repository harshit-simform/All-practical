import {
  InverseTrigoValue,
  TrigoObject,
  TrigoValue,
  HyperTrigoValue,
  Flags,
} from "./interface";

// All variable declarations
let displayScreen = document.getElementById("screen") as HTMLInputElement;

const trigoButton = document.querySelectorAll(
  "#trigo_function .btn"
) as NodeListOf<HTMLButtonElement>;

const btnContainer = document.getElementById("btn-container") as HTMLDivElement;

const memoryFunction = document.getElementById(
  "memory-function"
) as HTMLDivElement;

const equalBtn = document.getElementById("equals-btn") as HTMLButtonElement;

const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;

const backBtn = document.getElementById("back-btn") as HTMLButtonElement;

const toggleBtn = document.querySelectorAll(
  ".toggle-btn"
) as NodeListOf<HTMLButtonElement>;

const data: { screen: string[]; operation: string[] } = {
  screen: [],
  operation: [],
};

var memory: string = "";

const toggleFlag: Flags = {
  trigoFunction: true,
  inverseFunction: true,
  hyperFunction: true,
  radian: true,
  absFlag: true,
  functionToggle: true,
};

//function that will be called whenever user clicks on the screen or button
btnContainer.addEventListener("click", (event: MouseEvent): void => {
  const targetElement = event.target as HTMLElement;
  handleEvents(targetElement.innerText);
});

// function that calculates and stores the data in the memory
memoryFunction.addEventListener("click", (event: MouseEvent): void => {
  const targetElement = event.target as HTMLElement;
  const operation: string = targetElement.innerHTML;

  switch (operation) {
    case "MS":
      memory = eval(data.screen.join(""));
      emptyarray();
      displayScreen.value = "";
      break;
    case "MR":
      if (memory === "") {
        return;
      } else {
        data.operation.push(memory);
        data.screen.push(memory);
        displayScreen.value = data.screen.join("");
        break;
      }
    case "MC":
      emptyarray();
      memory = "";
      displayScreen.value = "";
      break;
    case "M+":
      memory = `${Number(memory) + Number(eval(data.screen.join("")))}`;
      displayScreen.value = "";
      emptyarray();
      break;
    case "M-":
      memory = `${Number(memory) - Number(eval(data.screen.join("")))}`;
      displayScreen.value = "";
      emptyarray();
      break;
  }
});

equalBtn.addEventListener("click", (event: MouseEvent): void => {
  finalAnswer(event);
});

clearBtn.addEventListener("click", (event: MouseEvent): void => {
  clearScreen(event);
});
backBtn.addEventListener("click", (event: MouseEvent): void => {
  backFunction();
});

toggleBtn.forEach((item: HTMLButtonElement): void => {
  item.addEventListener("click", (event: MouseEvent): void => {
    const clickedButton = event.target as HTMLButtonElement;
    const operation = clickedButton.getAttribute("data-toggle") as string;
    toggle(operation);
  });
});

// function that calculates the factorial of the given number
const factorial = (n: number): number => (!(n > 1) ? 1 : factorial(n - 1) * n);

// funtion for handling keyboard as well as click events
function handleEvents(btn: string): void {
  let btnText: string = btn;
  let operation: string = btn;
  switch (btnText) {
    case "1":
      btnText = "1";
      operation = "1";
      break;
    case "2":
      btnText = "2";
      operation = "2";
      break;
    case "3":
      btnText = "3";
      operation = "3";
      break;
    case "4":
      btnText = "4";
      operation = "4";
      break;
    case "5":
      btnText = "5";
      operation = "5";
      break;
    case "6":
      btnText = "6";
      operation = "6";
      break;
    case "7":
      btnText = "7";
      operation = "7";
      break;
    case "8":
      btnText = "8";
      operation = "8";
      break;
    case "9":
      btnText = "9";
      operation = "9";
      break;
    case "0":
      btnText = "0";
      operation = "0";
      break;
    case ".":
      btnText = ".";
      operation = ".";
      break;
    case "(":
      btnText = "(";
      operation = "(";
      break;
    case ")":
      btnText = ")";
      operation = ")";
      break;
    case "+":
      btnText = "+";
      operation = "+";
      break;
    case "-":
      btnText = "-";
      operation = "-";
      break;
    case "\u00F7":
    case "/":
      btnText = "/";
      operation = "/";
      break;
    case "\u2A09":
    case "*":
      btnText = "*";
      operation = "*";
      break;
    case "mod":
    case "%":
      btnText = "%";
      operation = "%";
      break;
    case "xy":
      btnText = "^";
      operation = "**";
      break;
    case "x2":
      btnText = "^2";
      operation = `Math.pow(${findNumber()},2)`;
      break;
    case "sin":
      btnText = "sin(";
      operation = "trigonometryValue(Math.sin,";
      break;
    case "cos":
      btnText = "cos(";
      operation = "trigonometryValue(Math.cos,";
      break;
    case "tan":
      btnText = "tan(";
      operation = "trigonometryValue(Math.tan,";
      break;
    case "cosec":
      btnText = "cosec(";
      operation = "trigonometryValue('Math.cosec',";
      break;
    case "sec":
      btnText = "sec(";
      operation = "trigonometryValue('Math.sec',";
      break;
    case "cot":
      btnText = "cot(";
      operation = "trigonometryValue('Math.cot',";
      break;
    case "log":
      btnText = "log(";
      operation = "Math.log10(";
      break;
    case "ln":
      btnText = "ln(";
      operation = "Math.log(";
      break;
    case "\u03C0":
      btnText = "\u03C0";
      operation = "Math.PI";
      break;
    case "e":
      btnText = "e";
      operation = "Math.E";
      break;
    case "x!":
      btnText = "!";
      operation = `${factorial(findNumber())}`;
      break;
    case "\u221A":
      btnText = "\u221A(";
      operation = "Math.sqrt(";
      break;
    case "\u221b":
      btnText = "\u221b(";
      operation = "Math.cbrt(";
      break;
    case "sin-1":
      btnText = "arcsin(";
      operation = "inverseTrigoFunction(Math.asin,";
      break;
    case "cos-1":
      btnText = "arccos(";
      operation = "inverseTrigoFunction(Math.acos,";
      break;
    case "tan-1":
      btnText = "arctan(";
      operation = "inverseTrigoFunction(Math.atan,";
      break;
    case "cosec-1":
      btnText = "arccosec(";
      operation = "inverseTrigoFunction('Math.acosec',";
      break;
    case "sec-1":
      btnText = "arcsec(";
      operation = "inverseTrigoFunction('Math.asec',";
      break;
    case "cot-1":
      btnText = "arccot(";
      operation = "inverseTrigoFunction('Math.acot',";
      break;
    case "sinh":
      btnText = "sinh(";
      operation = "hyperFunction(Math.sinh,";
      break;
    case "cosh":
      btnText = "cosh(";
      operation = "hyperFunction(Math.cosh,";
      break;
    case "tanh":
      btnText = "tanh(";
      operation = "hyperFunction(Math.tanh,";
      break;
    case "sech":
      btnText = "sech(";
      operation = "hyperFunction('Math.sech',";
      break;
    case "coth":
      btnText = "coth(";
      operation = "hyperFunction('Math.coth',";
      break;
    case "cosech":
      btnText = "cosech(";
      operation = "hyperFunction('Math.cosech',";
      break;
    case "1/x":
      btnText = "1/";
      operation = "1/";
      break;
    case "|x|":
      btnText = "|";
      if (toggleFlag.absFlag) {
        operation = "Math.abs(";
        toggleFlag.absFlag = !toggleFlag.absFlag;
      } else {
        operation = ")";
        toggleFlag.absFlag = !toggleFlag.absFlag;
      }
      break;
    case "10x":
      btnText = "10^";
      operation = "10**";
      break;
    case "+/-":
      btnText = `${Number(data.screen.pop()) * -1}`;
      operation = `${Number(data.operation.pop()) * -1}`;
      break;
    case "exp":
      btnText = "e^(";
      operation = "Math.exp(";
      break;
    case "rand":
      var rand = Math.random();
      btnText = `${rand}`;
      operation = `${rand}`;
      break;
    case "ceil":
      btnText = `${Math.ceil(eval(data.screen.join("")))}`;
      operation = `${Math.ceil(eval(data.operation.join("")))}`;
      emptyarray();
      break;
    case "floor":
      btnText = `${Math.floor(eval(data.screen.join("")))}`;
      operation = `${Math.floor(eval(data.operation.join("")))}`;
      emptyarray();
      break;
    case "F-E":
      if (data.operation.length === 0) {
        return;
      }
      btnText = `${Number.parseFloat(data.operation.join("")).toExponential()}`;
      operation = `${Number.parseFloat(
        data.operation.join("")
      ).toExponential()}`;
      emptyarray();
      break;
    default:
      btnText = "";
      operation = "";
      break;
  }
  if (btnText == "" && operation == "") {
    return;
  }
  data.operation.push(operation);
  data.screen.push(btnText);
  displayScreen.value = data.screen.join("");
}

// function that will return a string representing number between operators
function findNumber(): number {
  let i = data.screen.length;
  const tempArr = [];
  if (data.screen[i - 1] == ")") {
    while (i >= 0 && data.screen[i] !== "(") {
      tempArr.unshift(data.screen[i]);
      data.operation.pop();
      i--;
    }
    tempArr.unshift("(");
  } else {
    let i = data.screen.length - 1;
    while (i >= 0 && !isNaN(Number(data.screen[i]))) {
      tempArr.unshift(data.screen[i]);
      data.operation.pop();
      i--;
    }
  }
  return eval(tempArr.join(""));
}

//event listner that will be called when user presses any key in the keyboard
window.addEventListener("keydown", (event: KeyboardEvent) => {
  event.preventDefault();
  if (event.key == "Enter") {
    finalAnswer(event);
    return;
  } else if (event.key == "Backspace") {
    backFunction();
  } else {
    handleEvents(event.key);
  }
});

// main function that calulates every operation and displays the results
function finalAnswer(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation();
  if (data.operation.length === 0) {
    return;
  }
  try {
    let value: string = eval(data.operation.join(""));
    data.operation = [value];
    data.screen = [value];
    if (isNaN(Number(value))) {
      displayScreen.value = "Enter a valid number";
      emptyarray();
    } else {
      displayScreen.value = value;
    }
    return;
  } catch {
    emptyarray();
    displayScreen.value = "Invalid Syntax";
    return;
  }
}

// function for erasing everything
function emptyarray(): void {
  data.operation = [];
  data.screen = [];
  return;
}

// function that clears the screen
function clearScreen(event: MouseEvent): void {
  event.preventDefault();
  emptyarray();
  displayScreen.value = "";
  return;
}

// function that handles back button clicks and clears the screen
function backFunction(): void {
  if (data.screen.length === data.operation.length) {
    data.operation.pop();
    data.screen.pop();
  } else {
    data.screen.length > data.operation.length
      ? data.screen.pop()
      : data.operation.pop();
  }
  displayScreen.value = data.screen.join("");
}

// function that handles all the toggle operations (trigoToggle, inverseToggle , hyperToggle , degToggle , functionToggle)
function toggle(value: string): void {
  let trigoObject: TrigoObject = {
    sin: ["sin<sup>-1</sup>", "sin-1", "sinh"],
    cos: ["cos<sup>-1</sup>", "cos-1", "cosh"],
    tan: ["tan<sup>-1</sup>", "tan-1", "tanh"],
    sec: ["sec<sup>-1</sup>", "sec-1", "sech"],
    cot: ["cot<sup>-1</sup>", "cot-1", "coth"],
    cosec: ["cosec<sup>-1</sup>", "cosec-1", "cosech"],
    hyp: ["hyp", "hyp", "hyp"],
  };
  if (value == "trigoToggle") {
    trigoButton.forEach((btn) => {
      let btnText: string = btn.innerText;
      let btnTextReplacement: string = btn.innerText;
      if (toggleFlag.inverseFunction) {
        btnTextReplacement = trigoObject.hasOwnProperty(`${btnText}`)
          ? trigoObject[btnText][0]
          : btnText;
      } else {
        btnTextReplacement =
          Object.keys(trigoObject).find(
            (key: string) => trigoObject[key][1] === btnText
          ) ?? btnText;
      }
      btn.innerHTML = btnTextReplacement;
    });
    toggleFlag.inverseFunction = !toggleFlag.inverseFunction;
    return;
  } else if (value == "hyperToggle") {
    trigoButton.forEach((btn) => {
      let btnText = btn.innerText;
      let btnTextReplacement = btn.innerText;
      if (toggleFlag.hyperFunction) {
        btnTextReplacement = trigoObject.hasOwnProperty(`${btnText}`)
          ? trigoObject[btnText][2]
          : btnText;
      } else {
        btnTextReplacement =
          Object.keys(trigoObject).find(
            (key) => trigoObject[key][2] === btnText
          ) ?? btnText;
      }
      btn.innerHTML = btnTextReplacement;
    });
    toggleFlag.hyperFunction = !toggleFlag.hyperFunction;
    return;
  } else if (value == "degToggle") {
    const degButton = document.getElementById("degButton") as HTMLButtonElement;
    toggleFlag.radian
      ? (degButton.style.background = "#91c1e7")
      : (degButton.style.background = "#f8f8f8");
    toggleFlag.radian = !toggleFlag.radian;
    return;
  } else if (value == "functionToggle") {
    const functionButton = document.getElementById(
      "functionButton"
    ) as HTMLButtonElement;
    toggleFlag.functionToggle
      ? (functionButton.style.display = "block")
      : (functionButton.style.display = "none");
    toggleFlag.functionToggle = !toggleFlag.functionToggle;
    return;
  } else {
    const trigoFunction = document.getElementById(
      "trigo_function"
    ) as HTMLButtonElement;
    toggleFlag.trigoFunction
      ? (trigoFunction.style.display = "block")
      : (trigoFunction.style.display = "none");
    toggleFlag.trigoFunction = !toggleFlag.trigoFunction;
    return;
  }
}

//functoin for calculating trignometry values
function trigonometryValue(operation: TrigoValue, value: number): number {
  if (!toggleFlag.radian) {
    value = (value * Math.PI) / 180;
  }
  if (operation == "Math.cosec") {
    return 1 / Math.sin(value);
  }
  if (operation == "Math.sec") {
    return 1 / Math.cos(value);
  }
  if (operation == "Math.cot") {
    return 1 / Math.tan(value);
  }
  return operation(value);
}

//function for calculating inverse trignometry values
function inverseTrigoFunction(
  operation: InverseTrigoValue,
  value: number
): number {
  if (operation == "Math.asec") {
    value = 1 / Math.acos(value);
  } else if (operation == "Math.acot") {
    value = 1 / Math.atan(value);
  } else if (operation == "Math.acosec") {
    value = 1 / Math.asin(value);
  } else {
    value = operation(value);
  }
  if (!toggleFlag.radian) {
    value = (value * 180) / Math.PI;
  }
  return value;
}

// function for calculating hyperbolic trignometry values
function hyperFunction(operation: HyperTrigoValue, value: number): number {
  if (!toggleFlag.radian) {
    value = (value * Math.PI) / 180;
  }
  if (operation == "Math.cosech") {
    return 1 / Math.sinh(value);
  }
  if (operation == "Math.sech") {
    return 1 / Math.cosh(value);
  }
  if (operation == "Math.coth") {
    return 1 / Math.tanh(value);
  }
  return operation(value);
}
