this.JSON2||(this.JSON2={}),function(){function e(e){return 10>e?"0"+e:e}function t(t,n){var r=Object.prototype.toString.apply(t);return"[object Date]"===r?isFinite(t.valueOf())?t.getUTCFullYear()+"-"+e(t.getUTCMonth()+1)+"-"+e(t.getUTCDate())+"T"+e(t.getUTCHours())+":"+e(t.getUTCMinutes())+":"+e(t.getUTCSeconds())+"Z":null:"[object String]"===r||"[object Number]"===r||"[object Boolean]"===r?t.valueOf():"[object Array]"!==r&&"function"==typeof t.toJSON?t.toJSON(n):t}function f(e){return i.lastIndex=0,i.test(e)?'"'+e.replace(i,function(e){var t=s[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function c(e,n){var r,i,s,l,p,h=o,v=n[e];switch(v&&"object"==typeof v&&(v=t(v,e)),"function"==typeof u&&(v=u.call(n,e,v)),typeof v){case"string":return f(v);case"number":return isFinite(v)?String(v):"null";case"boolean":case"null":return String(v);case"object":if(!v)return"null";if(o+=a,p=[],"[object Array]"===Object.prototype.toString.apply(v)){for(l=v.length,r=0;l>r;r+=1)p[r]=c(r,v)||"null";return s=0===p.length?"[]":o?"[\n"+o+p.join(",\n"+o)+"\n"+h+"]":"["+p.join(",")+"]",o=h,s}if(u&&"object"==typeof u)for(l=u.length,r=0;l>r;r+=1)"string"==typeof u[r]&&(i=u[r],s=c(i,v),s&&p.push(f(i)+(o?": ":":")+s));else for(i in v)Object.prototype.hasOwnProperty.call(v,i)&&(s=c(i,v),s&&p.push(f(i)+(o?": ":":")+s));return s=0===p.length?"{}":o?"{\n"+o+p.join(",\n"+o)+"\n"+h+"}":"{"+p.join(",")+"}",o=h,s}}var o,a,u,r=(new RegExp("[\x00颅貈-貏軓釣瘁灥鈥�-鈥廫u2028-鈥仩-鈦豢锟�-锟縘","g"),'\\\\\\"\x00--聼颅貈-貏軓釣瘁灥鈥�-鈥廫u2028-鈥仩-鈦豢锟�-锟縘'),i=new RegExp("["+r,"g"),s={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};"function"!=typeof JSON2.stringify&&(JSON2.stringify=function(e,t,n){var r;if(o="",a="","number"==typeof n)for(r=0;n>r;r+=1)a+=" ";else"string"==typeof n&&(a=n);if(u=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return c("",{"":e})})}(),function(e){"use strict";function s(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function u(){var r,e="8.0",t=navigator.userAgent.toLowerCase(),n=t.indexOf("msie")>-1;return n&&(r=t.match(/msie ([\d.]+)/)[1],e>=r)?!0:!1}function f(e){return"undefined"!=typeof e}function l(e){return"string"==typeof e||e instanceof String}function d(){this.key,this.value,this.time=n,this.exps=31536e7,this.ver="v3",this.init=function(e){if(l(e)&&""!=e){var t=e.split(",");return this.ver=t[0],this.key=t[1],this.value=t[2],this.time=parseInt(t[3]),this.exps=parseInt(t[4]),!0}return!1},this.isOutTime=function(){return n-this.time>this.exps},this.toStr=function(){return this.ver+","+this.key+","+this.value+","+this.time+","+this.exps}}function w(e){var t=s({mothed:"err",emsg:e.message,ename:e.name,estock:e.stack},y);C.send(r.trackUrl,t,k)}function b(e){var e=e||"";return e+Math.round(2147483647*(Math.random()||.5))*+new Date%1e10}function k(){function t(t){var n=(new Date).getTime(),r=g.get_Cookie(t),i=null;return r&&r.ver==e&&n-r.value&&n-r.value<6048e5?i=null:(i=new d,i.ver=e,i.key=t,i.value=n),i}function s(){a++,o[a]&&C.send(o[a]+"&p="+i+"&random="+b(),void 0,s)}if("https:"!=p.location.protocol){var e="v3.4",n="cm",r=t(n),i=y.host,o=function(){return"https:"==p.location.protocol?[]:["cm.mjoys.com/qq.html?time="+(new Date).getTime(),"cm.g.doubleclick.net/pixel?google_nid=mjoys&google_cm&google_sc&google_ula="+y.ula,"cm.mjoys.com/tanxr.html?ula="+y.ula,"cm.pos.baidu.com/pixel?dspid=10347221&ext_data=ula="+y.ula,"c.x.cn.miaozhen.com/cm.gif?dspid=11208","cm.mjoys.com/tdmp.gif?dm="+i+"&pvi="+b()+"&si="+b("s")+"&ula="+y.ula]}(),a=-1;r&&(g.setCookie(r),s())}}function _(e){var t=p.createElement("a");return t.href=e,{source:e,protocol:t.protocol.replace(":",""),host:function(e){return e=e.match(/[-a-z0-9]+\.(com|cn|com\.cn|me|org|cc|info|net|net\.cn)(?=$)/gi),e&&e.length>0&&(e=e[0]),e}(t.hostname),port:t.port,query:t.search,params:function(){for(var o,e={},n=t.search.replace(/^\?/,"").split("&"),r=n.length,i=0;r>i;i++)n[i]&&(o=n[i].split("="),e[o[0]]=o[1]);return e}(),file:(t.pathname.match(/\/([^\/?#]+)$/i)||[,""])[1],hash:t.hash.replace("#",""),path:t.pathname.replace(/^([^\/])/,"/$1"),relative:(t.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],segments:t.pathname.replace(/^\//,"").split("/")}}function S(e,n,r){if(e){"string"==typeof e&&(r=n,n=e,e=t);try{if(e===t)return x[n]=x[n]||[],void x[n].unshift(r);e.addEventListener?e.addEventListener(n,r,!1):e.attachEvent&&e.attachEvent("on"+n,r)}catch(i){}}}function T(e){var t=x[e];if(t){for(var n=[],r=arguments,i=1,o=r.length;o>i;i++)n.push(r[i]);for(var a=0,s=t.length;s--;)t[s].apply(this,n)&&a++;return a}}function E(){try{var e,t,n;for(e=0;e<arguments.length;e+=1)n=arguments[e],t=n.shift(),f(q[t])?q[t].push.apply(q[t],n):(n.unshift(t),q["default"].push.apply(q["default"],n))}catch(r){w(r)}}function A(){return{push:E}}function N(e,t){this.name=e,this.fields={},this.url=t||r.trackUrl,q[e]=this}function M(){i&&new Date-o<50||a||(a=!0,D.send("unload"))}var t=e._mjoy||[];if(t instanceof Array){var o,a,t=e._mjoy||[],n=(new Date).getTime(),r={version:"v3.0",trackUrl:"fx.mjoys.com/at.gif"},i=e.attachEvent&&!e.opera,p=function(){var t;try{t=e.top.document}catch(n){if(e.parent)try{v=e.parent.document}catch(r){t=""}}return""===t&&(t=document),t}(),v=function(){var t;try{t=e.top.location.hostname}catch(n){t=e.location.hostname}return t=t.match(/[-a-z0-9]+\.(com|cn|com\.cn|me|org|cc|info|net|net\.cn)(?=$)/gi),t&&t.length>0&&(t=t[0]),t}(),g={values:{},init:function(){var e=this.readCookie("_mj_c");if(null===e){if(null!=this.readCookie("__mj_mid_")&&this.writeCookie([["__mj_mid_",0]],1),null!=this.readCookie("__mj_uv_")&&this.writeCookie([["__mj_uv_",0]],1),null!=this.readCookie("rtb")){var t=new d;t.key="rtb",t.value=this.readCookie("__mj_rtb_"),t.exps=864e5,this.values.rtb=t,this.writeCookie([["__mj_rtb_",0]],1)}if(null!=this.readCookie("cm")){var n=new d;n.key="cm",n.value=this.readCookie("__mj_cm_"),n.ver="v3.4",this.values.cm=n,this.writeCookie([["__mj_cm_",0]],1)}}else{var r=e.split("|");for(var i in r){var o=new d;o.init(r[i])&&(o.isOutTime()||(this.values[o.key]=o))}}this.write()},readCookie:function(e){var t=e||this.rdCookieKey,n=document.cookie.match(new RegExp("(^| )"+t+"=([^;]*)(;|$)"));return null===n?null:unescape(n[2])},writeCookie:function(e,t){if(!u()){for(var r="/",i=new Date,o=t||31536e7,a="",s=0;s<e.length;s++)a=a+e[s][0]+"="+e[s][1]+";";o>0?(i.setTime(i.getTime()+o),p.cookie=a+"expires="+i.toGMTString()+";path="+r+";domain="+v):p.cookie=a+";path="+r+";domain="+v}},write:function(){var e="";for(var t in this.values)e.length>0&&(e+="|"),e+=this.values[t].toStr();e.length>0&&this.writeCookie([["_mj_c",e]])},get_Cookie:function(e){return this.values[e]?this.values[e]:(this.init(),this.values[e]?this.values[e]:null)},setCookie:function(e){this.values[e.key]=e,this.write()}},m=g.get_Cookie("last");null==m&&(m=new d,m.key="last",m.value=0);var y=function(){try{var i,o,a,s,t=navigator,u={},f=e.location;i=f.host,o=f.pathname,a=f.search.substr(1),s=f.hash,a&&function(){for(var e=a.split("&"),t=0,n=e.length;n>t;t++)if(-1!=e[t].indexOf("=")){var r=e[t].indexOf("="),i=e[t].slice(0,r),o=e[t].slice(r+1);u[i]=o}}();var c=p.referrer,l=function(){var e=!1,t=function(e){return _(e).host}(c);t!=v&&(e=!0),n-m.value>18e5&&(e=!0),m.value=n,g.setCookie(m);var r=g.readCookie("_mj_si");return(e||null==r)&&(r=b("si"),g.writeCookie([["_mj_si",r]],-1)),r}();return{host:i,os:t.platform,lang:t.language||t.browserLanguage,inSize:p.body.clientWidth+"x"+p.body.clientHeight,outSize:e.screen.width+"x"+e.screen.height,charset:p.charset||p.characterSet,title:p.title,ver:r.version,keywords:function(){for(var e="",t=0,n=["Keywords","keywords","KeyWords","keyWords"],r=n.length;r>t;t++)for(var i=0,o=p.getElementsByName(n[t]),a=o.length;a>i;i++)e+=o[i].content;return e}(),referer:c,rtbid:function(){var e=u.rtbid||void 0;if(e){var t=new d;return t.key="rtb",t.value=e,t.exps=864e5,g.setCookie(t),e}return e=g.get_Cookie("rtb"),null===e?"":e.value}(),ula:"1910063",si:l}}catch(h){w(h)}}(),C={url:"",query:"",init:function(e){this.query="";for(var t in e)this.query=this.query+"&"+t,void 0!==e[t]&&(this.query=this.query+"="+encodeURIComponent(e[t]))},build_img:function(t){this.url+=-1==this.url.indexOf("?")?"?"+this.query:this.query;var n="at_"+ +new Date,r=e.imgLogData||(e.imgLogData={}),i=r[n]=new Image;i.src=("https:"==p.location.protocol?"https://":"http://")+this.url,i.onload=i.onerror=function(){t&&t.call(),delete r[n]},i=null},post:function(e){function o(){4==t.readyState&&e&&e.call()}var t=!1;try{t=new XMLHttpRequest}catch(n){try{t=new ActiveXObject("MSXML2.XMLHTTP")}catch(r){try{t=new ActiveXObject("Microsoft.XMLHTTP")}catch(i){return}}}null!=t&&(t.open("post",("https:"==p.location.protocol?"https://":"http://")+this.url,!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.send(this.query),t.onreadystatechange=o)},send:function(e,t,n){this.url=e,t&&this.init(t),this.query.length+this.url.length>2e3?this.post(n):this.build_img(n)}},j={encodeChars:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",encode:function(e){return this.baseEncode(this.utf16to8(e))},baseEncode:function(e){var t,n,r,i,o,a;for(r=e.length,n=0,t="";r>n;){if(i=255&e.charCodeAt(n++),n==r){t+=this.encodeChars.charAt(i>>2),t+=this.encodeChars.charAt((3&i)<<4),t+="==";break}if(o=e.charCodeAt(n++),n==r){t+=this.encodeChars.charAt(i>>2),t+=this.encodeChars.charAt((3&i)<<4|(240&o)>>4),t+=this.encodeChars.charAt((15&o)<<2),t+="=";break}a=e.charCodeAt(n++),t+=this.encodeChars.charAt(i>>2),t+=this.encodeChars.charAt((3&i)<<4|(240&o)>>4),t+=this.encodeChars.charAt((15&o)<<2|(192&a)>>6),t+=this.encodeChars.charAt(63&a)}return t},utf16to8:function(e){var t,n,r,i;for(t="",r=e.length,n=0;r>n;n++)i=e.charCodeAt(n),i>=1&&127>=i?t+=e.charAt(n):i>2047?(t+=String.fromCharCode(224|i>>12&15),t+=String.fromCharCode(128|i>>6&63),t+=String.fromCharCode(128|i>>0&63)):(t+=String.fromCharCode(192|i>>6&31),t+=String.fromCharCode(128|i>>0&63));return t}},x={},q=[];N.prototype.push=function(e,t){this.fields[e]=t,T.apply(this,[this.name+".push",e,t])},N.prototype.send=function(e){var t=s({item:j.encode(JSON2.stringify(this.fields))},y);t.mothed=e,t.time=(new Date).getTime()-n,t.time<0&&(t.time=0),C.send(this.url,t)},N.prototype.on=function(e,t){S(this.name+"."+e,t)},new N("default").on("push",function(e,t){"string"==typeof e&&(y[e]=t)});var D=new N("_item");new N("_order").on("push",function(){if(this.fields.order&&!this.fields.order.id){this.fields.order.id=b("o");var e=new d;e.key="od",e.value=this.fields.order.id,e.exps=6e5,g.setCookie(e)}this.send("order")}),new N("_pay").on("push",function(){if(this.fields.order&&!this.fields.order.id){var e=g.get_Cookie("od");e||(e={value:b("o")}),this.fields.order.id=e.value}this.send("pay")}),new N("_andCart").on("push",function(){this.send("addCart")}),new N("_love").on("push",function(){this.send("collect")});for(var L=0;L<t.length;L++)E(t[L]);i&&S(p,"mouseup",function(e){var t=e.target||e.srcElement;1===t.nodeType&&/^ajavascript:/i.test(t.tagName+t.href)&&(o=new Date)}),S(e,"beforeunload",M),S(e,"unload",M),D.send("load"),e._mjoy=t=new A,k()}}(window);
$.Listeners && $.Listeners.pub('vtm_000014.loaded').success();