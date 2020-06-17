const landDom = document.getElementsByClassName('land')[0];
const landStyles = getComputedStyle(landDom);//获取到大地的样式
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);
class Land extends Rectangle {
    constructor (speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }
    onMove() {
        if(this.left <= -this.width /2) {
            this.left = 0;
        }
    }
}