/**
 * @name HTMLEscape
 * 
 * @param {String} string 
 * 
 * @description - quickly escape strings that coul be interpreted as HTML
 */
export const HTMLEscape = (string) => {
    const tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    const keys = Object.keys(tagsToReplace);
    
    if (typeof string !== 'string') return false;
    string = string.split('');

    return string.reduce(function(acc, curr){
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
 * @name selectorToString
 * 
 * helper for managing selector strings.
 * Treats them in a boolean way if an element is passed in;
 * Stringifies them for use as an html attribute otherwise.
 * 
 * @param {String} string - string to be converted
 * @param {Element} el - element to be converted 
 */
export const selectorProcessor = function(string, el){
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