// Enemies our player must avoid
let Enemy = function(x, y, enemySpeed) {
    this.x = x;
    this.y = y;
    this.speed = enemySpeed;
    this.sprite = 'images/enemy-bug.png';
};

function gameStart() {

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 525) {
        this.x = -60;
        this.speed = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        };

    let Proximity1 = this.x + 80;
    let Proximity2 = this.x - 80;
    let Proximity3 = this.y + 55;
    let Proximity4 = this.y - 55;

    if (player.x < Proximity1 &&
        player.x > Proximity2 &&
        player.y < Proximity3 &&
        player.y > Proximity4) {
        console.log('COLLISION: You have lost!');
        resetPositions();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

}
// player class
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';

};

// Update the player's position
Player.prototype.update = function () {
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Key Class for player to grab for a win
let Key = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
}

// Draw the key on the screen
Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Star Class for player to grab for a win
let Star = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
};

// Draw the star on the screen
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Heart Class for player to grab for a win
let Heart = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

// Draw the heart on the screen
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update function for the Key object
Key.prototype.update = function () {

    let Proximity1 = this.x + 80;
    let Proximity2 = this.x - 80;
    let Proximity3 = this.y + 55;
    let Proximity4 = this.y - 55;

    if (player.x < Proximity1 &&
        player.x > Proximity2 &&
        player.y < Proximity3 &&
        player.y > Proximity4) {
        console.log('Key: You have touched the key!');
        //key must go off screen once touched
        this.x = -200;
        this.y = -200;
        //add item to total collection
        prizes.push(this);
        winner();
    };
};

// Update function for the Star object
Star.prototype.update = function () {

    let Proximity1 = this.x + 80;
    let Proximity2 = this.x - 80;
    let Proximity3 = this.y + 55;
    let Proximity4 = this.y - 55;

    if (player.x < Proximity1 &&
        player.x > Proximity2 &&
        player.y < Proximity3 &&
        player.y > Proximity4) {
        console.log('Star: You have touched the star!');
        //star must go off screen once touched
        this.x = -200;
        this.y = -200;
        //add item to total collection
        prizes.push(this);
        winner();
    };
};

// Update function for the Heart object
Heart.prototype.update = function () {

    let Proximity1 = this.x + 80;
    let Proximity2 = this.x - 80;
    let Proximity3 = this.y + 55;
    let Proximity4 = this.y - 55;

    if (player.x < Proximity1 &&
        player.x > Proximity2 &&
        player.y < Proximity3 &&
        player.y > Proximity4) {
        console.log('Heart: You have touched the heart!');
        //heart must go off screen once touched
        this.x = -200;
        this.y = -200;
        //add item to total collection
        prizes.push(this);
        winner();
    };
};

//function to be called when player gets all prizes
function winner() {
    if (prizes.length === 3) {
        console.log("You have won!");
        document.querySelector('.modal-body').innerHTML =
            `<p>Congrats, you have succeeded in finishing the game.</p>
            <p>Thank you for playing along</p>`;
        displayModal();
        hideModal();
    };
}

//function to be called when player has collided with an enemy and lost
function resetPositions() {
    prizes = [];
    key.x = 101;
    key.y = -20;
    star.x = 202;
    star.y = -20;
    heart.x = 402;
    heart.y = -20;
    player.x = 202;
    player.y = 405;
}


// modal content sourced from https://www.w3schools.com/howto/howto_css_modals.asp
const modal = document.getElementById("myModal");

function displayModal() {
    modal.style.display = "block";
};

// button to play again on pop-up modal
let playAgainButton = document.querySelector('.modal-footer');
playAgainButton.addEventListener('click', function () { location.reload() });


// function that lets user close modal when by clicking on <span> (x)
function hideModal() {
    let xbutton = document.querySelector('.close');
    xbutton.addEventListener('click', function () { location.reload() });
};

//initial values when game starts
let allEnemies = [];
let prizes = []; //array for counting prize objects and player wins when prizes.length = 3
let player = new Player(202, 405);
let key = new Key(101, -20);
let star = new Star(202, -20);
let heart = new Heart(402, -20);
let enemyTerritory = [63, 147, 230];
enemyTerritory.forEach(function (Y_axis) {
    //using random values for X_axis location because the 
    // enemies should start at different places
    let enemy = new Enemy(Math.floor(Math.random() * (-100 + 5)) - 100, Y_axis, 200);
    allEnemies.push(enemy);
});

gameStart();

// Function for player object to determine exactly which direction
// to move based on location and which arrow key was pressed
Player.prototype.handleInput = function (pressedArrowKey) {
    if (pressedArrowKey === 'left' && this.x > 0) {
        this.x -= 101
        //move player fixed length to the left;
    };
    if (pressedArrowKey === 'right' && this.x < 305) {
        this.x += 101
        //move player fixed length to the right;
    };
    if (pressedArrowKey === 'up' && this.y > 0) {
        this.y -= 83
        //move player fixed length higher;
    };
    if (pressedArrowKey === 'down' && this.y < 405) {
        this.y += 83
        //move player fixed length lower;
    };
    
    //send player back to initial position upon reaching water
    if (this.y < 0 && prizes.length < 3) {
        let timer = setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 100);
    } 
};


// This listens for key presses and sends the keys to the
// Player.handleInput()
a = document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

