// Preleviamo il valore dei bottoni e span utilizzando i data attribute per separare le classi CSS dalle classi Javascript
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

//Istanziamo la classe calcolatrice
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //Funzione che ripulisce gli input
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  //Funzione che cancella un singolo numero
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //Funzione che cattura l'input dell'utente su un numero
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //Funzione che controlla le operazioni dell'utente
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  //Funzione che preleva gli input dell'utente ed esegue l'operazione selezionata
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //Funzione che ci permette di visualizzare l'output
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

//Utilizziamo la classe creata
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//Per ogni bottone numerico cliccato inseriamo il valore numerico cliccato all'interno della calcolatrice e aggiorniamo l'output
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//Per ogni operatore numerico cliccato inseriamo il valore cliccato all'interno della calcolatrice e aggiorniamo l'output
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//Al click del bottone "=" eseguiamo la funzione compute e facciamo l'operazione, successivamente aggiorniamo l'output
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

//Al click del bottone "C" ripuliamo tutti gli input eseguendo la funzione clear e, successivamente, aggiorniamo l'output
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

//Al click del "#" eseguiamo la funzione delete cancellando un solo numero e, successivamente, aggiorniamo l'output
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

//Funzione che esegue quanto scritto sopra MA all'invio da keyboard e non al click del bottone
document.addEventListener("keydown", function (e) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g;
  if (e.key.match(patternForNumbers)) {
    e.preventDefault();
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }
  if (e.key === ".") {
    e.preventDefault();
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }
  if (e.key.match(patternForOperators)) {
    e.preventDefault();
    calculator.chooseOperation(e.key);
    calculator.updateDisplay();
  }
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (e.key == "Delete") {
    e.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
});
