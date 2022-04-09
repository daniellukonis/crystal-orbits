console.log('connected')

const canvas =  document.querySelector('canvas')
const context = canvas.getContext('2d')

function randomInt(min, max){
    return Math.floor(Math.random()*max)+min
}

function randomFloat(min, max){
    let rF = Math.random()*(max-1) + min
    return rF.toFixed(1)
}


function randomDirection(){
    let rI = 1
    if(Math.random()>=0.5){
        return rI
    }
    return -rI
}

function resizeCanvas(){
    let margin = 50
    let x = canvas.width = window.innerWidth - margin
    let y = canvas.height = window.innerHeight - margin
    return [x,y]
}
// resizeCanvas()

function clearCanvas(size){
    context.fillStyle = 'white'
    context.fillRect(0,0,size[0],size[1])
}

let canvasSize = resizeCanvas()
const squares = []
const maxSquares = canvas.width / 10

// let gradient = context.createLinearGradient(0,0, canvasSize[0], 0)
// gradient.addColorStop(0, 'white')
// gradient.addColorStop(0.1, 'black')
// gradient.addColorStop(0.9, 'black')
// gradient.addColorStop(1, 'white')

class Square{
    constructor(){
        // resizeCanvas()
        this.cW = canvas.width
        this.cH = canvas.height
        this.x = 0
        this.w = 10
        this.h = 100
        this.c = 'black'
        this.v = randomDirection() * randomFloat(0.25, 2)
        this.rI = randomInt(0, this.cH - this.h)
        this.y = this.rI
    }

    drawSquare(){
        context.fillStyle = this.c
        context.fillRect(this.x, this.y, this.w, this.h)
    }
    
    moveSquare(){
        if(this.x > this.cW){
            this.x = 0 - this.w
            return
        }
        
        if(this.x < 0 - this.w){
            this.x = this.cW
        }

        this.x += this.v
        this.drawSquare()
    }

}


for(let i = 0; i < maxSquares; i++){
    squares.push(new Square ())
}

function moveObjects(){
    clearCanvas(canvasSize)
    for(let i=0; i<squares.length; i++){
        squares[i].moveSquare()
    }
    window.requestAnimationFrame(moveObjects)
}

moveObjects()

window.addEventListener('resize', ()=>{
    location.reload()
})