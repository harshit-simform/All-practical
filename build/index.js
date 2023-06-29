// All variable declarations
var displayScreen = document.getElementById("screen");
var trigoButton = document.querySelectorAll("#trigo_function .btn");
var btnContainer = document.getElementById("btn-container");
var memoryFunction = document.getElementById("memory-function");
var equalBtn = document.getElementById("equals-btn");
var clearBtn = document.getElementById("clear-btn");
var backBtn = document.getElementById("back-btn");
var toggleBtn = document.querySelectorAll(".toggle-btn");
var data = {
    screen: [],
    operation: [],
};
var memory = "";
var toggleFlag = {
    trigoFunction: true,
    inverseFunction: true,
    hyperFunction: true,
    radian: true,
    absFlag: true,
    functionToggle: true,
};
//function that will be called whenever user clicks on the screen or button
btnContainer.addEventListener("click", function (event) {
    var targetElement = event.target;
    handleEvents(targetElement.innerText);
});
// function that calculates and stores the data in the memory
memoryFunction.addEventListener("click", function (event) {
    var targetElement = event.target;
    var operation = targetElement.innerHTML;
    switch (operation) {
        case "MS":
            memory = eval(data.screen.join(""));
            emptyarray();
            displayScreen.value = "";
            break;
        case "MR":
            if (memory === "") {
                return;
            }
            else {
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
            memory = "".concat(Number(memory) + Number(eval(data.screen.join(""))));
            displayScreen.value = "";
            emptyarray();
            break;
        case "M-":
            memory = "".concat(Number(memory) - Number(eval(data.screen.join(""))));
            displayScreen.value = "";
            emptyarray();
            break;
    }
});
equalBtn.addEventListener("click", function (event) {
    finalAnswer(event);
});
clearBtn.addEventListener("click", function (event) {
    clearScreen(event);
});
backBtn.addEventListener("click", function (event) {
    backFunction();
});
toggleBtn.forEach(function (item) {
    item.addEventListener("click", function (event) {
        var clickedButton = event.target;
        var operation = clickedButton.getAttribute("data-toggle");
        toggle(operation);
    });
});
// function that calculates the factorial of the given number
var factorial = function (n) { return (!(n > 1) ? 1 : factorial(n - 1) * n); };
// funtion for handling keyboard as well as click events
function handleEvents(btn) {
    var btnText = btn;
    var operation = btn;
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
            operation = "Math.pow(".concat(findNumber(), ",2)");
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
            operation = "".concat(factorial(findNumber()));
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
            }
            else {
                operation = ")";
                toggleFlag.absFlag = !toggleFlag.absFlag;
            }
            break;
        case "10x":
            btnText = "10^";
            operation = "10**";
            break;
        case "+/-":
            btnText = "".concat(Number(data.screen.pop()) * -1);
            operation = "".concat(Number(data.operation.pop()) * -1);
            break;
        case "exp":
            btnText = "e^(";
            operation = "Math.exp(";
            break;
        case "rand":
            var rand = Math.random();
            btnText = "".concat(rand);
            operation = "".concat(rand);
            break;
        case "ceil":
            btnText = "".concat(Math.ceil(eval(data.screen.join(""))));
            operation = "".concat(Math.ceil(eval(data.operation.join(""))));
            emptyarray();
            break;
        case "floor":
            btnText = "".concat(Math.floor(eval(data.screen.join(""))));
            operation = "".concat(Math.floor(eval(data.operation.join(""))));
            emptyarray();
            break;
        case "F-E":
            if (data.operation.length === 0) {
                return;
            }
            btnText = "".concat(Number.parseFloat(data.operation.join("")).toExponential());
            operation = "".concat(Number.parseFloat(data.operation.join("")).toExponential());
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
function findNumber() {
    var i = data.screen.length;
    var tempArr = [];
    if (data.screen[i - 1] == ")") {
        while (i >= 0 && data.screen[i] !== "(") {
            tempArr.unshift(data.screen[i]);
            data.operation.pop();
            i--;
        }
        tempArr.unshift("(");
    }
    else {
        var i_1 = data.screen.length - 1;
        while (i_1 >= 0 && !isNaN(Number(data.screen[i_1]))) {
            tempArr.unshift(data.screen[i_1]);
            data.operation.pop();
            i_1--;
        }
    }
    return eval(tempArr.join(""));
}
//event listner that will be called when user presses any key in the keyboard
window.addEventListener("keydown", function (event) {
    event.preventDefault();
    if (event.key == "Enter") {
        finalAnswer(event);
        return;
    }
    else if (event.key == "Backspace") {
        backFunction();
    }
    else {
        handleEvents(event.key);
    }
});
// main function that calulates every operation and displays the results
function finalAnswer(event) {
    event.stopPropagation();
    if (data.operation.length === 0) {
        return;
    }
    try {
        var value = eval(data.operation.join(""));
        data.operation = [value];
        data.screen = [value];
        if (isNaN(Number(value))) {
            displayScreen.value = "Enter a valid number";
            emptyarray();
        }
        else {
            displayScreen.value = value;
        }
        return;
    }
    catch (_a) {
        emptyarray();
        displayScreen.value = "Invalid Syntax";
        return;
    }
}
// function for erasing everything
function emptyarray() {
    data.operation = [];
    data.screen = [];
    return;
}
// function that clears the screen
function clearScreen(event) {
    event.preventDefault();
    emptyarray();
    displayScreen.value = "";
    return;
}
// function that handles back button clicks and clears the screen
function backFunction() {
    if (data.screen.length === data.operation.length) {
        data.operation.pop();
        data.screen.pop();
    }
    else {
        data.screen.length > data.operation.length
            ? data.screen.pop()
            : data.operation.pop();
    }
    displayScreen.value = data.screen.join("");
}
// function that handles all the toggle operations (trigoToggle, inverseToggle , hyperToggle , degToggle , functionToggle)
function toggle(value) {
    var trigoObject = {
        sin: ["sin<sup>-1</sup>", "sin-1", "sinh"],
        cos: ["cos<sup>-1</sup>", "cos-1", "cosh"],
        tan: ["tan<sup>-1</sup>", "tan-1", "tanh"],
        sec: ["sec<sup>-1</sup>", "sec-1", "sech"],
        cot: ["cot<sup>-1</sup>", "cot-1", "coth"],
        cosec: ["cosec<sup>-1</sup>", "cosec-1", "cosech"],
        hyp: ["hyp", "hyp", "hyp"],
    };
    if (value == "trigoToggle") {
        trigoButton.forEach(function (btn) {
            var _a;
            var btnText = btn.innerText;
            var btnTextReplacement = btn.innerText;
            if (toggleFlag.inverseFunction) {
                btnTextReplacement = trigoObject.hasOwnProperty("".concat(btnText))
                    ? trigoObject[btnText][0]
                    : btnText;
            }
            else {
                btnTextReplacement =
                    (_a = Object.keys(trigoObject).find(function (key) { return trigoObject[key][1] === btnText; })) !== null && _a !== void 0 ? _a : btnText;
            }
            btn.innerHTML = btnTextReplacement;
        });
        toggleFlag.inverseFunction = !toggleFlag.inverseFunction;
        return;
    }
    else if (value == "hyperToggle") {
        trigoButton.forEach(function (btn) {
            var _a;
            var btnText = btn.innerText;
            var btnTextReplacement = btn.innerText;
            if (toggleFlag.hyperFunction) {
                btnTextReplacement = trigoObject.hasOwnProperty("".concat(btnText))
                    ? trigoObject[btnText][2]
                    : btnText;
            }
            else {
                btnTextReplacement =
                    (_a = Object.keys(trigoObject).find(function (key) { return trigoObject[key][2] === btnText; })) !== null && _a !== void 0 ? _a : btnText;
            }
            btn.innerHTML = btnTextReplacement;
        });
        toggleFlag.hyperFunction = !toggleFlag.hyperFunction;
        return;
    }
    else if (value == "degToggle") {
        var degButton = document.getElementById("degButton");
        toggleFlag.radian
            ? (degButton.style.background = "#91c1e7")
            : (degButton.style.background = "#f8f8f8");
        toggleFlag.radian = !toggleFlag.radian;
        return;
    }
    else if (value == "functionToggle") {
        var functionButton = document.getElementById("functionButton");
        toggleFlag.functionToggle
            ? (functionButton.style.display = "block")
            : (functionButton.style.display = "none");
        toggleFlag.functionToggle = !toggleFlag.functionToggle;
        return;
    }
    else {
        var trigoFunction = document.getElementById("trigo_function");
        toggleFlag.trigoFunction
            ? (trigoFunction.style.display = "block")
            : (trigoFunction.style.display = "none");
        toggleFlag.trigoFunction = !toggleFlag.trigoFunction;
        return;
    }
}
//functoin for calculating trignometry values
function trigonometryValue(operation, value) {
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
function inverseTrigoFunction(operation, value) {
    if (operation == "Math.asec") {
        value = 1 / Math.acos(value);
    }
    else if (operation == "Math.acot") {
        value = 1 / Math.atan(value);
    }
    else if (operation == "Math.acosec") {
        value = 1 / Math.asin(value);
    }
    else {
        value = operation(value);
    }
    if (!toggleFlag.radian) {
        value = (value * 180) / Math.PI;
    }
    return value;
}
// function for calculating hyperbolic trignometry values
function hyperFunction(operation, value) {
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
export {};
