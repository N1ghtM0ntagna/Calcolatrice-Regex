enabled = true;
let display;
const operators = ["^", "√", "÷", "*", "-", "+" , "."];

document.addEventListener("DOMContentLoaded", function() {
    enabled = true;
    display = document.getElementById("display");
});

function reset(){
    enabled = true;
    display.value = "";
}

function del(){
    let text = display.value;
    updateDisplay(text.slice(0, -1));
}

function addToDisplay(newText){
    let text = display.value;

    updateDisplay(text + newText);
}

function updateDisplay(newText){
    if(!enabled) return;
    display.value = newText;
}

function addNumber(num){
    addToDisplay(num);
}

function addOperator(operator){
    let lastChar = display.value.slice(-1);

    if(!operators.includes(lastChar)){
        addToDisplay(operator);
    }else{
        if (lastChar != "." && operator != ".") {
            updateDisplay(display.value.slice(0, -1) + operator);
        }
    }
}

function errore(){
    updateDisplay("Errore");
    enabled = false;
}

function calculate(){
    let result = display.value;

    while (result.includes("^")) {
        let expression = result.match(/(-?\d+(\.    \d+)?)\^(-?\d+(\.\d+)?)/); //espressione per trovare la potenza: +-numero^+-numero

        if (expression) {
            let num1 = parseFloat(expression[1]); //il secondo indice corrisponde al primo numero
            let num2 = parseFloat(expression[3]); //il quarto indice corrisponde al secondo numero

            let powResult = Math.pow(num1, num2);
            result = result.replace(expression[0], powResult); //il primo indice corrisponde alla radice con il numero prima e dopo
        }else{
            errore();
            return;
        }
    }

    console.log(result+" ^");

    while (result.includes("√")) {
        let expression = result.match(/(-?\d*(\.\d+)?)√(-?\d+(\.\d+)?)/); //espressione per trovare la radice: +-numero(opzionale)√+-numero

        if (expression) {
            //operatore ternario che controlla se c'è il primo numero, e se non c'è, diventa 1
            let num1 = expression[1] ? parseFloat(expression[1]) : 1; //il secondo indice corrisponde al primo numero
            let num2 = parseFloat(expression[3]); //il quarto indice corrisponde al secondo numero

            if(num2 < 0) { 
                errore();
                return;
            }
            
            let sqrtResult = num1 * Math.sqrt(num2);
            result = result.replace(expression[0], sqrtResult); //il primo indice corrisponde alla radice con il numero prima e dopo
        }else{
            errore();
            return;
        }
    }

    console.log(result+" √");

    while (result.includes("÷")) {
        let expression = result.match(/(-?\d+(\.\d+)?)\÷(-?\d+(\.\d+)?)/);

        if (expression) {
            let num1 = parseFloat(expression[1]);
            let num2 = parseFloat(expression[3]);

            if (num2 === 0) {
                errore();
                return;
            }

            let divResult = num1 / num2;
            result = result.replace(expression[0], divResult);
        } else {
            errore();
            return;
        }
    }

    console.log(result+" /");

    while (result.includes("*")) {
        let expression = result.match(/(-?\d+(\.\d+)?)\*(-?\d+(\.\d+)?)/); //espressione per trovare la radice con un numero reale(opzionale) e un numero reale: numero(opzionale)√numero

        if (expression) {
            let num1 = parseFloat(expression[1]);
            let num2 = parseFloat(expression[3]);

            let multiplyResult = num1 * num2;
            result = result.replace(expression[0], multiplyResult);
        } else {
            errore();
            return;
        }
    }

    console.log(result+" *");

    while (result.includes("-")) {
        let expression = result.match(/(-?\d+(\.\d+)?)\s*\-\s*(-?\d+(\.\d+)?)/);

        if (expression) {
            let num1 = parseFloat(expression[1]);
            let num2 = parseFloat(expression[3]);

            let subtractResult = num1 - num2;
            result = result.replace(expression[0], subtractResult);
        } else {
            break;
        }
    }

    console.log(result+" -");

    while (result.includes("+")) {
        let expression = result.match(/(-?\d+(\.\d+)?)\+(-?\d+(\.\d+)?)/);
        if (expression) {
            let num1 = parseFloat(expression[1]);
            let num2 = parseFloat(expression[3]);

            let addResult = num1 + num2;
            result = result.replace(expression[0], addResult);
        } else {
            errore();
            return;
        }
    }

    console.log(result+" +");
    updateDisplay(result);
}
