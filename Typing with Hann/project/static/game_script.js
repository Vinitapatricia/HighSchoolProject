// player info
	let username;
	let player_coin;
	let level;
	let player_pic;
	let current_score;
	let highest_score;
	let damage_potion;
	let health_potion;
	let defend_potion;
	let rabbit_char;
	let dino_char;
	let ip;

get_user()

function get_user(get){
	const request = new XMLHttpRequest();
	request.open('GET', '/get_user');
	request.onload = () => {
	const respond = request.responseText;
	const json = JSON.parse(respond);
		username = json.username;
		level = json.level;
		player_pic = json.profile;
		current_score = json.current_score;
		highest_score = json.highest_score;
		damage_potion = json.damage_potion;
		health_potion = json.health_potion;
		defend_potion = json.defend_potion;
		player_coin = json.coin;
		rabbit_char = json.rabbit_char;
		dino_char = json.dino_char;
		ip = json.ip
	};
	request.send();
}

function update_coin(newCoin){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_coin');
	request.onload = () => {
		const json = JSON.parse(request.responseText);
	}
	const data = new FormData();
	data.append('newCoin', newCoin);
	request.send(data);
}

function update_level(newLevel){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_level');
	request.onload = () => {
		const json = JSON.parse(request.responseText);
	}
	const data = new FormData();
	data.append('newLevel', newLevel);
	request.send(data);
}

function update_damage_potion(new_p){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_damage_potion');
	request.onload = () => {
		const json = JSON.parse(request.responseText);
	}
	const data = new FormData();
	data.append('new_p', new_p);
	request.send(data);
}

function update_defend_potion(new_p){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_defend_potion');
	request.onload = () => {
		const json = JSON.parse(request.responseText);
	}
	const data = new FormData();
	data.append('new_p', new_p);
	request.send(data);
}

function update_health_potion(new_p){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_health_potion');
	request.onload = () => {
		const json = JSON.parse(request.responseText);
	}
	const data = new FormData();
	data.append('new_p', new_p);
	request.send(data);
}

function update_rabbit_char(new_p){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_rabbit_char');
	request.onload = () => {
		const json = JSON.parse(request.responseText);

	}
	const data = new FormData();
	data.append('new_p', new_p);
	request.send(data);
}

function update_dino_char(new_p){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_dino_char');
	request.onload = () => {
		const json = JSON.parse(request.responseText);

	}
	const data = new FormData();
	data.append('new_p', new_p);
	request.send(data);
}

function update_profile(new_p){
	const request = new XMLHttpRequest();
	request.open('POST', '/update_profile');
	request.onload = () => {
		const json = JSON.parse(request.responseText);

	}
	const data = new FormData();
	data.append('new_p', new_p);
	request.send(data);
}

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
	let count = localStorage.length
	// let speedEnemy = 3 - (0.05*0);
	let speedEnemy = 1 + (0.01*level);
	let speedInit = 5;
	let health_enemy = 2;
	let start = false;
	let levelmax =5;
	let buy = false;
	let buyc = false;
	let buyc2 = false;
	let buy_dm_p = false;
	let buy_df_p = false;
	let buy_h_p = false;

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
	let my_score = 0;
	let enemy_score = 0;
	let distanceEn = 0

// player info
	let rank = 0;
	let status = 0;
	let player_id = ""
	
	function check_characters(){
		if(rabbit_char){
			player_character[1]= "1";
		}
		if(dino_char){
			player_character[2] = "2";
		}
	}

	let player_character = ["default", "", ""]
	check_characters();	

// page status
	let level_p = false;
	let howToPlay_p = false;
	let menu_p = false;
	let game_p = false;
	let per_p = true;
	let shop_p = false;
	let shopc_p = false;
	let settings_p = false;
	let settings_prof_p = false;
	let leader_p = false;
	let arena_p = false;
	let change_prof_p = false;
	let times = 0;
	let number = 0;

// arena speed
	if (arena_p){
		speedEnemy += 0.5;;
	}
	let enemy_life = 3;

// create logo
	let logo_img = new Image();
	logo_img.src = 'static/img/logo.png';
	function draw_logo(){
		ctx.drawImage(logo_img, 70, 80,230,170);
	}
	function draw_logo_menu(){
		ctx.drawImage(logo_img, 0, 0,500,150);
	}
	function draw_logo_shop(){
		ctx.drawImage(logo_img, 0, 0,500,150);
	}

	let shop_logo = new Image();
	shop_logo.src = 'static/img/detail/shop_logo.png';
	function draw_shoplogo(){
		ctx.drawImage(shop_logo, 70, 80,230,170);
	}

// create background_game
	let background_img = new Image();
	background_img.src = "static/img/background/background.png";
	function draw(){
			ctx.drawImage(background_img, 20, 20, canvas.width-40, canvas.height/2.4);
		}

// create button to go back to menu
	let menu_button = new Image();
	menu_button.src = "static/img/detail/home.png"
	function draw_button_menu(){
		ctx.drawImage(menu_button, canvas.width-70, canvas.height-55, 33, 33);
	}

// create shop
	let shop_button = new Image();
	shop_button.src = "static/img/detail/shop.png"
	function draw_button_shop(){
		ctx.drawImage(shop_button, canvas.width/1.6, canvas.height-53, 31, 31);
	}

