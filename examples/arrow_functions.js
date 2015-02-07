// arrow functions

var numbers = [1,2,3,4,5,6];
console.log(numbers);

numbers.forEach((value, index) => {
    console.log(`a[${index}] = ${value}`);
});

var odd = numbers.filter(num => num % 2);
console.log(odd);

var oddSum = numbers
    .filter(num => num % 2)
    .reduce((total, val) => total + val);

console.log(`oddSum = ${oddSum}`);

setTimeout(() => {
    console.log("run after returning control to the event loop");
}, 0);
