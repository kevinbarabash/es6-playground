var fontSize = parseInt(localStorage.fontSize || 14);
var example = localStorage.example || "templating";
var autorun = localStorage.autorun || true;

if (autorun === "true") {
    autorun = true;
} else if (autorun === "false") {
    autorun = false;
}


var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.setHighlightActiveLine(false);
editor.getSession().setMode("ace/mode/javascript");
editor.setFontSize(fontSize);

var output = ace.edit("output");
output.setTheme("ace/theme/chrome");
output.setHighlightActiveLine(false);
output.getSession().setMode("ace/mode/javascript");
output.getSession().setUseWorker(false);
output.setReadOnly(true);
output.setFontSize(fontSize);


// TODO: make this more like ace where you pass in the id
var consoleContainer = document.getElementById("console");
var consoleEmulator = new ConsoleEmulator(consoleContainer);
consoleEmulator.setFontSize(fontSize);


var canvas = document.querySelector("canvas");
canvas.width = consoleContainer.offsetWidth;
canvas.height = consoleContainer.offsetHeight;
var ctx = canvas.getContext("2d");


var listenerObjects = [];
var _addListener = canvas.addEventListener.bind(canvas);
canvas.addEventListener = function(type, listener) {
    _addListener(type, listener);
    listenerObjects.push({ type: type, listener: listener });
};

// TODO start using jQuery
var leftSelector = document.querySelector("#leftSelector");
leftSelector.addEventListener("change", function (e) {
    var value = leftSelector.value;
    
    var consoleElement = document.querySelector("#console");
    var outputElement = document.querySelector("#output");
    var canvasElement = document.querySelector("#canvas");

    [consoleElement, outputElement, canvasElement].forEach(function (div) {
        div.style.display = "none";
    });
    
    var dict = {
        console: consoleElement,
        output: outputElement,
        canvas: canvasElement
    };
    
    dict[value].style.display = "block";
    
    if (value === "output") {
        var code = editor.getSession().getValue();
        var transformedCode = to5.transform(code, options).code;
        output.setValue(transformedCode, 1);
    }
});


// TODO: add checkboxes to adjust these options
var options = { loose: "classes", runtime: true, modules: "common" };


// TODO: add configuartions to the examples for what it should show firts, whether it should evaluate or not

var examples = [
    "templating",
    "let_const",
    "arrow_functions",
    "symbols",
    "default_parameters",
    "------",
    "destructuring_objects",
    "destructuring_arrays",
    "rest",
    "spread",
    "------",
    "for_of",
    "map",
    "set",
    "------",
    "objects",
    "classes",
    "inheritance", 
    "event_handlers",
    "rxjs",
    "------",
    "modules_1",
    "modules_2",
    "modules_3",
    "modules_4",
    "------",
    "generator_basics_1",
    "generator_basics_2",
    "iterators",
    "iterators_from_generators",
    "promises",
    "generators_and_promises",
    "------",
    "combinator_basics_1",
    "combinator_basics_2",
    "partial_application",
    "currying"
];

var defaultOptions = {
    evaluate: true,
    update: true
};

var exampleOptions = {
    modules_1: { evaluate: false },
    modules_2: { evaluate: false },
    modules_3: { evaluate: false },
    modules_4: { evaluate: false },
    promises: { update: false },
    generators_and_promises: { update: false }
};

// destructuring would be useful
var evaluate = defaultOptions.evaluate;
var update = defaultOptions.update;

var exampleSelector = document.querySelector("#exampleSelector");

examples.forEach(function (name) {
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(name));
    if (name === example) {
        option.setAttribute("selected", "");
    }
    exampleSelector.appendChild(option);
});

var cache = {};

var runButton = document.getElementById("runButton");
runButton.addEventListener("click", function () {
    runCode();
});

var leftColumn = document.querySelector("#left");
var rightColumn = document.querySelector("#right");

// TODO: dry this code out
function loadExample(name) {
    evaluate = defaultOptions.evaluate;
    update = defaultOptions.update;
    
    var options = exampleOptions[name];
    if (options) {
        if (options.hasOwnProperty("evaluate")) {
            evaluate = options.evaluate;
        }
        if (options.hasOwnProperty("update")) {
            update = options.update;
        }
    }

    if (evaluate && !update) {
        runButton.style.display = "inline";
    } else {
        runButton.style.display = "none";
    }
    
    if (cache[name]) {
        var code = cache[name];
        editor.setValue(code, 1);
        output.setValue(to5.transform(code, options).code, 1);
        editor.getSession().setScrollTop(0);
        output.getSession().setScrollTop(0);
        if (evaluate && !update) {
            runCode();
        }
    } else {
        var path = "examples/" + name + ".js";

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var code = xhr.responseText;
            cache[name] = code;
            editor.setValue(code, 1);
            output.setValue(to5.transform(code, options).code, 1);
            editor.getSession().setScrollTop(0);
            output.getSession().setScrollTop(0);
            if (evaluate && !update) {
                runCode();
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }
}

loadExample(example);

exampleSelector.addEventListener("change", function (e) {
    var value = exampleSelector.value;

    if (value[0] !== "-") {
        loadExample(value);
        localStorage.example = value;
    } else {
        return false;
    }
});

var runCode = function () {
    try {
        var code = editor.getSession().getValue();
        var transformedCode = to5.transform(code, options).code;
        output.setValue(transformedCode, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        listenerObjects.forEach(function (obj) {
            canvas.removeEventListener(obj.type, obj.listener);
        });
        listenerObjects = [];

        consoleEmulator.clear();
        consoleEmulator.runCode(transformedCode);
    } catch (e) {
        consoleEmulator.clear();
        // TODO: show error message in console
        console.log(e.message);
        consoleEmulator.printError(e.message);
    }
};

editor.getSession().on("change", function () {
    if (evaluate && update) {
        runCode();
    }
});


var settings = {};
Object.defineProperty(settings, "fontSize", {
    get: function () {
        return fontSize;
    },
    set: function (value) {
        fontSize = value;
        editor.setFontSize(value);
        output.setFontSize(value);
        consoleEmulator.setFontSize(value);
        localStorage.fontSize = value;
    }
});


var gui = new dat.GUI();
gui.close();
gui.add(settings, "fontSize", 10, 40).step(1);



var divider = document.querySelector("#divider");
var grabbed = false;
divider.addEventListener("mousedown", function () {
    grabbed = true;
});
document.addEventListener("mousemove", function (e) {
    if (grabbed) {
        e.preventDefault();
        var offsetLeft = leftColumn.offsetLeft;
        var x = e.pageX - offsetLeft;
        var totalWidth = leftColumn.offsetWidth + rightColumn.offsetWidth + 5;
        var leftSize = 100 * (x / totalWidth);
        var rightSize = 100 - leftSize;
        leftColumn.style.width = leftSize.toFixed(3) + "%";
        rightColumn.style.width = rightSize.toFixed(3) + "%";
    }
});
document.addEventListener("mouseup", function () {
    if (grabbed) {
        grabbed = false;
    } 
});
