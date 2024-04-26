const canvas = document.querySelector('canvas');
canvas.width = 1000;
canvas.height = 600;
const context = canvas.getContext('2d');

/// audio ////

let fon = new Audio();
fon.preload = 'auto';
fon.loop = 'auto';
fon.volume = 0.4;
fon.src = 'fon.mp3';
fon.play();

let menuAudio = new Audio();
menuAudio.preload = 'auto';
menuAudio.src = 'menu.mp3';
let menuAudioPlay = false;
function menuPlay() {
	if (menuAudioPlay) {
		menuAudio.play();
		menuAudioPlay = false;
		punct = menuPunct;
	}
}

let bollAudio = new Audio();
bollAudio.preload = 'auto';
bollAudio.src = 'boll.mp3';

let gameOver = new Audio();
gameOver.preload = 'auto';
gameOver.src = 'game-over.mp3';


///// img ///

const boll = new Image();
boll.src = 'boll.png';

const field = new Image();
field.src = 'field.png';

const keeper = new Image();
keeper.src = 'keeper.png';

const cross = new Image();
cross.src = 'cross.png';

const less = new Image();
less.src = 'less.png';

const more = new Image();
more.src = 'more.png';

const cursor = new Image();
cursor.src = 'cursor.png';

/// boll ////

let bollWidth = 50;
let bollHight = 50;
let topPoint = Math.round(Math.random() * (canvas.height - bollHight));
let leftPoint = Math.round(Math.random() * (canvas.width / 2 - bollWidth));
let bollTop = topPoint;
let bollBot = topPoint + bollHight;


/// goulkeeper ///

let rectWidth = 30;
let rectHight = 200;
let rectTop = canvas.height / 2 - rectHight / 2;
let rectLeft = canvas.width - 130;
function drowRct() {
	context.fillStyle = 'yellow';
	context.rect(rectLeft, rectTop, rectWidth, rectHight);
	context.fill();
}

/// options /////

let counter = 0;
let level = 10;
let toRight = true;
let toBot = Math.round(Math.random());
let mainMenu = true;
let playGame = false;
let pause = false;
let resalt = false;
let about = false;
let options = false;
let records = false;
let mouseX = 0;
let mouseY = 0;

///menu ////

const menu = ["New Game" , "About Game" , "Records" , "Options" ];
const pauseMenu = ["Сontinue", "New Game" , "Options", "Main menu"];
const optionsMenu = ["Music", "Effects"];
let menuPunct = 0;
let menuNumber = 0;
let menuVariant = "";
let punct = 0;
let restart = false;
let crossHover  = false;

/// game function ////

