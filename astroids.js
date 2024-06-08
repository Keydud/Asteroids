// Classes
// Spaceship
class Player{
    constructor({position, velocity}) {
        this.position = position; // {x, y}
        this.velocity = velocity;
        this.rotation = 0.0;
        this.flicker = 0;
        this.lives = 2;
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
        this.type = type;
        this.rotation = 0;
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

class Characters{
    constructor({position}){
        this.position = position;
        this.point = 0;
        this.fontHeight = 20;
        this.fontWidth = 10;
        this.color = 'white';
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

canvas.width = 600;
canvas.height = 600;

// Things needed globaly
let points;

// Colors
let fontColor1 = 'white';
let fontColor2 = 'white';
let boxColor1 = 'black';
let boxColor2 = 'black';

let animationId, intervalId;


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

// Cursor
const crtDisplay = document.getElementById('crt');
crtDisplay.style.cursor = 'none';

const cursor = new Image();
cursor.src = './cursor.png';
const pointer = new Image();
pointer.src = './pointer.png';

const mouse = {x: 0, y: 0};
const cursorPos = {x: 0, y: 0};

const canvasClientWidth = canvas.clientWidth;
const canvasClientHeigth = canvas.clientHeight;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

//-------------------------------------GAME--------------------------------------
// Game constants

function playGame(){
    const ACCELERATION = .1;
    const DECELERATION = .97;
    const ROTATIONAL_SPEED = 0.05;
    const PROJECTILE_SPEED = 6;
    const FLICKER = 7;

    const projectiles = [];
    const astroids = [];
    const pointCounter = [];
    const livesCounter = [];
    let hit = false;

    points = 0;

    // SFX
    const laserSFX = new Audio('./sfx/laser.wav');
    laserSFX.volume = .4;
    const largeExSFX = new Audio('./sfx/explosionBig.wav');
    const smallExSFX = new Audio('./sfx/explosion.wav');
    const jetSFX = new Audio('./sfx/blast.wav');
    jetSFX.volume = .2;

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
            window.removeEventListener('keydown', keydown, false);
            cancelAnimationFrame(animationId);
            clearInterval(intervalId);
            setTimeout(()=> {
                end();
            }, 3000);
        }
    }

    // Update Points and Lives
    function updatePoints(){
        if(points > 999999){
            points = 999999;
        }

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
        animationId = window.requestAnimationFrame(animate);

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
                        largeExSFX.load();
                        largeExSFX.play();
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
                        smallExSFX.load();
                        smallExSFX.play();
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
            jetSFX.play();
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

    // Movement keys listener
    function keydown(event){
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
                laserSFX.load();
                laserSFX.play();
                break;
        }
    }

    window.addEventListener('keydown', keydown);

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
        temp = new Characters({position: {x: counterLeft, y: counterTop}});
        pointCounter.push(temp);
        counterLeft += 5 + temp.fontWidth;
    }
    counterLeft += 15;
    for(let i = 0; i < player.lives; i++){
        temp = new Characters({position: {x: counterLeft, y: counterTop}});
        livesCounter.push(temp);
        counterLeft += 5 + temp.fontWidth;
    }

    // Astroid spawner
    intervalId = setInterval(() =>{
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

    animate();
};

//--------------------------------Menu Content-----------------------------------

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function menu(){
    // Start task clicked on
    window.addEventListener('click', clickArea);

    // Title theme
    const theme = new Audio('./sfx/titleTheme.wav');
    var interval = 100;
    intervalId = setInterval(()=>{
        theme.play();
        interval = 20000;
    }, interval);

    // Clickable area
    function clickArea(){
        if(cursorPos.x > (canvasClientWidth - 300) / 2 &&
        cursorPos.x < canvasClientWidth - ((canvasClientWidth - 270) / 2) &&
        cursorPos.y > (canvasClientHeigth + 140) / 2 &&
        cursorPos.y < (canvasClientHeigth + 220) / 2){
            window.removeEventListener('click', clickArea, false);
            window.clearInterval(intervalId);
            theme.pause();
            window.cancelAnimationFrame(animationId);
            playGame();
        }

        if(cursorPos.x > (canvasClientWidth - 230) / 2 &&
        cursorPos.x < (canvasClientWidth + 200) / 2 &&
        cursorPos.y > (canvasClientHeigth + 240) / 2 &&
        cursorPos.y < (canvasClientHeigth + 320) / 2){
            window.open('https://github.com/Keydud/Asteroids', '_blank');
        }
    }

    // Setup Title
    const title = new Image();
    title.src = './asteroidTitle.png';

    // Menu Animation
    function menuAnimate(){
        animationId = requestAnimationFrame(menuAnimate);

        // Background
        context.fillStyle = 'black';
        context.fillRect(0, 0, 600, 600);

        // Draw title
        context.drawImage(title, 50, 100, 500, 218);

        // Draw menu selections
        context.fillStyle = boxColor1;
        context.fillRect(
            160,
            370,
            265,
            40
            );

        context.fillStyle = boxColor2;
        context.fillRect(
            190,
            420,
            200,
            40
        )

        context.font = '30px Courier'
        context.fillStyle = fontColor1;
        context.fillText('--START_GAME--', 165, 400);
        context.font = '30px Courier'
        context.fillStyle = fontColor2;
        context.fillText('--GITHUB--', 200, 450);

        cursorPos.x = mouse.x - ((windowWidth - canvasClientWidth) / 2);
        cursorPos.y = mouse.y - ((windowHeight - canvasClientHeigth) / 2);

        // Hightlight Menu Options
        if(cursorPos.x > (canvasClientWidth - 300) / 2 &&
        cursorPos.x < canvasClientWidth - ((canvasClientWidth - 270) / 2) &&
        cursorPos.y > (canvasClientHeigth + 140) / 2 &&
        cursorPos.y < (canvasClientHeigth + 220) / 2){
            boxColor1 = 'white';
            fontColor1 = 'black';
            context.drawImage(pointer, cursorPos.x - 6, cursorPos.y, 25.5, 28);
        } else if(cursorPos.x > (canvasClientWidth - 230) / 2 &&
        cursorPos.x < (canvasClientWidth + 200) / 2 &&
        cursorPos.y > (canvasClientHeigth + 240) / 2 &&
        cursorPos.y < (canvasClientHeigth + 320) / 2){
            boxColor2 = 'white';
            fontColor2 = 'black';
            context.drawImage(pointer, cursorPos.x - 6, cursorPos.y, 25.5, 28);
        } else {
            boxColor1 = 'black';
            fontColor1 = 'white';
            boxColor2 = 'black';
            fontColor2 = 'white';
            context.drawImage(cursor, cursorPos.x, cursorPos.y, 16.5, 28.5);
        }
    }

    menuAnimate();
}

// COME BACK LATER FUCK THIS BS OMGGGGG


//----------------------------------Game Over-----------------------------------

function end(){
    // SFX
    const gameoverTheme = new Audio('./sfx/gameover.wav');
    gameoverTheme.volume = 0.8;

    // Load gameover sprites
    const gameoverSprite = new Image();
    gameoverSprite.src = './gameover.png';
    const highscore = new Image();
    highscore.src = './highscore.png';

    let scoreStr;

    function gameoverClick(){
        if(cursorPos.x > (canvasClientWidth - 200) / 2 &&
        cursorPos.x < (canvasClientWidth + 200) / 2 &&
        cursorPos.y > (canvasClientHeigth + 240) / 2 &&
        cursorPos.y < (canvasClientHeigth + 320) / 2){
            window.removeEventListener('click', gameoverClick, false);
            window.cancelAnimationFrame(animationId);
            menu();
        }
    }

    function scoreToString(){
        scoreStr = points.toString();
        while(scoreStr.length < 6){
            scoreStr = '0' + scoreStr;
        }
    }

    // Animation functions
    // Display Gameover screen
    function gameover(){
        animationId = window.requestAnimationFrame(gameover);
        // Background
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(gameoverSprite, 98, 198, 404, 204);
    }

    // Display highscore screen
    function congrats(){
        animationId = window.requestAnimationFrame(congrats);

        // Background
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(highscore, 89, 50, 422, 174);

        // Display score
        context.font = '30px Courier'
        context.fillStyle = 'white';
        context.fillText(scoreStr, 247, 240);

        // Thanks you message
        context.font = '30px Courier'
        context.fillStyle = 'white';
        context.fillText('THANK YOU FOR PLAYING!', 108, 335);

        // Menu task
        context.fillStyle = boxColor1;
        context.fillRect(
            200,
            420,
            200,
            40
            );
        context.font = '30px Courier'
        context.fillStyle = fontColor1;
        context.fillText('--MENU--', 225, 450);

        cursorPos.x = mouse.x - ((windowWidth - canvasClientWidth) / 2);
        cursorPos.y = mouse.y - ((windowHeight - canvasClientHeigth) / 2);

        if(cursorPos.x > (canvasClientWidth - 200) / 2 &&
        cursorPos.x < (canvasClientWidth + 200) / 2 &&
        cursorPos.y > (canvasClientHeigth + 240) / 2 &&
        cursorPos.y < (canvasClientHeigth + 320) / 2){
            boxColor1 = 'white';
            fontColor1 = 'black';
            context.drawImage(pointer, cursorPos.x - 6, cursorPos.y, 25.5, 28);
        } else {
            boxColor1 = 'black';
            fontColor1 = 'white';
            context.drawImage(cursor, cursorPos.x, cursorPos.y, 16.5, 28.5);
        }
    } 

    gameoverTheme.play();
    scoreToString();
    gameover();
    setTimeout(()=>{
        window.cancelAnimationFrame(animationId);
        congrats();
    }, 6500);

    // Add event listener for menu optio
    window.addEventListener('click', gameoverClick);
};

//------------------------------------Intro-Animation----------------------------

function intro(){
    window.removeEventListener('click', intro, false);

    const timing = 7000;

    // SFX
    const winStartSFX = new Audio('./sfx/winBoot.mp3');

    // Sprites
    const desktop = new Image();
    desktop.src = './win95.png';
    const tab = new Image();
    tab.src = './tab.png';

    var displayDesk = false;
    var displayTab = false;
    var initializing = false;

    intervalId = setInterval(()=>{
        if(fontColor1 == 'white'){
            fontColor1 = 'black';
        } else {
            fontColor1 = 'white';
        }
    }, 500)

    context.globalAlpha = 0;

    function introAnimate(){
        animationId = window.requestAnimationFrame(introAnimate);

        // Desktop
        context.globalAlpha < 1 ? context.globalAlpha += .008 : context.globalAlpha = 1; // Fade in like 95
        context.fillStyle = '#008080';
        context.fillRect(0, 0, 600, 600); // Fake load of content
        if(displayDesk){context.drawImage(desktop, 0, 0, 600, 600);}

        // Tab open
        if(displayTab){context.drawImage(tab, 171, 178, 258, 244);}

        if(initializing){
            context.fillStyle = 'black';
            context.fillRect(0, 0, 600, 600);
            context.font = '20px Courier'
            context.fillStyle = 'white';
            context.fillText('Initializing', 30, 30);
            context.font = '20px Courier'
            context.fillStyle = fontColor1;
            context.fillText('_', 175, 30);
        }

        // Cursor
        cursorPos.x = mouse.x - ((windowWidth - canvasClientWidth) / 2);
        cursorPos.y = mouse.y - ((windowHeight - canvasClientHeigth) / 2);
        context.drawImage(cursor, cursorPos.x, cursorPos.y, 16.5, 28.5);
    }
    
    winStartSFX.play();
    introAnimate();
    setTimeout(()=>{displayDesk = true}, 2000);
    setTimeout(()=>{displayTab = true}, timing + 500);
    setTimeout(()=>{initializing = true}, timing + 1000);
    setTimeout(()=>{
        window.clearInterval(intervalId);
        window.cancelAnimationFrame(animationId);
        menu();
    }, timing + 5000);
}

window.addEventListener('click', intro);
