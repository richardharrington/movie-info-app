window.Dom = (function() {

  var textNode = document.createTextNode.bind(document);
  var $ = document.querySelector.bind(document);

  function isString(obj) {
    return Object.prototype.toString.call(obj) == '[object String]';
  }

  function removeChildren(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function replaceChildren(el, children) {
    removeChildren(el);
    children.forEach(function(child) {
      el.appendChild(child);
    });
  }

  function makeSureItsANode(elOrText) {
    if (isString(elOrText)) {
      return document.createTextNode(elOrText);
    }
    else {
      return elOrText;
    }
  }

  function el(tagName, attributes, childNodes) {
    var children = childNodes;
    if (!Array.isArray(children)) {
      children = [children];
    }
    var newEl = document.createElement(tagName);
    if (attributes) {
      Object.keys(attributes).forEach(function(key) {
        newEl[key] = attributes[key];
      });
    }
    children.forEach(function(child) {
      newEl.appendChild(makeSureItsANode(child));
    });
    return newEl;
  }

  return {
    replaceChildren: replaceChildren,
    el: el,
    $: $
  };

})();