function clear() {
	topPoint = Math.round(Math.random() * (canvas.height - bollHight));
	leftPoint = Math.round(Math.random() * (canvas.width / 2 - bollWidth));
	toBot = Math.round(Math.random());
	toRight = true;
	counter = 0;
	level = 10;
	rectTop = canvas.height / 2 - rectHight / 2;
	canvas.width = canvas.width;
	drowRct();
}
function game() {
	context.textAlign = 'left';
	context.font = '32px Rakkas, serif';
	context.fillStyle = 'red';
	context.fillText(counter, canvas.width - 60, 40);
	context.fillText('Level: ' + (level - 9), 60, 40);
	bollTop = topPoint;
	bollBot = topPoint + bollHight;
	let rectRight = rectLeft + rectWidth;
	let rectBot = rectTop + rectHight;
	let bollLeft = leftPoint;
	let bollRight = leftPoint + bollWidth;
	if (toRight) {
		leftPoint += level
		if (leftPoint >= canvas.width - bollWidth) {
			toRight = false;
			levelUp();
		}
		if (bollLeft < rectRight && bollRight > rectLeft ) {
			if (bollTop > rectBot || bollBot < rectTop) {
				toRight = true;
			} else {
				toRight = false;
				leftPoint -= level * 2;
				levelUp();
			}
		}
	} else {
		leftPoint -= level;
		if (leftPoint <= 0 ) {
			toRight = true;
			levelUp();
		}
		if (bollLeft < rectRight && bollRight > rectRight ) {
			if (bollTop > rectBot || bollBot < rectTop) {
				toRight = false;
			} else {
				leftPoint += level * 2;
				toRight = true;
				levelUp();
			}
		}
	}
	if (toBot) {
		topPoint += level;
		if (topPoint >= canvas.height - bollHight) {
			toBot = false;
			levelUp();
		}
		if (bollBot > rectTop && bollTop < rectTop) {
			if ( bollRight < rectLeft || bollLeft > rectRight) {
				toBot = true;
			} else {
				topPoint -= level * 2;
				toBot = false;
				if (!toRight) {
					toRight = true;
				} 
				levelUp();
			}
		}
	} else {
		topPoint -= level;
		if (topPoint <= 0) {
			toBot = true;
			levelUp();
		}
		if (bollTop < rectBot && bollBot > rectBot ) {
			if ( bollRight < rectLeft || bollLeft > rectRight) {
				toBot = false;
			} else {
				topPoint += level * 2;
				toBot = true;
				if (!toRight) {
					toRight = true;
				} 
				levelUp();
			}
		}
	}
}
function lose() {
	context.fillStyle = 'blue';
	context.font = '80px serif';
	context.textAlign = 'center';
	context.fillText('You Lose', canvas.width / 2, canvas.height /2 - 100);
	context.font = '50px serif';
	context.fillText('Ваш счет: ' + counter, canvas.width / 2, canvas.height / 2);
	if (restart) {
		context.fillStyle = 'yellow';
	} else {
		context.fillStyle = 'blue';
	}
	context.fillText('Попробовать еще раз', canvas.width / 2, canvas.height / 2 + 100);
	mainMenu = false;
	resalt = true;
	gameOver.play();
	fon.pause();
	fon.currentTime = 0;
	esc();
}
function levelUp() {
	counter++;
	if (counter % 50 == 0) { 
		level++;
	}
	bollAudio.play();
}
function clearMenu() {
	menuPunct = 0;
	punct = 0;
}
function esc() {
	context.drawImage(cross, 40, 40, 50, 50);
}

