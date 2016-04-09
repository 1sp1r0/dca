(function (global, doc, script_tag_name) {

function _loadJSAsync(src) {
var s = doc.createElement(script_tag_name);
s.async = 1;
s.src = src;
var m = doc.getElementsByTagName(script_tag_name)[0];
m.parentNode.insertBefore(s, m);
}

function _loadJSSync(src) {
var rs = doc.readyState;
if (rs === "loading" || rs === "interactive") {
doc.write('<' + 'script type="text/javascript" src="' + src + '"></' + 'script' + '>');
} else {
_loadJSAsync(src);
}
}

function loadJS(src) {
if (global.UA_Opt && (UA_Opt.Sync === true || UA_Opt.Sync === 1)) {
_loadJSSync(src);
} else {
_loadJSAsync(src);
}
}

loadJS('//af.alicdn.com/js/cj/61.js');

if (global.UA_Opt && !UA_Opt.reload) {
UA_Opt.reload = function () {};
}
global.acjs = 1;

})(window, document, 'script');