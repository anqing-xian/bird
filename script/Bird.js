const birdDom = document.getElementsByClassName('bird')[0];
const birdStyles = getComputedStyle(birdDom);//获取到小鸟的样式
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;
class Bird extends Rectangle {
    constructor () {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500; //向下的加速度，单位：像素/豪秒²
        this.maxY = landTop - this.height;
        this.swingStatus = 1;//小鸟的翅膀状态
        this.timer = null;//翅膀煽动的计时器
        this.render();
    }
    //开始煽动翅膀
    startSwing () {
        if(this.timer) {
            return ''
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % 3;
            this.render();
        }, 200)
    }
    //停止煽动翅膀
    stopSwing () {
        clearInterval(this.timer);
        this.timer = null;
    }
    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration;
    }
    onMove() {
        if(this.top <= 0){
            this.top = 0;
        }else if(this.top >= this.maxY) {
            this.top = this.maxY;
        }
    }
    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`
    }
    //向上跳，直接给一个向上的速度
    jump() {
        this.ySpeed = -450;
    }
}