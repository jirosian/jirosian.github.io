"use strict";
let ctx;
let sx;
let sy;
let gx;
let gy;
let ex;
let ey;
let bx;
let by;
let count;
let canvas;
let bombArray = []
let goalArray = []

let ex2;
let ey2;
let ex3;
let ey3;
let ex4;
let ey4;
let code;
let countNum;
let animateInterval;


function setup() {
canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
	  if(animateInterval == undefined){
   animateInterval = setInterval(movingEnemy,400)
 	}

	sx = 31.25;
	sy = 31.25;
	gx = randomGoal();
	gy = randomGoal();
	ex = randomEnemy();
　  ey =  randomEnemy();
	ex2 =  93.75; 
	ey2 =  156.25;

    //what is this for?
	ex3 =  90;
	ey3 =  90;
	ex4 =  120;
	ey4 =  120;

    goalArray[0] = null;
    countNum = 0;
    count = 0;
    bx = -100;
    document.getElementById('scoreOutput').innerHTML = "Score: " + count;
    gameState = State.play;

draw();
}


//choosing coordinate of enemy randomly
function randomEnemy(){
	let newArray = [93.75,468.75];
	return newArray[Math.floor(Math.random()*newArray.length)];
}

//choosing coordinate of goal randomly
function randomGoal(){
	let cd = 31.25;
	let newArray = []
	for(let i=0;i<8;i++){
		newArray[i] = cd
		cd+=62.5;
	}
	return newArray[Math.floor(Math.random()*newArray.length)];
 }


//decorating vertical roads.
function designRoad(x,y){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "Gainsboro";
	ctx.rect(x,y,62.5,62.5);
	ctx.fill();

	ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x+20,y+31.25,25,5);
	ctx.fill();

  ctx.restore();
}

//decorating hirizontal roads.
function designRoad2(x,y){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "Gainsboro";
	ctx.rect(x,y,62.5,62.5);
	ctx.fill();

	ctx.beginPath();
    ctx.fillStyle = "white";
	ctx.rect(x+31.25,y+15,5,25);
	ctx.fill();

	ctx.restore();
}

//decorating ground's color
function desginGround(){
	ctx.clearRect(0, 0, 500, 500);
  ctx.beginPath();
	ctx.fillStyle = "Chartreuse";
	ctx.rect(0,0,500,500);
	ctx.fill();
	ctx.restore();

}

//decorating tree
function designTree(x,y){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "brown";
	ctx.rect(x,y,20,50);
	ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "pink";
		ctx.arc(x-5,y+15, 15,0, 2*Math.PI)
		ctx.fillStyle = "pink";
		ctx.arc(x+10,y, 15,0, 2*Math.PI)
		ctx.fillStyle = "pink";
		ctx.arc(x+23,y+15, 15,0, 2*Math.PI)

		ctx.fill();
	ctx.restore();
}

//decorating a traffic light.
function designSignal(x,y){
	ctx.beginPath();
	ctx.fillStyle = "DarkGrey";
	ctx.rect(x,y-5,40,20);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "DarkGrey";
	ctx.rect(x+15,y-5,10,45);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(x+7,y+5, 7,0, 2*Math.PI)
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.arc(x+22,y+5, 7,0, 2*Math.PI)
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "yellow";
	ctx.arc(x+37,y+5, 7,0, 2*Math.PI)
	ctx.fill();

	ctx.restore();
}

//drawing every ojbects
function draw(event) {
    desginGround();
		let rx = 0;
		let ry = 62.5
		for(let i=0;i<8;i++){
			designRoad(rx,ry);
			rx+=62.5;
		}
    rx=0;
		ry=437.5;
		for(let j=0;j<8;j++){
			designRoad(rx,ry);
			rx+=62.5;
		}

    rx=62.5;
		ry=0;
		for(let a=1;a<2;a++){
			if(a=1){
				for(let b=0;b<8;b++){
					designRoad2(rx,ry);
					ry+=62.5;
				}
			}
			rx=437.5;
			ry=0
			if(a=2){
				for(let c=0;c<8;c++){
					designRoad2(rx,ry);
					ry+=62.5;
				}
			}
		}

     designSignal(130,20);
		 designSignal(380,390);
		 designTree(20,380)

     let tx=210;
		 let ty=10;
     for(let g=0;g<4;g++){
			 designTree(tx,ty)
			 tx+=65;
		 }

      drawGoal(gx,gy);
		  drawPlayer(sx,sy);
			drawEnemy(ex,ey);
   		makeGrid();

  if(bombArray[0]!=null){
		drawMine(bx,by)
		code = null;
	}

	if(goalArray[0]!=null)
		drawEnemy(ex2,ey2);
	}
    
  if(countNum==2){
		drawEnemy(ex3,ey3);
	}
	if(countNum==3){
		drawEnemy(ex4,ey4);
	}


