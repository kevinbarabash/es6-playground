function timeout(duration = 0) {
    if (duration > 1000) throw `${duration}ms is too long`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(duration);
        }, duration);
    });
}

var p = timeout(500).then(() => {
    console.log("do some stuff");
    return timeout(500);
}).then(duration => {
    console.log(`some stuff took ${duration}ms`);
    console.log("do some stuff in parallel");
    return Promise.all([timeout(100), timeout(200)]);
}).then(times => {
    console.log(`parallel stuff took ${times.map(t=>`${t}ms`)}`);
    return timeout(2000);   // should throw
}).catch(err => {
    console.log(err);
});
