var genFunc = function* (start) {
    var i = start;

    console.log(yield i + 1);
    console.log(yield i + 2);
    console.log(yield i + 3);

    return i + 4;
};

var genObj = genFunc(10);

var result = genObj.next();
while (!result.done) {
    result = genObj.next(`the result is ${result.value}`);
}

console.log(`final result = ${result.value}`);
