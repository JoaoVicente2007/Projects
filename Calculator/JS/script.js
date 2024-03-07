function clearResult() {
    document.getElementById("result").value = "";
}

function display(value){
    document.getElementById("result").value += value;
}

function calculate(btn){
    var number = document.getElementById("result").value;
    var operator = eval(number);
    document.getElementById("result").value = operator;
}