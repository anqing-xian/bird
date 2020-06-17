class Rectangle {
    constructor (width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }
    render () {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    move (duration) {
        const xDis = this.xSpeed * duration; //横向的距离
        const yDis = this.ySpeed * duration; //纵向的距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;
        //可能会发生一些事，onMove方法在子类里面定义
        if(this.onMove) {
            //每次移动后渲染前都会调用这个方法
            this.onMove(); //是否存在onMove方法，如果存在，则调用
        }
        this.render(); //重新渲染
    }
}