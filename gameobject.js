class GameObject {
    
    constructor(x, y, width , height) {
        this.x=x
        this.y=y
        this.height=height
        this.width=width
    }

    draw(ctx){
        ctx.fillStyle='black';
        ctx.fillRect(this.x,this.y,this.width,this.height);

    }



}