// create pause button
	

	let pause_b = {
		font : "11vh Courier",
		color : "#D2D79F",
		align : "center",
		baseline : "middle",

		draw_button_pause: function(){
			let pause_button = new Image();
			pause_button.src = "static/img/detail/pause.png"
			ctx.drawImage(pause_button, canvas.width-70, 30, 35, 35);
		},

		draw_button_play: function(){
			let pause_button = new Image();
			pause_button.src = "static/img/detail/resume.png"
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
	
	let distance = 0
	let cnt = 1
	let cha = 8
	let down = 140;
	let down2 = 150;
		
	draw_character = () =>{
		
		let character = new Image();

		if(player_pic === "default"){
			characters = ["static/img/characters/main/front.png", "static/img/characters/main/right1.png", "static/img/characters/main/right2.png"]

			character.src = characters[cnt]
			if(cnt === 2){
				cnt = 1
			}else{
				cnt++;
			}
			ctx.drawImage(character, distance, 100, 297/4.5, 578/4.5);
			
			if(cha > 0){
				distance = distance+5;
				cha = cha-1;
			}else{
				ctx.clearRect(0, 100, distance +5, 150)
				draw()
				character.src= characters[0]
				ctx.drawImage(character, 40, 100, 297/4.5, 578/4.5);
			}

		} else if(player_pic === "1"){
			characters = ["static/img/characters/char 1/front.png", "static/img/characters/char 1/back1.png", "static/img/characters/char 1/back2.png"]

			character.src = characters[cnt]
			if(cnt === 2){
				cnt = 1
			}else{
				cnt++;
			}
			ctx.drawImage(character, 40, down, 243/5, 678/5);
			
			if(cha > 0){
				down = down-5;
				cha = cha-1;
			}else{
				ctx.clearRect(40, 100, 500, 500)
				draw()
				character.src= characters[0]
				ctx.drawImage(character, 40, down-5, 243/5, 678/5);
			}
		} else if(player_pic === "2"){
			characters = ["static/img/characters/char 2/front.png", "static/img/characters/char 2/back1.png", "static/img/characters/char 2/back2.png"]

			character.src = characters[cnt]
			if(cnt === 2){
				cnt = 1
			}else{
				cnt++;
			}
			ctx.drawImage(character, 40, down2, 272/5, 579/5);
			
			if(cha > 0){
				down2 = down2-5;
				cha = cha-1;
			}else{
				ctx.clearRect(40, 100, 500, 500)
				draw()
				character.src= characters[0]
				ctx.drawImage(character, 40, down2-5, 272/5, 579/5);
			}
		}

	}
		
// create enemy 
	let enemies = []
	let enemy = new Image();
	enemiesImg = ["static/img/monster/monster1.png", "static/img/monster/monster2.png", "static/img/monster/monster3.png", "static/img/monster/monster4.png"]
	
	function draw_enemy(){
		if(start){
			enemy.src = enemiesImg[0]
			// ctx.drawImage(enemy, canvas.width - 420, 160, 100, 100)
			// ctx.drawImage(enemy, canvas.width - distanceEn, 140, 70, 70);
			ctx.drawImage(enemy, (canvas.width-20) - distanceEn, 140, 70, 70);

			if(distanceEn < 420){
				distanceEn = distanceEn + speedEnemy;
			}
			if(distanceEn>250){
				ctx.clearRect(canvas.width - 2*distanceEn, 90, canvas.width, 130)
				draw()
				draw_character()
				enemy.src= enemiesImg[1]
				ctx.drawImage(enemy, canvas.width - distanceEn, 140, 70, 70);
				life--;
				times = 0;
				full = "";
				counter = 0;
				statusbener = false;
				distanceEn = 0;
				speedEnemy = 1;
				health_enemy = 3;
				if (arena_p){
					speedEnemy += 0.5;
				}
			}
		}
	}

// create potion
	let potion1 = new Image();
	let potion2 = new Image();
	let potion3 = new Image();

	function draw_potion(){
		potion1.src = "static/img/potion/damage potion.png"
		ctx.drawImage(potion1, (canvas.width/2-40)/2-3, 200, 75, 75);

		potion2.src = "static/img/potion/defend potion.png"
		ctx.drawImage(potion2, canvas.width/2+40, 200, 75, 75);

		potion3.src = "static/img/potion/health potion.png"
		ctx.drawImage(potion3, canvas.width/2-38, 395,75, 75);
	}

// crate special char
	let special1 = new Image();
	let special2 = new Image();

	function draw_char(){
		special1.src = "static/img/characters/char 1/profile.png"
		ctx.drawImage(special1, (canvas.width/2)-20, 195, 243/6, 549/6);

		special2.src = "static/img/characters/char 2/profile.png"
		ctx.drawImage(special2, (canvas.width/2)-20, 395, 252/6, 474/6);
	}

// create back
	let back_im = new Image();
	function draw_back(x,y){
		back_im.src = "static/img/detail/back.png"
		ctx.drawImage(back_im, x, y, 97/7, 173/7);

	}

// create coin
	let coins = new Image();
	function draw_coin(x,y){
		coins.src = "static/img/detail/coin.png"
		ctx.drawImage(coins, x, y, 176/7, 176/7);

	}

// create settings icon
	let settings_img = new Image();
	function draw_settings(x,y,z){
		settings_img.src = "static/img/detail/settings.png"
		ctx.drawImage(settings_img, x, y, 75/z, 74/z);

	}

// create profile

	let profile_img = new Image();
	function draw_profile(pic){
		profile_img.src = `static/img/profile/${pic}.png`

		if(pic === "default"){
			ctx.drawImage(profile_img, 33, 120, 297/2.5, 440/2.5);
		} else if(pic === "1"){
			ctx.drawImage(profile_img, 50, 115, 243/3, 549/3);
		} else if(pic === "2"){
			ctx.drawImage(profile_img, 45, 130, 252/2.8, 474/2.8);
		}
		

	}

// create change profile
	
	function draw_change_profile(){
		let profile_change_img = new Image();
		profile_change_img.src = `static/img/profile/default.png`
		ctx.drawImage(profile_change_img, canvas.width/2-50, 35, 297/3, 440/3);

		let profile_change_img2 = new Image();
		profile_change_img2.src = `static/img/profile/1.png`
		ctx.drawImage(profile_change_img2, canvas.width/2-30, 213, 243/4, 549/4);

		let profile_change_img3 = new Image();
		profile_change_img3.src = `static/img/profile/2.png`
		ctx.drawImage(profile_change_img3, canvas.width/2-40, 385, 252/3.5, 474/3.5);
	}

// create leaderboard icon
	let leader_button = new Image();
	leader_button.src = "static/img/placeholder/leader.png"
	function draw_leader_shop(){
		ctx.drawImage(leader_button, canvas.width/3.5, canvas.height-53, 31, 31);
	}

// create rank icon
	let rank1 = new Image();
	let rank2 = new Image();
	let rank3 = new Image();

	function draw_rank(){
		rank1.src = "static/img/detail/rank_1.png"
		ctx.drawImage(rank1, (canvas.width/2-30)/2-3, 205, 35, 35);

		rank2.src = "static/img/detail/rank_2.png"
		ctx.drawImage(rank2, (canvas.width/2-105), 255, 35, 35);

		rank3.src = "static/img/detail/rank_3.png"
		ctx.drawImage(rank3, canvas.width/2-105, 305,35, 35);
	}

// create arena icon
	let arena_button = new Image();
	arena_button.src = "static/img/detail/arena.png"
	function draw_arena(){
		ctx.drawImage(arena_button, canvas.width/8, canvas.height-53, 31, 31);
	}

// create campaign icon
	let camp_button = new Image();
	camp_button.src = "static/img/detail/campaign.png"
	function draw_camp(){
		ctx.drawImage(camp_button, canvas.width/2.2, canvas.height-53, 31, 31);
	}

// create how to play picture 
// [MENU]
	let menu_tes = new Image();
	menu_tes.src = "static/img/placeholder/howtoplay.png"
	function draw_menu(){
			ctx.drawImage(menu_tes, 0, 0, canvas.width, canvas.height);
			//ctx.strokeRect(20, 20, canvas.width/2.5, canvas.height/2.5)
	}

// create warning
	let warning = new Image();
	warning.src = "static/img/detail/warning.png"
	function draw_warning(){
		ctx.drawImage(warning, 110, 80, 120, 120);
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
	"teamwork makes a dreamwork."],

	// level 2
	["safety rules are your best tools.",
	"don't driving while you're drunk.",
	"don't forget to study everyday.",
	"please sleep if you're sleepy.",
	"practice makes perfection.",
	"always to put on your seatbelt.",
	"safety is our first priority."],

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
	"be clean and healthy, and a happy person",
	"it's okay to lose in a competition"]];