function drowCursor(x, y) {
	context.drawImage(cursor,x - 20, y - 5, 40, 60);
}
// игра ///
function frame() {
	context.drawImage(field,0, 0, canvas.width, canvas.height);
	requestAnimationFrame(frame);
	if (mainMenu){
		gameOver.pause();
		gameOver.currentTime = 0;
		fon.play();
		context.drawImage(keeper, 50, 180, 400, 320);
		context.drawImage(boll, canvas.width - 200, 100, 100, 100);
		let height = 200;
		for (menuNumber = 0; menuNumber < menu.length; menuNumber++) {
			menuVariant = menu[menuNumber];
			if (punct != menuPunct) {
				menuAudioPlay = true;
			}
			if (menuNumber == menuPunct) {
				context.fillStyle = 'yellow';
				context.font = '60px Rakkas, serif';
				context.fillText(menuVariant, canvas.width / 2, height);
				height += 50;
				menuPlay();
			} else {
				context.fillStyle = 'blue';
				context.font = '40px Rakkas, serif';
				context.textAlign  = 'center';
				context.fillText(menuVariant, canvas.width / 2, height);
				height += 50;
			}
		}
	} else if (about) {
		context.fillStyle = 'blue';
		context.font = '40px Rakkas, serif';
		context.textAlign  = 'center';
		context.fillText('Перед тобой простая задача', canvas.width / 2, 100);
		context.fillText('Защити свои ворота!!!', canvas.width / 2, 150);
		context.fillText('для того чтобы перемещать вратаря', canvas.width / 2, 200);
		context.fillText('используй стрелочки вверх и вниз', canvas.width / 2, 250);
		context.fillText('и помни, каждые 50 очков', canvas.width / 2, 300);
		context.fillText('скорость будет увеличеваться', canvas.width / 2, 350);
		context.font = '50px Rakkas, serif';
		context.fillText('Удачи!!', canvas.width / 2, 400);
		esc();
	} else if (pause) {
		context.textAlign = 'left';
		context.drawImage(boll, leftPoint, topPoint, bollWidth, bollHight);
		context.font = '32px Rakkas, serif';
		context.fillStyle = 'red';
		context.fillText(counter, canvas.width - 60, 40);
		context.fillText('Level: ' + (level - 4), 60, 40)
		drowRct();
		context.fillStyle = 'blue';
		context.font = '100px serif';
		context.textAlign = 'center';
		context.fillText('Pause', canvas.width / 2, 100); 
		let height = 300;
		for ( menuNumber = 0; menuNumber < pauseMenu.length; menuNumber++) {
			let menuVariant = pauseMenu[menuNumber];
			if (punct != menuPunct) {
				menuAudioPlay = true;
			}
			if(menuNumber == menuPunct) {
				context.fillStyle = 'yellow';
				context.font = '60px Rakkas, serif';
				context.fillText(menuVariant, canvas.width / 2, height);
				height += 50;
				menuPlay();
			} else {
				context.fillStyle = 'blue';
				context.font = '40px Rakkas, serif';
				context.textAlign  = 'center';
				context.fillText(menuVariant, canvas.width / 2, height);
				height += 50;
			}
		}
	} else if (options) {
		let height = 0;
		for ( menuNumber = 0; menuNumber < optionsMenu.length; menuNumber++) {	
			menuVariant = optionsMenu[menuNumber];
			if (punct != menuPunct) {
				menuAudioPlay = true;
			}
			context.font = '80px Rakkas, serif';
			context.textAlign  = 'center';
			height += 200;
			if(menuNumber == menuPunct) {
				context.fillStyle = 'yellow';
				context.fillText(menuVariant, canvas.width / 2, height);
				context.fillStyle = 'blue';
				context.fillText(fon.volume * 100 + "%", canvas.width / 2, 300);
				context.drawImage(less,canvas.width / 2 - 150, 250, 40, 40);
				context.drawImage(more, canvas.width / 2 + 100, 250 , 40, 40);
				menuPlay();
			} else {
				context.fillStyle = 'blue';
				context.fillText(menuVariant, canvas.width / 2, height);
				context.fillText(menuAudio.volume * 100 + "%", canvas.width / 2, 500);
				context.drawImage(less,canvas.width / 2 - 150, 450, 40, 40);
				context.drawImage(more, canvas.width / 2 + 100, 450 , 40, 40);
			}
			esc();
		}
	} else if (playGame) {
		context.drawImage(boll, leftPoint, topPoint, bollWidth, bollHight);
		drowRct();
		if (leftPoint >= canvas.width - bollWidth && 450 > bollBot && bollTop > 150) {
			lose();
		} else  {
			game();
		}
	} 
	drowCursor(mouseX, mouseY)
}
frame();

// управление клавой ///

