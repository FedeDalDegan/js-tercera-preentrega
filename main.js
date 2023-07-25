/* 
Alumno: Federico Dal Degan
Comision: 43140
Tercera preentrega

OBJETIVOS

Codificar funciones de procesos esenciales y notificación de resultados por HTML, añadiendo interacción al simulador.
Ampliar y refinar el flujo de trabajo del script en términos de captura de eventos, procesamiento del simulador y notificación de resultados en forma de salidas por HTML, modificando el DOM.
Definir eventos a manejar y su función de respuesta.
Modificar el DOM, ya sea para definir elementos al cargar la página o para realizar salidas de un procesamiento.
Almacenar datos (clave-valor) en el Storage y recuperarlos.
Implementación con uso de JSON y Storage.
Modificación del DOM y detección de eventos de usuario.
*/

// Realizar operacion matematica
function calculateResult(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    const result = operator === '+'
        ? num1 + num2
        : operator === '-'
        ? num1 - num2
        : operator === '*'
        ? num1 * num2
        : operator === '/'
        ? num2 === 0 ? NaN : num1 / num2
        : NaN;

    return result;
}

// Actualizacion usando DOM
function updateHistory(history) {
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    history.forEach((calculation) => {
        const listItem = document.createElement('li');
        listItem.textContent = calculation;
        historyList.appendChild(listItem);
    });
}

// LocalStorage (Permite ver el historial aun que se cierre el navegador)
function saveToStorage(calculation) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(calculation);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory(history);
}

// Conseguir VALORES (value) y evento CLICK
function handleCalculate() {
    const num1 = document.getElementById('num1').value;
    const operator = document.getElementById('operator').value;
    const num2 = document.getElementById('num2').value;

    const result = calculateResult(num1, operator, num2);

    const errorMessage = num1 === '' || num2 === ''
        ? 'Ingresa ambos números'
        : isNaN(result)
        ? 'Operación inválida'
        : '';

    document.getElementById('result').textContent = errorMessage || `Resultado: ${result}`;

    if (!errorMessage) {
        const calculation = `${num1} ${operator} ${num2} = ${result}`;
        saveToStorage(calculation);
    }
}

// Carga del historial 
function loadHistoryFromStorage() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    updateHistory(history);
}

// Asocio el boton al evento click
document.getElementById('calculate').addEventListener('click', handleCalculate);

// Cargar historial 
loadHistoryFromStorage();
