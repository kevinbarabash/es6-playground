var numbers = [1,2,3,4,5,6];
console.log(numbers);

var odd = numbers.filter(num => num % 2);
console.log(odd);

var oddSum = numbers
    .filter(num => num % 2)
    .reduce((total, val) => total + val);
console.log(`oddSum = ${oddSum}`);

numbers.forEach((value, index) => {
    console.log(`a[${index}] = ${value}`);
});
