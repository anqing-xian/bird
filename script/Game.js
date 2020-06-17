class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        //柱子对生成器
        this.pipeProducer = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    }
    start() {
        if (this.timer) {
            return '';
        }
        if(this.gameOver){
            window.location.reload();
        }
        this.pipeProducer.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration);
            })
            if(this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.tick)
    }
    isHit(rec1, rec2) {
        let centerX1 = rec1.left + rec1.width / 2;
        let centerY1 = rec1.top + rec1.height / 2;
        let centerX2 = rec2.left + rec2.width / 2;
        let centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        if(disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2){
            return true;
        }
        return false;
    }
    isGameOver () {
        if(this.bird.top === this.bird.maxY) {
            alert('游戏结束，按回车重新开始游戏');
            return true;
        }
        for(let i = 0; i <this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            pair.upPipe;
            if(this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)){
                alert('游戏结束，按回车重新开始游戏');
                return true;
            }
        }
        return false;
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }
    //关联键盘事件
    regEvent() {
        window.onkeydown = (e) => {
            if(e.key === 'Enter'){
                if(this.timer){
                    this.stop();
                }else {
                    this.start();
                }
            }else if(e.key === ' ') {
                this.bird.jump();
            }
        }
    }
}
var g = new Game();
g.regEvent();