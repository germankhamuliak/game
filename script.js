const canvas = document.querySelector('canvas');
canvas.width = 1000;
canvas.height = 600;
const context = canvas.getContext('2d');
const boll = new Image();
boll.src = 'boll.png';
const field = new Image();
field.src = 'field.png';
const keeper = new Image();
keeper.src = 'keeper.png';
// alert('Перед тобой простая задача, защити свои ворота, для того чтобы перемещать вратаря используй стрелочки вверх и вниз и помни, каждые 50 очков скорость будет увеличеваться, Удачи!!')
let bollWidth = 50;
let bollHight = 50;
let topPoint = Math.round(Math.random() * (canvas.height - bollHight));
let leftPoint = Math.round(Math.random() * (canvas.width / 2 - bollWidth));
let counter = 0;
let level = 5;
let toRight = true;
let toBot = Math.round(Math.random());
let rectWidth = 30
let rectHight = 200
let rectTop = canvas.height / 2 - rectHight / 2;
let rectLeft = canvas.width - 130
let playGame = false;
let mainMenu = true;
let pause = false;
let resalt = false;
const menu = ["New Game" , "About Game" , "Records" , "Options" ]
let menuPunct = 0;

function drowRct() {
	context.fillStyle = 'yellow';
	context.rect(rectLeft, rectTop, rectWidth, rectHight);
	context.fill();
}
function levelUp() {
	counter++
	if (counter % 50 == 0) {
		level++
	}
}
function frame() {
	context.drawImage(field,0, 0, canvas.width, canvas.height);
	
	requestAnimationFrame(frame);
	if (!playGame && mainMenu){
		context.drawImage(keeper, 50, 180, 400, 320);
		context.drawImage(boll, canvas.width - 200, 100, 100, 100);
		let height = 200
		for (let j = 0; j < menu.length; j++) {
			let menuVariant = menu[j];
			if(j == menuPunct) {
				context.fillStyle = 'yellow'
				context.font = '60px Rakkas, serif'
				context.fillText(menuVariant, canvas.width / 2, height);
				height += 70;
			} else {
				context.fillStyle = 'blue'
				context.font = '40px Rakkas, serif'
				context.textAlign  = 'center';
				context.fillText(menuVariant, canvas.width / 2, height);
				height += 50;
			}
		}
	} else if (pause) {
		context.drawImage(boll, leftPoint, topPoint, bollWidth, bollHight);
		context.font = '32px Rakkas, serif'
		context.fillStyle = 'red'
		context.fillText(counter, canvas.width - 60, 40);
		context.fillText('Level: ' + (level - 4), 60, 40)
		drowRct()
		context.fillStyle = 'blue'
		context.font = '100px serif'
		context.textAlign = 'center'
		context.fillStyle = 'yellow';
		context.rect(0, 0, canvas.width, canvas.height);
		context.fill();
		context.fillStyle = 'blue'; 
		context.fillText('Pause', canvas.width / 2, canvas.height / 2);
	} else if (playGame && !mainMenu) {
		let rectRight = rectLeft + rectWidth
		let rectBot = rectTop + rectHight
		let bollLeft = leftPoint
		let bollRight = leftPoint + bollWidth
		let bollTop = topPoint
		let bollBot = topPoint + bollHight
		context.drawImage(boll, leftPoint, topPoint, bollWidth, bollHight);
		context.font = '32px Rakkas, serif'
		context.fillStyle = 'red'
		context.fillText(counter, canvas.width - 60, 40);
		context.fillText('Level: ' + (level - 4), 60, 40)
		drowRct()
		if (leftPoint >= canvas.width - bollWidth && 450 > bollBot && bollTop > 150) {
			context.fillStyle = 'blue'
			context.font = '80px serif'
			context.textAlign = 'center'
			context.fillText('You Lose', canvas.width / 2, canvas.height /2 - 100);
			context.font = '50px serif'
			context.fillText('Ваш счет: ' + counter, canvas.width / 2, canvas.height / 2 + 60);
			context.fillText('Нажмите "Пробел", чтобы начать сначала', canvas.width / 2, canvas.height / 2 + 120);
			context.fillText('"Esc" для выхода в главное меню', canvas.width / 2, canvas.height / 2 + 180);
			mainMenu = false;
			resalt = true;
		} else {
			if (toRight) {
				leftPoint += level
				if (leftPoint >= canvas.width - bollWidth) {
					toRight = false
					levelUp()
				}
				if (bollLeft < rectRight && bollRight > rectLeft ) {
					if (bollTop > rectBot || bollBot < rectTop) {
						toRight = true
					} else {
						toRight = false
						leftPoint -= level * 2;
						levelUp()
					}
					
				}
			} else {
				leftPoint -= level
				if (leftPoint <= 0 ) {
					toRight = true
					levelUp()
				}
				if (bollLeft < rectRight && bollRight > rectRight ) {
					if (bollTop > rectBot || bollBot < rectTop) {
						toRight = false
					} else {
						leftPoint += level * 2;
						toRight = true
						levelUp()
					}
				}
			}
			if (toBot) {
				topPoint += level
				if (topPoint >= canvas.height - bollHight) {
					toBot = false
					levelUp()
				}
				if (bollBot > rectTop && bollTop < rectTop) {
					if ( bollRight < rectLeft || bollLeft > rectRight) {
						toBot = true
					} else {
						topPoint -= level * 2
						toBot = false
						if (!toRight) {
							toRight = true
						} 
						levelUp()
					}
				}
			} else {
				topPoint -= level
				if (topPoint <= 0) {
					toBot = true
					levelUp()
				}
				if (bollTop < rectBot && bollBot > rectBot ) {
					if ( bollRight < rectLeft || bollLeft > rectRight) {
						toBot = false
					} else {
						topPoint += level * 2
						toBot = true
						if (!toRight) {
							toRight = true
						} 
						levelUp()
					}
				}
			}	
		}
	}
}
frame();
document.addEventListener('keydown', (event) => {
	const key = event.key;
	console.log(key);
	console.log(key);
	switch (key) {
		case 'ArrowUp': 
		if (mainMenu) {
			if (menuPunct != 0) {
				menuPunct--
			}
		} else if (!resalt && !mainMenu && playGame ) {
			if (rectTop != 0) {
				rectTop -= 10;
				canvas.width = canvas.width;
				drowRct();
			}
		}
		break;
		case 'ArrowDown':
			if (mainMenu) { 
				if (menuPunct != menu.length - 1) {
					menuPunct++
				}
			} else if (!resalt && !mainMenu && playGame && rectTop != canvas.height - rectHight) {
				rectTop += 10;
				canvas.width = canvas.width;
				drowRct();
			}
			break;
		
		case 'Enter', ' ':
			if (mainMenu && !playGame) {
				if(menu[menuPunct] == 'New Game') {
					mainMenu = false;
					playGame = true;
				}
			} else if (!mainMenu && playGame) {
				topPoint = Math.round(Math.random() * (canvas.height - bollHight));
				leftPoint = Math.round(Math.random() * (canvas.width / 2 - bollWidth));
				toBot = Math.round(Math.random());
				counter = 0;
				level = 5;
				rectTop = canvas.height / 2 - rectHight / 2;
				canvas.width = canvas.width;
				drowRct();
				resalt = false;
			}
			break;
		case 'Escape':
			if (!mainMenu && playGame && !pause && !resalt) {   
				pause = true;
			} else if(pause &&  playGame && !mainMenu && !resalt) {
				canvas.width = canvas.width;
				pause = false
			} else if (!mainMenu && playGame && !pause && resalt){
				mainMenu = true;
				playGame = false;
				resalt = false;
				topPoint = Math.round(Math.random() * (canvas.height - bollHight));
				leftPoint = Math.round(Math.random() * (canvas.width / 2 - bollWidth));
				toBot = Math.round(Math.random());
				counter = 0;
				level = 5;
				rectTop = canvas.height / 2 - rectHight / 2;
				canvas.width = canvas.width;
				drowRct();
				resalt = false;
			}
			break;
	}
});

// if (playGame && !mainMenu) {
// 	console.log(1);
// 	document.addEventListener('keydown', (event) => {
// 		const key = event.key;
// 		switch (key) {
// 			case 'ArrowUp': 
// 				if (!playGame && rectTop != 0) {
// 					rectTop -= 10;
// 					canvas.width = canvas.width;
// 					drowRct();
// 				}
// 				break;
// 			case 'ArrowDown':
// 				if (!playGame && rectTop != canvas.height- rectHight) {
// 					rectTop += 10;
// 					canvas.width = canvas.width;
// 					drowRct();
// 				}
// 				break;
// 			case ' ':
// 				if (playGame) {
// 					topPoint = Math.round(Math.random() * (canvas.height - bollHight));
// 					leftPoint = Math.round(Math.random() * (canvas.width / 2 - bollWidth));
// 					toBot = Math.round(Math.random());
// 					counter = 0;
// 					level = 5;
// 					rectTop = canvas.height / 2 - rectHight / 2;
// 					canvas.width = canvas.width;
// 					drowRct();
// 					playGame = false;
// 				}
// 				break;
// 		}
// 	});
// }