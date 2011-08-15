Event.on = function(element, event_type, callback, remove) {
  if (element.attachEvent ? (remove ? element.detachEvent("on" + event_type, element[event_type + callback]) : 1) : (remove ? element.removeEventListener(event_type, callback, 0) : element.addEventListener(event_type, callback, 0))) {
    element["e" + event_type + callback] = callback;
    element[event_type + callback] = function() {
      element["e" + event_type + callback](window.event);
    };
    element.attachEvent("on" + event_type, element[event_type + callback]);
  }
};

document.ready = function(callback) {
  "\v" == "v" ? setTimeout(callback, 0) : Event.on(document, "DOMContentLoaded", callback);
};

HTMLTextAreaElement.prototype.autoResize = function() {
  var self = this;

  var resize = function() {
    var lines = self.value.split("\n");
    var count = lines.length;
    for (var i = 0; i < lines.length; i++) {
      count += parseInt(lines[i].length / 74);
    }
    self.style.height = count * 17 + "px";
  }

  Event.on(this, "keypress", resize);
  Event.on(this, "input", resize);
  Event.on(this, "beforepaste", resize);
  resize();

  return this;
};

var element = null;

function defineElement() {
  element = document.createElement("div");
  element.className = "element";
  element.innerHTML = "This is the oned.js demo HTML element!";
  element._onAdds = [];
  element._onAdd(eval("function() {" +
    document.getElementById("on_add").value + ";" +
    "this._onAdds = [];" +
  "}"));
};

function addElement() {
  document.getElementById("page_content").appendChild(element);
};

document.ready(function() {
  var on_add = document.getElementById("on_add");
  on_add.autoResize();
  on_add.focus();
  defineElement();
});