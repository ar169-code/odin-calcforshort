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

    if (b === "0" && operator === "/") {
        result = "Get a load of this guy!"
        return result
    }

    a = +a;
    b = +b;

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

        if (firstNumber === "") {
            display.textContent = ""
            
            if (operations.includes(currentInput)) {
                return
            }
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

        if (!secondNumber && operations.includes(currentInput)) {
            display.textContent = display.textContent.slice(0,-2) + currentInput;
            currentOperator = currentInput;
            return
        }

        if (!operations.includes(currentInput)) {
            secondNumber += currentInput;
            return;
        }
        
        const result = operate(firstNumber, secondNumber, currentOperator);

        firstNumber = result;
        currentOperator = currentInput;
        secondNumber = "";

        if (Number.isFinite(+firstNumber)) {
            display.textContent = `${result}${currentInput}`;
        } else {
            resetCalc();
            display.textContent = `${result}`;
        };

    })
}

// Create functions for equals and clear that have different purposes
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

function resetCalc() {
    display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    beforeOperator = true;
}

equalsButton.addEventListener("click", () => {
    if (!secondNumber || !firstNumber) {
        return
    }

    const result = operate(firstNumber, secondNumber, currentOperator)

    resetCalc();

    if (Number.isFinite(+result)) {
        firstNumber = result;
    } else {
        firstNumber = ""    
    }
    
    display.textContent = result
})

 clearButton.addEventListener("click",resetCalc)