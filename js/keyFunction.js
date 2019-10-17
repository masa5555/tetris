var rightPressed = false;
var leftPressed = false;
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