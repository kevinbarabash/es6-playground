var fontSize = 14;

var editor = ace.edit("source");

editor.setTheme("ace/theme/chrome");
editor.setHighlightActiveLine(false);
editor.getSession().setMode("ace/mode/javascript");
editor.setFontSize(fontSize);

//var output = ace.edit("output");
//
//output.setTheme("ace/theme/chrome");
//output.setHighlightActiveLine(false);
//output.getSession().setMode("ace/mode/javascript");
//output.getSession().setUseWorker(false);
//output.setReadOnly(true);
//output.setFontSize(fontSize);

var consoleEmulator = new ConsoleEmulator(document.querySelector("#console"));

// TODO: add checkboxes to adjust these options
// TODO: create a virtual console that intercepts console.log() messages
// TODO: add a console window and allow users to switch between ES5 and console
var options = { loose: "classes", runtime: true };

var xhr = new XMLHttpRequest();
// TODO: error checking
xhr.onload = function () {
    var code = xhr.responseText;
    editor.setValue(code, 1);
    output.setValue(to5.transform(code, options).code, 1);
};
xhr.open("GET", "../examples/01_arrow.js", true);
xhr.send();

editor.getSession().on("changeAnnotation", function(){

    var annot = editor.getSession().getAnnotations();
    var noErrors = annot.every(function(annot) {
        return annot.type !== "error";
    });

    if (noErrors) {
        var code = editor.getSession().getValue();
        output.setValue(to5.transform(code, options).code, 1);
    }
});


var gui = new dat.GUI();

var settings = {};
Object.defineProperty(settings, "fontSize", {
    get: function () {
        return fontSize;
    },
    set: function (value) {
        fontSize = value;
        editor.setFontSize(value);
        output.setFontSize(value);
    }
});

gui.close();

gui.add(settings, "fontSize", 10, 40).step(1);
