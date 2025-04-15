

const board = document.getElementById('board');
let velocity = { x: 0, y: 0 };

let speed = 15;
let lastPaintTime = 0;

let snakeArr = [{ x: 7, y: 15 }];
let food = { x: 1, y: 10 };

// Functions

const main = (updateTime) => {
    window.requestAnimationFrame(main);

    if ((updateTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = updateTime;
    gameEngine();
}

const isCollide = (snake) => {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

const gameEngine = () => {

    if (isCollide(snakeArr)) {
        velocity = {x: 0, y: 0};
        console.log('Game Over!');
        snakeArr = [ {x: 7, y: 15}];
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y});     
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;

    board.innerHTML = '';

    snakeArr.forEach((element, index) => {
        snakeElem = document.createElement('div');
        snakeElem.classList.add('snake');
        snakeElem.style.gridRowStart = element.y;
        snakeElem.style.gridColumnStart = element.x;
        board.appendChild(snakeElem);
    });

    foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
}

//  Logic

window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
    velocity = { x: 0, y: 1 };

    switch (e.key) {
        case 'ArrowUp':
            velocity.x = 0;
            velocity.y = -1;
            break;
        case 'ArrowDown':
            velocity.x = 0;
            velocity.y = 1;
            break;
        case 'ArrowLeft':
            velocity.x = -1;
            velocity.y = 0;
            break;
        case 'ArrowRight':
            velocity.x = 1;
            velocity.y = 0;
            break;

    }
})