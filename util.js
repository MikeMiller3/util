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
function jsonp(url, onload) {
    var node = {}
    if (/.+\.css(\?.+)?$/.test(url)) {
        node = document.createElement('link');
        node.setAttribute('rel', 'stylesheet');
        node.setAttribute('href', url);
    } else if (/.+\.js(\?.+)?$/.test(url)) {
        node = document.createElement('script')
        node.setAttribute('src', url)
        node.setAttribute('type', 'text/javascript')
    } else {
        return
    }
    if (onload && typeof onload == 'function') {
        node.onload = onload
    }
    document.getElementsByTagName('head')[0].appendChild(node)
}

/**
 * ajax
 * @param method {String} "GET, POST"
 * @param contentType {String} application/json, application/x-www-form-urlencoded
 * @param url {String}
 * @param param {String}
 * @param success {Function}
 * @param fail {Function}
 */
function ajax(method, contentType, url, param, success, fail) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // for IE6, IE5
        xhr = ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            success && success(xhr.responseText);
        } else {
            fail && fail(xhr.responseText)
        }
    }
    xhr.withCredentials = true;
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", contentType);
    xhr.send(param);
}