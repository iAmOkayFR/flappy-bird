const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.background = "#000000";

let keyPressed = false
let scrollOffset = 0
let gameOver=false 
let wascroll = 0

const pipeup=new Image()
pipeup.src="images/pipeup.png";

const pipedown=new Image()
pipedown.src="images/pipedown.png";

const bird=new Image()
bird.src="images/bird.png";

const sky=new Image()
sky.src="images/sky.png";

class Player {
    constructor() {
        this.position = {
            x: 300,
            y: 400
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 55;
        this.height = 55;

        this.gravity = 0;
    }

    draw() {
        context.drawImage(bird, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height > 70+canvas.height)
            {
                this.velocity.x = 0
                this.velocity.y = 0
                this.gravity = 0
                scrollOffset = 0
                context.fillStyle = 'red'
                context.font = '60px Arial'
                context.fillText("GAME OVER !!", 400,300)
                gameOver=true;
            }
        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += this.gravity


        for (let i = 0; i < platforms.length; i++) {
            if ((this.position.x + this.velocity.x + this.width
                >= platforms[i].position.x +20)
                && (this.position.x + this.velocity.x + this.width
                    <= platforms[i].position.x + platforms[i].width)
                && (this.position.y + this.velocity.y
                    >= 0)
                && (this.position.y + this.velocity.y +20
                    <= platforms[i].height)
            ) {
                this.velocity.x = 0
                this.velocity.y = 0
                this.gravity = 0
                scrollOffset = 0
                context.fillStyle = 'red'
                context.font = '60px Arial'
                context.fillText("GAME OVER !!", 400,300)
                gameOver=true;

            }
            if ((this.position.x + this.velocity.x + this.width
                >= platforms[i].position.x+20)
                && (this.position.x + this.velocity.x + this.width
                    <= platforms[i].position.x + platforms[i].width)
                && (this.position.y + this.velocity.y + this.height-20
                    >= platforms[i].height + platforms[i].gap)
                && (this.position.y + this.velocity.y
                    <= canvas.height)
            ) {
                this.velocity.x = 0
                this.velocity.y = 0
                scrollOffset = 0
                this.gravity = 0
                context.fillStyle = 'red'
                context.font = '60px Arial'
                context.fillText("GAME OVER !!", 400,300)
                gameOver=true


            }
        }
    }
}

class Platform {
    constructor(x, w, h, gap) {
        this.position = {
            x: x
        }
        this.width = w;
        this.height = h;
        this.gap = gap;

    }

    draw() {

        context.drawImage(pipeup, this.position.x,
            0, this.width, this.height)

        context.drawImage(pipedown, this.position.x,
            this.height + this.gap, this.width,
            canvas.height)
    }
}

const player = new Player()

const platforms = []
const platform = []
let index = [1,    2,    3,   4,    5,    6,    7,    8,    9,   10,  11,   12,    13,   14,   15,   16,  17,  18,   19,    20]
let platx = [600, 950, 1200,1500, 1750, 2000, 2280, 2600, 2900, 3220, 3470, 3690, 3950, 4200, 4460,4800, 4990, 5190, 5500, 5900]
let platwid=[70,  80,   90,  100,  80,   80,   120,  120,  120,  120,  100,  90,   120,  130,  100, 120,  100,  150,  100,  120]
let plathei=[300, 150, 350,  100,  300,  500,  150,  250,  450,  200,  80,   190,  350,  150,  500, 250,  150,  100,  550,  150]
let platgap=[250, 200, 200,  180,  220,  170,  150,  170,  250,  200,  160,  150,  140,  200,  150,  190,  180,  250,  180,  120]


for(let i=0; i<index.length; i++){
    platform[i]= new Platform(platx[i], platwid[i], plathei[i], platgap[i])
}
for(let j=0; j<platform.length; j++){
    platforms.push(platform[j])
}



function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(sky, 0+wascroll, 0, sky.width, canvas.height)
    wascroll-= scrollOffset*0.6
    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    for (let i = 0; i < platforms.length; i++) {
        if (keyPressed)
            platforms[i].position.x -= scrollOffset;
    }
    player.update();

}

animate();

addEventListener('keydown', function (e) {
    if (e.key == 'ArrowUp' && !gameOver) {
        player.velocity.y = -9;
        keyPressed = true;
        scrollOffset = 3
        player.gravity= 0.5

    }
    else if(gameOver){
        player.velocity.y = 0;
        keyPressed = false;
        scrollOffset = 0
        player.gravity= 0
        context.fillStyle = 'red'
        context.font = '60px Arial'
        context.fillText("GAME OVER !!", 400,300)
        window.location.reload()
        wascroll = 0
    }
    else{

    }

})
animate();

addEventListener('click', function () {
    if (!gameOver) {
        player.velocity.y = -10;
        keyPressed = true;
        scrollOffset = 3
        player.gravity= 0.2

    }
    else if(gameOver){
        player.velocity.y = 0;
        keyPressed = false;
        scrollOffset = 0
        player.gravity= 0
        context.fillStyle = 'red'
        context.font = '60px Arial'
        context.fillText("GAME OVER !!", 400,300)
        window.location.reload()
        wascroll = 0
    }
    else{

    }

})

