//if(!localStorage.getItem('level'))
//	localStorage.setItem('level', 1)
localStorage.setItem('level', 5)
document.addEventListener('DOMContentLoaded', () => {
	

// canvas's declaration
	let canvas = document.getElementById("canvas")
	let ctx = canvas.getContext('2d');

// rounded rect
	function roundedRect(ctx, x, y, width, height, radius, color) {
		ctx.fillStyle = color
		ctx.strokeStyle = color
		ctx.beginPath();
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.arcTo(x, y + height, x + radius, y + height, radius);
		ctx.lineTo(x + width - radius, y + height);
		ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
		ctx.lineTo(x + width, y + radius);
		ctx.arcTo(x + width, y, x + width - radius, y, radius);
		ctx.lineTo(x + radius, y);
		ctx.arcTo(x, y, x, y + radius, radius);
		ctx.stroke();
		ctx.fill()
	}

// engine status
	var animationCharacter;
	let speedEnemy = 5
	let level = localStorage.getItem('level');
	let start = false;
	let levelmax =5;

// game status
	let key;
	let question;
	let full = "";
	let soal;
	let statusbener = true;
	let counter = 0;
	let life = 3;
	let correct = 0;
	let pause_stat = false;
	let pause = false;
	let answerCounter = 0;

// page status
	let level_p = false;
	let howToPlay_p = false;
	let menu_p = false;
	let game_p = false;
	let per_p = true;
	let times = 0;
	let number = 0;

// create logo
	let logo_img = new Image();
	logo_img.src = 'assets/logo/logo.png';
	function draw_logo(){
		ctx.drawImage(logo_img, 40, 80,420,170);
	}
	function draw_logo_menu(){
		ctx.drawImage(logo_img, 0, 0,500,150);
	}

// create background_game
	let background_img = new Image();
	background_img.src = "assets/placeholder/forest.jpg";
	function draw(){
			ctx.drawImage(background_img, 20, 20, canvas.width-40, canvas.height/2.4);
		}

// create button to go back to menu
	let menu_button = new Image();
	menu_button.src = "assets/placeholder/menu_trans.png"
	function draw_button_menu(){
		ctx.drawImage(menu_button, canvas.width-70, canvas.height-70, 50, 50);
	}

// create pause button
	

	let pause_b = {
		font : "11vh Courier",
		color : "White",
		align : "center",
		baseline : "middle",

		draw_button_pause: function(){
			let pause_button = new Image();
			pause_button.src = "assets/pause.png"
			ctx.drawImage(pause_button, canvas.width-70, 30, 35, 35);
		},

		draw_button_play: function(){
			let pause_button = new Image();
			pause_button.src = "assets/placeholder/play.png"
			ctx.drawImage(pause_button, canvas.width-70, 30, 35, 35);
		},

		draw_pause_text : function(){
			let x = canvas.width/2;
			let y = canvas.height/2 - 110;
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText("PAUSE", x, y);
		}

	}
	
// create character
	let character = new Image();
	characters = ["assets/Character Png/character1.png", "assets/Character Png/character2.png", "assets/Character Png/character3.png"]
	let distance = 0
	let cnt = 1
	let cha = 8

	draw_character = () =>{
		
		character.src = characters[cnt]
		if(cnt === 2){
			cnt = 1
		}else{
			cnt++;
		}
		ctx.drawImage(character, distance, 130, 100, 100);
		
		if(cha > 0){
			distance = distance+5;
			cha = cha-1;
		}else{
			ctx.clearRect(0, 100, distance +5, 150)
			draw()
			character.src= characters[0]
			ctx.drawImage(character, 40, 130, 100, 100);
		}
		
	}

// create enemy 
	let enemies = []
	let enemy = new Image();
	enemiesImg = ["assets/corona png/omicron1.png", "assets/corona png/omicron1.png"]
	let distanceEn = 0

	function draw_enemy(){
		if(start){
			enemy.src = enemiesImg[0]
			// ctx.drawImage(enemy, canvas.width - 420, 160, 100, 100)
			ctx.drawImage(enemy, canvas.width - distanceEn, 140, 80, 80);
			
			if(distanceEn < 420){
				distanceEn = distanceEn + speedEnemy;
			}else{
				ctx.clearRect(canvas.width - distanceEn, 90, canvas.width, 130)
				draw()
				draw_character()
				enemy.src= enemiesImg[1]
				ctx.drawImage(enemy, canvas.width - distanceEn, 140, 80, 80);
				life--;
				times = 0;
				full = "";
				counter = 0;
				statusbener = false;
				distanceEn = 0;
				speedEnemy = 5;

			}
		}
	}

// create life
	let heart = new Image();
	let heart_address = ["assets/placeholder/heart_full.png", "assets/placeholder/heart_empty.png"]
	let heart_1, heart_2, heart_3;
	function draw_heart(){
		if (life === 3){
			heart_1 = heart_address[0];
			heart_2 = heart_address[0];
			heart_3 = heart_address[0];
		} else if (life === 2){
			heart_1 = heart_address[0];
			heart_2 = heart_address[0];
			heart_3 = heart_address[1];
		} else if (life === 1){
			heart_1 = heart_address[0];
			heart_2 = heart_address[1];
			heart_3 = heart_address[1];
		} else if (life === 0){
			heart_1 = heart_address[1];
			heart_2 = heart_address[1];
			heart_3 = heart_address[1];
		}
		heart.src = heart_1;
		ctx.drawImage(heart, 60, canvas.height-80, 40, 40);
		heart.src = heart_2;
		ctx.drawImage(heart, 120, canvas.height-80, 40, 40);
		heart.src = heart_3;
		ctx.drawImage(heart, 180, canvas.height-80, 40, 40);

	}

// create how to play picture 
// [MENU]
	let menu_tes = new Image();
	menu_tes.src = "assets/how to play/howtoplay.png"
	function draw_menu(){
			ctx.drawImage(menu_tes, 0, 0, canvas.width, canvas.height);
			//ctx.strokeRect(20, 20, canvas.width/2.5, canvas.height/2.5)
	}
// create warning
	let warning = new Image();
	warning.src = "assets/placeholder/warning.png"
	function draw_warning(){
		ctx.drawImage(warning, 150, 60, 200, 200);
	}

// all question
	question = [
	// level 1
	["do not litter.",
	"please recycle plastic.",
	"it's time for school.",
	"stay safe while driving.",
	"remember to wash your hand.",
	"it's okay to be loose.",
	"begin with safety in mind.",
	"teamwork make a dreamwork."],

	// level 2
	["safety rules are your best tools.",
	"don't driving while you're drunk.",
	"don't forget to study everyday.",
	"please sleep if you're sleepy.",
	"practice makes perfection.",
	"always to put on you seatbelt.",
	"safety is out first priority."],

	// level 3
	["clean and green is our perfect dream.",
	"let your memory be your travel bag.",
	"try and fail, but never fail to try.",
	"do one thing every day that scares you.",
	"safe the turtle by reducing use plastic.",
	"never let accident takes your future.",
	"whatever you are, be a good one."],

	// level 4
	["be clean and healthy, and a happy person.",
	"don't play with your phone while driving.",
	"be the change you wish to see in the world.",
	"don't forget to take your vitamins on time.",
	"believe you can and you're halfway there.",
	"check your vehicle before driving.",
	"to travel is to take a journey into yourself."],

	// level 5
	["water is life, and clean water means health.",
	"be clean and healty, and a happy person",
	"it's okay to lose in a competition"]];
// create audio
	let background_music = new Audio();
	background_music.src = "assets/background_audio.mp3";
	background_music.loop = true;
	background_music.volume = 0.1;
	function play_audio(){
		background_music.play();
	}

// create sound effect button
	let button_click = new Audio();
	button_click.src = "assets/button_click.wav";
	button_click.volume = 0.1;
	function clicked(){
		button_click.play();
	}

// all pages
	let base = document.querySelectorAll('script');
	let container = [];
	let mainloop;

// change page
	function change_page(code){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (code === "level"){
			start_level();
		} else if (code === "game"){
			start_game();
		} else if (code === "menu"){
			start_menu();
		} else if (code === "howto"){
			start_how();
		} else if (code === "per"){
			start_per();
		}
	}

// page status checker
	let checker = setInterval(() => {
		// console.log(level_p, howToPlay_p, menu_p, game_p)
		if(level_p){
			change_page("level")
		} else if(menu_p){
			change_page("menu")
		} else if (game_p){
			change_page("game")
		} else if (howToPlay_p){
			change_page("howto")
		} else if (per_p){
			change_page("per")
		}
	}, 200)

// permision page
	function start_per(){
		draw_warning();
		let warning_text = {
			font : "25px Courier",
			color : "white",
			align : "center",
			baseline : "middle",
			x : canvas.width/2,
			y : canvas.height/2+25,

			drawText : function(){
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('This web will require the', this.x, this.y-30);
				ctx.fillText('use of an audio', this.x, this.y);
				ctx.fillStyle = "lightgrey"
				ctx.fillText('click here to continue', this.x, this.y+100);
			},
			checkClicked : function(event){
				if(event.offsetX >= 87 && event.offsetX <= 415 && event.offsetY >= 389 && event.offsetY <= 409){
					menu_p = true;
				per_p = false;
				}
			}
		}	

		warning_text.drawText();

		document.querySelector("#canvas").addEventListener('click', function (event){
		play_audio();
		clicked();
		warning_text.checkClicked(event);
		//console.log(event.offsetX, event.offsetY)
		})

	}

// menu page
	function start_menu(){
		draw_logo();
		// play button
		let playButton = {
			font : "7vh Courier",
			color : "saddlebrown",
			align : "center",
			baseline : "middle",
			x : canvas.width/2,
			y : canvas.height/2+25,

			drawText : function(){
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('Play', this.x, this.y);
			},

			drawSquare : function(){
				roundedRect(ctx,canvas.width/2-65, canvas.height/2- 2, 130, 55, 15,"Wheat");
			},

			checkClicked : function(event){
				if(event.offsetX >= 185 && event.offsetX <= 315 && event.offsetY >= 270 && event.offsetY <= 325){
					level_p = true;
					menu_p = false;
				}
			}
		}

		
		let howToPlayButton ={
			font : "7vh Courier",
			color : "saddlebrown",
			align : "center",
			baseline : "middle",
			x : canvas.width/2,
			y : canvas.height/2 + 115,

			drawText : function(){
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('How To Play', this.x, this.y);
			},

			drawSquare : function(){
				roundedRect(ctx, canvas.width/2-150, canvas.height/2+87, 300, 55,15,"Wheat");
			},

			checkClicked : function(event){
				if(menu_p && event.offsetX >= 105 && event.offsetX <= 395 && event.offsetY >= 360 && event.offsetY <= 415){
					//console.log("clicked b")
					howToPlay_p = true;
					game_p = false;
					level_p = false;
					menu_p = false;
				}
			}

		}

		playButton.drawSquare()
		playButton.drawText()

		howToPlayButton.drawSquare()
		howToPlayButton.drawText()

		document.querySelector("#canvas").addEventListener('click', function (event){
			clicked();
			howToPlayButton.checkClicked(event)
			playButton.checkClicked(event)
		})
	}

// level page
	function start_level(){
		draw_logo();
			// box 
			ctx.fillStyle = "BurlyWood";
			//ctx.fillRect(canvas.width/2-200, canvas.height/2-30, 400, 200)

			// levelText

			let LevelText = {

				font : "4vh Courier",
				color : "White",
				align : "center",
				baseline : "middle",

				draw : function(){
					let x = canvas.width/2;
					let y = canvas.height/2;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText(`Last checkpoint: ${level}`, x, y);
				}

			}

			let ContinueText = {
				font : "7vh Courier",
				color : "saddlebrown",
				align : "center",
				baseline : "middle",

				draw : function(){
					let x = canvas.width/2;
					let y = canvas.height/2 +80;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText("Continue", x, y);
				},
				drawSquare : function(){
					roundedRect(ctx,canvas.width/2-110, canvas.height/2+50, 220, 55, 15,"Wheat");
				},

				checkClicked : function(event){
					if(event.offsetX >= 140 && event.offsetX <= 360 && event.offsetY >= 325 && event.offsetY <= 380){
						start = true;
						level_p = false;
						game_p = true;
					}
				}
			}

			let newGameText = {
				font : "7vh Courier",
				color : "saddlebrown",
				align : "center",
				baseline : "middle",

				draw : function(){
					let x = canvas.width/2;
					let y = canvas.height/2 +145;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText("New Game", x, y);
				},
				drawSquare : function(){
					roundedRect(ctx,canvas.width/2-115, canvas.height/2+120, 230, 55, 15,"Wheat");
				},

				checkClicked : function(event){
					console.log(event.offsetX, event.offsetY)
					if(level_p && event.offsetX >= 134 && event.offsetX <= 365 && event.offsetY >= 396 && event.offsetY <= 450){
						level = 1
						localStorage.setItem('level', level)
						start = true;
						level_p = false;
						game_p = true;
						menu_p = false
						life = 3;
						correct = 0;
						full = "";
						times = 0;
						speedEnemy =5;
						distanceEn = 0;
						// change_page("game")
						console.log("a")
					}
				}
			}

			let returnText = {
				font : "7vh Courier",
				color : "saddlebrown",
				align : "center",
				baseline : "middle",

				draw : function(){
					let x = canvas.width/2;
					let y = canvas.height/2 +220;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText("Return", x, y);
				},
				drawSquare : function(){
					roundedRect(ctx,canvas.width/2-115, canvas.height/2+190, 230, 55, 15,"Wheat");
				},

				checkClicked : function(event){
					if(event.offsetX >= 135 && event.offsetX <= 365 && event.offsetY >= 415 && event.offsetY <= 470){
						start = false;
						level_p = false;
						menu_p = true;
						game_p = false;
					}
				}
			}

			
			LevelText.draw()

			ContinueText.drawSquare()
			ContinueText.draw()

			newGameText.drawSquare()
			newGameText.draw()

			returnText.drawSquare()
			returnText.draw()

			document.querySelector("#canvas").addEventListener('click', function (event){
				ContinueText.checkClicked(event)
				newGameText.checkClicked(event)
				returnText.checkClicked(event)
				clicked();
			})
	}

// how to play page
	function start_how(){
		draw_menu();
		let return_button = {
				font : "7vh Courier",
				color : "saddlebrown",
				align : "center",
				baseline : "middle",
				x : canvas.width/2+5,
				y : canvas.height/2 + 203,

				drawText : function(){
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText('Return', this.x, this.y);
				},

				drawSquare : function(){
					roundedRect(ctx, canvas.width/2-145, canvas.height/2+175, 300, 55,15,"Wheat");
				},

				checkClicked : function(event){
					if(event.offsetX >= 112 && event.offsetX <= 400 && event.offsetY >= 450 && event.offsetY <= 500){
						//console.log("clicked b")
						howToPlay_p = false;
						game_p = false;
						level_p = false;
						menu_p = true;
					}
				}
			}
			return_button.drawSquare();
			return_button.drawText();
			document.querySelector("#canvas").addEventListener('click', function (event){
				return_button.checkClicked(event)
				clicked();
				//console.log(event.offsetX, event.offsetY)
		})
	}

// game page
	function start_game(){
		draw()
		draw_character();
		draw_enemy();

		// border
		let border = {
			color : "SaddleBrown",
			size: 20,
			width: canvas.width,
			height: canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const top = ctx.fillRect(0, 0, this.width, this.size);
				const right = ctx.fillRect(this.width - this.size, 0, 1.7*this.size, this.height);
				const bottom = ctx.fillRect(0, this.height - (1.03*this.size), this.width, this.size);
				const left = ctx.fillRect((0+this.size)/20, 0, this.size, this.height);
			
			}
		}

		let barrier = {
			color : "Wheat",
			border_size : 20,
			width : canvas.width,
			height : canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const frame = ctx.fillRect(this.border_size, this.height/2.3, this.width-2*this.border_size, this.height/50)
			}
		}

		let typing_frame = {
			color : "BurlyWood",
			border_size : 20,
			width : canvas.width,
			height : canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const frame = ctx.fillRect(this.border_size, this.height/2.2, this.width-2*this.border_size, this.height/1.95)
			}
		}

		let level_text = {
			font : "4vh Courier",
			color : "White",
			align : "center",
			baseline : "middle",

			draw : function(){
				let x = canvas.width/2;
				let y = canvas.height/2;
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText(`Level : ${level}`, x, y);
		}}

		// draw border
		border.draw();
		barrier.draw();
		typing_frame.draw();
		level_text.draw();
		draw_button_menu();
		pause_b.draw_button_pause()
		draw_heart()
		quotePicker();
		upgrade_level();

		if (pause_stat) {
			// console.log("ok")
			pause_b.draw_pause_text()
			pause_b.draw_button_play()
			pause = true;
		} else if (!pause_stat){
			pause = false;
		}

		document.querySelector("#canvas").addEventListener('click', function (event){
			// console.log(event.offsetX, event.offsetY)
			clicked();
			if (event.offsetX >= canvas.width-70 && event.offsetX <= canvas.width-20 && event.offsetY >= canvas.height-70 && event.offsetY <= canvas.height-20){
					game_p = false;
					menu_p = true;
					level_p = false;
					pause_stat = true;
					life = 3;
					correct = 0;
					full = "";
					times = 0;
					speedEnemy = 0;
			}else if (event.offsetX >= canvas.width-70 && event.offsetX <= canvas.width-35 && event.offsetY >= 30 && event.offsetY <= 65){
				// console.log("pause")
				if (pause){
					speedEnemy = 5;
					pause_stat = false;
				} else if (!pause){
					speedEnemy = 0;
					soal = "PAUSE"
					pause_stat = true;
				}
			}

			})
		}

