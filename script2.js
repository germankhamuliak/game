const myCanvas = document.querySelector('canvas.animate');
myCanvas.width = 1000;
myCanvas.height = 600;

const myContext = myCanvas.getContext('2d');

let bollWidth = 50;
let bollHight = 50;
let topPoint = Math.round(Math.random() * (myCanvas.height - bollHight));
let leftPoint = Math.round(Math.random() * (myCanvas.width / 2 - bollWidth));
if (topPoint % 5 != 0 ) {
	topPoint = topPoint - (topPoint % 5) 
}
if (leftPoint % 5 != 0 ) {
	leftPoint = leftPoint - (leftPoint % 5) 
}
let counter = 0;
const img = new Image();
img.src = 'boll.png';
const field = new Image();
field.src = 'field.png';
let toRight = true;
let toBot = Math.round(Math.random());
let rectWidth = 30
let rectHight = 200
let rectTop = myCanvas.height / 2 - rectHight / 2;
let rectLeft = myCanvas.width - 110

function drowRct() {
	myContext.fillStyle = 'yellow';
	myContext.rect(rectLeft, rectTop, rectWidth, rectHight);
	myContext.fill();
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
	drowRct()
	requestAnimationFrame(frame);
	if (leftPoint == myCanvas.width - bollWidth && 450 > bollBot && bollTop > 150) {
		myContext.font = '80px serif'
		myContext.fillStyle = 'red'
		myContext.textAlign = 'center'
		myContext.fillText('You Lose', myCanvas.width / 2, myCanvas.height /2);
		myContext.font = '50px serif'
		myContext.fillText('Ваш счет: ' + counter, myCanvas.width / 2, myCanvas.height / 2 + 150);
	} else {
		if (toRight) {
			leftPoint += 5
			if (leftPoint >= myCanvas.width - bollWidth) {
				toRight = false
				counter++
			}
			if (bollLeft < rectRight && bollRight == rectLeft ) {
				if (bollTop > rectBot || bollBot < rectTop) {
					toRight = true
				} else {
					toRight = false
					counter++
				}
			}
		} else {
			leftPoint -= 5
			if (leftPoint <= 0 ) {
				toRight = true
				counter++
			}
			if (bollLeft == rectRight && bollRight > rectRight ) {
				if (bollTop > rectBot || bollBot < rectTop) {
					toRight = false
				} else {
					toRight = true
					counter++
				}
			}
		}
		if (toBot) {
			topPoint += 5
			if (topPoint >= myCanvas.height - bollHight) {
				toBot = false
				counter++
			}
			if (bollBot == rectTop && bollTop < rectTop) {
				if ( bollRight < rectLeft || bollLeft > rectRight) {
					toBot = true
				} else {
					toBot = false
					counter++
				}
			}
		} else {
			topPoint -= 5
			if (topPoint <= 0) {
				toBot = true
				counter++
			}
			if (bollTop == rectBot && bollBot > rectBot ) {
				if ( bollRight < rectLeft || bollLeft > rectRight) {
					toBot = false
				} else {
					toBot = true
					counter++
				}
			}
		}	
		if ( rectTop <= 0) {
			rectTop = 0
		}
		if ( rectTop >= myCanvas.height- rectHight) {
			rectTop = myCanvas.height - rectHight
		}
		
	}
}
frame();
document.addEventListener('keydown', (event) => {
	const key = event.key;
	switch (key) {
		case 'ArrowUp': 
			rectTop -= 10;
			if ( rectTop <= 0) {
				rectTop = 0
			}
			myCanvas.width = myCanvas.width;
			drowRct()
			break;
		case 'ArrowDown':
			rectTop += 10;
			myCanvas.width = myCanvas.width;
			drowRct()
			break;
		
	}
});