// create audio
	let background_music = new Audio();
	background_music.src = "static/img/background_audio.mp3";
	background_music.loop = true;
	background_music.volume = 0.1;
	function play_audio(){
		background_music.play();
	}

// create sound effect button
	let button_click = new Audio();
	button_click.src = "static/img/button_click.wav";
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
		} else if (code === "shop"){
			start_shop("potion");
		} else if (code === "shop_char"){
			start_shop("charac");
		} else if (code === "settings"){
			start_settings("charac");
		}else if (code === "settings_prof"){
			start_settings("profile");
		} else if (code === "leaderboard"){
			start_leader();
		} else if (code === "change_prof"){
			start_change_prof()
		} else if (code === "arena"){
			start_arena()
		}

	}

// page status checker
	let checker = setInterval(() => {
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
		} else if (shop_p){
			change_page("shop")
		} else if (shopc_p){
			change_page("shop_char")
		} else if (settings_p){
			change_page("settings")
		} else if (settings_prof_p){
			change_page("settings_prof")
		} else if (leader_p){
			change_page("leaderboard")
		} else if (change_prof_p){
			change_page("change_prof")
		} else if (arena_p){
			change_page("arena")
		}
	}, 200)

// permision page
	function start_per(){
		draw_warning();
		let warning_text = {
			font : "20px Courier",
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
				if(event.offsetX >=43 && event.offsetX <= 307 && event.offsetY <= 409 && event.offsetY >= 400 && per_p == true){
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
		})

	}

// menu page
	function start_menu(){
		draw_logo();
		// play button
		let playButton = {
			font : "7vh Courier",
			color : "#224B0C",
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
				roundedRect(ctx,canvas.width/2-65, canvas.height/2- 2, 130, 55, 15,"#90B77D");
			},

			checkClicked : function(event){
				if(event.offsetX >= 112 && event.offsetX <= 315 && event.offsetY >= 270 && event.offsetY <= 325 && menu_p){
					level_p = true;
					menu_p = false;
				}
			}
		}

		
		let howToPlayButton ={
			font : "7vh Courier",
			color : "#224B0C",
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
				roundedRect(ctx, canvas.width/2-150, canvas.height/2+87, 300, 55,15,"#90B77D");
			},

			checkClicked : function(event){
				if(menu_p && event.offsetX >= 25 && event.offsetX <= 325 && event.offsetY >= 365 && event.offsetY <= 415){
					howToPlay_p = true;
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
		draw_settings(canvas.width - 40,15,3)
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
				color : "#224B0C",
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
					roundedRect(ctx,canvas.width/2-110, canvas.height/2+50, 220, 55, 15,"#90B77D");
				},

				checkClicked : function(event){
					if(event.offsetX >= 65 && event.offsetX <= 285 && event.offsetY >= 330 && event.offsetY <= 385 && level_p){
						start = true;
						level_p = false;
						game_p = true;
						distanceEn = 0;
						distance = 0;
					}
				}
			}

			let newGameText = {
				font : "7vh Courier",
				color : "#224B0C",
				align : "center",
				baseline : "middle",

				draw : function(){
					let x = canvas.width/2;
					let y = canvas.height/2 +150;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText("New Game", x, y);
				},
				drawSquare : function(){
					roundedRect(ctx,canvas.width/2-115, canvas.height/2+120, 230, 55, 15,"#90B77D");
				},

				checkClicked : function(event){
					if(level_p && event.offsetX >= 60 && event.offsetX <= 290 && event.offsetY >= 405 && event.offsetY <= 455){
						level = 1
						update_level(level)
						start = true;
						level_p = false;
						game_p = true;
						menu_p = false
						pause = false
						life = 3;
						correct = 0;
						full = "";
						times = 0;
						speedEnemy = 1;
						distanceEn = 0;
						damage_potion = 0;
						health_potion = 0;
						defend_potion = 0;
						rabbit_char = false;
						dino_char = false;
						player_coin = 0;
						update_coin(player_coin);
						update_damage_potion(damage_potion);
						update_defend_potion(defend_potion);
						update_health_potion(health_potion);
						update_level(level);
						update_dino_char(dino_char);
						update_rabbit_char(rabbit_char)
					}
				}
			}

			let returnText = {
				font : "7vh Courier",
				color : "#224B0C",
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
					roundedRect(ctx,canvas.width/2-115, canvas.height/2+190, 230, 55, 15,"#90B77D");
				},

				checkClicked : function(event){
					if(level_p && event.offsetX >= 60 && event.offsetX <= 290 && event.offsetY >= 470 && event.offsetY <= 524){
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
				if(level_p && event.offsetX >= 310 && event.offsetX <= 335 && event.offsetY >= 15 && event.offsetY <= 40){
					settings_p = true;
					menu_p = false;
				}
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
				color : "#224B0C",
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
					roundedRect(ctx, canvas.width/2-145, canvas.height/2+175, 300, 55,15,"#90B77D");
				},

				checkClicked : function(event){
					if(howToPlay_p && event.offsetX >= 112 && event.offsetX <= 400 && event.offsetY >= 450 && event.offsetY <= 500){
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
		})
	}

