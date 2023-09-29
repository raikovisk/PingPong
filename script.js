const canvasEl = document.querySelector("canvas"),
  canvasCtx = canvasEl.getContext("2d");
const lineWidth = 15;
const gapX = 10;
var X , Y = 0;
var limiteY = true;

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function(){
  // desenha o campo
  canvasCtx.fillStyle = "#286047"
  canvasCtx.fillRect(0, 0, this.w, this.h)
  },
}

const line = {
  w: 15,
  h: field.h,
  draw: function(){
    canvasCtx.fillStyle = "#ffffff"
  //desenha linha central
    canvasCtx.fillRect(
      field.w / 2 - this.w / 2, 0, this.w, this.h
    )
  },
}

const score = {
  player:0,
  computer:0,

  increaseHuman: function(){
    this.player++;
  },
  increaseComputer: function(){
    this.computer++;
  },
  
  draw: function(){
  // desenha o placar
  canvasCtx.font = "bold 72px Arial";
  canvasCtx.textAlign = "center";
  canvasCtx.textBaseline = "top";
  canvasCtx.fillStyle = "#01341D";
  canvasCtx.fillText(this.player, field.w / 4, 30);
  canvasCtx.fillText(this.computer, field.w / 4 + field.w / 2, 30);
  }
}

const leftPaddle = {
  x: gapX,
  y: 100,
  w: line.w,
  h: 200,

  _move: function(){  
    this.y = Y;
  },
  draw: function(){
  // desenha a raquete esquerda
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillRect(this.x, this.y, this.w, this.h);

  this._move();
  },
}
const rightPaddle = {
  x: field.w - line.w - gapX,
  y: 100,
  w: line.w,
  h: 200,
  speed : 3,

  _pointUp: function(){
    this.speed += 3;
  },
  
  _move: function(){
    //Verifica limite da raquete no eixo y
    if(this.y + this.h /2 < ball.y + ball.r){
        this.y += this.speed
      }else{
      this.y -= this.speed;
    }
  },
  
  draw: function(){
  // desenha a raquete direita
  canvasCtx.fillStyle = "#ffffff"
  canvasCtx.fillRect(this.x, this.y, this.w, this.h)
    
  this._move();
  
  },
}
//Randomiza entre -1 e 1
function returnOneOrMinusOne() {
    // Gera um número aleatório entre 0 e 1
    const randomNumber = Math.random();
    
    // Se o número gerado for maior ou igual a 0.5, retorna 1
    if (randomNumber >= 0.5) {
        return 1;
    }
    
    // Caso contrário, retorna -1
    return -1;
}

const ball = {
        x: 120,
        y: 120,
        r: 15,
        speed: 10,
        directionX: 1,
        directionY: 1,
        _calcPosition: function () {
          
          // verifica se o jogador 1 fez um ponto (x > largura do campo)
          if (this.x > field.w - this.r - rightPaddle.w - gapX) {
            // verifica se a raquete direita está na posição y da bola
            if (
              this.y + this.r > rightPaddle.y &&
              this.y - this.r < rightPaddle.y + rightPaddle.h
            ) {
              // rebate a bola intervertendo o sinal de X
              this._reverseX()
            } else {
              // pontuar o jogador 1
              score.increaseHuman()
              this._pointUp()
            }
          }
          //Verifica se jogador 2 fez ponto
          if (this.x < this.r + leftPaddle.w + gapX){
            //verifica se a raquete esquerda esta na mesma posição y da bola
            if (
               this.y + this.r > leftPaddle.y &&
               this.y - this.r < leftPaddle.y + leftPaddle.h
              ){
              //rebate a bola
              this._reverseX();
            }else{
              //Pontua Computer
              score.increaseComputer();
              this._pointUp();
            }
            
          }
          // verifica as laterais superior e inferior do campo
          if (
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)
          ) {
            // rebate a bola invertendo o sinal do eixo Y
            this._reverseY()
          }
        },
        _reverseX: function () {
          // 1 * -1 = -1
          // -1 * -1 = 1
          this.directionX *= -1
        },
        _reverseY: function () {
          // 1 * -1 = -1
          // -1 * -1 = 1
          this.directionY *= -1
        },
        //Reseta a posição da bola
        _pointUp: function () {
          this.x = field.w / 2
          this.y = field.h / 2
          this.directionX = returnOneOrMinusOne();
          this.directionY = returnOneOrMinusOne();

          rightPaddle._pointUp();
        },
        _move: function () {
          this.x += this.directionX * this.speed
          this.y += this.directionY * this.speed
        },
        draw: function () {
          canvasCtx.fillStyle = "#ffffff"
          canvasCtx.beginPath()
          canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
          canvasCtx.fill()

          this._calcPosition()
          this._move()
        },
      }

      function setup() {
        canvasEl.width = canvasCtx.width = field.w
        canvasEl.height = canvasCtx.height = field.h
      }

      function draw() {
        field.draw()
        line.draw()

        leftPaddle.draw()
        rightPaddle.draw()

        score.draw()

        ball.draw()
      }

//Inicializando ao carregar pagina
window.onload = function start() {
  canvasEl.addEventListener('mousemove', (event) => {
  X = event.clientX;
  Y = event.clientY;
  // console.log(`A posição atual do cursor do mouse é: (${X}, ${Y})`);
  });
  
  window.animateFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000 / 60)
          }
      )
  })()

function setup() {
  canvasEl.width = canvasCtx.width = field.w;
  canvasEl.height = canvasCtx.height = field.h;
}

function draw() {
  field.draw();
  line.draw();
  leftPaddle.draw();
  rightPaddle.draw();
  score.draw();
  ball.draw();

}


  function main(){
    animateFrame(main);
    draw();
  }
  setup();
  main();
}