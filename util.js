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

/**
 * EventUtil
 */
var EventUtil = {}

/**
 * add event binding to an dom element
 * @param el
 * @param type
 * @param handler
 */
EventUtil.bind = function (el, type, handler) {
    if (el.addEventListener) { //use dom2
        el.addEventListener(type, handler, false);
    } else if (el.attachEvent) { //use IE
        el.attachEvent('on' + type, handler)
    } else { //use dom0
        el['on' + type] = handler
    }
}

/**
 * remove event binding to an dom element
 * @param el
 * @param type
 * @param handler
 */
EventUtil.unbind = function (el, type, handler) {
    if (el.removeEventListener) { //use dom2, >=ie9
        el.removeEventListener(type, handler, false);
    } else if (el.detachEvent) { //use IE, <=ie8
        el.detachEvent('on' + type, handler)
    } else { //use dom0
        el['on' + type] = null
    }
}

/**
 * get event
 * @param event
 * @returns {*|Event}
 */
EventUtil.getEvent = function (event) {
    return event || window.event;//ie use window.event
}

/**
 * get event target
 * @param event
 * @returns {string|EventTarget|Node|*|Object}
 */
EventUtil.getTarget = function (event) {
    return event.target || event.srcElement; //ie attr srcElement
}

/**
 * prevent browser default event
 * @param event
 */
EventUtil.preventDefault = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false; //ie, default true
    }
}

/**
 * stop event propagation(capture & bubble)
 * @param event
 */
EventUtil.stopPropagation = function (event) {
    if (event.stopPropagation) { // >=ie9 & others
        event.stopPropagation()
    } else {
        event.cancelBubble = false; //<=ie8 ,default true
    }
}