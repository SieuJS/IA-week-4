import './style.css'

// Utility function to check if a number is valid
function isValidNumber(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

// Get all elements
const firstNumberInput = document.getElementById('first-number-input') as HTMLInputElement;
const secondNumberInput = document.getElementById('second-number-input') as HTMLInputElement;
const resultInput = document.getElementById('result-input') as HTMLInputElement;

const plusOperator = document.getElementById('plus-operator') as HTMLInputElement;
const subtractOperator = document.getElementById('subtract-operator') as HTMLInputElement;
const multiOperator = document.getElementById('multi-operator') as HTMLInputElement;
const divineOperator = document.getElementById('divine-operator') as HTMLInputElement;

const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
const notificationArea = document.getElementById('notification') as HTMLSpanElement;

function selectOperator(selectedOperator: HTMLInputElement) {
  plusOperator.checked = selectedOperator === plusOperator;
  subtractOperator.checked = selectedOperator === subtractOperator;
  multiOperator.checked = selectedOperator === multiOperator;
  divineOperator.checked = selectedOperator === divineOperator;
}

// Attach event listeners to operators to ensure only one is selected
plusOperator.addEventListener('change', () => selectOperator(plusOperator));
subtractOperator.addEventListener('change', () => selectOperator(subtractOperator));
multiOperator.addEventListener('change', () => selectOperator(multiOperator));
divineOperator.addEventListener('change', () => selectOperator(divineOperator));


// Event listeners for invalid number input detection
firstNumberInput.addEventListener('blur', () => {
  if (!isValidNumber(firstNumberInput.value)) {
      notificationArea.innerHTML = 'Vui lòng nhập số thập phân hợp lệ cho số thứ nhất!';
  }
});

secondNumberInput.addEventListener('blur', () => {
  if (!isValidNumber(secondNumberInput.value)) {
      notificationArea.innerHTML = 'Vui lòng nhập số thập phân hợp lệ cho số thứ hai!';
  }
});

// Calculate button click event
calculateBtn.addEventListener('click', () => {
  // Clear any previous notifications
  notificationArea.innerHTML = '';

  // Get values
  const num1 = parseFloat(firstNumberInput.value);
  const num2 = parseFloat(secondNumberInput.value);

  // Check if valid numbers are entered
  if (!isValidNumber(firstNumberInput.value) || !isValidNumber(secondNumberInput.value)) {
      notificationArea.innerHTML = 'Vui lòng nhập hai số hợp lệ!';
      return;
  }

  // Check if an operation is selected
  let result: number | null = null;
  if (plusOperator.checked) {
      result = num1 + num2;
  } else if (subtractOperator.checked) {
      result = num1 - num2;
  } else if (multiOperator.checked) {
      result = num1 * num2;
  } else if (divineOperator.checked) {
      if (num2 === 0) {
          notificationArea.innerHTML = 'Không thể chia cho 0!';
          return;
      }
      result = num1 / num2;
  } else {
      notificationArea.innerHTML = 'Vui lòng chọn một phép tính!';
      return;
  }

  // Display the result
  resultInput.value = result !== null ? result.toFixed(3).toString() : '';
});
