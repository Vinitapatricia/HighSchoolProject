document.addEventListener('DOMContentLoaded', () =>{
	let canvas = document.getElementById("canvas")
	let ctx = canvas.getContext('2d');
	let mainloop;

	const blockSize = 20
	const column = canvas.width / blockSize;
	const row = column

	let score = 0;

	//OBJECT BORDER
	let border = {

		color : "Black",
		size : blockSize,
		width : canvas.width,
		height : canvas.height,

		draw : function(){
			// console.log(this.width, this.height, this.size)

			ctx.fillStyle = this.color;
			const top = ctx.fillRect(0,0, this.width, this.size);
			const right = ctx.fillRect(this.width - this.size, 0, this.size, this.height);
			const bottom = ctx.fillRect(0, this.height-this.size, this.width, this.size);
			const left = ctx.fillRect(0,0, this.size, this.height)
		}
	}

	let scoreText = {

		font : "20px Courier",
		color : "White",
		align : "left",
		baseline : "top",

		draw : function(){
			let x = 0;
			let y = 0;
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText(`Score : ${score}`, x, y);
		}

	}

	const gameOverText = {

		font : "50px Courier",
		color : "Black",
		align : "center",
		baseline : "middle",

		draw : function(){
			clearInterval(mainloop)
			let x = canvas.width/2 ;
			let y = canvas.height/2;
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText("GAME OVER!", x, y);
		}

	}

	const RestartText = {

		font : "30px Courier",
		color : "Black",
		align : "center",
		baseline : "middle",

		draw : function(){
			clearInterval(mainloop)
			let x = canvas.width/2 ;
			let y = canvas.height/2+75;
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText("Restart", x, y);
		}

	}

	const startText = {
		font : "50px Courier",
		color : "Black",
		align : "center",
		baseline : "middle",

		draw : function(){
			clearInterval(mainloop)
			let x = canvas.width/2 ;
			let y = canvas.height/2;
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText("Click To Start", x, y);
		}
	}

	// OBJECT BLOCK

	class Block{

		constructor (row, column){
			this.row = row;
			this.column = column;
			this.size = blockSize
		}

		circle(x, y, radius, color, isFilled) {
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.stroke();
			if (isFilled){
				ctx.fillStyle = color;
				ctx.fill();
				}
		}

		drawSquare(color){
			let x = this.column * blockSize;
			let y = this.row * blockSize;
			this.color = color

			ctx.fillStyle = this.color;
			ctx.fillRect(x,y, this.size, this.size)
		}

		drawCircle(color){
			let x = this.column * blockSize + blockSize/2;
			let y = this.row * blockSize + blockSize/2;
			this.color = color

			this.circle(x, y, this.size/2, this.color, true)
		}
	}

	class Snake{

		constructor(){
			this.segments=[
			new Block(7,5), // head
			new Block(6,5),
			new Block(5,5) // tail
			]
			this.direction = "right";
			this.nextDirection = "right";
		}

		draw(){

			this.segments.forEach( (segment) =>{
				segment.drawSquare("LightBlue")
			})

		}

		setDirection(newDirection){
			if(this.direction === "up" && newDirection == "down") return;
			else if (this.direction ==- "down" && newDirection === "up") return;

			else if (this.direction === "left" && newDirection === "right") return;
			else if(this.direction === "right" && newDirection ==="left") return;

			// console.log(newDirection);

			this.nextDirection = newDirection
		}

		move(){
			let head = this.segments[0];
			let newHead;

			this.direction = this.nextDirection;
			// console.log(this.direction)

			if(this.direction === "right") newHead = new Block(head.row, head.column+1);
			else if (this.direction === "down") newHead = new Block(head.row+1, head.column);
			else if (this.direction === "left") newHead = new Block(head.row, head.column-1);
			else if (this.direction === "up") newHead = new Block(head.row-1, head.column);

			if(this.checkCollision(newHead)){
				gameOverText.draw();
				RestartText.draw()
				this.checkRestart()
				return;
			}

			this.segments.unshift(newHead);
			// this.segments.pop();

			if(this.eatApple(head)){
				score ++;
				apple.move();
				
			}else{
				this.segments.pop();
			}

			
		}

		checkCollision(head){
			const leftCollision = head.column === 0;
			const topCollision = head.row === 0;
			const rightCollision = head.column === column -1;
			const bottomCollision = head.row === row -1;

			const wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

			this.segments.forEach((segment, i) =>{
				if (head.row === segment.row && head.column == segment.column){
					const selfCollision = true;
					return selfCollision;
				}
			});

			return wallCollision
		}

		eatApple(head){
			if(head.row == apple.block.row && head.column == apple.block.column){
				return true;
			}
			return false;
		}

		checkRestart(){
			document.addEventListener('click', event => {
				let mouseX = event.pageX;
				let mouseY = event.pageY;

				if(mouseX >280 && mouseX < 410 && mouseY>385 && mouseY < 400){
					reset()
					return false;
				}

				
			});
		}

	}

	class Apple{

		constructor(){
			this.block = new Block(0,0)

			this.move();
		}

		draw(){
			this.block.drawCircle("red")
		}

		move(){
			let randomRow = Math.floor(Math.random()*(row-2)) +1;
			let randomColumn = Math.floor(Math.random()*(column-2))+1;

			this.block.row = randomRow;
			this.block.column = randomColumn;
		}

		setDirection(newDirection){
			this.nexDirection = newDirection;
		}

		
	}

	document.addEventListener('keydown', () =>{
		// console.log(event.code)
		switch(event.code){
			case "ArrowUp":
				// console.log("up")
				snake.setDirection("up");
				break;

			case "ArrowDown":
				// console.log("down")
				snake.setDirection("down");
				break;

			case "ArrowRight":
				// console.log("right")
				snake.setDirection("right");
				break;

			case "ArrowLeft":
				// console.log("left")
				snake.setDirection("left");
				break;

			// selain yang case
			default:
				// console.log("undefined")
		}
	})

	let snake = new Snake();
	let apple = new Apple();

	function startgame(){
		

		mainloop = setInterval(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			border.draw();
			scoreText.draw();
			snake.draw();
			snake.move();
			apple.draw();
		}, 200)
	}

	function reset(){
		score = 0;
		snake = new Snake();
		apple = new Apple();
		startscreen()
	}

	// start screen
	function startscreen(){
		console.log("strat")
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		startText.draw()
		document.addEventListener('click', event => {
			startgame()
			return false;
		});
	}
	
	startscreen()
	

})