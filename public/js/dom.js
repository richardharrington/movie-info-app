window.Dom = (function() {

  function isString(obj) {
    return Object.prototype.toString.call(obj) == '[object String]';
  }

  function boundedWordRegExp(word) {
    return new RegExp('\\b' + word + '\\b');
  }

  function toggleClass(el, classToToggle) {
    var className = el.className;
    var classToToggleRegExp = boundedWordRegExp(classToToggle);
    if (className.match(classToToggleRegExp)) {
      el.className = className.replace(classToToggleRegExp, '').trim();
    }
    else {
      el.className = (className + ' ' + classToToggle).trim();
    }
  }

  function addClass(el, classToAdd) {
    var className = el.className;
    var classToAddRegExp = boundedWordRegExp(classToToggle);
    if (!className.match(classToAddRegExp)) {
      el.className = (className + ' ' + classToAdd).trim();
    }
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

  function el(tagName, attributes, children) {
    var newEl = document.createElement(tagName);
    if (attributes) {
      Object.keys(attributes).forEach(function(key) {
        newEl[key] = attributes[key];
      });
    }
    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }
      children.forEach(function(child) {
        newEl.appendChild(makeSureItsANode(child));
      });
    }
    return newEl;
  }

  var $ = document.querySelector.bind(document);

  return {
    toggleClass: toggleClass,
    addClass: addClass,
    replaceChildren: replaceChildren,
    el: el,
    $: $
  };

})();