//decorating grid line
function makeGrid() {
	ctx.save();
	ctx.translate(0,0);

	let	x = 62.5;
	let y = 0;
	for (let j = 0;j < 8;j++) {
  		ctx.beginPath();
	  	ctx.strokeStyle = "DarkSalmon";
			ctx.moveTo(x,y);
			ctx.lineTo(x,y+500);
		  ctx.stroke();
			x+=62.5;
		}
 x = 0;
 y = 62.5;
for (let i =0;i<8;i++) {
	ctx.beginPath();
	ctx.strokeStyle = "DarkSalmon";
	ctx.moveTo(x,y);
	ctx.lineTo(x+500,y);
	ctx.stroke();
	y+=62.5;
}
ctx.restore();
}

//drawing goal
function drawGoal(x,y) {
   ctx.save();
	 //drawing arms and legs
	 ctx.beginPath();
	 ctx.strokeStyle = "black"
	 ctx.moveTo(x-10,y+10);
	 ctx.lineTo(x-20,y-5);
	 ctx.moveTo(x+10,y+10);
	 ctx.lineTo(x+20,y-5);

	 ctx.stroke();

  //face
	ctx.beginPath();
	ctx.fillStyle= "yellow";
	ctx.arc(x,y, 10,0, 2*Math.PI)
	ctx.fill();
  //left eye
	ctx.beginPath();
 ctx.fillStyle = "black"
 ctx.arc(x-10,y, 2,0, 2*Math.PI)
 ctx.fill();

 //right eye
 ctx.beginPath();
 ctx.fillStyle = "black"
 ctx.arc(x+10,y, 2,0, 2*Math.PI)
 ctx.fill();

 //mouth
 ctx.beginPath();
 ctx.fillStyle = "brown"
 ctx.arc(x,y+8, 6,0, 2*Math.PI)
 ctx.fill();

 //mouth line
 ctx.beginPath();
 ctx.lineTo(x-6,y+8);
 ctx.lineTo(x+6,y+8);
 ctx.stroke();

 //body
 ctx.beginPath();
 ctx.lineWidth = "20";
 ctx.strokeStyle = "yellow"
 ctx.lineTo(x,y+15);
 ctx.lineTo(x,y+20);
 ctx.stroke();
 ctx.restore();


}

//drawing player
function drawPlayer(x,y) {
  ctx.save();
	ctx.beginPath();
	ctx.fillStyle= "yellow";
	ctx.arc(x,y, 25,0, 2*Math.PI)
	ctx.fill();

	ctx.beginPath();
 ctx.fillStyle = "black"
 ctx.arc(x-15,y-5, 4,0, 2*Math.PI)
 ctx.fill();

 ctx.beginPath();
 ctx.fillStyle = "black"
 ctx.arc(x+15,y-5, 4,0, 2*Math.PI)
 ctx.fill();

 ctx.beginPath();
 ctx.fillStyle = "brown"
 ctx.arc(x,y+8, 10,0, 2*Math.PI)
 ctx.fill();

 ctx.beginPath();
 ctx.moveTo(x-10,y+8);
 ctx.lineTo(x+10,y+8);
 ctx.stroke();
 ctx.restore();

}


// drawing enemy
function drawEnemy(x,y) {
	ctx.save();
	ctx.translate(x,y);

	ctx.beginPath();
	ctx.fillStyle = "CadetBlue"
	ctx.rect(-20,-24,40,30);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "CadetBlue"
	ctx.rect(-30,0,60,15);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "AliceBlue"
	ctx.rect(-15,-20,30,15);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "black"
	ctx.arc(13, 15, 5, 0, Math.PI, false);
	ctx.fill();

	ctx.beginPath();
  ctx.fillStyle = "black"
  ctx.arc(-13, 15, 5, 0, Math.PI, false);
  ctx.fill();

	ctx.restore();
}

function drawGameOver() {
	ctx.save();
	ctx.translate(0,0);
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "55pt Arial";
	ctx.fillText("GAME OVER!!",0,250);
	ctx.restore();
}

function drawMine(x,y){
	ctx.save();
	ctx.translate(x,y);

	ctx.beginPath();
	ctx.moveTo(6,-35);
	ctx.lineTo(6,-17);
	ctx.moveTo(-6,-35);
	ctx.lineTo(-6,-17);
	ctx.stroke();

    ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.arc(8,-8, 10,0, 2*Math.PI)
  ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "gray";
	ctx.arc(8,-3, 5,0, 2*Math.PI)
	ctx.fill();

  	ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(-10,17, 15,0, 2*Math.PI)
	  ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "gray";
		ctx.arc(-13,22, 7,0, 2*Math.PI)
		ctx.fill();

	ctx.restore();

}

