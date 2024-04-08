const myCanvas = document.querySelector('canvas.animate');
myCanvas.width = 1000;
myCanvas.height = 600;
const myContext = myCanvas.getContext('2d');
const img = new Image();
img.src = 'boll.png';
const field = new Image();
field.src = 'field.png';
let newGame = false;
alert('Перед тобой простая задача, защити свои ворота, для того чтобы перемещать вратаря используй стрелочки вверх и вниз и помни, каждые 50 очков скорость будет увеличеваться, Удачи!!')
let bollWidth = 50;
let bollHight = 50;
let topPoint = Math.round(Math.random() * (myCanvas.height - bollHight));
let leftPoint = Math.round(Math.random() * (myCanvas.width / 2 - bollWidth));
let counter = 0;
let level = 5;
let toRight = true;
let toBot = Math.round(Math.random());
let rectWidth = 30
let rectHight = 200
let rectTop = myCanvas.height / 2 - rectHight / 2;
let rectLeft = myCanvas.width - 130
function drowRct() {
	myContext.fillStyle = 'yellow';
	myContext.rect(rectLeft, rectTop, rectWidth, rectHight);
	myContext.fill();
}
function levelUp() {
	counter++
	if (counter % 50 == 0) {
		level++
	}
}
function frame() {
	let rectRight = rectLeft + rectWidth
	let rectBot = rectTop + rectHight
	let bollLeft = leftPoint
	let bollRight = leftPoint + bollWidth
	let bollTop = topPoint
	let bollBot = topPoint + bollHight
	myContext.drawImage(field,0, 0, myCanvas.width, myCanvas.height);
	myContext.drawImage(img, leftPoint, topPoint, bollWidth, bollHight);
	myContext.font = '32px Rakkas, serif'
	myContext.fillStyle = 'red'
	myContext.fillText(counter, myCanvas.width - 60, 40);
	myContext.fillText('Level: ' + (level - 4), 60, 40)
	drowRct()
	requestAnimationFrame(frame);
	if (leftPoint >= myCanvas.width - bollWidth && 450 > bollBot && bollTop > 150) {
		newGame = true;
		myContext.font = '80px serif'
		myContext.fillStyle = 'red'
		myContext.textAlign = 'center'
		myContext.fillText('You Lose', myCanvas.width / 2, myCanvas.height /2 - 100);
		myContext.font = '40px serif'
		myContext.fillText('Ваш счет: ' + counter, myCanvas.width / 2, myCanvas.height / 2 + 50);
		myContext.font = '50px serif'
		myContext.fillText('Нажмите "пробел", чтобы попробовать ещё раз', myCanvas.width / 2, myCanvas.height / 2 + 150);
	} else {
		if (toRight) {
			leftPoint += level
			if (leftPoint >= myCanvas.width - bollWidth) {
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
			if (topPoint >= myCanvas.height - bollHight) {
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
frame();
document.addEventListener('keydown', (event) => {
	const key = event.key;
	switch (key) {
		case 'ArrowUp': 
			if (!newGame && rectTop != 0) {
				rectTop -= 10;
				myCanvas.width = myCanvas.width;
				drowRct();
			}
			break;
		case 'ArrowDown':
			if (!newGame && rectTop != myCanvas.height- rectHight) {
				rectTop += 10;
				myCanvas.width = myCanvas.width;
				drowRct();
			}
			break;
		case ' ':
			if (newGame) {
				topPoint = Math.round(Math.random() * (myCanvas.height - bollHight));
				leftPoint = Math.round(Math.random() * (myCanvas.width / 2 - bollWidth));
				toBot = Math.round(Math.random());
				counter = 0;
				level = 5;
				rectTop = myCanvas.height / 2 - rectHight / 2;
				myCanvas.width = myCanvas.width;
				drowRct();
				newGame = false;
			}
			break;
	}
});