// game page
	function start_game(){
		draw()
		draw_character();
		draw_enemy();
		draw_coin(30,30)

		// level = 4;
		// update_level(level)

		let coin = {
			font : "3.5vh Courier",
			color : "white",
			align : "left",
			baseline : "middle",

			drawText : function(){
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText(`${player_coin}`, 63, 43);
			}
		}

		// border
		let border = {
			color : "#224B0C",
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
			color : "lightblue",
			border_size : 20,
			width : canvas.width,
			height : canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const frame = ctx.fillRect(this.border_size, this.height/2.3, this.width-2*this.border_size, this.height/50)
			}
		}

		let barrier_life = {
			color : "limegreen",
			border_size : 20,
			width : canvas.width,
			height : canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				this.width = canvas.width*life/(3+health_potion);
				if (life == 0){
					let frame = ctx.fillRect(this.border_size, this.height/2.3, 0, 0)
				} else {
					let frame = ctx.fillRect(this.border_size, this.height/2.3, this.width-2*this.border_size, this.height/50)
				}
			}
		}

		let typing_frame = {
			color : "#C1D5A4",
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

		let attribute_frame = {
			color: "#F0F2B6",
			border_size: 20,
			width: canvas.width,
			height: 1/15*canvas.height,

			draw : function(){
				ctx.fillStyle = this.color;
				const frame = ctx.fillRect(this.border_size, this.height*13.5, this.width-2*this.border_size, this.height)
			}
		}

		// draw border
		coin.drawText()
		border.draw();
		barrier.draw();
		barrier_life.draw();
		typing_frame.draw();
		attribute_frame.draw();
		level_text.draw();
		draw_button_menu();
		draw_button_shop();
		draw_leader_shop();
		draw_arena();
		pause_b.draw_button_pause()
		//draw_heart()
		quotePicker();
		// upgrade_level();
		draw_settings(canvas.width/2-20, canvas.height - 53, 2.5);

		if (pause_stat) {
			//pause_b.draw_pause_text()
			pause_b.draw_button_play()
			pause = true;
		} else if (!pause_stat){
			pause = false;
		}

		document.querySelector("#canvas").addEventListener('click', function (event){
			clicked();
			if (game_p && event.offsetX >= canvas.width-70 && event.offsetX <= canvas.width-20 && event.offsetY >= canvas.height-70 && event.offsetY <= canvas.height-20){
					game_p = false;
					menu_p = true;
					level_p = false;
					pause_stat = true;
					pause = true;
					life = 3;
					correct = 0;
					full = "";
					times = 0;
					speedEnemy = 1;
			}else if (game_p && event.offsetX >= canvas.width-70 && event.offsetX <= canvas.width-35 && event.offsetY >= 30 && event.offsetY <= 65){
				console.log(pause)
				if (pause){
					speedEnemy = 1;
					pause_stat = false;
				} else if (!pause){
					speedEnemy = 0;
					soal = "PAUSE"
					pause_stat = true;
				}
			} else if (game_p && event.offsetX >= 215 && event.offsetX <= 255 && event.offsetY >= 505 && event.offsetY <= 540){
				game_p = false;
				level_p = false;
				pause = true;
				pause_stat = true;
				shop_p = true;
				// distanceEn = 0
			} else if (game_p && event.offsetX >= 150 && event.offsetX <= 185 && event.offsetY >= 505 && event.offsetY <= 540){
				game_p = false;
				level_p = false;
				pause = true;
				pause_stat = true;
				settings_p = true;
				// distanceEn = 0
			} else if (game_p && event.offsetX >= 100 && event.offsetX <= 130 && event.offsetY >= 505 && event.offsetY <= 540){
				game_p = false;
				level_p = false;
				pause = true;
				pause_stat = true;
				leader_p = true;
				// distanceEn = 0
			} else if (game_p && event.offsetX >= 40 && event.offsetX <= 80 && event.offsetY >= 505 && event.offsetY <= 540){
				game_p = false;
				level_p = false;
				pause = true;
				pause_stat = true;
				arena_p = true;
				// distanceEn = 0
			}
			})
		}

