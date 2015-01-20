var arch_nemesis = "Newman";
console.log(`Jerry: Hello, ${arch_nemesis}`);

canvas.addEventListener('click', e => {
    console.log(`click @ (${e.pageX}, ${e.pageY})`);
});

function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

console.log(`3^2 + 4^2 = ${length(3,4)}^2`);

var html = `<p>
    <b>Jerry:</b> Hello, ${arch_nemesis}
</p>`;

console.log(html);
