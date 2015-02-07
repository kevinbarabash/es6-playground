// generator basics

var genFunc = function* (start) {
    var i = start;

    yield i + 1;
    yield i + 2;
    yield i + 3;

    return i + 4;
};

var genObj = genFunc(10);

var result = genObj.next();
while (!result.done) {
    console.log(`result.value = ${result.value}`);
    result = genObj.next();
}

console.log(`final result = ${result.value}`);

for (let value of genFunc(100)) {
    console.log(value);
}
