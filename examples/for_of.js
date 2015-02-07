var array = [1, 2, 3];

for (let i of array) {
    console.log(`i = ${i}`);
}

// polyfill if necessary
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// querySelectorAll returns a NodeList which is not an array
let selectElements = document.querySelectorAll("select");

for (let { id } of selectElements) {
    console.log(`elem.id = "${id}"`);
}

var list = [[1, "aardvark"], [2, "bear"], [3, "chimp"]];
for (let [id, animal] of list) {
    console.log(`${animal}'s id is ${id}`);
}


// for-of doesn't work with objects
// see https://esdiscuss.org/topic/es6-iteration-over-object-values
//try {
//    var obj = { x:5, y:10 };
//    for (let entry of obj) {
//        // do something with entry
//    }    
//} catch (err) {
//    console.log(err);
//}