document.addEventListener('keydown', (event) => {
	const key = event.key;
	switch (key) {
		case 'ArrowUp': 
		if (mainMenu || pause) {
			if (menuPunct != 0) {
				menuPunct--;
				menuAudioPlay = true;
			}
		} else if (!resalt && playGame) {
			if (rectTop != 0) {
				rectTop -= 10;
				canvas.width = canvas.width;
				drowRct();
			}
		} 
		if (options) {
			if (menuPunct == 1) {
				menuPunct--;
			}
			menuAudio.play();
		}
		break;
		case 'ArrowDown':
			if (mainMenu || pause ) { 
				if (menuPunct != menu.length - 1) {
					menuPunct++;
					menuAudioPlay = true;
				}
			} else if (!resalt && playGame && rectTop != canvas.height - rectHight) {
				rectTop += 10;
				canvas.width = canvas.width;
				drowRct();
			} 
			if (options) {
				if (menuPunct == 0) {
					menuPunct++;
				}
			}
			break;
		case 'ArrowRight':
			if(options) {
				if(optionsMenu[menuPunct] == "Music" && fon.volume < 1) {
					fon.volume = (Math.round(fon.volume * 10 + 1)) / 10;
				} else if (optionsMenu[menuPunct] == "Effects" && menuAudio.volume < 1) {
					menuAudio.volume = (Math.round(menuAudio.volume * 10 + 1)) / 10;
					bollAudio.volume = (Math.round(bollAudio.volume * 10 + 1)) / 10;
					gameOver.volume = (Math.round(gameOver.volume * 10 + 1)) / 10;
				}
				menuAudio.play();
			}
			break;
		case 'ArrowLeft':
			if(options) {
				if(optionsMenu[menuPunct] == "Music" && fon.volume > 0) {
					fon.volume = (Math.round(fon.volume * 10 - 1)) / 10;
				} else if (optionsMenu[menuPunct] == "Effects" && menuAudio.volume > 0) {
					menuAudio.volume = (Math.round(menuAudio.volume * 10 - 1)) / 10;
					bollAudio.volume = (Math.round(bollAudio.volume * 10 - 1)) / 10;
					gameOver.volume = (Math.round(gameOver.volume * 10 - 1)) / 10;
				}
				menuAudio.play();
			}
			break;
		case 'Enter': case ' ':
			if (mainMenu) {
				if(menu[menuPunct] == 'New Game') {
					mainMenu = false;
					playGame = true;
				} else if (menu[menuPunct] == 'About Game') {
					mainMenu = false;
					about = true;
				} else if (menu[menuPunct] == 'Options') {
					mainMenu = false;
					options = true;
					clearMenu();
				}
				menuAudio.play();
			} else if (pause) {
				if(pauseMenu[menuPunct] == 'New Game') {
					pause = false;
					clear();
				} else if (pauseMenu[menuPunct] == 'Сontinue') {
					pause = false;
				} else if (pauseMenu[menuPunct] == 'Main menu') {
					mainMenu = true;
					playGame = false;
					pause = false;
					clear();
					clearMenu();
				} else if (pauseMenu[menuPunct] == 'Options') {
					pause = false;
					options = true;
					clearMenu();
				}
			} else if (resalt) {
				resalt = false;
				clear();
				gameOver.pause();
				gameOver.currentTime = 0;
				fon.play();
			} 
			menuAudio.play();
			break;
		case 'Escape':
			if (playGame && !resalt && !pause) {   
				pause = true;
				clearMenu();
			} else if(playGame && pause ) {
				pause = false;
			} else if (playGame && resalt) {
				clear();
				mainMenu = true;
				playGame = false;
				resalt = false;
				clearMenu();
			} else if (!mainMenu && !playGame) {
				mainMenu = true;
				about = false;
				options = false;
				records = false;
				clearMenu();
			} 
			if (options) {
				options = false;
				clearMenu();
			}
			menuAudio.play();
			break;
	}
});

// управление мышью ///

function windowToCanvas(canvas, x, y) {
    let box = canvas.getBoundingClientRect();
    return { 
		x: x - box.left * (canvas.width / box.width),
        y: y - box.top * (canvas.height / box.height)
    };
}

