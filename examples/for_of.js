var array = [1, 2, 3];

for (let i of array) {
    console.log(`i = ${i}`);
}


// iterating over NodeLists isn't implemented but we can monkey-patch it
// should be able to do the same for things like TouchList too
// option 1:
if (NodeList.prototype[Symbol.iterator] === undefined) {
    NodeList.prototype[Symbol.iterator] = function () {
        var i = 0;
        return {
            next: () => {
                return {done: i >= this.length, value: this.item(i++)};
            }
        }
    };
}

// option 2 (co-opt Array.prototype's iterator method):
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// querySelectorAll returns a NodeList which is not an array
let selectElements = document.querySelectorAll("select");

for (let { id } of selectElements) {
    console.log(`elem.id = ${id}`);
}


// for-of doesn't work with objects
// we could monkey patch using Object.keys but it's not part of 
// the standard
// see https://esdiscuss.org/topic/es6-iteration-over-object-values
try {
    var obj = { x:5, y:10 };
    for (let entry of obj) {
        // do something with entry
    }    
} catch (err) {
    console.log(err);
}
