// Classes
// Spaceship
class Player{
    constructor({position, velocity}) {
        this.position = position; // {x, y}
        this.velocity = velocity;
        this.rotation = 0.0;
        this.flicker = 0;
        this.lives = 3;
    }

    drawPlayer(){
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.translate(-this.position.x, -this.position.y);
        // context.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
        // context.fillStyle = 'red';
        // context.fill();
        
        // Draw the spaceship
        context.fillStyle = 'black'
        context.beginPath()
        context.moveTo(this.position.x + 30, this.position.y); // Where the line drawing begins
        context.lineTo(this.position.x - 10, this.position.y - 15);
        context.lineTo(this.position.x - 10, this.position.y + 15);
        context.closePath();
        context.fill();

        context.strokeStyle = 'white';
        context.stroke();

        // Draw flame
        if(keys.w.pressed && this.flicker % 10 == 1){
            this.drawFlame();
        }
        
        context.restore();
    }

    drawFlame(){
        context.fillStyle = 'white';
        context.beginPath()
        context.moveTo(this.position.x - 30, this.position.y);
        context.lineTo(this.position.x - 15, this.position.y + 5);
        context.lineTo(this.position.x - 15, this.position.y - 5);
        context.lineTo(this.position.x - 30, this.position.y);
        context.closePath();
        context.fill();

        context.strokeStyle = 'white';
        context.stroke();
    }

    update(){
        this.drawPlayer();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Teleport the player to oposite side
        if(this.position.x >= canvas.width + 10){
            this.position.x = 0 - 10;
        }else if(this.position.x <= -10){
            this.position.x = canvas.width + 10;
        }

        if(this.position.y >= canvas.height + 10){
            this.position.y = 0 - 10;
        }else if(this.position.y <= -10){
            this.position.y = canvas.height + 10;
        }
    }

    getVerticies(){
        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);

        return[
            {
                x: this.position.x + cos * 28 - sin * 0,
                y: this.position.y + sin * 28 + cos * 0
            },
            {
                x: this.position.x + cos * -10 - sin * 10,
                y: this.position.y + sin * -10 + cos * 10
            },
            {
                x: this.position.x + cos * -10 - sin * -10,
                y: this.position.y + sin * -10 + cos * -10,
            }
        ]
    }
}

