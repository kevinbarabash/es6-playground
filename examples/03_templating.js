var a = [1,2,3,4,5,6];
console.log(a);

var b = a.filter(i => i % 2);
console.log(b);
console.log("\n");

a.forEach((value, index) => {
    console.log(`a[${index}] = ${value}`);
});
console.log("\n");

var content = "Hello, world";
var html = `<div class="content">
${content}
</div>`;

console.log(html);
