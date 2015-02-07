var point = [0.5, 1.0, -0.67];
var [x,y,z] = point;

console.log(`x = ${x}, y = ${y}, z = ${z}`);

function print_range(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    console.log(`range is from ${min} to ${max}.`);
}

print_range(10, -8);
