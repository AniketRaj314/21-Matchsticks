let width, height, matchstickImg, offset, imageWidth, imageHeight;
let matchsticks, playerTurn, playerText, computerText, move, cMove;
function preload() {
    matchstickImg = loadImage('assets/matchstick.png');
}

function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    offset = 100;
    move = 0;
    imageWidth = 9;
    imageHeight = 100;
    matchsticks = [];
    playerTurn = 1;
    cMove = 0;
    createCanvas(width, height);
    playerText = new Text(width / 2 - 140, height - 100);
    computerText = new Text(width / 2 - 140, 100);
    generateMatchsticks();
}

function draw() {
    background(230, 167, 31);
    drawMatchsticks();
    if(totalRemaining() == 1) {
        if(playerTurn) {
            fill(255, 0, 0);
            computerText.show(`Computer won the game`);
        } else {
            fill(0, 150, 0);
            playerText.show(`You won the game`);
        }
    } else {
        fill(0, 150, 0);
        playerText.show(`Player Last Move: ${move}`);
        fill(255, 0, 0);
        computerText.show(`Computer Last Move: ${cMove}`);
    }
}

function generateMatchsticks() {
    let gap = (width - 2 * offset) / 6;
    let y = height / 2 - imageHeight - 10;
    let ctr = 0;
    for(let i = 0; i < 3; i++) {
        let x = offset;
        for(let j = 0; j < 7; j++) {
            matchsticks[ctr++] = new Matchstick(x, y);
            x += gap;
        }
        y += imageHeight + 10;
    }
}

function computerMove() {
    cMove = 5 - move;
    removeMatchsticks(cMove);
    playerTurn = !playerTurn;
}

function drawMatchsticks() {
    for(let i = 0; i < 21; i++) {
        matchsticks[i].show();
    }
}

function removeMatchsticks(n) {
    let ctr = 0;
    if(!playerTurn) {
        for(let i = 0; i < 21; i++) {
            if(!matchsticks[i].taken) {
                matchsticks[i].taken = true;
                ctr++;
            }
            if(ctr == n) {
                return;
            }
        }
    } else {
        for(let i = 20; i > -1; i--) {
            if(!matchsticks[i].taken) {
                matchsticks[i].taken = true;
                ctr++;
            }
            if(ctr == n) {
                return;
            }
        }
    }
}

function totalRemaining() {
    let ctr = 0;
    for(let i = 0; i < 21; i++) {
        if(!matchsticks[i].taken) {
            ctr++;
        }
    }
    return ctr;
}

function keyPressed() {
    if(playerTurn) {
        if(keyCode == 49) {
            move = 1;
        }
        if(keyCode == 50) {
            move = 2;
        }
        if(keyCode == 51) {
            move = 3;
        }
        if(keyCode == 52) {
            move = 4;
        }
        removeMatchsticks(move);
        playerTurn = !playerTurn;
        setTimeout(computerMove, 1500);
    }
}

class Matchstick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.taken = false;
    }

    show() {
        imageMode(CENTER);
        if(!this.taken) {
            image(matchstickImg, this.x, this.y, imageWidth, imageHeight);
        }
    }
}

class Text {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show(string) {
        textSize(32);
        text(string, this.x, this.y);
    }
}