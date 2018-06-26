/**
 * @name HTMLEscape
 * 
 * @param {String} toEscape 
 * 
 * @description - quickly escape strings that coul be interpreted as HTML
 */
export const HTMLEscape = (toEscape) => {
    if (typeof toEscape !== 'string') return toEscape.toString();
    const tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    const keys = Object.keys(tagsToReplace);
 
    const string = toEscape.split('');

    return string.reduce((acc, curr) => {
            if(keys.indexOf(curr) !== -1) curr = tagsToReplace[curr];
            return acc + curr;
        }, '');
};

/**
 * @name unique
 * 
 * @param { Iterable } list 
 * @param { * } x 
 * 
 * @description - quick and shallow test of item uniqueness in an iterable
 */
export const unique = function(list, x) {
    if (x != "" && list.indexOf(x) === -1) {
        list.push(x);
    }

    return list;
};

/**
 * @name wrap
 * 
 * @param {*} x 
 * @param {Function} func 
 * 
 * @description - wrapper for type prototype methods to be used in array functions
 * 
 */
export const wrap = (func) => {
    return function(x) { return func.apply(x); };
}

/**
 * @name selectorProcessor
 * 
 * helper for managing selector strings.
 * Treats them in a boolean way if an element is passed in;
 * Stringifies them for use as an html attribute otherwise.
 * 
 * @param {String} string - string to be converted
 * @param {Element} el - element to be converted 
 */
export const selectorProcessor = function(string, el){
    if (!!!string) return;
    let selectorAttribute = el ? 0 : '';
    if (string.indexOf('#') !== -1){
        selectorAttribute += el ? el.id.indexOf(string.substring(1)) : '-id-' + string.substring(1);
    } else if (string.indexOf('.') !== -1){
        selectorAttribute +=  el ? el.className.indexOf(string.substring(1)) : '-class-' + string.substring(1);
    } else {
        selectorAttribute += el ? el.nodeName.toLowerCase().indexOf(string) : '-element-' + string;
    }
    return selectorAttribute;
}

/**
 * @name selectorObjectToString
 * 
 * helper for converting Selectors in Store into option strings.
 * Used for mapping over the Selectors state array
 * 
 * @param {Object} obj - a single selector object
 */
export const selectorObjectToString = function(obj){
    let selectorString = '';
    if (obj.type === 'class' && obj.value.indexOf('.') === -1) {
        selectorString = '.' + obj.value;
    } else if (obj.type === 'id' && obj.value.indexOf('#') === -1) {
        selectorString = '#' + obj.value;
    } else {
        selectorString = obj.value.toLowerCase();
    }

    return selectorString;
}


/**
 * @name filterByParentElement
 * 
 * Function to pass to a filter call that looks at an elements ancestors to see if it is contained in a parent.
 * It then 
 * 
 * @param {NodeList} els - the collection of elements to search
 * @param {Node} parent - the parent element in question
 * @param {boolean} include - whether to include or exclude elements contained in the parent
 */
export const filterByParentElement = function(els, parent, include = false){
    
    return els.filter(function(el){
        var isInParent = this.hasParent(el, parent);
        return include ? isInParent : !isInParent;
    });
}

export const hasParent = function(el, parent){
    let isInParent = false;

    while (el !== parent && (el = el.parentElement)) {
        if(el === parent) {
            isInParent = true;
            break;
        }
    }
    return isInParent;
}
/**
 * 
 * @name attributeFormatter
 * 
 * @description - reformat a text string to be used as an html attribute
 * 
 * @param {String} attr - text to format to conform to html attribute conventions
 */
export const attributeFormatter = function(attr) {
    attr = attr.split('-');
    const selectorInfo = {};
    selectorInfo.event = attr[2];
    if (attr.indexOf('class') !== -1){
      let selector = attr.slice(attr.indexOf('class') + 1);
      selectorInfo.value = selector.join('-');
      selectorInfo.type = 'class';
    } else if (attr.indexOf('id') !== -1){
      let selector = attr.slice(attr.indexOf('id') + 1);
      selectorInfo.value = selector.join('-');
      selectorInfo.type = 'id';
    } else {
      selectorInfo.value = selector[selector.length - 1];
      selectorInfo.type = 'id';
    }
    return selectorInfo;
}

/**
 * @name rm
 * 
 * @description - remove an element; call a callback, if provided
 * 
 * @param {Element} elem 
 * @param {Function} callback 
 * @param {Array} args - arguments to be passed to the callback 
 */
export const rm = function(elem, callback, args = []) {
    if(isElem(elem)) {
        elem.parentElement.removeChild(elem); // not sure if this needs to check if parentElement exists.
    } else {
        throw new TypeError('You tried to remove a non-element from the DOM using the rm display helper function.');
    }
    return typeof callback === 'function' ? callback(...args) : elem;
}

/**
 * @name mk
 * 
 * @description - create an element; call a callback, if provided
 * 
 * @param {*} elem 
 * @param {Element} parentEl 
 * @param {Function} callback 
 * @param {Array} args - arguments to be passed to the callback 
 */
export const mk = function(elem, parentEl, callback, args = []) {
    if(!isElem(elem) && typeof elem === 'string'){
        elem = HTMLEscape(elem);
    } else if(!isElem(elem)) {
        throw new TypeError('You tried to append something that couldn\'t be appended using the mk display helper function.');
    }

    if(this.isElem(parentEl)){
        parentEl.appendChild(elem);
    } else {
        throw new TypeError('You tried to append something to a non-element using the mk display helper function.');
    }

    return typeof callback === 'function' ? callback(...args) : elem;
}

/**
 * @name isNode
 * 
 * @param {Object} obj - object to test for Nodeness
 * @returns {Boolean}
 * 
 * credit: https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 */
export const isNode = function(obj){
    return (
        typeof Node === "object" ? o instanceof Node : 
        obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
    );
}
  
/**
 * @name isElem
 * 
 * @param {Object} obj - object to test for Element
 * @returns {Boolean}
 * 
 * credit: https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 */
export const isElem = function(obj){
    return (
        typeof HTMLElement === "object" ? obj instanceof HTMLElement :
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string"
    );
}