// randomQuote
	function quotePicker(){
		
		if (times === 0){
			let randomNumber = Math.floor(Math.random()*question[level-1].length) - answerCounter;
			number = randomNumber;
			statusbener = true;
			times = 1;
		}
		soal = question[level-1][number]

		if (life === 0){
			start = false;
			soal = "Game Over"
		}

		let displayText = {
			font : "25px bold Courier",
			color: "White",
			width : canvas.width,
			height : canvas.height,
			align : "center",
			baseline : "middle",

			draw : function(){
				if (!statusbener){
					ctx.fillStyle = "Red";
				} else {
					ctx.fillStyle = this.color;
				} 
				if (full === soal){
					ctx.fillStyle = "Green"
					correct++;
					times = 0;
					counter = 0;
					full = "";
					distanceEn = 0;
					question[level-1].splice(number,1)
				}
				ctx.font = this.font;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText(`${soal}`, this.width/2, this.height/1.7);
			}
		}

		let inputText = {
			font : "25px bold Courier",
			color: "FireBrick",
			width : canvas.width,
			height : canvas.height,
			align : "center",
			baseline : "middle",

			draw : function(){
				ctx.fillStyle = this.color;
				ctx.font = this.font;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText(`${full}`, this.width/2, this.height/1.5);
			}
		}

		// draw sentence
		displayText.draw();
		inputText.draw();
		// console.log(question)
		
		// console.log(full)
	}

