onEvent = function(element, event_type, callback, remove) {
  if (element.attachEvent ? (remove ? element.detachEvent("on" + event_type, element[event_type + callback]) : 1) : (remove ? element.removeEventListener(event_type, callback, 0) : element.addEventListener(event_type, callback, 0))) {
    element["e" + event_type + callback] = callback;
    element[event_type + callback] = function() {
      element["e" + event_type + callback](window.event);
    };
    element.attachEvent("on" + event_type, element[event_type + callback]);
  }
};

document.ready = function(callback) {
  "\v" == "v" ? setTimeout(callback, 0) : onEvent(document, "DOMContentLoaded", callback);
};

var element = null;

function defineElement() {
  if (Oned.extendjQuery) {
    element = $("<div>");
    element.addClass("element");
    element.html("This is the oned.js demo HTML element!");
  } else {
    element = document.createElement("div");
    element.className = "element";
    element.innerHTML = "This is the oned.js demo HTML element!";
  }
  element.onAdd(new Function(document.getElementById("on_add").value + ";\ndefineElement();"), true);
};

function addElement() {
  if (Oned.extendjQuery) {
    $("#page_content").append(element);
  } else {
    document.getElementById("page_content").appendChild(element);
  }
};

document.ready(function() {
  var on_add = document.getElementById("on_add");
  on_add.autoResize = function() {
    var self = this;

    var resize = function() {
      var lines = self.value.split("\n");
      var count = lines.length;
      for (var i = 0; i < lines.length; i++) {
        count += parseInt(lines[i].length / 74);
      }
      self.rows = count;
    }

    onEvent(this, "keyup", resize);
    onEvent(this, "input", resize);
    onEvent(this, "beforepaste", resize);
    resize();

    return this;
  }
  on_add.autoResize();
  on_add.focus();
  defineElement();
});