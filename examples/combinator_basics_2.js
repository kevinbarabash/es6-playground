// combinator basics 2

var profile = function(name, fn, ...args) {
    var start = performance.now();
    var result = fn(...args);
    var elapsed = performance.now() - start;
    console.log(`${name}(${args}) took ${elapsed} ms`);

    return result;
};

var fact = function(x) {
    return x !== 0 ? fact(x - 1) * x : 1;
};

console.log(`100! = ${profile("fact", fact, 100)}`);

var add = function(a,b) {
    return a + b;
};

profile("add", add, 5, 10);
