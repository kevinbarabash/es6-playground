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
    
    var console = document.querySelector("#console");
    var output = document.querySelector("#output");
    var canvasElement = document.querySelector("#canvas");

    [console, output, canvasElement].forEach(function (div) {
        div.style.display = "none";
    });
    
    var dict = {
        console: console,
        output: output,
        canvas: canvasElement
    };
    
    dict[value].style.display = "block";
});


// TODO: add checkboxes to adjust these options
var options = { loose: "classes", runtime: true, modules: "common" };


// TODO: add configuartions to the examples for what it should show firts, whether it should evaluate or not

var examples = [ 
    "templating",
    "arrow",
    "let_const",
    "------",
    "destructuring",
    "rest",
    "spread",
    "------",
    "classes", 
    "inheritance", 
    "event_handlers",
    // TODO: rxjs example
    "------",
    "generator_basics_1",
    "generator_basics_2",
    "iterators",
    "iterators_from_generators",
    "promises",
    "generators_and_promises"
];

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

// TODO: dry this code out
function loadExample(name) {
    if (cache[name]) {
        var code = cache[name];
        editor.setValue(code, 1);
        output.setValue(to5.transform(code, options).code, 1);
        editor.getSession().setScrollTop(0);
        output.getSession().setScrollTop(0);
    } else {
        var path = "../examples/" + name + ".js";

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var code = xhr.responseText;
            cache[name] = code;
            editor.setValue(code, 1);
            output.setValue(to5.transform(code, options).code, 1);
            editor.getSession().setScrollTop(0);
            output.getSession().setScrollTop(0);
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

//editor.getSession().on("changeAnnotation", function() {
//
//    var annot = editor.getSession().getAnnotations();
//    var noErrors = annot.every(function(annot) {
//        return annot.type !== "error";
//    });
//
//    if (noErrors) {
//        
//        
//    }
//});

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
    }
};

editor.getSession().on("change", function () {
    if (autorun) {
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

Object.defineProperty(settings, "autorun", {
    get: function () {
        return autorun;
    },
    set: function (value) {
        autorun = value;
        localStorage.autorun = value;
        if (autorun) {
            runCode();
        }
    }
});

var gui = new dat.GUI();
gui.close();
gui.add(settings, "fontSize", 10, 40).step(1);
gui.add(settings, "autorun");


