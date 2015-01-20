let fibonacci = {
    *[Symbol.iterator]() {
        let pre = 0, cur = 1;
        while (true) {
            [pre, cur] = [cur, pre + cur];
            yield cur;
        }
    }
};

for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n);
}