// leaderboard page 
	function start_leader(){
		let comingSoon ={
			color : "rgba(0,0,0,0.5)",
			width: canvas.width,
			height: canvas.height,
			font : "8vh Courier",
			align : "center",
			baseline : "middle",

			draw : function (){
				ctx.fillStyle = this.color;
				ctx.fillRect(0, 0, this.width, this.height);

				let x = this.width/2;
				let y = this.height/2;
				ctx.font = this.font;
				ctx.fillStyle = "white";
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('Coming Soon', x, y);
			}
		}

		let border = {
			color : "#224B0C",
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

		let border_table = {
			color : "#224B0C",
			size: 10,
			width: canvas.width,
			height: canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const top = ctx.fillRect(40, this.height/4.5, this.width-80, this.size);
				const right = ctx.fillRect(this.width - 5*this.size, this.height/4.5, this.size, this.height/1.8);
				const bottom = ctx.fillRect(40, this.height/1.3, this.width-80, this.size);
				const left = ctx.fillRect(40, this.height/4.5, this.size, this.height/1.8);
			
			}
		}


		let leader_frame = {
			color : "#90B77D",
			border_size : 20,
			width : canvas.width,
			height : canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const frame = ctx.fillRect(3*this.border_size, this.height/4, this.width-6*this.border_size, this.height/1.95)
			},

			draw_line : function (){
				ctx.fillStyle = "white";
				let line_1 = ctx.fillRect(3*this.border_size, this.height/(2.8), this.width-6*this.border_size, 1)
				let line_2 = ctx.fillRect(3*this.border_size, this.height/(2.3), this.width-6*this.border_size, 1)
				let line_3 = ctx.fillRect(3*this.border_size, this.height/(1.9), this.width-6*this.border_size, 1)
				let line_4 = ctx.fillRect(3*this.border_size, this.height/(1.6), this.width-6*this.border_size, 1)
				
				}
			}
		
			let lead_text = {
				font : "4vh Courier",
				color : "#224B0C",
				align : "center",
				baseline : "middle",
				color_box: "#90B77D",
				width : canvas.width,
				height : canvas.height,
				border_size : 20,
	
				draw : function(){
					let x = canvas.width/2;
					let y = 140;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText('LeaderBoard', x, y);
					
				},
	
				draw_box : function(){
					roundedRect(ctx, 85, 100, this.width/2, 75, 10, this.color_box);
				}
			}

			let rank_text = {
				font : "4vh Courier",
				color : "#224B0C",
				align : "center",
				baseline : "middle",
				width : canvas.width,
				height : canvas.height,
				border_size : 20,
	
				draw : function(){
					let x = canvas.width/2;
					let y = 220;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;

					let rank_1 = ctx.fillText('Admin 1', x, y);
					let rank_2 = ctx.fillText('Admin 2', x, y+50);
					let rank_3 = ctx.fillText('Admin 3', x, y+100);
					
				}
			}

			let our_rank = {
				color : "#224B0C",
				border_size : 20,
				width : canvas.width,
				height : canvas.height,
	
				draw : function (){
					ctx.fillStyle = this.color;
					const frame = ctx.fillRect(3*this.border_size, this.height/1.59, this.width-6*this.border_size, this.height/7.5)
				}
			}

			let back = {
				font : "4vh Courier",
				color : "lightblue",
				align : "center",
				baseline : "middle",
	
				draw : function (){
					let x = 60;
					let y = canvas.height -40;
					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText('BACK', x, y);
				},
	
			}

			border.draw()
			leader_frame.draw()
			leader_frame.draw_line();
			border_table.draw();
			draw_rank();
			lead_text.draw_box();
			lead_text.draw();
			our_rank.draw();
			rank_text.draw();
			

			comingSoon.draw()
			back.draw()

			document.querySelector("#canvas").addEventListener('click', function (event){
				clicked();

			if ((leader_p) && event.offsetX >= 30 && event.offsetX <= 87 && event.offsetY >= 510 && event.offsetY <= 530){
				leader_p = false;
				game_p = true;
			}
		})
	}

