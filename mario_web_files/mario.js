// JavaScript for creating interactive animations on a canvas
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"
// declare the background image
var bgImage = new Image();

// Is called when the window loads;
function init() {

	// Initialize Mario Object
	// TODO: Put Mario on the ground instead of the cloud
	Mario = {
		x: 100,
		y: 620,
		w: 50,
		h: 80,
		JumpSound: new Audio('jump.wav'),
		Image: (function () {
			var temp = new Image();
			temp.src = "mario1.png";
			return temp; })(),
		moving: "no",
		timer: "",
		timerInterval: 10
	};

	bgImage.src = "marioBG.jpg";
	draw();

	// TODO: (OPTIONAL) set mario_08.wav as background music

	document.getElementById("audio") .play() ;
}

////////////////////////////////////////////////////////////////////

function draw() {

	// Get Drawing Area
	var ctx = document.getElementById("mario_canvas").getContext("2d");

	// If you want to display images on the canvas when it is initially
	// loaded, you must do it this way
	bgImage.onload = function () {
		ctx.drawImage(bgImage, 0, 0);

    }

	/*
	 * TODO: Draw Mario's initial image
	 */
    Mario.onload = function () {
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h); };

	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0);
		renderMario();
	}

	/*
	 * TODO: Alter the y coordinates so Mario will jump while on the ground
	 */
	function renderMario(){
		if (Mario.y > 540 && Mario.moving == "up") {
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			// Change the y value each time
			Mario.y -= 5; // move 5 px up
		}else if(Mario.y <= 540 && Mario.moving == "up"){
			Mario.moving = "down";
		} else if(Mario.y < 620 && Mario.moving == "down"){
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			Mario.y += 5; // move 5 px back down after a jump
		}else if(Mario.y == 620 && Mario.moving == "no"){
			Mario.moving = "up";
			Mario.JumpSound.play();
		}else{
			Mario.moving = "no";
			Mario.Image.src = "mario1.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
		}
	}
	///////////////////////////////////////////////////////////////////


	/* Monitor key strokes for user input:
	 *
	 * If Enter/Return is pressed, then call the render function
	 * which paints the new scene to the canvas.
	 *
	 * TODO: Add code to set Mario image to proper image whether L or R button pressed
	 * TODO: Stop Mario if he runs out of room
	 *
	 */
	document.body.onkeydown = function(e) {  // listen for a key

    	e = event || window.event;             // any kind of event
    	var keycode = e.charCode || e.keyCode; // any kind of key
		console.log(keycode);
		// The user wants Mario to jump:
    	if(keycode === 13 && Mario.moving == "no") {
        	Mario.timer = setInterval(render, Mario.timerInterval);
    	}
//Making Mr. Mario move Left when key pushed
    	else if(keycode === 37){
            Mario.moving = "left";
            Mario.timer = setTimeout(left, 70);
        }
//Making Mr. Mario move Right when key pushed
    	else if(keycode === 39){
            Mario.moving = "right";
            Mario.timer = setTimeout(right, 70);
        }

    }
//Make Mario look like hes moving to right with img and stop him before he goes too far
    function right(){
        ctx.drawImage(bgImage, 0, 0);

        Mario.Image.src = "marioturnsright.png";

        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);

        if (Mario.moving == "right"){

        	if (Mario.x <= 1155){
                Mario.x += 10;
            }
        }
    }

//Make Mario look like hes moving to left with img and stop him before he goes too far
    function left(){
        ctx.drawImage(bgImage, 0, 0);

        Mario.Image.src = "marioturnsleft.png";

        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);

        if (Mario.moving == "left"){

        	if(Mario.x >= 5){
                Mario.x -= 10;
            }
        }
    }

    /* TODO:
     * TODO: Capture keycodes for L and R. In each, set a timeout that calls a function
     * TODO: to face Mario forward after 200 ms. HINT: setTimeout(function, timeInMilliSecs)
     */
    document.body.onkeyup = function(e) {  // listen for a key
        e = event;
        var keycode = e.keyCode;
        console.log(keycode);

        //Make him face forward after listed time (Left)
        if(keycode == 37){
            Mario.timer = setTimeout(faceForward, 200);
        }
        //Make him face forward after listed time (Right)
        if(keycode == 39){
            Mario.timer = setTimeout(faceForward, 200);
        }
    }


    /*
     * TODO: Face Mario forward. Do not forget to draw the background image first
     */

    //Making Mario face forward function, using photo provided (Then clears based on time interval listed)
    function faceForward() {

        ctx.drawImage(bgImage, 0, 0);

        	Mario.moving = "no";
        	Mario.Image.src = "mario1.png";

        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
        clearInterval(Mario.timer);
    }

} // close draw()
