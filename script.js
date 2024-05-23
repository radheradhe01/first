document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display-value');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let waitForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumber(num) {
        if (waitForSecondOperand) {
            currentInput = num;
            waitForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? num : currentInput + num;
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);
        if (operator && waitForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand == null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = String(result);
            firstOperand = result;
        }

        waitForSecondOperand = true;
        operator = nextOperator;
        updateDisplay();
    }

    function calculate(firstOperand, secondOperand, operator) {
        if (operator === 'add') return firstOperand + secondOperand;
        if (operator === 'subtract') return firstOperand - secondOperand;
        if (operator === 'multiply') return firstOperand * secondOperand;
        if (operator === 'divide') return firstOperand / secondOperand;
        return secondOperand;
    }

    function handleFunction(action) {
        if (action === 'clear') {
            currentInput = '0';
            firstOperand = null;
            operator = null;
            waitForSecondOperand = false;
        } else if (action === 'sign') {
            currentInput = (parseFloat(currentInput) * -1).toString();
        } else if (action === 'percent') {
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else if (action === 'sqrt') {
            currentInput = (Math.sqrt(parseFloat(currentInput))).toString();
        } else if (action === 'squared') {
            currentInput = (Math.pow(parseFloat(currentInput), 2)).toString();
        } else if (action === 'sin') {
            currentInput = (Math.sin(parseFloat(currentInput))).toString();
        } else if (action === 'cos') {
            currentInput = (Math.cos(parseFloat(currentInput))).toString();
        } else if (action === 'tan') {
            currentInput = (Math.tan(parseFloat(currentInput))).toString();
        } else if (action === 'log') {
            currentInput = (Math.log10(parseFloat(currentInput))).toString();
        }
        updateDisplay();
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', (event) => {
        const { target } = event;
        const { action } = target.dataset;
        
        if (!target.matches('button')) return;

        if (target.classList.contains('number')) {
            handleNumber(action);
        } else if (target.classList.contains('operator')) {
            handleOperator(action);
        } else if (target.classList.contains('function')) {
            handleFunction(action);
        } else if (action === 'decimal') {
            handleDecimal();
        } else if (action === 'equals') {
            handleOperator(action);
        }
    });

    updateDisplay();
});
