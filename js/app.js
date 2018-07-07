/*
CONSTRUCTOR FUNCTIONS
*/

var Enemy = function(x, y) {
    // Location variables applied to each instance
    this.x = x;
    this.y = y;
    // Speed variable applied to each instance, looked at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // Speed calculation was random, by eye, until acceptable speeds obtained
    this.speed = Math.floor(Math.random() * 200 + 100);
    this.sprite = 'images/enemy-bug.png';
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';    
}



/*
ADD PROTOTYPE METHODS
*/

Player.prototype.update = function() {
    //Not used but added because engine.js requires it
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            //Check for canvas boundaries.
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "down":
            if (this.y < 400) {
                this.y += 82;
            }
            break;
        case "up":
            //If water tile then reset player position
            if (this.y < 82) {
                this.x = 202;
                this.y = 400;
            } else {
                this.y -= 82;
            }
            break;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // Used a circle collision, see https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection and https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
   var playerCircle = {radius: 35, x: player.x, y: player.y};
   var enemyCircle = {radius: 35, x: this.x, y: this.y};
   
   var dx = playerCircle.x - enemyCircle.x;
   var dy = playerCircle.y - enemyCircle.y;
   var distance = Math.sqrt(dx * dx + dy * dy);
   
   if (distance < playerCircle.radius + enemyCircle.radius) {
    player.x = 202;
    player.y = 400;
   }

   if (this.x > 505) {
       this.x = -100;
       this.speed = Math.floor(Math.random() * 200 +100);
   }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
INSTANTIATE OBJECTS
*/

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

for (var i = 0; i < 3; i++) {
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (82 * i)));
};


// Place the player object in a variable called player
let player = new Player(202,400);


/*
EVENT LISTENER
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});