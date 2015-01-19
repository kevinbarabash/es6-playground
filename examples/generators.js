function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`timeout completed after ${duration}ms`);
            resolve();
        }, duration);
    });
}

function *generator() {
    console.log("do some stuff");
    yield timeout(500);
    console.log("do some more stuff");
    yield timeout(1000);
    console.log("finish doing stuff");
}

function exec(gen) {
    var result = gen.next();
    if (!result.done) {
        var p = result.value;
        p.then(function () {
            exec(gen);
        });
    }
}

var gen = generator();
exec(gen);

function async(genFunc) {
    var gen = genFunc();
    exec(gen);
}

async(function *() {
    console.log("do some stuff");
    yield Promise.all([
        timeout(500), 
        timeout(1000)
    ]);
    console.log("do some more stuff");
    yield timeout(1500);
    console.log("finish doing stuff");
});

