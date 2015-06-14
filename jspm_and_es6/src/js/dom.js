const toString = Object.prototype.toString;
const isString = (obj) => toString.call(obj) == '[object String]';

const boundedWordRegExp = (word) => new RegExp('\\b' + word + '\\b');

const toggleClass = (el, classToToggle) => {
  const className = el.className;
  const classToToggleRegExp = boundedWordRegExp(classToToggle);
  if (classToToggleRegExp.exec(className)) {
    el.className = className.replace(classToToggleRegExp, '').trim();
  }
  else {
    el.className = (`${className} ${classToToggle}`).trim();
  }
}

const addClass = (el, classToAdd) => {
  const className = el.className;
  const classToAddRegExp = boundedWordRegExp(classToAdd);
  if (!classToAddRegExp.exec(className)) {
    el.className = (`${className} ${classToAdd}`).trim();
  }
}

const removeChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

const replaceChildren = (el, children) => {
  removeChildren(el);
  children.forEach((child) => el.appendChild(child));
}

const makeSureItsANode = (elOrText) =>
  isString(elOrText) ? document.createTextNode(elOrText) : elOrText;

const el = (tagName, attributes, children) => {
  const newEl = document.createElement(tagName);
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      newEl[key] = attributes[key];
    });
  }
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    children.forEach((child) => {
      newEl.appendChild(makeSureItsANode(child));
    });
  }
  return newEl;
}

var $ = document.querySelector.bind(document);

export default { toggleClass, addClass, replaceChildren, el, $ };
