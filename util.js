/**
 * parse string to html entity
 * @see http://w3school.com.cn/tags/html_ref_entities.html
 * @see https://stackoverflow.com/questions/1219860/html-encoding-lost-when-attribute-read-from-input-field
 * @param {String} str
 * @returns {String}
 */
function encodeHTML(str) {
    return str
        .replace(/ /g, '&nbsp;')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * parse html entity to original string
 * @see http://w3school.com.cn/tags/html_ref_entities.html
 * @see https://stackoverflow.com/questions/1219860/html-encoding-lost-when-attribute-read-from-input-field
 * @param {String} str
 * @returns {String}
 */
function decodeHTML(str) {
    return str
        .replace('/&nbsp;/g', ' ',)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

/**
 * get type description of any js type
 * @param obj
 * @returns {String} "Null","Undefined","Boolean","Number","String","Array","Object",
 * "Function","Math","RegExp","Date","Error","Window","Location","Storage","HTMLElement","HTMLDivElement"...
 */
function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * jsonp
 * @param {String} url which suffix=js/css
 * @param onload
 */
function(url, onload) {
    var node = {}
    if (/.+\.css(\?.+)?$/.test(url)) {
        node = document.createElement('link');
        node.setAttribute('rel', 'stylesheet');
        node.setAttribute('href', url);
    }else if (/.+\.js(\?.+)?$/.test(url)) {
        node = document.createElement('script')
        node.setAttribute('src', url)
        node.setAttribute('type','text/javascript')
    } else {
        console.log('jsonp url error')
        return
    }
    if(onload && typeof onload == 'function') {
        node.onload = onload
    }
    document.getElementsByTagName('head')[0].appendChild(node)
}