canvas.onmousemove = function (e) {
    let mousePosition = windowToCanvas(canvas, e.clientX, e.clientY);
	mouseX = mousePosition.x;
	mouseY = mousePosition.y;
	if (mainMenu) {
		if (mouseY < 210) {
			menuPunct = 0;
		} else if (mouseY > 210 && mouseY < 270) {
			menuPunct = 1;
		} else if (mouseY > 270 && mouseY < 300) {
			menuPunct = 2;
		} else if (mouseY > 300) {
			menuPunct = 3;
		}
	} else if (pause) {
		if (mouseY < 310) {
			menuPunct = 0;
		} else if (mouseY > 310 && mouseY < 370) {
			menuPunct = 1;
		} else if (mouseY > 370 && mouseY < 400) {
			menuPunct = 2;
		}else if (mouseY > 400) {
			menuPunct = 3;
		}
	} else if (!resalt && playGame) {
		if (mouseY >= rectHight / 2 && mouseY <= canvas.height - rectHight / 2) {
			rectTop = mouseY - 100;
			canvas.width = canvas.width;
			drowRct(); 
		}
	} else if (resalt) {
		if (mouseY > canvas.height / 2 + 50 && mouseY < canvas.height / 2 + 100) {
			if (!restart) {
				menuAudio.play();
			}
			restart = true;
		} else {
			restart = false;
		}
	} else if (options) {
		if (mouseY < canvas.height / 2) {
			menuPunct = 0;
		} else {
			menuPunct = 1;
		}
	}
	if (options || about || resalt) {
		if (mouseY > 50 && mouseY < 100 && mouseX > 50 && mouseX < 100) {
			if (!crossHover) {
				menuAudio.play();
			}
			crossHover = true;
		} else {
			crossHover = false;
		}
	}
};

canvas.onmousedown  = function (e) {
	let mousePosition = windowToCanvas(canvas, e.clientX, e.clientY);
	mouseX = mousePosition.x;
	mouseY = mousePosition.y;
	document.body.style.cursor = 'none';
	if (mainMenu) {
		if(menu[menuPunct] == 'New Game') {
			mainMenu = false;
			playGame = true;
		} else if (menu[menuPunct] == 'About Game') {
			mainMenu = false;
			about = true;
		} else if (menu[menuPunct] == 'Options') {
			mainMenu = false;
			options = true;
			clearMenu();
		}
	} else if (pause) {
		if(pauseMenu[menuPunct] == 'New Game') {
			pause = false;
			clear();
		} else if (pauseMenu[menuPunct] == 'Сontinue') {
			pause = false;
		} else if (pauseMenu[menuPunct] == 'Main menu') {
			mainMenu = true;
			playGame = false;
			pause = false;
			clear();
			clearMenu();
		} else if (pauseMenu[menuPunct] == 'Options') {
			pause = false;
			options = true;
			clearMenu();
		}
	} else if (resalt) {
		if (mouseY > canvas.height / 2 + 50 && mouseY < canvas.height / 2 + 100) {
			resalt = false;
			clear();
			gameOver.pause();
			gameOver.currentTime = 0;
			fon.play();
			menuAudio.play();
			restart = false;
		} 
	} 
	if (options) {
		if (mouseY > 250 && mouseY < 290 & mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 - 110 && fon.volume > 0) {
			fon.volume = (Math.round(fon.volume * 10 - 1)) / 10;
		}
		if (mouseY > 450 && mouseY < 490 & mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 - 110 && fon.volume > 0) {
			menuAudio.volume = (Math.round(menuAudio.volume * 10 - 1)) / 10;
			bollAudio.volume = (Math.round(bollAudio.volume * 10 - 1)) / 10;
			gameOver.volume = (Math.round(gameOver.volume * 10 - 1)) / 10;
		}
		if (mouseY > 250 && mouseY < 290 & mouseX > canvas.width / 2 + 100 && mouseX < canvas.width / 2 + 140 && fon.volume < 1) {
			fon.volume = (Math.round(fon.volume * 10 + 1)) / 10;
		}
		if (mouseY > 450 && mouseY < 490 & mouseX > canvas.width / 2 + 100 && mouseX < canvas.width / 2 + 140 && menuAudio.volume < 1) {
			menuAudio.volume = (Math.round(menuAudio.volume * 10 + 1)) / 10;
			bollAudio.volume = (Math.round(bollAudio.volume * 10 + 1)) / 10;
			gameOver.volume = (Math.round(gameOver.volume * 10 + 1)) / 10;
		}
		menuAudio.play();
	}
	if (mouseY > 50 && mouseY < 100 && mouseX > 50 && mouseX < 100) {
		if (options || about || resalt) {
			clear();
			mainMenu = true;
			playGame = false;
			about = false;
			options = false;
			records = false;
			resalt = false;
			clearMenu();
		} 
		menuAudio.play();
	}
};