// shop page
	function start_shop(type){
		draw_coin(canvas.width-80,15)

		let coin = {
			font : "3.5vh Courier",
			color : "white",
			align : "left",
			baseline : "middle",

			drawText : function(){
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText(`${player_coin}`, canvas.width-50,28);
			}
		}

		let border = {
			color : "#224B0C",
			size: 2,
			width: canvas.width,
			height: canvas.height,

			draw : function (){
				ctx.fillStyle = this.color;
				const top = ctx.fillRect(20, 50, this.width-40, this.size);
				const right = ctx.fillRect(this.width - this.size- 20, 50, 1.7*this.size, this.height);
				const bottom = ctx.fillRect(20, this.height - (1.03*this.size), this.width, this.size);
				const left = ctx.fillRect((this.size+20), 50, this.size, this.height);
			
			}
		}

		let shop_text = {
			font : "10vh Courier",
			color : "lightblue",
			align : "center",
			baseline : "middle",
			color_box: "#224B0C",
			width : canvas.width,
			height : canvas.height,
			border_size : 20,

			draw : function(){
				let x = canvas.width/2;
				let y = 50;
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('Shop', x, y);
				
			},

			draw_box : function(){
				roundedRect(ctx, 85, 25, this.width/2, 75, 10, this.color_box);
			}
		}


		let potion = {
			font : "5.5vh Courier",
			font_c : "3.5vh Courier",
			font_p :"2.5vh Courier",
			color : "lightblue",
			align : "center",
			baseline : "middle",
			color_box : "#42855B",
			border_size : 20,
			width : canvas.width,
			height : canvas.height,

			draw : function(){
				let x = 105;
				let y = 113;
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('Potion', x, y);
				
			},

			draw_box : function (){
				roundedRect(ctx, 38, 90, this.width/2-40, 45, 10, this.color_box);
			},

			draw_pbox : function (){
				if(type === "potion"){

					roundedRect(ctx, 38, 170, this.width/2-45, 140, 10, "white");
					roundedRect(ctx, (this.width/2-55)/2, 150, (this.width/2)/2, 40, 10, this.color_box);
					roundedRect(ctx, 38, 170+120, this.width/2-45, 40, 10, this.color_box);

					roundedRect(ctx, this.width/2+10, 170, this.width/2-45, 140, 10, "white");
					roundedRect(ctx, this.width/2+30, 150, (this.width/2)/2, 40, 10, this.color_box);
					roundedRect(ctx, this.width/2+10, 170+120, this.width/2-45, 40, 10, this.color_box);

					roundedRect(ctx, this.width/2- (this.width/2-45)/2, 365, this.width/2-45, 140, 10, "white");
					roundedRect(ctx, this.width/2- (this.width/2)/4, 345, (this.width/2)/2, 40, 10, this.color_box);
					roundedRect(ctx, this.width/2- (this.width/2-45)/2, 365+120, this.width/2-45, 40, 10, this.color_box);



					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.fillText('BUY', this.width/2-73, 170+140);
					ctx.font = this.font_c;
					ctx.fillText('10', this.width/2-60, 170);
					draw_coin(this.width/2-110, 158)
					ctx.font = this.font_p;
					ctx.fillStyle = "#42855B";
					ctx.fillText('Damage Postion', this.width/2-70, 282);


					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.fillText('BUY', this.width/2+75, 170+140);
					ctx.font = this.font_c;
					ctx.fillText('10', this.width/2+90, 170);
					draw_coin(this.width/2+38, 158)
					ctx.font = this.font_p;
					ctx.fillStyle = "#42855B";
					ctx.fillText('Defend Postion', this.width/2+75, 282);

					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.fillText('BUY', this.width/2, 365+140);
					ctx.font = this.font_c;
					ctx.fillText('10', this.width/2+10, 365);
					draw_coin(this.width/2-40, 353)
					ctx.font = this.font_p;
					ctx.fillStyle = "#42855B";
					ctx.fillText('Health Postion', this.width/2, 478);

				} else if(type === "charac"){

					roundedRect(ctx, this.width/2- (this.width/2-45)/2, 170, this.width/2-45, 140, 10, "#969997");
					roundedRect(ctx, this.width/2- (this.width/2)/4, 150, (this.width/2)/2, 40, 10, this.color_box);
					roundedRect(ctx, this.width/2- (this.width/2-45)/2, 170+120, this.width/2-45, 40, 10, this.color_box);

					roundedRect(ctx, this.width/2- (this.width/2-45)/2, 365, this.width/2-45, 140, 10, "#969997");
					roundedRect(ctx, this.width/2- (this.width/2)/4, 345, (this.width/2)/2, 40, 10, this.color_box);
					roundedRect(ctx, this.width/2- (this.width/2-45)/2, 365+120, this.width/2-45, 40, 10, this.color_box);

					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.fillText('BUY', this.width/2, 170+140);
					ctx.font = this.font_c;
					ctx.fillText('100', this.width/2+10, 170);
					draw_coin(this.width/2-38, 158)

					ctx.font = this.font;
					ctx.fillStyle = this.color;
					ctx.fillText('BUY', this.width/2, 365+140);
					ctx.font = this.font_c;
					ctx.fillText('150', this.width/2+10, 365);
					draw_coin(this.width/2-38, 353)

				}

				

			},

		}

		let next = {
			font : "4vh Courier",
			color : "lightblue",
			align : "center",
			baseline : "middle",

			draw : function (){
				let x = canvas.width -60;
				let y = canvas.height -20;
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('NEXT', x, y);
			},

		}

		let back = {
			font : "4vh Courier",
			color : "lightblue",
			align : "center",
			baseline : "middle",

			draw : function (){
				let x = 60;
				let y = canvas.height -20;
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('BACK', x, y);
			},

		}

		coin.drawText()
		border.draw()
		shop_text.draw_box();
		shop_text.draw();

		potion.draw_box();
		potion.draw()
		potion.draw_pbox()

		draw_back(15,15)

		if (type === "potion") {
			draw_potion()
			next.draw()
		}
		
		if (type === "charac") {
			draw_char()
			back.draw()
		}
		

		document.querySelector("#canvas").addEventListener('click', function (event){
			clicked();

			if (shop_p && event.offsetX >= 260 && event.offsetX <= 315 && event.offsetY >= 530 && event.offsetY <= 545){
				shop_p = false;
				shopc_p = true;
			} else if (shopc_p && event.offsetX >= 30 && event.offsetX <= 90 && event.offsetY >= 530 && event.offsetY <= 545){
				shop_p = true;
				shopc_p = false;
			} else if ((shopc_p || shop_p) && event.offsetX >= 15 && event.offsetX <= 28 && event.offsetY >= 15 && event.offsetY <= 40){
				shop_p = false;
				shopc_p = false;
				game_p = true;
			} else if (shop_p && event.offsetX >= 35 && event.offsetX <= 170 && event.offsetY >= 290 && event.offsetY <= 330){
				buy = true;
				buy_dm_p = true;
			} else if (shop_p && event.offsetX >= 185 && event.offsetX <= 315 && event.offsetY >= 290 && event.offsetY <= 330){
				buy = true;
				buy_df_p = true;
			}  else if (shop_p && event.offsetX >= 110 && event.offsetX <= 240 && event.offsetY >= 485 && event.offsetY <= 525){
				buy = true;
				buy_h_p = true;
			}  else if (shopc_p && event.offsetX >= 110 && event.offsetX <= 240 && event.offsetY >= 290 && event.offsetY <= 330){
				buyc = true;
			} else if (shopc_p && event.offsetX >= 110 && event.offsetX <= 240 && event.offsetY >= 485 && event.offsetY <= 525){
				buyc2 = true;
			}

		})

		if(buy === true){
			player_coin -= 10;
			update_coin(player_coin);
			buy = false
		}
		if(buyc === true){
			player_coin -= 100;
			update_coin(player_coin);
			rabbit_char = true;
			check_characters()
			update_rabbit_char(rabbit_char)
			buyc = false
		}

		if(buyc2 === true){
			player_coin -= 150;
			update_coin(player_coin);
			dino_char = true;
			check_characters()
			update_dino_char(dino_char)
			console.log(dino_char)
			console.log(player_character)
			buyc2 = false
		}

		if(buy_dm_p){
			damage_potion++;
			update_damage_potion(damage_potion)
			speedEnemy -= 0.05;
			buy_dm_p = false
		}

		if(buy_df_p){
			defend_potion++;
			update_defend_potion(defend_potion)
			life_enemy--;
			buy_df_p = false
		}

		if(buy_h_p){
			health_potion++;
			life++;
			update_health_potion(health_potion)
			buy_h_p = false
		}

	}

