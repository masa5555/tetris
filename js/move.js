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
