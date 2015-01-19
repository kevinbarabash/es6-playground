var fontSize = parseInt(localStorage.fontSize || 14);

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
ctx.fillStyle = "red";
ctx.fillRect(100,100,100,100);

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
// TODO: create a virtual console that intercepts console.log() messages
// TODO: add a console window and allow users to switch between ES5 and console
var options = { loose: "classes", runtime: true };


var xhr = new XMLHttpRequest();
xhr.onload = function () {
    var code = xhr.responseText;
    editor.setValue(code, 1);
    output.setValue(to5.transform(code, options).code, 1);
};
xhr.open("GET", "../examples/01_arrow.js", true);
xhr.send();

editor.getSession().on("changeAnnotation", function() {

    var annot = editor.getSession().getAnnotations();
    var noErrors = annot.every(function(annot) {
        return annot.type !== "error";
    });

    if (noErrors) {
        var code = editor.getSession().getValue();
        var transformedCode = to5.transform(code, options).code;
        output.setValue(transformedCode, 1);

        consoleEmulator.clear();
        consoleEmulator.runCode(transformedCode);
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


