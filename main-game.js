// command will ensure only will execute js after html has loaded
// 'DOMContentLoaded'
document.addEventListener('click', () => {

// selecting the classes
const sagehen = document.querySelector('.character')
let game = document.querySelector('.game')
let campus = document.getElementById('campus')
// selecting the id elements
let alert = document.getElementById('alert')

// const block = document.getElementById('.block')
let isFly = false 
// use as a multiplier to adjust height of position
let gravity = 0.8
// runs game
let gameOver = false

// // param e = event, keyCode 32 is spacebar
function control(e) {
    if (e.keyCode === 32) {
        if (!isFly) {
            jump()
        }
    }
}
game.removeChild(start)
// event is keyup (fired when key is pressed)
// control is the event triggered when keyup occurs
document.addEventListener('keyup', control)

let position = 0
// timer event
    function jump() {
        let count = 0
    // timer function to make sagehen position move up 100 px every 20ms
        let upTimerId = setInterval(function () {

            // landing down, change count higher to jump higher
            // using count instead of position allows to time jump 
            // as a sequence of 1- onwards so that multiplier gravity can reference
            if (count === 17) {

                //stops the up interval
                clearInterval(upTimerId)
                // set up the down interval
                console.log('down')
                // timer function to make sagehen position move down 100px every 20ms
                // function () lines 50-60 is first param of setInterval
                let downTimerId = setInterval(function (){
                    if (count === 0) {
                        // reset timer for down interval
                        clearInterval(downTimerId)
                        // resets fly to allow sagehen to jump again
                        isFly = False
                    }

                    else {
                        position -= 5
                        count --
                        position = position * gravity
                        sagehen.style.bottom = position + 'px'
                    }

                }, 20)

            }
            // jumping up
            console.log('up')
            position += 125 
            // incriment count to progress in jump
            count ++ 
            // gravity shortens the altitude gained per count 
            // jump looks more realistic since height is not increasing linearly
            position = position * gravity
            sagehen.style.bottom = position + 'px'
        }, 20)
    } 

function generateBlocks () {
    let randomTime = Math.random() * 4000
    let blockPosition = 1920 
    // add a "block" class to a <div> elem on HTML file
    const block = document.createElement('div')
    // conditional will prevent re-adding block class after sagehen hits obstacle
    if (!gameOver) block.classList.add('block')
    game.appendChild(block)
    block.style.left = blockPosition + 'px'
    
    // using timing function to slide obstacle blocks
    let blockTimerId = setInterval(function() {
        if (blockPosition > 60 && blockPosition < 200 && position < 60) {
            clearInterval(blockTimerId)
            gameOver = true
            game_ended()

            // remove all children when game ebnds
            while (game.firstChild) {
                game.removeChild(game.lastChild)

            }
            
        }
        blockPosition -= 45
        block.style.left = blockPosition + 'px'   
    }, 20)

    // will randomly deploy blocks for sagehen to jump over
    if (!gameOver) setTimeout(generateBlocks, randomTime)
}

function game_ended () {
    campus.appendChild(alert)
    document.addEventListener('click', location.reload())
}
generateBlocks()


})











