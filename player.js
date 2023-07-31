class Player extends GameObject {

    constructor(x,y,width,height){
        super(x,y,width,height);
        this.speed = 10;
        this.controller = {};
        this.projectiles = [];    
        this.cooldown= 15; 
        this.healthPoints = 3;
        this.score=0
    }

    draw(ctx){
        super.draw(ctx);  
        this.cooldown --;
        this.projectiles = this.projectiles.filter(p => p.isAlive)
        for (let i = 0; i < this.projectiles.length; i++) {
            const proj = this.projectiles[i];
            proj.draw(ctx);
            proj.move();
        }
    }

    control(canvasWidth,canvasHeight) {
        document.onkeydown = (keyevent =>{
            this.controller[keyevent.key] = true
        }) 

        document.onkeyup = (keyevent =>{
            this.controller[keyevent.key] = false
        })

        

            if (this.controller['ArrowLeft']) {
                this.x=  this.x - this.speed
                if (this.x<=0) {
                    this.x=0
                }
            }
            if (this.controller['ArrowRight']) {
                this.x= this.x + this.speed
                if (this.x>=canvasWidth-this.width) {
                    this.x=canvasWidth - this.width
                }
            }
            if (this.controller['ArrowUp']) {
                this.y = this.y - this.speed
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.controller['ArrowDown'] ) {
                this.y = this.y + this.speed
                if (this.y >= canvasHeight-this.height) {
                    this.y = canvasHeight - this.height
                }
            }

            if (this.controller[' '] ) {
                this.baseAttack()
            }
    }


    baseAttack(){
        if (this.cooldown <= 0) {
            let proj = new Projectile(this.x + (this.width/2) - 2.5,this.y,5,20);
            this.projectiles.push(proj);
            this.cooldown = 15;
        }

    }

    death(){
        if (this.healthPoints <= 0){
            
        }
    }

    takeDamage(){

    }


}