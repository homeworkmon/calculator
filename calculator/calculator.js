const calc = document.querySelector('.calcbody');
const keys = calc.childNodes;
const result = document.querySelector(".result");
const error = document.querySelector('.error');
const answer = document.querySelector('.answer');
const c = document.querySelector('.c');
const decimal = document.querySelector('.decimal');
const numbers = document.querySelectorAll('.number');
const operators  = document.querySelectorAll('.operator')
const equals = document.querySelector('.equals')
let arrCurrent = []; 
let variables = [];
let current, total, operator;

function performOperation(operator, x, y) {
    console.log(`${x} ${operator} ${y}`);
    if (operator == '-') {
        total = (x - y);
    }
    else if (operator == '+') {
        total = (x + y);
    }
    else if (operator == '*') {
        total = (x*y);
    }
    else if (operator == '/') {
        if (x === 0 || y === 0) {
            answer.style.display = 'none';
            error.classList.remove('error');
            clear();
        }
        else {total = (x/y);}   
    }
    total = parseFloat(total.toFixed(2));
    clearArray(variables);
    variables.push(total);
} 
function getCurrent(value) {
    if (answer.style.display == 'none') {
        answer.style.display = 'block';
        error.classList.add('error');
    }
    arrCurrent.push(value);
    current = parseFloat(arrCurrent.join(''));
    answer.innerText = current;
}
function setOperator(value) {
    variables.push(current);
    if (variables.length > 1) {
        performOperation(operator, variables[0], variables[1]);
    }
    else {}
    operator = value;
    clearArray(arrCurrent);
}
function equalize() {
    variables.push(current);
    if (variables.length == 1) {
        clearArray(variables);
    } 
    else if (variables.length > 1) {
        performOperation(operator, variables[0], variables[1]);
        current = total;
    }
    answer.innerText = current;
    clearArray(arrCurrent);
    clearArray(variables);
}
function clear() {
    answer.innerText = 0;
    operator = undefined;
    total = 0;
    current= 0;
    clearArray(arrCurrent);
    clearArray(variables);
}
function clearArray(arr) {
    while (arr.length) {
        arr.pop();
    }
}
function highlightOn(div) {
    div.classList.add('highlight');
}
function highlightOff(div) {
    div.classList.remove('highlight');
}
function keyboardSupport(e) {
    if (!document.querySelector(`div[data-value="${e.key}"]`)) { return; }
    else {
        let keyDiv = document.querySelector(`div[data-value="${e.key}"]`);
        highlightOn(keyDiv);
        //check if key entered is number or operator and just pass function the key value for simplicity
        if (!isFinite(e.key)) {
            if ((e.key) == '=') {
                equalize();
            }
            else if ((e.key) == 'c') { clear(); }
            else if ((e.key) == '.') { getCurrent(e.key); }
            else { setOperator(e.key); }
        }
        else {
            getCurrent(e.key); 
        }
    }
}
c.addEventListener('click', clear);
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        getCurrent(e.target.dataset.value)
    });
});
window.addEventListener('keydown', keyboardSupport);
keys.forEach(key => {
    key.addEventListener('click', (e) => {
        highlightOn(e.target)
    });
    key.addEventListener('transitionend', (e) => {
        highlightOff(e.target)
    });
});
operators.forEach(operator => 
    {operator.addEventListener('click', (e) => {
        setOperator(e.target.dataset.value);
    });
});
equals.addEventListener('click', equalize);