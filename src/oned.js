if (typeof(Oned) == "undefined") {

// *
// * oned.js {version} (Uncompressed)
// * Trigger callback functions when native HTML or jQuery elements get added to the DOM tree
// *
// * (c) {year} Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, oned.js is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: {date} $
// *

Oned = (function() {
  var extendjQuery = function() {
    if (Oned.extendjQuery) {
      jQuery.fn.onAdd = function() {
        var args = arguments;
        return this.each(function() {
          Oned.addCallback.apply(this, args);
        });
      };
      if (navigator.appName == "Microsoft Internet Explorer") {
        var append = jQuery.fn.append;
        jQuery.fn.append = function(child) {
          var self = this;
          return this.each(function() {
            child.each(function() {
              Oned.addChild.apply(self, [append, this]);
            });
          });
        };
      }
    }
  };

  var extendHTMLElements = function() {
    if (navigator.appName == "Microsoft Internet Explorer") {
      return;
    }

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
        if(typeof(Element) == "undefined") {
          return
        }

        Element.prototype.parents = function() {
          var parents = [];
          if (this.parentNode && this.parentNode != document) {
            parents.push(this.parentNode);
            parents = parents.concat(this.parentNode.parents());
          }
          return parents;
        };

        Element.prototype.onAdd = function() {
          return Oned.addCallback.apply(this, arguments);
        };

        var appendChild = Element.prototype.appendChild;
        Element.prototype.appendChild = function(child) {
          return Oned.addChild.apply(this, [appendChild, child]);
        };

      })(window["HTML" + elements[i] + "Element"]);
    }
  };

  var addCallback = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof(args.slice(-1)[0]) == "boolean" ? args.pop() : typeof(this._onAdds) == "undefined") {
      this._onAdds = [];
    }
    this._onAdds.push({callback: args[0], parent: args[1] || document.documentElement, child: args[2] || this});
    return this;
  };

  var addChild = function(appendChild, child) {
    var result = appendChild.apply(this, [child]);

    if (child._onAdds) {
      var parents = typeof(jQuery) != "undefined" ? jQuery(child).parents() : child.parents();
      if (!parents.indexOf) {
        parents = jQuery.makeArray(parents);
      }
      for (var i = 0; i < child._onAdds.length; i++) {
        var onAdd  = child._onAdds[i];
        var parent = onAdd.parent;

        if ((this == parent) || (parents.indexOf(parent) != -1)) {
          onAdd.callback.apply(onAdd.child, []);
        } else {
          var root = parents.slice(-1)[0];
          root.onAdd(onAdd.callback, onAdd.parent, onAdd.child);
        }
      }
      child._onAdds = null;
    }

    return result;
  };

  return {
    version: "{version}",
    init: function() {
      extendjQuery();
      extendHTMLElements();
    },
    addCallback: addCallback,
    addChild: addChild,
    extendjQuery: typeof(jQuery) != "undefined"
  };
}());

Array.indexOf || (Array.prototype.indexOf = function(v) {
  for (var i = this.length; i-- && this[i] != v;);
  return i;
});

Oned.init();

}