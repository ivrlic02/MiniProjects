const result = document.querySelector("#result");
const numbers = document.querySelectorAll(".number");

const operations = document.querySelectorAll(".operation");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const prefix = document.querySelector("#prefix");
const percentage = document.querySelector("#percentage");

let operand1 = "", operand2 = "";
let isOperand1 = false;
let operation = "";
let resultValue = 0;

let dotOperand1 = false, dotOperand2 = false;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", (e) => {
        let attribute = e.target.getAttribute("value");
        if(isOperand1 == false){
            getOperand1(attribute);
        }else {
            getOperand2(attribute);
        }
    })
}

function getOperand1(value) {
    if(value == "." && dotOperand1){
        return;
    }else if(value == "."){
        dotOperand1 = true;
    }

    operand1 += value;
    result.innerHTML = operand1;

    checkLenght(operand1);
}

function getOperand2(value) {
    if(value == "." && dotOperand2){
        return;
    }else if(value == "."){
        dotOperand2 = true;
    }

    operand2 += value;
    result.innerHTML= operand2;

    checkLenght(operand2);
}

function getOperation() {
    for (let i = 0; i < operations.length; i++) {
        operations[i].addEventListener("click", (e) => {
            operation = e.target.getAttribute("value");
            isOperand1 = true; 
        })
    }
}
getOperation();

equal.addEventListener("click", () => {
    result.innerHTML = "";

    if (operation == "+") {
        resultValue = parseFloat(operand1) + parseFloat(operand2);
    }else if(operation == "-") {
        resultValue = parseFloat(operand1) - parseFloat(operand2);
    }else if(operation == "x") {
        resultValue = parseFloat(operand1) * parseFloat(operand2);
    }else if(operation == "/") {
        if(operand2 == "0"){
            return result.innerHTML = "error";
        } else {
        resultValue = parseFloat(operand1) / parseFloat(operand2);
        }
    }

    resultValue = parseFloat(resultValue.toFixed(3));
    result.innerHTML = resultValue;
    operand1 = resultValue;
    operand2 = "";

    checkLenght(resultValue);
})

function checkLenght(value){
    if(value.toString().length > 8){
        result.innerHTML = parseFloat(value).toExponential(2);
    }
}

prefix.addEventListener("click", () => {
    result.innerHTML = "";

    if(operand1 != ""){
        resultValue = -operand1;
        operand1 = resultValue;
    }
    if(operand1 != "" && operand2 != "" && operation != ""){
        resultValue = -resultValue;
    }

    result.innerHTML = resultValue;
})

percentage.addEventListener("click", () => {
    result.innerHTML = "";

    if(operand1 != ""){
        resultValue = operand1 / 100;
        operand1 = resultValue;
    }
    if(operand1 != "" && operand2 != "" && operation != ""){
        resultValue = resultValue / 100;
    }

    result.innerHTML = resultValue;
})

clear.addEventListener("click", () => {
    result.innerHTML = 0;

    operand1 = "";
    isOperand1 = false;
    dotOperand1 = false;
    operand2 = "";
    dotOperand2 = false;
    operation = "";
    resultValue = 0;
})