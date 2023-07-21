class Projectile extends GameObject{
    constructor(x,y,width,height){
        super (x,y,height,width);
        this.speed = 15;
        this.isAlive = true;
    }

    draw(ctx){
        super.draw(ctx);
    }

    move(){
        this.y = this.y - this.speed;
    }

    outOfGame(){
        if (this.y + this.height <= 0) {
            this.isAlive = false;

        }
    }
}