//making game freeze if the player hits the enemy
let State = {
	play: 0,
  gameOver: 1
};
let gameState = State.play;



addEventListener("keydown",function(event) {
	//key event for the player
	if(event.key == "ArrowUp") {
    sy-=62.5;
		if(sy<0){
			sy=31.25;
		}
  }else if(event.key =="ArrowDown") {
    sy+=62.5;
		if(sy>500){
			sy=468.75;
	}
  }else if(event.key == "ArrowLeft") {
    sx-=62.5;
		if(sx<0){
			sx=31.25;
		}
  }else if(event.key == "ArrowRight") {
    sx+=62.5;
		if(sx>500){
			sx=468.75;
		}
  }

 // key event for the bomb
  if(event.keyCode!=32){
		code = 32
	}
	if(event.keyCode==code){
				bx = sx;
				by = sy;
			drawMine(bx,by)
			bombArray = [1]
			 bx = bx;
			 by = by;
			 code = null;
	}

  //make the player freeze when it hits the enemy
	if(sx==ex&&sy==ey){
			gameState = State.gameOver;
			return;
	}

	if(gameState === State.gameOver){
			return;
	}

  //add the score and change the goal's position when the player hits it.
  if(sx==gx&&sy==gy){
		gx=undefined;
		gy=undefined;
		gx=randomGoal();
		gy=randomGoal();
		count+=100;
		goalArray = [1];
		goalInfo.resquedCount+=1;
		document.getElementById('scoreOutput').innerHTML = "Score: " + count;
		countNum+=1;
	}

  //minus the score and change the position of enemy when the you
  if(ex==gx&&ey==gy || ex2==gx&&ey2==gy){
		gx=undefined;
		gy=undefined;
		gx=randomGoal();
		gy=randomGoal();
		count-=100;
		document.getElementById('scoreOutput').innerHTML = "Score: " + count;
	}
  draw();
});

function movingEnemy(){
	if(ex<500){
			ex+= 62.5;
			ctx.clearRect(0,0,500,500);
			draw();
		}
	if(ex>480){
				ex = 31.25;
				ctx.clearRect(0,0,500,500);
				draw();
		}
	if(ey2<500){
		ey2+= 62.5;
		ctx.clearRect(0,0,500,500);
		draw();
	}
	if(ey2>480){
			ey2 = 31.25;
			ctx.clearRect(0,0,500,500);
			draw();
	}
	if(ex3>0){
			ex3-= 62.5;
			ctx.clearRect(0,0,500,500);
			draw();
		}
	if(ex3<0){
				ex3 = 468.75;
				ctx.clearRect(0,0,500,500);
				draw();
		}
	if(ey4>0){
				ey4-= 62.5;
				ctx.clearRect(0,0,500,500);
				draw();
			}
	if(ey4<0){
					ey4 = 468.75;
					ctx.clearRect(0,0,500,500);
					draw();
			}
}

animateInterval = setInterval( function()    {
	      movingEnemy();

		if(bx==ex&&by==ey  || ex2==gx&&ey2==gy)
			return bombHit1();

		if(ex==gx&&ey==gy || ex2==gx&&ey2==gy)
			return goalHit();

		if(sx==ex && sy==ey || sx==ex2&&sy==ey2){
			gameState = State.gameOver;
			enemyHitToPlayer();
			return ;
		}

		if(gameState === State.gameOver){
				return;
		}

},400);

function enemyHitToPlayer(){
	clearInterval(animateInterval);
	drawGameOver();
	animateInterval = undefined;
	}


function goalHit(x,y){
	//gx=undefined;
	//gy=undefined;
	gx=randomGoal();
	gy=randomGoal();
	count-=100;
	document.getElementById('scoreOutput').innerHTML = "Score: " + count;
}

function bombHit1(){
	bx=-100;
	by=-100;
	count-=100;
	document.getElementById('scoreOutput').innerHTML = "Score: " + count;
}

function bombHit2(x,y){
	bx=-100;
	by=-100;
	ex2=-100;
	ey2=-100;
	count+=100;
	document.getElementById('scoreOutput').innerHTML = "Score: " + count;
}

function bombHit3(x,y){
	bx=-100;
	by=-100;
	ex3=-100;
	ey3=-100;
	count+=100;
	document.getElementById('scoreOutput').innerHTML = "Score: " + count;
}
function bombHit4(x,y){
	bx=-100;
	by=-100;
	ex4=-100;
	ey4=-100;
	count+=100;
	document.getElementById('scoreOutput').innerHTML = "Score: " + count;
}

let playerInfo = {
	positionX:sx,
	positionY:sy,
	existance:true
}
console.log(playerInfo);

let goalInfo = {
	positionX:gx,
	positionY:gy,
	resquedCount:0,
	beatenCount:0,
}
console.log(goalInfo);
