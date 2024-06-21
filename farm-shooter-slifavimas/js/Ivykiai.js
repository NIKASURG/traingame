//////////////////////////
function virsun() {
    console.log('test', priskirkNauja);
    priskirkNauja = "up";
}

function zemin() {
    priskirkNauja = "down";
}

function kairen() {
    priskirkNauja = "left";
}

function desinen() {
    priskirkNauja = "right";
}


document.getElementById("up").addEventListener("click", virsun);
document.getElementById("down").addEventListener("click", zemin);
document.getElementById("left").addEventListener("click", kairen);
document.getElementById("right").addEventListener("click", desinen);