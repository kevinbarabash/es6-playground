class Point {
    constructor(x,y) {
        Object.assign(this, { x, y });
    }

    toString() { return `(${this.x}, ${this.y})`; }
}

function pointFromEvent(e) {
    return new Point(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function random(max) {
    return max * Math.random() | 0;
}

var randomColor = function() {
    var [r,g,b] = [255,255,255].map(random);
    return `rgb(${r}, ${g}, ${b})`;
};

function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

ctx.lineWidth = 10;
ctx.lineCap = "round";

var downs = Rx.Observable.fromEvent(canvas, "mousedown").map(pointFromEvent);
var moves = Rx.Observable.fromEvent(canvas, "mousemove").map(pointFromEvent);
var ups = Rx.Observable.fromEvent(canvas, "mouseup").map(pointFromEvent);

downs.subscribe(down => {
    ctx.strokeStyle = randomColor();
    var drags = moves.takeUntil(ups);
    var pairs = Rx.Observable.zip(drags, drags.skip(1), (p1, p2) => [p1, p2]);
    pairs.subscribe(pair => drawLine(...pair));
});
