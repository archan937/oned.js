if (typeof(Oned) == "undefined") {

// *
// * oned.js {version} (Uncompressed)
// * Trigger callback functions when native HTML or jQuery elements get added to the DOM tree
// *
// * (c) {year} Paul Engel (archan937)
// * Except otherwise noted, oned.js is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: {date} $
// *

Oned = (function() {
  var foo = null, bar = true;

  var sayHi = function() {
    alert("Hi, my name is oned.js!");
  };

  return {
    version: "{version}",
    init: function() {
      // do something
    },
    sayHi: sayHi
  };
}());

Oned.init();

}