window.Dom = (function() {

  function removeChildren(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function replaceChildren(parent, children) {
    removeChildren(parent);
    children.forEach(function(child) {
      parent.appendChild(child);
    });
  }

  function textEl(tagName, text) {
    var el = document.createElement(tagName);
    var textEl = document.createTextNode(text);
    el.appendChild(textEl);
    return el;
  }

  var $ = document.querySelector.bind(document);

  return {
    replaceChildren: replaceChildren,
    textEl: textEl,
    $: $
  };

})();