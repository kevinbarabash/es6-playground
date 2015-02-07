// partial application

var sayHiFirst = function(fn, ...args) {
    console.log("hi!");
    fn(...args);
};

var foo = function(x) {
    console.log(`x = ${x} you foo!`);
};

sayHiFirst(foo, 5);

var partial = function(fn, ...appliedArgs) {
    return function(...remainingArgs) {
        return fn(...appliedArgs, ...remainingArgs);
    }
};

var hiFoo = partial(sayHiFirst, foo);

hiFoo(5);

var hiFoo10 = partial(sayHiFirst, foo, 10);

hiFoo10();

var PROFILING = true;

var profile = function(name, fn, ...args) {
    var result;
    if (PROFILING) {
        var start = performance.now();
        result = fn(...args);
        var elapsed = performance.now() - start;
        console.log(`${name}(${args}) took ${elapsed} ms`);
    } else {
        result = fn(...args);
    }
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


var sub = partial(partial(profile, "sub"), (a, b) => a - b);
console.log(sub(5, 10));