// arena page 
	function start_arena(){
	draw()
	draw_character();
	draw_enemy();
	//draw_coin(30,30)

	let comingSoon ={
		color : "rgba(0,0,0,0.5)",
		width: canvas.width,
		height: canvas.height,
		font : "8vh Courier",
		align : "center",
		baseline : "middle",

		draw : function (){
			ctx.fillStyle = this.color;
			ctx.fillRect(0, 0, this.width, this.height);

			let x = this.width/2;
			let y = this.height/2;
			ctx.font = this.font;
			ctx.fillStyle = "white";
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText('Coming Soon', x, y);
		}
	}

	// score 
	let score_me = {
		font : "3.5vh Courier bold",
		color : "blue",
		align: "center",
		baseline : "middle",

		drawText : function(){
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText(`${my_score}`, 130, 43)
		}
	}

	let vs = {
		font : "3.5vh Courier bold",
		color : "white",
		align: "center",
		baseline : "middle",

		drawText : function(){
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText(`VS`, 180, 43)
		}
	}

	let score_enem = {
		font : "3.5vh Courier bold",
		color : "red",
		align: "center",
		baseline : "middle",

		drawText : function(){
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.textAlign = this.align;
			ctx.textBaseline = this.baseline;
			ctx.fillText(`${enemy_score}`, 230, 43)
		}
	}

	// border
	let border_1 = {
		color : "#224B0C",
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

	let barrier_1 = {
		color : "lightblue",
		border_size : 20,
		width : canvas.width,
		height : canvas.height,

		draw : function (){
			ctx.fillStyle = this.color;
			const frame = ctx.fillRect(this.border_size, this.height/2.3, this.width-2*this.border_size, this.height/50)
		}
	}

	let barrier_life_1 = {
		color : "limegreen",
		border_size : 20,
		width : canvas.width,
		height : canvas.height,

		draw : function (){
			ctx.fillStyle = this.color;
			this.width = canvas.width*life/3;
			if (life == 0){
				let frame = ctx.fillRect(this.border_size, this.height/2.3, 0, 0)
			} else {
				let frame = ctx.fillRect(this.border_size, this.height/2.3, this.width-2*this.border_size, this.height/50)
			}
		}
	}

	let typing_frame_1 = {
		color : "#C1D5A4",
		border_size : 20,
		width : canvas.width,
		height : canvas.height,

		draw : function (){
			ctx.fillStyle = this.color;
			const frame = ctx.fillRect(this.border_size, this.height/2.2, this.width-2*this.border_size, this.height/1.95)
		}
	}

	let level_text_1 = {
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
			ctx.fillText(`Endless mode`, x, y);
	}}

	let attribute_frame_1 = {
		color: "#F0F2B6",
		border_size: 20,
		width: canvas.width,
		height: 1/15*canvas.height,

		draw : function(){
			ctx.fillStyle = this.color;
			const frame = ctx.fillRect(this.border_size, this.height*13.5, this.width-2*this.border_size, this.height)
		}
	}

	document.querySelector("#canvas").addEventListener('click', function (event){
			clicked();
			if (arena_p && event.offsetX >= 160 && event.offsetX <= 200 && event.offsetY >= 505 && event.offsetY <= 540){
				arena_p = false;
				level_p = false;
				pause = true;
				pause_stat = true;
				game_p = true;
				distanceEn = 0

			}})

	// draw border
	//coin.drawText()
	border_1.draw();
	score_me.drawText();
	vs.drawText();
	score_enem.drawText();
	barrier_1.draw();
	barrier_life_1.draw();
	typing_frame_1.draw();
	attribute_frame_1.draw();
	level_text_1.draw();
	
	//draw_heart()
	quotePicker();

	comingSoon.draw()
	draw_camp();
	}

