let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;
const player = new Player ((canvasWidth/2),(canvasHeight/2), 50, 50)
let allEnemies = [];
let enemyCooldown = 120;
let playerProjectiles = player.projectiles;
let minibossCD = 1200;

const gameOver = document.getElementById('game-over')
const retryBtn = document.getElementById('retry-button')
// const hpText = document.getElementById('hp-text')
const scoreText = document.getElementById('score-text')
const hpBar = document.getElementById('hp-bar')
let hpWidth = 100/player.healthPoints

let state = 'Play';
let minibossProj= []

retryBtn.addEventListener('click', ()=>{
    player.healthPoints = 3;
    player.projectiles = [];
    allEnemies=[];
    player.score=0
    gameOver.style.display='none'
})


function animation(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    animate = requestAnimationFrame(animation)
    gameStates()
    if(state==='Play'){

    if (player) {
        player.draw(ctx)
        player.control(canvasWidth,canvasHeight);
        playerProjectiles = player.projectiles;
    }


    enemyCooldown--;
    
    if (enemyCooldown <= 0) {
        enemySpawn()
        enemyCooldown=120
    }

    minibossSpawn()



    allEnemies= allEnemies.filter(e => e.isAlive)


    for (let i = 0; i < allEnemies.length; i++) {
        const enemy = allEnemies[i];
        enemy.draw(ctx);
        enemy.move()

        if (enemy.projectiles) {
            minibossProj= enemy.projectiles
        }
    }

    enemyCollision()
    // hpText.innerText='♥:' + player.healthPoints
    scoreText.innerText='§:' + player.score;

    hpBar.style.width=hpWidth*player.healthPoints + '%'

    } else if (state==='GameOver'){
        gameOver.style.display='flex'
    }

 

}

function enemySpawn() {
    let randomX = Math.random() * (canvasWidth-50);
    let enemy = new BaseEnemy(randomX,-50,50,50)
    allEnemies.push(enemy)
}

function minibossSpawn() {
    minibossCD--;
    if (minibossCD <=0) {
        let xPos= Math.random()< 0.5? 0-128 : canvasWidth
        let miniboss= new Miniboss(xPos, 120, 128, 84);
        miniboss.score=1000;
        miniboss.speed = xPos === 0 ? 2 : -2;
        minibossCD= 1200
        allEnemies.push(miniboss)
    }
}

function enemyCollision(){
    let playerAssets = [player, ...playerProjectiles];
    allEnemies.push(...minibossProj)
    for (let i = 0; i < playerAssets.length; i++) {
        const pA = playerAssets[i];
        for (let j = 0; j < allEnemies.length; j++) {
            const enemy = allEnemies[j];
            if (
                enemy.x<pA.x + pA.width &&
                enemy.x+enemy.width>pA.x &&
                enemy.y<pA.y + pA.height &&
                enemy.y+ enemy.height > pA.y
            ) {
        
                enemy.healthPoints--;
                pA.healthPoints--;
                enemy.death();
                if (!enemy.isAlive){
                    player.score += enemy.score
                }
            }
        }
        
    }
}

function gameStates(){
    switch (state) {
        case 'Play':
            if (player.healthPoints<=0) {
                state = 'GameOver'
            }
            break;

        case 'GameOver':
            if (player.healthPoints>0) {
                state = 'Play'
            }
            break;
    
        default:
            break;
    }
}



animation();



    // canvasWidth = window.innerWidth;
    // canvasHeight = window.innerHeight;
    // canvas.width = canvasWidth;
    // canvas.height = canvasHeight;