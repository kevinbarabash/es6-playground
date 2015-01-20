function timeout(duration = 0) {
    if (duration > 1000) throw `${duration}ms is too long`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(duration);
        }, duration);
    });
}

Q.async(function *() {
    try {
        console.log("do some stuff");
        var duration = yield timeout(500);
        console.log(`some stuff took ${duration}`);

        console.log("do some stuff in parallel");
        var times = yield Promise.all([timeout(100), timeout(200)]);
        console.log(`parallel stuff took ${times.map(t=>`${t}ms`)}`);
        
        yield timeout(2000);
    } catch (err) {
        console.log(err);
    }
})();
