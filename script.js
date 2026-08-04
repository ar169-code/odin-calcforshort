// Create functions to handle operations
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

// Assign default variables
let firstNumber = "";
let currentOperator;
let secondNumber = "";
let beforeOperator = true;
const operations = "+-*/";

// Create function to perform operation based on the user's operand
function operate(a, b, operator) {
    let result

    switch (operator) {
        case "+":
            result = add(a, b);
            break
        case "-":
            result = subtract(a, b);
            break
        case "*":
            result = multiply(a, b);
            break
        case "/":
            result = divide(a, b);
            break
    }
    
    return result
}

const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button")

// Add event listeners to the buttons except = and clear
for (let button of [...buttons].slice(0,-2)) {
    button.addEventListener("click", () => {
        const currentInput = button.textContent
        if (!firstNumber) {
            display.textContent = ""
        }

        display.textContent += currentInput;

        if (beforeOperator) {
            if (operations.includes(currentInput)) {
                currentOperator = currentInput;
                beforeOperator = false;
                return;
            }

            firstNumber += currentInput;
            return;
        }

        secondNumber += currentInput;


    })
}

// Create functions for equals and clear that have different purposes
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

function resetCalc() {
    display.textContent = ""
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    beforeOperator = true;
}

equals.addEventListener("click", () => {
    const result = operate(+firstNumber, +secondNumber, currentOperator)

    resetCalc()
    display.textContent = result;
})

 clear.addEventListener("click",resetCalc)