var arch_nemesis = "Newman";
console.log(`Jerry: Hello, ${arch_nemesis}`);

for (var i = 0; i < 5; i++) {
    console.log(`i = ${i}, i * i = ${i * i}`);
}

var p = { x:5, y:10 };
console.log(`p = (${p.x}, ${p.y})`);

function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

console.log(`3^2 + 4^2 = ${length(3,4)}^2`);

var html = `<p>
    <b>Jerry:</b> Hello, ${arch_nemesis}
</p>`;

console.log(html);
