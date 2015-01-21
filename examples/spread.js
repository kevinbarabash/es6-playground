var list = [1,2,3,4,5,6];

var [first, second, ...rest] = list;

console.log("first = " + first);
console.log("second = " + second);
console.log("rest = " + rest.toString());

function add(x, y, z) {
    return x + y + z;
}

var sum = add(...[1, 2, 3]);
console.log(`sum = ${sum}`);
