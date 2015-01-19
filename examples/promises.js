function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`timeout completed after ${duration}ms`);
            resolve();
        }, duration);
    });
}

var p = timeout(500).then(() => {
    console.log("do some stuff");
    return timeout(500);
}).then(() => {
    console.log("do some more stuff");
});

