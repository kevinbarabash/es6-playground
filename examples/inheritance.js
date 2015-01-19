class Square {
    constructor(x = 0, y = 0, size = 50) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class ColorfulSquare extends Square {
    constructor(x = 0, y = 0, size = 50, color = "red") {
        super(x, y, size);
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        super.draw();
    }
}

var s1 = new Square(100, 100, 75);
var s2 = new ColorfulSquare(200, 150, 100);
var s3 = new ColorfulSquare(150, 200, 125, "blue");

ctx.fillStyle = "black";
s1.draw();
s2.draw();
s3.draw();