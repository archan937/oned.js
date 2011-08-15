if (typeof(Oned) == "undefined") {

// *
// * oned.js 0.1.0 (Uncompressed)
// * Trigger callback functions when native HTML or jQuery elements get added to the DOM tree
// *
// * (c) 2011 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, oned.js is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2011-08-15 22:39:45 +0200 (Mon, 15 August 2011) $
// *

Oned = (function() {
  var extendjQuery = function() {
    if (Oned.extendjQuery) {
      jQuery.fn.onAdd = function(callback, parent) {
        return this.each(function() {
          this._onAdd(callback, parent);
        });
      };
    }
  };

  var extendHTMLElements = function() {
    var elements = ["Anchor"   , "FieldSet", "Image"  , "Object"   , "Style"       ,
                    "Applet"   , "Font"    , "Input"  , "OList"    , "TableCaption",
                    "Area"     , "Form"    , "IsIndex", "OptGroup" , "TableCell"   ,
                    "Base"     , "Frame"   , "Label"  , "Option"   , "TableCol"    ,
                    "Body"     , "FrameSet", "Legend" , "Paragraph", "Table"       ,
                    "BR"       , "Head"    , "LI"     , "Param"    , "TableRow"    ,
                    "Button"   , "Heading" , "Link"   , "Pre"      , "TableSection",
                    "Directory", "HR"      , "Map"    , "Quote"    , "TextArea"    ,
                    "Div"      , "Html"    , "Menu"   , "Script"   , "Title"       ,
                    "DList"    , "IFrame"  , "Meta"   , "Select"   , "UList"];

    for (var i = 0; i < elements.length; i++) {
      (function(Element) {

        Element.prototype.parents = function() {
          var parents = [];
          if (this.parentNode && this.parentNode != document) {
            parents.push(this.parentNode);
            parents = parents.concat(this.parentNode.parents());
          }
          return parents;
        };

        Element.prototype._onAdd = function(callback, parent, child) {
          if (typeof(this._onAdds) == "undefined") {
            this._onAdds = [];
          }
          this._onAdds.push({callback: callback, parent: parent || document.documentElement, child: child || this});
          return this;
        };

        var appendChild = Element.prototype.appendChild;
        Element.prototype.appendChild = function(child) {
          var result = appendChild.apply(this, arguments);

          if (child._onAdds) {
            var parents = this.parents();

            for (var j = 0; j < child._onAdds.length; j++) {
              var onAdd  = child._onAdds[j];
              var parent = onAdd.parent;

              if ((this == parent) || (parents.indexOf(parent) != -1)) {
                onAdd.callback.apply(onAdd.child, []);
              } else {
                var root = parents.slice(-1)[0];
                root._onAdd(onAdd.callback, onAdd.parent, onAdd.child);
              }
            }
            child.onAdd = null;
          }

          return result;
        };

      })(eval("HTML" + elements[i] + "Element"));
    }
  };

  return {
    version: "0.1.0",
    init: function() {
      extendjQuery();
      extendHTMLElements();
    },
    extendjQuery: typeof(jQuery) != "undefined"
  };
}());

Array.indexOf || (Array.prototype.indexOf = function(v) {
  for (var i = this.length; i-- && this[i] != v;);
  return i;
});

Oned.init();

}
