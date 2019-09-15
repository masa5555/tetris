﻿var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 

var massWidth = 10; var massHeight = 20;
var massSize = 30;
var sx = massWidth/2; var sy = 2;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
//ボタンが押されたことを検知
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Arrow が大抵のブラウザ、 無印がIE or Edge のキー入力に対応
function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
        var fragR = 1;
        for(var i = 0;i<blockSize;i++){
            if(mass[sy+block[1-XY][selectBlock][i]][sx+block[XY][selectBlock][i]+1].frag == 1){
                fragR = 0;
            }
        }
        if((sx+block[XY][selectBlock][blockSize-1])*massSize < canvas.width-massSize && fragR == 1){
            sx += 1;
        }
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
        var fragL = 1;
        for(var i = 0;i<blockSize;i++){
            if(mass[sy+block[1-XY][selectBlock][i]][sx+block[XY][selectBlock][i]-1].frag == 1){
                fragL = 0;
            }
        }
        if((sx+block[XY][selectBlock][0])*massSize > 0 && fragL == 1){
            sx -=1;
        }
    }
    if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
        //alert("down"); OK

    }
    if(e.keyCode == 70){
        rotate();
        //alert("f"); OK
    }
}
function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
    if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
        
    }
    
}
function rand256(){//for block color
    return Math.floor( Math.random() * 256);
}
function rand5(){//for block select
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
var XY = 0;
//var blockX = [[-1, -1, 0, 0],[-1, 0, 1, 2],[-1, 0, 0, 1], [-1, 0, -1, 1], [-1, 0, 0, 1]];
//var blockY = [[-1, 0,-1, 0], [0, 0, 0, 0], [-1, -1, 0, 0],[-1, 0, 0, 0], [0, 0, 1, 0]];
var block = [[[-1, -1, 0, 0],[-1, 0, 1, 2],[-1, 0, 0, 1], [-1, 0, -1, 1], [-1, 0, 0, 1]], [[-1, 0,-1, 0], [0, 0, 0, 0], [-1, -1, 0, 0],[-1, 0, 0, 0], [0, 0, 1, 0]]];
var selectBlock = rand5();
//draw

function dropBlock(){
    var fragDrop = 1;
    for(var i = 0;i<blockSize;i++){
        if(sy+block[1-XY][selectBlock][i]+1 < massHeight){
            if(mass[sy+block[1-XY][selectBlock][i]+1][sx+block[XY][selectBlock][i]].frag == 1){
                fragDrop = 0;
            }
        }else{
            fragDrop = 0;
        }
    }
    if(fragDrop == 0){
        for(var i = 0;i<blockSize;i++){
            mass[sy+block[1-XY][selectBlock][i]][sx+block[XY][selectBlock][i]].frag = 1;
        }
        erase();
        sx = massWidth/2; sy = 2;
        selectBlock = rand5();
    }else{
        sy++;
    }
}
function rotate(){
    var rotateFrag = 1;
    // if 回転可能 then 添え字の x y を入れ替える
    for(var i = 0;i<blockSize;i++){
        if(sx+block[1-XY][selectBlock][i] < 0  || sx+block[1-XY][selectBlock][i] >= massWidth){
            rotateFrag = 0;
        }else if(sy+block[XY][selectBlock][i] < 0 || sy+block[XY][selectBlock][i] >= massHeight){
            rotateFrag = 0;
        }else if(mass[sy+block[XY][selectBlock][i]][sx+block[1-XY][selectBlock][i]].frag == 1){
            rotateFrag = 0;
        }
    }
    if(rotateFrag == 1){
        XY = 1 - XY;
    }
}
function drawBlock(){
    for(var i = 0; i<blockSize;i++){
        ctx.beginPath();
        ctx.rect((sx+block[XY][selectBlock][i])*massSize, (sy+block[1-XY][selectBlock][i])*massSize, massSize, massSize);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}
function drawMass(){
    for(var i = 0;i<massHeight;i++){
        for(var j = 0;j<massWidth;j++){
            if(mass[i][j].frag == 1){
                ctx.beginPath();
                ctx.rect(j*massSize, i*massSize, massSize, massSize);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function erase(){
    for(var i =massHeight-1;i>=0;i--){
        var eraseFrag = 1;
        for(var j = 0; j<massWidth;j++){
            if(mass[i][j].frag == 0){
                eraseFrag = 0;
            }
        }
        if(eraseFrag == 1){
            for(var k = i;k>0;k--){
                for(var l = 0;l<massWidth;l++){
                    mass[k][l].frag = mass[k-1][l].frag;
                }
            }
            for(var k = 0;k<massWidth;k++){
                mass[0][k].frag = 0;
            }
        }
    }
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMass();
    drawBlock();

    //ブラウザに制御を託す
    requestAnimationFrame(draw); 
}
setInterval(dropBlock, 1000);
draw();