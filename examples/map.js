// map

var users = new Map();

users.set("id_1", { name: "bob" });
users.set("id_2", { name: "zeke" });
users.set("id_3", { name: "lara" });
users.set("id_4", { name: "violet" });
users.set("id_5", { name: "liam" });

for (let id of users.keys()) {
    console.log(id);
}

console.log("\n");

for (let user of users.values()) {
    console.log(user.name);
}

console.log("\n");

for (let [id, { name }] of users.entries()) {
    console.log(`${name}'s id is ${id}`);
}
