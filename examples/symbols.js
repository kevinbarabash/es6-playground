// symbols

var firstMixin = {
    log: Symbol("log"),
    addLogging(obj) {
        obj[this.log] = function(msg) {
            console.log(`LOG: ${msg}`);
        };
    }
};

var secondMixin = {
    log: Symbol("log"),
    addLogging(obj) {
        obj[this.log] = function(msg) {
            console.log(`awesome log: ${msg}`);
        };
    }
};

var dog = {
    bark() {
        this[firstMixin.log]("bark");
        this[secondMixin.log]("bark");
    }
};

firstMixin.addLogging(dog);
secondMixin.addLogging(dog);

dog.bark();

console.log(`Object.keys(dog) = ${Object.keys(dog)}`);
