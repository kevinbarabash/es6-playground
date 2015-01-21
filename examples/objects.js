var propName = "y";

var obj = {
    x: 5,
    [propName]: 10, 
    scale(k) {
        this.x *= k;
        this.y *= k;
    },
    get sum() {
        return this.x + this.y;
    }
};

console.log(`obj.sum = ${obj.sum}`);
obj.scale(2);
console.log(`obj.sum = ${obj.sum}`);