// function for checking accuracy
	var statementCheck = {
		check: function (key){
			if (life > 0 && life <= 3){
				full = full + key;

				if(key === soal[counter]){
					counter++;
				} else {
					speedEnemy += 2;
					counter = 0;
					full = "";
				}

			} else if (life === 0) {
				full = "Please retry if you want"
			}
		}
	}

	document.addEventListener("keydown", ()=>{
		// console.log(event)
		if (event.code[0] === "K" && event.code[1] === "e" && event.code[2] === "y"){
			key = event.code[3].toLowerCase();
			statementCheck.check(key);
		}else if (event.code[0] === "D" && event.code[1] === "i" && event.code[2] === "g" && event.code[3] === "i" && event.code[4] === "t"){
			key = event.code[5];
			statementCheck.check(key);
		}else if (event.code === "Quote"){
			key = "'";
			statementCheck.check(key);
		} else if (event.code === "Comma"){
			key = ",";
			statementCheck.check(key);
		} else if (event.code === "Space"){
			key = " "
			statementCheck.check(key);
		}else if (event.code === "BracketRight"){
			key = "}"
			statementCheck.check(key);
		}else if( event.code === "BracketLeft"){
			key = "{"
			statementCheck.check(key);
		}else if(event.code === "Minus"){
			key = "-"
			statementCheck.check(key);
		}else if(event.code === "Equal"){
			key= "="
			statementCheck.check(key);
		}else if (event.code ==="Period"){
			key = "."
			statementCheck.check(key);
		}
		else{
			key = ""
		}
		// statementCheck.check(key);
	})

// upgrade level
	function upgrade_level(){
		if (question[level-1].length === 0){

			if(level === (levelmax-1)){
				start = false;
				soal = "YOU WIN!"
			}else{
				level++;
				localStorage.setItem('level', level);
				// let level_2 = localStorage.getItem('level');
				correct = 0;
			}

			
		}
	}



})