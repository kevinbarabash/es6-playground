// combinator basics 1

var sayHiFirst = function(fn, ...args) {
    console.log("hi!");
    fn(...args);
};

var foo = function(x) {
    console.log(`x = ${x} you foo!`);
};

sayHiFirst(foo, 5);
