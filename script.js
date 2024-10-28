// Select all buttons and the display element
const display = document.querySelector('.display input');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';    // Stores the current input
let operator = '';        // Stores the current operator
let previousInput = '';   // Stores the previous input

// Function to update display
function updateDisplay(value) {
    display.value = value;
}

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Clear button
        if (button.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay(''); // Clear the display
        }
        // Operator buttons (+, -, *, /, %)
        else if (button.classList.contains('operator')) {
            if (value === '=') {
                // Perform calculation
                if (previousInput && currentInput && operator) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    operator = '';
                    previousInput = '';
                    updateDisplay(currentInput);
                }
            } else {
                if (currentInput) {
                    // If there's already an operator, perform the calculation first
                    if (operator) {
                        currentInput = calculate(previousInput, operator, currentInput);
                        updateDisplay(currentInput);
                    }
                    // Set the new operator
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
            }
        }
        // Number or decimal buttons
        else {
            if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Function to perform calculations
function calculate(num1, operator, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error';
        case '%':
            return (a % b).toString();
        default:
            return '';
    }
}
