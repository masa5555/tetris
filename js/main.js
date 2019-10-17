//init
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
canvas.width=300; canvas.height=600;
var massWidth = 10; var massHeight = 20;
var massSize = 30;
var sx = massWidth/2; var sy = 2;

// for selecting block
function rand5(){
    return Math.floor( Math.random()*5);
}
//def mass
var mass = [];
for(var i = 0;i<massHeight;i++){
    mass[i] = [];
    for(var j = 0;j<massWidth;j++){
        mass[i][j] = {frag: 0};
    }
}
//def block
var blockSize = 4;
var XY = 0; //rotate iterater
var block = [
    [[-1, -1, 0, 0],[-1, 0, 1, 2],[-1, 0, 0, 1], [-1, 0, -1, 1], [-1, 0, 0, 1]], //X
    [[-1, 0,-1, 0], [0, 0, 0, 0], [-1, -1, 0, 0],[-1, 0, 0, 0], [0, 0, 1, 0]]]; //Y
var selectBlock = rand5();

//Main
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMass();
    drawBlock();

    //ブラウザに制御を託す
    requestAnimationFrame(draw); 
}
setInterval(dropBlock, 1000);
draw();