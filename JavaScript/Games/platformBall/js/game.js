const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
};
let game = {// כל הפעולות אנחנו עושים פה כל הלוגיקה של המשחק פה זה משתנה גלובאלי יחיד בפרוייקט
   running:true,//game running
    ctx: null,//אומר שמשתנה יכול לקבל ערך של אובייקט
    platform: null,
    score:0,
    ball: null,
    blocks: [],//empty arr for blocks
    rows: 4,//rows for blocks
    cols: 8,//cols for blocks
    WIDTH: 640,//canvas width
    HEIGTH: 360,//canvas height
    sprites: {
        background: null,
        ball: null,
        platform: null,
        block: null//block obj
    },
    init: function () {
        this.ctx = document.getElementById("mycanvas").getContext("2d");//מקבלים כלים של קאנבס לעבודה עם גרפיקה 2ד
        this.setEvents();
    },
    setEvents() {
        window.addEventListener("keydown", e => {//בודקים איזה מקש לחוץ

            if (e.keyCode === KEYS.SPACE) {
                this.platform.fire();
                // this.ball.start();
                //console.log('start the ball');
            }

            else if (e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT) {
                this.platform.start(e.keyCode);
            }
            //     this.platform.dx = -this.platform.velocity;//הזזה של פלאטפורמה שמאלה
            //     //  console.log('move left')//מקש שמאלי
            // } else if (e.keyCode === KEYS.RIGHT) {
            //     this.platform.dx = this.platform.velocity;//הזזה של פלטפורנה ימינה
            //     //console.log('move right');//מקש ימני
            // }
            //מחקתי קוד הנ"ל על מנת לעשות אינקפסולציה ולא לשנות ערכים של האובייקט מבחוץ
            //   אלה לקראו למטודות מתוך האובייקט שיכולות לעשות את זה
            //.לדעתי זה יותר נכון לארכיתקטורה של התוכנה
        });
        window.addEventListener("keyup", e => {//כאשר משחררים את הכפטור פלאוטפורמה נעצרת
            this.platform.stop();

        });
    },
    preload(callback) {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;// מקבלים כמות מפתחות(משתנים) ב SPRITES 
        let onImageLoad = () => {
            ++loaded;//בכל הורדה של תמונה מוסעיפים 1 למשתנה כאשר מגיע לכמות הנדרש מפעיל את הפונקציה
            if (loaded >= required) {
                callback();
            }
        };
        for (let key in this.sprites) {//for each key in object sprites
            this.sprites[key] = new Image();//call constructor
            this.sprites[key].src = "img/" + key + ".png";
            this.sprites[key].addEventListener("load", onImageLoad);
        }
    },
    create() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blocks.push(
                    {
                        active: true,
                        width: 60,
                        height: 20,
                        x: (60 + 4) * col + 65,//(block w+col gap)*col+margin left
                        y: (20 + 4) * row + 35//(block h+row gap)*+margin top

                    }

                );
            }
        }
    },
    update() {
        this.collideBlocks();
        this.collidePlatform();
        this.ball.collideWorldBounds();
        this.platform.collideWorldBounds();
        this.platform.move();//תזוזה של פלאוטפורמה
        this.ball.move();


    },
    addScore(){
++this.score;
if(this.score>=this.blocks.length)
{
    game.running=false;
    alert("You Win!");
    window.location.reload();
}
    },
    collideBlocks() {
        for (let block of this.blocks) {
            if (block.active && this.ball.collide(block)) {//אם הייתה נגיע
                this.ball.bumpBlock(block);//פגיע בבלוק
                // console.log('collide!');
                this.addScore();
            }
        }
    },
    collidePlatform() {
        if (this.ball.collide(this.platform)) {
            this.ball.bumpPlatform(this.platform);
            //console.log("ball collides platform!");
        }
    },
    run() {
        if(this.running){//if running false =stop the game
        window.requestAnimationFrame(() => {//אומריל בדפדפן שמפריים הבא צריך לצייר כל משאנחנו תיחננו) 
            this.update();//קוראים למטודה הזו פלני כל ציור פריים חדש לציור של דברים במצב עדכני שלהם
            this.render();
            //console.log('render complited');
            this.run();//רקורסיה לטובת ציור התקני על מנת להזיז דברים
        });
    }
    },
    render() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGTH);
        this.ctx.drawImage(this.sprites.background, 0, 0);//מציירים כל משפונקציה מקבלת
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);//this=game
        this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height,
            this.ball.x, this.ball.y, this.ball.width, this.ball.height);//מציירים את הכדור פאר פריים
        this.renderBlocks();
    },
    renderBlocks() {
        for (let block of this.blocks) {
            if (block.active) {//בדיקה אם כבר פגענו בבלוק
                this.ctx.drawImage(this.sprites.block, block.x, block.y);
            }
        }
    },
    start: function () {//מטודה שמתחילה את המשחק

        this.init();
        this.preload(() => {//callback
            this.create();//בנייה של בלוקים על המפה
            this.run();
        });

    },
    random(min, max) {//שליחת כדור לקיוון רנדומלי
        //0.(9)*2+1=1.999...+1=2.999...floor(2.999)<+1=max 3
        return Math.floor(Math.random() * (max - min + 1) + min);//בטוח מחזיר מספר כי 0 לא מתאים לי

    }
};
game.ball = {
    velocity: -3,//max speed for the ball -3 becouse 0,0 is left hight corner
    dy: 0,
    dx: 0,
    x: 320,
    y: 280,
    width: 20,
    height: 20,
    start() {
        this.dy = this.velocity;
        this.dx = game.random(-this.velocity, this.velocity);
    },
    move() {
        if (this.dy) {
            this.y += this.dy;
        }
        if (this.dx) {
            this.x += this.dx;
        }
    },
    collide(element) {//בדיקה אם כדור נוגע בבלוק
        let x = this.x + this.dx;//קורדינטה נוחכית+קורדינטה של תזוזה על מנת שלא יהיה פיקסל על פיקסל
        let y = this.y + this.dy;
        if (
            x + this.width > element.x &&
            x < element.x + element.width &&
            y + this.height > element.y &&
            y < element.y + element.height
        ) { return true; }
        return false;
    },
    bumpBlock(block) {
        this.dy *= -1;
        block.active = false;

    },
    bumpPlatform(platform) {
        if (this.dy > 0) {//כדי שכדור לא יתקע על פלטפורמה
            this.dy = this.velocity;
            let touchX = this.x + this.width / 2;//מקבלים מרכז של הכדור
            this.dx = this.velocity * platform.getTouchOffset(touchX);
        }
    },
    collideWorldBounds() { 
        let x = this.x + this.dx;//קורדינטה נוחכית+קורדינטה של תזוזה על מנת שלא יהיה פיקסל על פיקסל
        let y = this.y + this.dy;

        let ballLeft=x;//צד שמאלי של הכדור
        let ballRight=x+this.width;//צד ימני של הכדור
        let ballTop=y;//גבול אליון של הכדור
        let ballBottom=y+this.height;//גבול תחתון של הכדור
   
        let worldLeft=0;
        let worldRight=game.WIDTH;
        let worldTop=0;
        let worldBottom=game.HEIGTH;
// console.log(ballBottom);
// console.log(worldBottom);
        if(ballLeft<worldLeft){
            this.x=0;// ממקמים את הכדור שמאלה
            this.dx*=-1;
            //console.log("World Left!");
        }else         if(ballRight>worldRight){
            // console.log("World Right!");
            // console.log(this.width);
            // console.log(worldRight);
          this.x=worldRight-this.width;//ממקמים את הכדור ימינה
          this.dx=this.velocity;
        }else         if(ballTop<worldTop){
            this.y=0;
            this.dy=-this.velocity;
          //  console.log("World Top!");
        }else         if(ballBottom>worldBottom){
          //  console.log("World Bottom!");
            console.log("Game over!");
            game.running=false;//stop the game
            alert("You lose!");//user msg
            window.location.reload();//restart game after loosing
        }
    }
};
game.platform = {
    width: 100,
    height: 14,
    velocity: 6,//מהירות מקסימלית של הפלטפורמה
    dx: 0,//מהירות נוחכית velocity +6 or -6
    x: 280,
    y: 300,
    ball: game.ball,
    fire() {
        if (this.ball) {
            this.ball.start();
            this.ball = null;
        }
    },
    start(direction) {
        if (direction === KEYS.LEFT) {// if pressed left arrow
            this.dx = -this.velocity;
        } else if (direction === KEYS.RIGHT)//if pressed right arrow
        {
            this.dx = this.velocity;
        }
    },
    stop() {
        this.dx = 0;
    },
    move() {
        if (this.dx) {//אם פלאוטפורמה זזה
            this.x += this.dx;
            if (this.ball) {
                this.ball.x += this.dx;
            }
            // if(game.ball.dy===0){
            // game.ball.x += this.dx;
            // }
        }
    },
    getTouchOffset(x) {
        let dif = (this.x + this.width) - x;
        let offset = this.width - dif;
        //2=this.width
        //offset-?
        let result = 2 * offset / this.width;
        return (result - 1);
    },
    collideWorldBounds() { 
        let x = this.x + this.dx;//קורדינטה נוחכית+קורדינטה של תזוזה על מנת שלא יהיה פיקסל על פיקסל

        let platformLeft=x;//צד שמאלי של platform
        let platformRight=platformLeft+this.width;//צד ימני של platform

   
        let worldLeft=0;
        let worldRight=game.WIDTH;

        if(platformLeft<worldLeft||platformRight>worldRight){
            this.dx=0;
        }
    }
};

window.addEventListener("load", () => {//הפעלת פונקציה רק לאחר שכל התאגים נטענו

    game.start();

});

