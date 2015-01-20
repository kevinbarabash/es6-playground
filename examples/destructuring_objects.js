var size = { width: 100, height: 50 };
var { width, height } = size;
console.log(`width = ${width}, height = ${height}`);

var { width: w, height: h } = size;
console.log(`w = ${w}, h = ${h}`);

function foo(x, y, { add, sub, mul = true }) {
    var results = {};
    if (add) { results.sum = x + y; }
    if (sub) { results.difference = x - y; }
    if (mul) { results.product = x * y; }
    return results;
}

var results = foo(5, 10, { add: true });

var x = 5, y = 10;
var obj = { x, y };
console.log(`obj.x = ${obj.x}, obj.y = ${obj.y}`);
