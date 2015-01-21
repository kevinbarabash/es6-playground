var tags = new Set();

tags.add("dog");
console.log(`tags.has("dog") = ${tags.has("dog")}`);
tags.delete("dog");
console.log(`tags.has("dog") = ${tags.has("dog")}`);

console.log("\n");

var colors = new Set(["blue", "green", "purple", "blue", "green", "orange"]);

for (let color of colors) {
    console.log(color);
}
