(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'");}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){window.PhoneBind=function(options){this.options=$.extend({showCancel:false,
show:true,haveTip:false,isBg:true,success:function(){},finish:function(){},error:function(){},cancel:function(){}},options);var browser,version,isIE6;var ua=window.navigator.userAgent;if(/MSIE/.test(ua)){browser="MSIE";version=/MSIE \d+[.]\d+/.exec(ua)[0].split(" ")[1]}isIE6=browser==="MSIE"&&version==="6.0";this.phoneUrl="https://safe.vip.com/phone/bind_phone?showCancel="+this.options.showCancel;this.loginUrl="https://passport.vip.com/login?gotype=2";this.tipsUrl="https://safe.vip.com/phone/bind_tips";
this.iframeBg=$("<div>",{id:"cellphone_bg"}).css({"backgroundColor":"#000","width":isIE6?$(document).width():"100%","height":isIE6?$(document).height():"100%","display":"none","position":isIE6?"absolute":"fixed","opacity":0.7,"top":0,"left":0,"zIndex":200});this.iframe=$("<iframe>",{id:"cellphone_iframe",allowtransparency:true,frameborder:0}).css({"position":isIE6?"absolute":"fixed","top":isIE6?+$(document).scrollTop()+(+$("html").height()-312)/2+"px":"40%","left":"50%","width":"435px","height":"312px",
"border":"medium none","marginLeft":"-217px","marginTop":"-156px","display":"none","zIndex":1E3});this.build();this.initMessager();if(this.options.show){this.show();if(isIE6)this.iframe.attr("src",this.options.haveTip?this.tipsUrl:this.phoneUrl)}};PhoneBind.prototype={constructor:PhoneBind,initMessager:function(){var phoneMessenger,_self=this;phoneMessenger=$.Messenger?new $.Messenger("cellphoneSon","vip.com"):new Messenger("cellphoneSon","vip.com");phoneMessenger.addTarget(this.iframe[0].contentWindow,
"b-p-Helper");phoneMessenger.listen(function(msg){_self.dealWithMsg(msg)});return this},dealWithMsg:function(msg){var _self=this,regular=/^[1][3,4,5,7,8][0-9]{9}$/;if(msg.indexOf("closeDialog")>-1){_self.remove();_self.options.cancel()}else if(msg.indexOf("loginSuccess")>-1){_self.iframe.attr("src",_self.phoneUrl);_self.iframe.css({width:435,height:312})}else if(msg.indexOf("bindPhoneSuccess")>-1){var phone=+msg.split("|")[1];if(regular.test(phone))_self.options.success(phone);else _self.options.success(msg)}else if(msg.indexOf("bindPhoneFinish")>
-1){_self.options.finish(msg);_self.remove()}else if(msg==="vipLogin")_self.toLogin();else if(msg.indexOf("error")>-1)_self.options.error(msg.split("|")[1],msg.split("|")[2]+"|"+msg.split("|")[3]);else if(msg.indexOf("size")>-1){var width=msg.split("|")[1];var height=msg.split("|")[2];_self.iframe.css({width:width,height:height})}else if(regular.test(msg))_self.options.success(msg)},show:function(){this.iframe.show();this.iframeBg.show();return this},hide:function(){this.iframe.hide();this.iframeBg.hide();
return this},remove:function(){this.iframe.remove();this.iframeBg.remove();return this},build:function(){this.options.isBg&&(!$("#cellphone_bg")[0]&&this.iframeBg.appendTo("body"));!$("#cellphone_iframe")[0]&&this.iframe.attr("src",this.options.haveTip?this.tipsUrl:this.phoneUrl).appendTo("body")},toLogin:function(){var _self=this,loginMessenger;loginMessenger=$.Messenger?new $.Messenger("loginDialog","vip.com"):new Messenger("loginDialog","vip.com");loginMessenger.addTarget(this.iframe[0].contentWindow,
"b-p-Helper");loginMessenger.listen(function(msg){_self.dealWithMsg(msg)});_self.iframe.attr("src",this.loginUrl).css({width:474,height:537})}}},{}]},{},[1]);