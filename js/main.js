
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

let number1 = 0;
let scale1 = Math.random()*7+10; //10

let number2 = 5;
let scale2 = Math.random()*5+10; //10

let number3 = 7
let scale3 = Math.random()*3+3; //6

//---------------------IMAGE ANIMATION----------------------------

const image = document.getElementById('bg_image')

function animateImage(){

}

//---------------------CANVAS ANIMATION----------------------------

animateCanvas1();

//---------------------CANVAS 1----------------------------

function drawCanvas1(){
    // setting the variables
    let angle = number1;
    let radius = scale1 * Math.sqrt(number1) + number1*0.25;
    let position_x = radius * Math.sin(angle) + canvas1.width/2;
    let position_y = radius * Math.cos(angle) + canvas1.height/2;
    let size = 10 + number1*0.05;

    ctx1.fillStyle = "#AEE5D8"
    ctx1.strokeStyle = "#FFC09F"
    ctx1.lineWidth = 5;

    ctx1.beginPath();
    ctx1.arc(position_x, position_y, size, 0, 360);
    ctx1.closePath();
    ctx1.fill();
    ctx1.stroke();
    ctx1.shadowColor = 'pink';
    ctx1.shadowBlur = 15
    if(number1===25) animateCanvas2();
    // if(number1===1300){
    //     console.log("shadow")
    //     let elem = document.getElementsByClassName("container");
    //     console.log(elem)
    //     for(let i = 0; i<elem.length; i++){
    //         elem[i].style.textShadow = '1px 1px 15px gray'
    //     }
    // }
    number1++;
}

function animateCanvas1(){
    //ctx1.clearRect(0,0,canvas1.width,canvas1.height)
    drawCanvas1();
    requestAnimationFrame(animateCanvas1);
}

//---------------------CANVAS 2----------------------------

function drawCanvas2(){
    // setting the variables
    let angle = number2;
    let radius = scale2 * Math.sqrt(number2);
    let position_x = radius * Math.sin(angle) + canvas1.width/2;
    let position_y = radius * Math.cos(angle) + canvas1.height/2;
    let size = 20 ;

    ctx2.fillStyle = "#9C89B8"
    ctx2.strokeStyle = "#F0A6CA"
    ctx2.lineWidth = 2;

    ctx2.beginPath();
    ctx2.arc(position_x, position_y, size, 0, 360);
    ctx2.closePath();
    ctx2.fill();
    ctx2.stroke();
    ctx2.shadowColor = 'pink';
    ctx2.shadowBlur = 20;
    number2++;
    if(number2==50) animateCanvas3();
}

function animateCanvas2(){
    //ctx2.clearRect(0,0,canvas1.width,canvas1.height)
    drawCanvas2();
    requestAnimationFrame(animateCanvas2);
}

//---------------------CANVAS 3----------------------------

function drawCanvas3(){
    // setting the variables
    let angle = -number3;
    let radius = scale3 * Math.sqrt(number3);
    let position_x = radius * Math.cos(angle) + canvas1.width/2;
    let position_y = radius * Math.sin(angle) + canvas1.height/2;
    let size = 6;

    ctx2.fillStyle = "#F0A202"
    ctx2.strokeStyle = "#F18805"
    ctx2.lineWidth = 2;

    ctx2.beginPath();
    ctx2.arc(position_x, position_y, size, 0, 360);
    ctx2.closePath();
    ctx2.fill();
    ctx2.stroke();
    ctx2.shadowColor = 'pink';
    ctx2.shadowBlur = 15
    number3++;
}

function animateCanvas3(){
    //ctx2.clearRect(0,0,canvas1.width,canvas1.height)
    drawCanvas3();
    requestAnimationFrame(animateCanvas3);
}

console.log("test if ends");