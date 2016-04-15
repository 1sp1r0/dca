var ___sogouPackageName="_SOGOU_CBN";window[___sogouPackageName]=window[___sogouPackageName]||new function(){var a="_SOGOU_CBN_PACKAGE";if(!window[a]){var b=function(a){return"[object Function]"===Object.prototype.toString.call(a)},c={};return c.name="Sogou",this.define=function(a,d,e){var f=[];a.indexOf(".")>-1?f=a.split("."):f.push(a);for(var g=[],h=c,i=0,j=f.length;j-1>i;){if(g.push(f[i]),!h[f[i]])throw new Error("Need to import package "+g.join(".")+" first.");h=h[f[i]],i++}h[f[i]]&&"main"!=f[f.length-1]||(b(d)?h[f[i]]=e?d:new d:e?(h[f[i]]=new Function,h[f[i]].prototype=d):h[f[i]]=d)},this.defineClass=function(a,b){this.define(a,b,!0)},this.require=function(a){var b=[];a.indexOf(".")>-1?b=a.split("."):b.push(a);for(var d=[],e=c,f=0,g=b.length;g>f;){if(d.push(b[f]),!e[b[f]])throw new Error("Package "+d.join(".")+" no find.");e=e[b[f]],f++}return e},window[a]=c,this}},function(a){a.define("cookiebean",{})}(window[___sogouPackageName]),function(a){var b=function(){this.ready_arr=[],this.ready_state=null,("complete"==document.readyState||"interactive"==document.readyState)&&(this.ready_state=!0),this.ready=function(a){this.ready_state?a():this.ready_arr.push(a)},this.has_ready=function(){if(!this.ready_state){("complete"==document.readyState||"interactive"==document.readyState)&&(this.ready_state=!0);for(var a=this.ready_arr,b=0;b<a.length;b++)a[b]()}},document.addEventListener?document.addEventListener("DOMContentLoaded",function(a){return function(){a.has_ready.apply(a)}}(this),!1):document.attachEvent&&document.attachEvent("onreadystatechange",function(a){return function(){a.has_ready.apply(a)}}(this)),this.CookieUtil={get:function(a){var b;try{b=decodeURIComponent(document.cookie)}catch(c){b=document.cookie}for(var d=b.split(/;\s/),e=d.length,f=new Array,g=0;e>g;g++)if(f=d[g].split("="),f[0]==a)return f[1];return""},set:function(a,b,c,d,e,f){var g=encodeURIComponent(a)+"="+encodeURIComponent(b);c instanceof Date&&(g+="; expires = "+c.toGMTString),d&&(g+="; path = "+d),e&&(g+="; domain = "+e),f&&(g+="; secure = "+f),document.cookie=g},unset:function(a,b,c,d){this.set(a,"",new Date(0),b,c,d)}},this.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)},this.isWindow=function(a){var b=!1;try{a&&"object"==typeof a&&a.document&&"setInterval"in a&&(b=!0)}catch(c){b=!1}return b},this.isInCDIF=function(a,b){var c=!1;a=a||window,b=b||window.top,parentWin=a.parent;for(var d=0;(a!=b||a!=a.parent)&&10>d;){if(d++,!this.isWindow(a)||!this.isWindow(a.parent)){c=!0;break}try{a.parent.location.toString()}catch(e){c=!0;break}a=a.parent}return d>=3&&(c=!0),c},this.isInIF=function(a){return a=a||window,a!=window.top&&a!=a.parent},this.getTopWindow=function(a){return a=a||window,this.isInIF(a)&&!this.isInCDIF(a,a.top)&&this.isWindow(a.top)?a.top:a},this.getTopDoc=function(){return this.getTopWindow().document},this.topDoc=this.getTopDoc(),this.getDomain=function(){for(var a=[],b=["com","edu","gov","int","mil","net","org","biz","info","pro","name","museum","coop","aero","xxx","idv","mobi","cc","me","cn"],c="",d=window.location.hostname,e=d.split("."),f=0,g=0,h=e.length;h>g;g++){var i=0,j=h-g-1;if(!f){for(var k=0,l=b.length;l>k;k++)if(e[j]==b[k]){i=1;break}if(i){c="."+e[j]+c;continue}f=1}a.push(e[j])}return a.suffix=c,a},this.getParams=function(){var a=this.topDoc.location.search;if(!(a.length>0))return{};a=a.substring(1);var b={},c=[];a.indexOf("&")>-1?c=a.split("&"):c.push(a);for(var d=0,e=c.length;e>d;d++){var f=c[d].split("=");b[f[0]]=f[1]}return b},this.params=this.getParams(),this.bind=function(a,b,c){return b=b.replace(/^on/i,"").toLowerCase(),a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c),a},this.json2str=function(a){if(this.isArray(a)){for(var b="[",c=0;c<a.length;c++)b+=this.json2str(a[c])+",";return b.length>1&&(b=b.slice(0,b.length-1)),b+="]"}if("[object Object]"!=Object.prototype.toString.call(a))return'"'+a.toString()+'"';var b="{";for(var d in a)"object"==typeof a[d]?(b=b+'"'+d+'":'+this.json2str(a[d]),b+=","):(b+='"'+d+'":"'+a[d].toString()+'"',b+=",");return b.length>1&&(b=b.slice(0,b.length-1)),b+="}"},this.pingback=function(a,b,c){if(a){var d="";if(d=b?a+"?"+b:a,0!=c||0!=c){var e=new Image;e.src=d,document.sg_dsp_pb||(document.sg_dsp_pb=[]),document.sg_dsp_pb.push(e)}else document.write('<img src="'+d+'" style="width:0;height:0;display:none;border:none;margin:0">')}}};a.define("Util",b)}(window[___sogouPackageName]),function(a){var b={c_url:{http:"http://dsp.brand.sogou.com/cookiebean",https:"https://data.sogou.com/cookiebean"},t_url:{http:"http://dsp.brand.sogou.com/cookietag",https:"https://data.sogou.com/cookietag"},q_url:{http:"http://cm.e.qq.com/cm.fcg?a=1534219743",https:null},scid:"SCID",seid:"SEID",dtrb:1};a.define("cookiebean.config",b)}(window[___sogouPackageName]),function(a){var b=function(){var b={U:a.require("Util"),C:a.require("cookiebean.config"),tm:{set:"default",get:function(){return(new Date).getTime()},encode:!1},ref:{set:"default",get:function(){var a=this.get("mi"),b="";if(0==a)b=document.referrer;else if(1==a||4==a)try{b=window.top.document.referrer}catch(c){b=""}return b},encode:!0},url:{set:"default",get:function(){var a=this.get("mi"),b="";if(0==a)b=document.location.href;else if(1==a||4==a)try{b=window.top.document.location.href}catch(c){b=""}else(2==a||3==a)&&(b=document.referrer);return b},encode:!0},ti:{set:"default",get:function(){var a=this.get("mi"),b="";if(0==a)b=document.title;else if(1==a||4==a)try{b=window.top.document.title}catch(c){b=""}return b},encode:!0},mi:{set:"default",get:function(){if(void 0!=this.mi._value)return this.mi._value;var a=function(){return top==self?0:top==window.parent?1:2},b=function(a){if(!a)return"";var b=a.split(".");if(b.length<=2)return a;var c=2;return("com"==b[b.length-2]||"net"==b[b.length-2]||"org"==b[b.length-2])&&(c+=1),b.splice(0,b.length-c),b.join(".")},c=function(){ret=-1,mi=a();var c=window.location.host,d=document.referrer||"",e="";if(d)var e=/^(http:\/\/|https:\/\/)+?([^\/]*)/.exec(d)[2];else try{e=window.parent.location.host}catch(f){}if(0==mi)ret=0;else if(1==mi)ret=e==c?1:b(e)==b(c)?2:3;else if(2==mi){for(var g=0,h=window,i=window,j=1,k=[];10>g;){k.push(h),h=h.parent;try{{h.document.title}}catch(f){if(k.length>=1){var i=k[k.length-1],e=/^(http:\/\/|https:\/\/)+?([^\/]*)/.exec(i.document.referrer)[2];if(b(e)==b(i.location.host)){ret=6;break}if(k.length>=2){var i=k[k.length-2];if(i.location.host==i.parent.location.host){ret=7;break}ret=8;break}}ret=9;break}if(h.location.host!=self.location.host&&(j=0),h==window.top)break;g++}10==g?ret=10:ret>5?ret=ret:j?ret=4:j||(ret=5)}return ret<0&&(ret=15),ret};return this.mi._value=c(),this.mi._value},encode:!0},set:function(a,b){if(this[a].set&&"default"!=this[a].set){var c=Array.prototype.slice.call(arguments,0);c.shift(),this[a]._value=this[a].set.apply(this,c)}else this[a]._value=b},get:function(a){var b=null;if(void 0==this[a]._value||this[a].nosave)if(this[a].get&&"default"!=this[a].get){var c=Array.prototype.slice.call(arguments,0);c.shift(),b=this[a].get.apply(this,c),this[a]._value=b}else b=this[a]._value||"";else b=this[a]._value;return this[a].encode&&(b=encodeURIComponent(b)),b},serialize:function(){var a=[];for(k in this)this[k].get&&!this[k].not_send&&a.push(k+"="+this.get(k));return a.join("&")},expand:function(a){for(k in a)this[k]?this[k]._value=a[k]:(this[k]={},this[k]._value=a[k],this[k].get="default",this[k].set="default",this[k].encode=!1)}};return b};a.defineClass("cookiebean.params",b)}(window[___sogouPackageName]),function(a){var b=function(){var b=a.require("Util"),c=a.require("cookiebean.config"),d=a.require("cookiebean"),e=new d.params,f=document.location.protocol,g="";if(g="https:"==f?"https":"http",b.ready(function(){b.pingback(c.q_url[g]),b.pingback(c.c_url[g],"sdid="+sg_dsp_id+"&"+e.serialize(e))}),window.sg_dsp_data&&window.sg_dsp_id)for(var h=sg_dsp_data.length,i=0;h>i;i++){var j=sg_dsp_data[i];b.ready(j.sg_click?function(){b.pingback(c.t_url[g],"id="+sg_dsp_id+"&data="+encodeURIComponent(b.json2str(j.data))+"&"+e.serialize(e))}:function(){b.pingback(c.t_url[g],"id="+sg_dsp_id+"&data="+encodeURIComponent(b.json2str(j.data))+"&"+e.serialize(e))})}};a.define("cookiebean.main",b)}(window[___sogouPackageName]);
$.Listeners && $.Listeners.pub('vtm_000025.loaded').success();