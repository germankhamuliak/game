'use strict';
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const variants = ['top', 'handing', 'middle', 'alphabetic', 'ideographic', 'bottom']
context.font = '30px Pacifico, cursive'
context.fillStyle = 'blue'
const baseLine = 200
let left = 0
context.moveTo(0, baseLine);
context.lineTo(canvas.width, baseLine);
let gradient = context.createLinearGradient(0, 0, 500, 500);
gradient.addColorStop(0, "rgb(255, 0, 128)");
gradient.addColorStop(1, "rgb(255, 153, 51)");
context.fillStyle = gradient;
for (let i = 0; i < variants.length; i++) {
    let variant = variants[i];
    context.textBaseline = variant;
    context.fillText(variant, left, baseLine);
    left +=  context.measureText(variant).width + 50;
}

const variantsAligens = ["left" , "right" , "center" , "start" , "end"]
context.fillStyle = 'blue'
const textAligen = canvas.height / 3 + canvas.height / 3
let height = 300
context.font = '32px Rakkas, serif'
context.moveTo(400, 0);
context.lineTo(400, canvas.height);
context.strokeStyle = 'red';
context.stroke();
for (let j = 0; j < variantsAligens.length; j++) {
    let variantsAligen = variantsAligens[j];
    context.textAlign  = variantsAligen;
    context.fillText(variantsAligen, 400, height);
    height += 32;
}