// Ship Lasers
class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 2;
    }

    drawProjectile(){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = 'white';
        context.fill();
    }

    update(){
        this.drawProjectile()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Astroids{
    constructor({position, velocity, type}){
        this.position = position;
        this.velocity = velocity;
        this.type = type
        this.radius;
        this.points;
    }

    drawAstroid(){
        // context.beginPath();
        // context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        // context.closePath();
        // context.strokeStyle = 'white';
        // context.stroke();
        switch(this.type){
            case 0:
                this.radius = 0;
                break;
            case 1:
                this.points = 150;
                this.radius = 10;
                this.drawSmall();
                break;
            case 2:
                this.points = 100;
                this.radius = 35;
                this.drawMedium();
                break;
            case 3:
                this.points = 50;
                this.radius = 70;
                this.drawLarge();
                break;
        }
    }

    drawLarge(){
        context.beginPath();
        context.moveTo(this.position.x + 70, this.position.y);
        context.lineTo(this.position.x + 70, this.position.y + 30);
        context.lineTo(this.position.x + 60, this.position.y + 50);
        context.lineTo(this.position.x + 30, this.position.y + 70);
        context.lineTo(this.position.x + 10, this.position.y + 60);
        context.lineTo(this.position.x - 20, this.position.y + 70);
        context.lineTo(this.position.x - 40, this.position.y + 60);
        context.lineTo(this.position.x - 70, this.position.y + 10);
        context.lineTo(this.position.x - 70, this.position.y - 10);
        context.lineTo(this.position.x - 50, this.position.y - 50);
        context.lineTo(this.position.x - 10, this.position.y - 69);
        context.lineTo(this.position.x + 10, this.position.y - 70);
        context.lineTo(this.position.x + 70, this.position.y - 30);
        context.closePath();
        context.strokeStyle = 'white';
        context.stroke();
    }

    drawMedium(){
        context.beginPath
        context.moveTo(this.position.x + 35, this.position.y); // Right
        context.lineTo(this.position.x + 34, this.position.y + 26);
        context.lineTo(this.position.x, this.position.y + 35); // Bottom
        context.lineTo(this.position.x - 25, this.position.y + 30);
        context.lineTo(this.position.x - 40, this.position.y);
        context.lineTo(this.position.x - 30, this.position.y); // Left
        context.lineTo(this.position.x - 30, this.position.y - 20);
        context.lineTo(this.position.x - 22, this.position.y - 30);
        context.lineTo(this.position.x, this.position.y - 35); // Top
        context.lineTo(this.position.x + 26, this.position.y - 26);
        context.closePath();
        context.strokeStyle = 'white';
        context.stroke();
    }

    drawSmall(){
        context.beginPath
        context.moveTo(this.position.x + 10, this.position.y); // Right
        context.lineTo(this.position.x + 7.5, this.position.y + 7.5);
        context.lineTo(this.position.x, this.position.y + 10); // Bottom
        context.lineTo(this.position.x - 7.5, this.position.y + 7.5);
        context.lineTo(this.position.x - 10, this.position.y); // Left
        context.lineTo(this.position.x - 7.5, this.position.y - 7.5);
        context.lineTo(this.position.x, this.position.y - 10); // Top
        context.lineTo(this.position.x + 7.5, this.position.y - 7.5);
        context.closePath();
        context.strokeStyle = 'white';
        context.stroke();

    }

    update(){
        this.drawAstroid();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class PointCounter{
    constructor({position}){
        this.position = position;
        this.point = 0;
        this.fontHeight = 20;
        this.fontWidth = 10;
    }

    digitDisplay(){
        switch(this.point){
            case 0:
                this.zero();
                break;
            case 1:
                this.one();
                break;
            case 2:
                this.two();
                break;
            case 3:
                this.three();
                break;
            case 4:
                this.four();
                break;
            case 5:
                this.five();
                break;
            case 6:
                this.six();
                break;
            case 7:
                this.seven();
                break;
            case 8:
                this.eight();
                break;
            case 9:
                this.nine();
                break;
        }
    }

    zero(){
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y);
        context.closePath();
        context.strokeStyle = 'white';
        context.stroke();
    }

    one(){
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.strokeStyle = 'white';
        context.stroke();
    }

    two(){
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.strokeStyle = 'white';
        context.stroke();
    }

    three(){
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.moveTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.strokeStyle = 'white';
        context.stroke();
    }

    four(){
        context.globalAlpha = 1;
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.moveTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.strokeStyle = 'white';
        context.stroke();
    }

    five(){
        context.moveTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.strokeStyle = 'white';
        context.stroke();
    }

    six(){
        context.moveTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.strokeStyle = 'white';
        context.stroke();
    }

    seven(){
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.strokeStyle = 'white';
        context.stroke();
    }

    eight(){
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x, this.position.y);
        context.moveTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.strokeStyle = 'white';
        context.stroke();
    }

    nine(){
        context.moveTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x, this.position.y + this.fontHeight / 2);
        context.lineTo(this.position.x, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.strokeStyle = 'white';
        context.stroke();
    }

    ship(){
        context.moveTo(this.position.x + this.fontWidth / 2, this.position.y);
        context.lineTo(this.position.x + this.fontWidth, this.position.y + this.fontHeight);
        context.lineTo(this.position.x, this.position.y + this.fontHeight);
        context.lineTo(this.position.x + this.fontWidth / 2, this.position.y);
        context.strokeStyle = 'white';
        context.stroke();
    }
}

// Create the game area
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game constants
const SPEED = 3;
const ACCELERATION = .1;
const DECELERATION = .97;
const ROTATIONAL_SPEED = 0.05;
const ROTATIONAL_ACCELERATION = 0.02;
const PROJECTILE_SPEED = 6;
const ASTROID_SPEED = 2;
const ASTROID_ANGULAR_VELOCITY = 0.01;
const FLICKER = 7;

const projectiles = [];
const astroids = [];
const pointCounter = [];
const livesCounter = [];
let points = 0;
let hit = false;

// Create player
const player = new Player({
    position:{x: canvas.width / 2, y: canvas.height / 2},
    velocity:{x: 0, y:0},
});

// Setup Point and Lives counter
let counterLeft = 40;
const counterTop = 40;
let temp;
for(let i = 0; i <= 6; i++){
    temp = new PointCounter({position: {x: counterLeft, y: counterTop}});
    pointCounter.push(temp);
    counterLeft += 5 + temp.fontWidth;
}
counterLeft += 15;
for(let i = 0; i < player.lives; i++){
    temp = new PointCounter({position: {x: counterLeft, y: counterTop}});
    livesCounter.push(temp);
    counterLeft += 5 + temp.fontWidth;
}

// Astroid spawner
const intervalId = setInterval(() =>{
    const index = Math.floor(Math.random() * 4);
    let x, y;
    let vx, vy;
    let type;
    
    var decider = Math.random();
    if(decider <= 0.2){
        type = 1;
    }else if(decider > 0.2 && decider <= 0.8){
        type = 2;
    }else if(decider > 0.8){
        type = 3;
    }

    switch(index){
        case 0: // Left side of screen
            x = 0;
            y = Math.random() * canvas.height;
            vx = Math.random() * 2 + 0.5;
            if(y <= canvas.height / 2){vy = Math.random() + 0.4}
            else{vy = -Math.random() - 0.4}
            break;
        case 1:
            x = Math.random() * canvas.width; // Bottom of the sceen
            y = canvas.height;
            vy = Math.random() - 0.8;
            if(x <= canvas.width / 2){vx = Math.random() + 0.3}
            else{vx = -Math.random() - 0.3}
            break;
        case 2: // Right of the screen
            x = canvas.width;
            y = Math.random() * canvas.height;
            vx = -Math.random() * 2 - 0.5;
            if(y <= canvas.height / 2){vy = Math.random() + 0.4}
            else{vy = -Math.random() - 0.4}
            break;
        case 3: // Top of the screen
            x = Math.random() * canvas.width;
            y = 0;
            vy = Math.random() + 0.8;
            if(x <= canvas.width / 2){vx = Math.random() + 0.3}
            else{vx = -Math.random() - 0.3}
            break;
    }

    astroids.push(new Astroids({
        position: {x: x, y: y},
        velocity: {x: vx, y: vy},
        type
    }));
}, 2500);

// Projectile collision
function circleCollision(circle1, circle2){
    const xDif = circle2.position.x - circle1.position.x;
    const yDif = circle2.position.y - circle1.position.y;

    const distance = Math.sqrt(xDif**2 + yDif**2);

    if(distance <= circle1.radius + circle2.radius){
        return true;
    }

    return false;
}

// Player collision
function circleTriangleCollision(circle, triangle, hit) {
    // Check if the circle is colliding with any of the triangle's edges
    for (let i = 0; i < 3; i++) {
      let start = triangle[i]
      let end = triangle[(i + 1) % 3]
  
      let dx = end.x - start.x
      let dy = end.y - start.y
      let length = Math.sqrt(dx * dx + dy * dy)
  
      let dot =
        ((circle.position.x - start.x) * dx +
          (circle.position.y - start.y) * dy) /
        Math.pow(length, 2)
  
      let closestX = start.x + dot * dx
      let closestY = start.y + dot * dy
  
      if (!isPointOnLineSegment(closestX, closestY, start, end)) {
        closestX = closestX < start.x ? start.x : end.x
        closestY = closestY < start.y ? start.y : end.y
      }
  
      dx = closestX - circle.position.x
      dy = closestY - circle.position.y
  
      let distance = Math.sqrt(dx * dx + dy * dy)
  
      if (distance <= circle.radius) {
        hit = true;
        console.log(hit);
        return true
      }
    }
  
    // No collision
    return false
  }
  
  function isPointOnLineSegment(x, y, start, end) {
    return (
      x >= Math.min(start.x, end.x) &&
      x <= Math.max(start.x, end.x) &&
      y >= Math.min(start.y, end.y) &&
      y <= Math.max(start.y, end.y)
    )
  }

// Initial key values
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

// Player respawn
function die(player, animationId){
    console.log(player.lives)
    if(player.lives != 0){
        player.velocity.x = 0;
        player.velocity.y = 0;
        cancelAnimationFrame(animationId);
        setTimeout(() => {
            player.lives -= 1; // Remove a life
            console.log(player.lives);
            console.log('respawn')
            player.position.x = canvas.width / 2;
            player.position.y = canvas.height / 2;
            player.rotation = 0;
            astroids.splice(0, astroids.length) // Clear the screen of all astroids
            animate(); // Repawn
        }, 3000);
    }else{
        cancelAnimationFrame(animationId);
        clearInterval(intervalId);
        gameover();
    }
}

function gameover(){
    console.log('GAME OVER!');
}

// Update Points and Lives
function updatePoints(){
    let numArr = Array.from(String(points));
    numArr.reverse();
    pointCounter.reverse();
    
    for(let i = 0; i < numArr.length; i++){
        pointCounter[i].point = parseInt(numArr[i]);
    }

    pointCounter.reverse();
}

function updateLives(){
    if(player.lives < livesCounter.length){
        livesCounter.splice(livesCounter.length - 1, 1);
    }
}

// Animate and start the game
function animate(){
    const animationId = window.requestAnimationFrame(animate);

    // Background for the game
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    updatePoints();
    for(let i = 0; i < pointCounter.length; i++){
        const digit = pointCounter[i];
        digit.digitDisplay();
    }

    updateLives();
    for(let i = 0; i < livesCounter.length; i++){
        const life = livesCounter[i];
        life.ship();
    }

    // Call update to redraw the player at new position
    player.update();

    // Projectile managment
    for(let i = projectiles.length - 1; i >= 0; i--){
        const projectile = projectiles[i];
        projectile.update();

        // Projectile garbage collection
        if(
            projectile.position.x + projectile.radius < 0 || 
            projectile.position.x - projectile.radius > canvas.width ||
            projectile.position.y - projectile.radius > canvas.height ||
            projectile.position.y + projectile.radius < 0
        ){
            projectiles.splice(i, 1);
        }
    }

    // Astroid managment
    for(let i = astroids.length - 1; i >= 0; i--){
        const astroid = astroids[i];
        astroid.update();

        if(hit == false){
            if(circleTriangleCollision(astroid, player.getVerticies(), hit)){
                die(player, animationId);
            }
        }

        // Astroid garbage collection
        if(
            astroid.position.x + astroid.radius < 0 || 
            astroid.position.x - astroid.radius > canvas.width ||
            astroid.position.y - astroid.radius > canvas.height ||
            astroid.position.y + astroid.radius < 0
        ) {
            astroids.splice(i, 1);
        }

        for(let j = projectiles.length - 1; j >= 0; j--){
            const projectile = projectiles[j];

            if(circleCollision(astroid, projectile)){
                if(astroid.type > 1){
                    points += astroid.points;
                    astroid.type -= 1;
                    astroid.velocity.x /= Math.cos(Math.PI * 0.25) * 3;
                    astroid.velocity.y /= Math.cos(Math.PI * 0.75) * 3;
                    const secondAstroid = new Astroids({
                        position: {x: astroid.position.x, y: astroid.position.y},
                        velocity: {x: -1 * astroid.velocity.x, y: -1 * astroid.velocity.y},
                        type: astroid.type
                    });
                    astroids.push(secondAstroid);
                    projectiles.splice(j, 1);
                }else{
                    points += astroid.points;
                    astroids.splice(i, 1);
                    projectiles.splice(j, 1);
                }
            }
        }
    }

    // Player movement
    if(keys.w.pressed) {
        // Speed of the spaceship
        player.velocity.x += Math.cos(player.rotation) * ACCELERATION;
        player.velocity.y += Math.sin(player.rotation) * ACCELERATION;
    } else if(!keys.w.pressed){
        player.velocity.x *= DECELERATION;
        player.velocity.y *= DECELERATION;
    }

    player.flicker += FLICKER; // FLickering of the jets

    // Rotation of the spacehip
    if(keys.d.pressed) player.rotation += ROTATIONAL_SPEED;
    if(keys.a.pressed) player.rotation -= ROTATIONAL_SPEED;
}

animate();

// Movement keys listener
window.addEventListener('keydown', (event) => {
    switch(event.code){
        case 'KeyW':
            keys.w.pressed = true;
            break;
        case 'KeyA':
            keys.a.pressed = true;
            break;
        case 'KeyD':
            keys.d.pressed = true;
            break;
        case 'Space':
            if(event.target == document.body){
                event.preventDefault();
            }
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + Math.cos(player.rotation) * 30,
                        y: player.position.y + Math.sin(player.rotation) * 30,
                    },
                    velocity: {
                        x: Math.cos(player.rotation) * PROJECTILE_SPEED,
                        y: Math.sin(player.rotation) * PROJECTILE_SPEED,
                    }
                })
            );
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.code){
        case 'KeyW':
            keys.w.pressed = false;
            break;
        case 'KeyA':
            keys.a.pressed = false;
            break;
        case 'KeyD':
            keys.d.pressed = false;
            break;
    }
});