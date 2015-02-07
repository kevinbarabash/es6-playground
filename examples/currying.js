// currying

var bar = function (x,y,z) {
    console.log(`x * y * z = ${x * y * z}`);
    console.log(`bar was called with ${arguments.length} arguments`);
};

console.log(`bar has ${bar.length} parameters`);
bar(1,2,3);

var curry = function(fn) {
    var peel = function(fn, ...args) {
        return args.length === fn.length ? fn(...args) : arg => peel(fn, ...args, arg);
    };
    return peel(fn);
};

var sum = curry(function (a,b,c) { return a + b + c });
console.log(sum(1)(2)(3));

var result = [1,2,3].map(sum).map(fn => fn(500)).map(fn => fn(10));

console.log(result);
