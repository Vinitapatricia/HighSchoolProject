
// runner

//export MenuStart = () => {

	// function runner after the page being loaded
	document.addEventListener('DOMContentLoaded', () => {

		//canvas' declaration
		let canvas = document.querySelector("#canvas");
		let ctx = canvas.getContext("2d");

		// mainlooping the frame (5 fps)
		let mainloop = (() => {

		}, 200);

		// background image 
		let background_img = new Image();
		background_img.src = "assets/placeholder/forest.jpg";

		// border
		let border = {
		color : "SaddleBrown",
		size: 20,
		width: canvas.width,
		height: canvas.height,

		draw : function (){
			//console.log(this.width, this.height)
			ctx.fillStyle = this.color;
			const top = ctx.fillRect(0, 0, this.width, this.size);
			const right = ctx.fillRect(this.width - this.size, 0, 1.7*this.size, this.height);
			const bottom = ctx.fillRect(0, this.height - (1.03*this.size), this.width, this.size);
			const left = ctx.fillRect((0+this.size)/20, 0, this.size, this.height);
		
		}
	}
	
	let rpg_frame = {
		color : "SpringGreen",
		border_size : 20,
		width : canvas.width,
		height : canvas.height,

		draw : function (){
			//ctx.fillStyle = this.color;
			console.log("Picture drawn")
			background_img.onload = function(){
				ctx.drawImage(background_img, this.border_size, this.border_size, this.width-2*this.border_size, this.height/2.3)
			}
		}
	}

	let barrier = {
		color : "Wheat",
		border_size : 20,
		width : canvas.width,
		height : canvas.height,

		draw : function (){
			ctx.fillStyle = this.color;
			const frame = ctx.fillRect(this.border_size, this.height/2.3, this.width-2*this.border_size, this.height/30)
		}
	}

	// draw border
	border.draw();
	rpg_frame.draw();
	barrier.draw();

	})

//}