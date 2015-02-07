// rest

function createBlogPost(title, content, ...tags) {
    console.log("title = " + title);
    console.log("content = " + content);
    console.log("tags = " + tags.join(", "));
}

createBlogPost(
    "ES6 Rawks!", 
    "Look at all the cool stuff I can do",
    "JavaScript", "Programming"
);

function loggingCombinator(title, fn) {
    return function(...args) {
        console.log(`starting ${title}`);
        fn.apply(null, args);
        console.log(`finished ${title}`);
    };
}

function add_lots_of_numbers(n) {
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += i;
    }
    console.log(`sum = ${sum}`);
}

var add = loggingCombinator("adding", add_lots_of_numbers);
add(1000);