// settings page
	function start_settings(type){
		ctx.strokeStyle = "#224B0C";
		ctx.lineWidth = 1;
		ctx.fillStyle = "#224B0C";
		ctx.beginPath();
		ctx.arc(35, canvas.height-38 ,23, 2*Math.PI, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		draw_back(25, canvas.height-50)

		canvas.style.backgroundColor = "#90B77D"

		let tab = {
			font : "25px Courier",
			color : "#224B0C",
			align : "center",
			baseline : "middle",
			color_box: "#D2D79F",
			width : canvas.width,
			height : canvas.height,
			border_size : 20,

			draw : function(){
				// tab on
				if (type === "charac") {
					ctx.fillStyle = "#D2D79F";
				} else{
					ctx.fillStyle = "#224B0C";
				}

				ctx.fillRect(0, 0, this.width/2, this.height/10)
				ctx.font = this.font;
				if (type === "charac") {
					ctx.fillStyle = this.color;
				} else{
					ctx.fillStyle = "lightblue";
				}
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('character', 90, 30);

				// tab off
				if (type === "charac") {
					ctx.fillStyle = this.color;
				} else{
					ctx.fillStyle = "#D2D79F";
				}
				ctx.fillRect(this.width/2, 0, this.width/2, this.height/10)
				ctx.font = this.font;
				if (type === "charac") {
					ctx.fillStyle = "#D2D79F";
				} else{
					ctx.fillStyle = this.color;
				}
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('profile', 260, 30);

				// photo
				ctx.fillStyle = this.color;
				ctx.fillRect(20, 100, this.width/2-30, this.width/2+20)

				draw_profile(player_pic)
					
				if (type === "charac") {
					ctx.fillStyle = this.color;
					ctx.fillRect(20, 300, this.width/2-30, 30)
					ctx.font = "15px Courier";
					ctx.fillStyle = "lightblue";
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText('tap to change', 90, 315);
				}

				ctx.fillStyle = this.color;
				ctx.fillRect(this.width/2+20, 100, this.width/2-40, 50)

				ctx.font = "18px Courier";
				ctx.fillStyle = "lightblue";
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;

				if (type === "charac") {
					ctx.fillText(`Rank : ${rank}`, this.width/2+88, 125);

				} else{
					ctx.fillText(`${username}`, this.width/2+88, 125);
				}
						
				if (type === "charac") {
					ctx.fillStyle = this.color;
					ctx.fillRect(this.width/2+20, 240, this.width/2-40, 180)

					ctx.font = "16px Courier";
					ctx.fillStyle = "lightblue";
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText('potion update', this.width/2+88, 255);
					ctx.font = "15px Courier";
					ctx.fillText('damage potion', this.width/2+88, 280);
					ctx.fillText(`${damage_potion}`, this.width/2+88, 300);
					ctx.fillText('defend potion', this.width/2+88, 325);
					ctx.fillText(`${defend_potion}`, this.width/2+88, 345);
					ctx.fillText('health potion', this.width/2+88, 375);
					ctx.fillText(`${health_potion}`, this.width/2+88, 395);
				} else{
					ctx.fillStyle = this.color;
					ctx.fillRect(20, 320, this.width-40, 50)
					ctx.font = "25px Courier";
					ctx.fillStyle = "lightblue";
					ctx.textAlign = this.align;
					ctx.textBaseline = this.baseline;
					ctx.fillText('logout', this.width/2, 345);

				}
				
				
			}
		}

		tab.draw()

		document.querySelector("#canvas").addEventListener('click', function (event){
			console.log(event.offsetX, event.offsetY)
			if (settings_p && event.offsetX >= canvas.width/2 && event.offsetX <= canvas.width && event.offsetY >= 0&& event.offsetY <= canvas.height/10){
				settings_p = false;
				settings_prof_p = true;
			} else if (settings_prof_p && event.offsetX >= 0 && event.offsetX <= canvas.width/2 && event.offsetY >= 0&& event.offsetY <= canvas.height/10){
				settings_p = true;
				settings_prof_p = false;
			} else if ((settings_prof_p || settings_p )&& event.offsetX >= 10 && event.offsetX <= 55 && event.offsetY >= 500 	&& event.offsetY <= 545){
				settings_p = false;
				settings_prof_p = false;
				game_p = true;

			} else if (settings_p && event.offsetX >= 20 && event.offsetX <= 165 && event.offsetY >= 300&& event.offsetY <= 330){
				change_prof_p = true;
				settings_p = false;
				settings_prof_p = false;
			} else if (settings_prof_p && event.offsetX >= 20 && event.offsetX <= 330 && event.offsetY >= 320&& event.offsetY <= 370){
				level_p = false;
				howToPlay_p = false;
				menu_p = false;
				game_p = false;
				per_p = false;
				shop_p = false;
				shopc_p = false;
				settings_p = false;
				settings_prof_p = false;
				leader_p = false;
				arena_p = false;
				change_prof_p = false;
				console.log(ip)
				window.location.replace(`/logout`);			
			}
		})
	}

// change profile
	function start_change_prof() {
		check_characters()

		draw_back(30,30)
		let text = {
			font : "3.5vh Courier",
			color : "white",
			align : "left",
			baseline : "middle",

			drawText : function(x,y){
				ctx.font = this.font;
				ctx.fillStyle = this.color;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText('LOCKED', x,y);
			}
		}
		for(let i = 0; i < 3; i++){
			if(player_character[i]=== player_pic){
				if(i === 0){
					roundedRect(ctx,canvas.width/2-78, 30-3, 156, 156, 15,"lightyellow");
				} else if (i === 1){
					roundedRect(ctx,canvas.width/2-78, 30+150+20-3, 156, 156, 15,"lightyellow");
				} else if (i== 2){
					roundedRect(ctx,canvas.width/2-78, 30+2*(150+20)-3, 156, 156, 15,"lightyellow");
				}
				
			}	
		}
		
		roundedRect(ctx,canvas.width/2-75, 30, 150, 150, 15,"#90B77D");

		roundedRect(ctx,canvas.width/2-75, 30+150+20, 150, 150, 15,"#90B77D");

		roundedRect(ctx,canvas.width/2-75, 30+2*(150+20), 150, 150, 15,"#90B77D");
		draw_change_profile();


		for(let i = 0; i < 3; i++){

			if(player_character[i] === ""){
				if(i === 1){
					roundedRect(ctx,canvas.width/2-75, 30+150+20, 150, 150, 15,"rgba(0,0,0,0.3");
					text.drawText(canvas.width/2-40, 280)
				} 
				if(i === 2){
					roundedRect(ctx,canvas.width/2-75, 30+2*(150+20), 150, 150, 15,"rgba(0,0,0,0.3");
					text.drawText(canvas.width/2-40, 280+150+20)
				}
				
			}
			
		}

		document.querySelector("#canvas").addEventListener('click', function (event){
			if (change_prof_p && event.offsetX >= 99 && event.offsetX <= 250 && event.offsetY >= 30&& event.offsetY <= 180){
				player_pic = "default"
				update_profile(player_pic)
			} else if (change_prof_p && rabbit_char && event.offsetX >= 99 && event.offsetX <= 250 && event.offsetY >= 200&& event.offsetY <= 350){
				player_pic = "1"
				update_profile(player_pic)
			} else if (change_prof_p && dino_char && event.offsetX >= 99 && event.offsetX <= 250 && event.offsetY >= 370&& event.offsetY <= 520){
				player_pic = "2"
				update_profile(player_pic)
			} else if (change_prof_p && event.offsetX >= 30 && event.offsetX <= 45 && event.offsetY >= 30&& event.offsetY <= 55){
				change_prof_p = false;
				settings_prof_p = true;
			}
		})
	}

// randomQuote
	function quotePicker(){
		
		if (times === 0 && question !== "undefined"){
			let randomNumber = Math.floor(Math.random()*question[level-1].length) - answerCounter;
			number = randomNumber;
			statusbener = true;
			times = 1;
		}
		soal = question[level-1][number]
		check_level()

		if (life === 0){
			start = false;
			soal = "Game Over"
			if (arena_p){
				soal = "YOU LOSE T_T"
			}
		} else if (enemy_life === 0){
			soal = "YOU WIN!!!"
		}

		let displayText = {
			font : "20px bold Courier",
			color: "Black",
			width : canvas.width,
			height : canvas.height,
			align : "center",
			baseline : "middle",

			draw : function(){
				if(soal !== "undefined" && level === 5){
					if(soal.length > 15){
						this.font = "17px bold Courier"
					}
				}
				
				if (!statusbener){
					ctx.fillStyle = "Red";
				} else {
					ctx.fillStyle = this.color;
				} 

				if (full === soal){
					ctx.fillStyle = "Green"
					correct++;
					player_coin +=2;
					update_coin(player_coin)
					speedEnemy += 0.01;
					times = 0;
					counter = 0;
					full = "";
					if (health_enemy > 0){
						health_enemy -= 1
					} else if (health_enemy === 0){
						distanceEn = 0;
						upgrade_level()
					}
					question[level-1].splice(number,1)
					if (arena_p){
						my_score += 10;
					}
				}
				ctx.font = this.font;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.fillText(`${soal}`, this.width/2, this.height/1.7);
			}
		}

		let inputText = {
			font : "18px bold Courier",
			color: "Navy",
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
	}

// function for checking accuracy
	var statementCheck = {

		check: function (key){
			if (life > 0 && life <= 3){
				full = full + key;

				if(key === soal[counter]){
					counter++;
				} else {
					speedEnemy += 0.5;
					counter = 0;
					full = "";
				}

			} else if (life === 0) {
				full = "Please retry if you want"
			}
		}
	}

	document.addEventListener("keydown", ()=>{
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
		if(level === (levelmax-1)){
			start = false;
			soal = "YOU WIN!"
		}
		player_coin += 5;
		update_coin(player_coin)
		health_enemy = 2;
	}

	function check_level(){
		if(soal === undefined && correct != 0 && level >=5){
			start = false;
			soal = "YOU WIN!"
			console.log("a")
		}
		else if(soal === undefined && correct != 0 && level < 6){
			level++;
			life ++;
			if (life >= 3) {
				life =3;
			}
			
			correct = 0;
			player_coin += 10;
			update_coin(player_coin)
			update_level(level)
		} 
	}
})