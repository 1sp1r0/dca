(function(X,K){var V={version:"0.8.1",enabled:true,debug:false,ratio:1,timeout:3000,timestamp:"-",token:"",serviceUrl:"/service/um.json",enableMod:true,containers:{flash:null,dcp:null},appName:""};var W="string",ac="function",af="https://s.tbcdn.cn/g/security/umflash/fp.swf?v1=1",U=6,F=[10,8,7,3,2];var O=window,Q=O.document,aa=O.navigator,J=0,S=null,G=false,Z=null,M=null,u=false,Y,I=null,E={};var L=function(){Z=Q.getElementById("umData");S=Q.getElementById("umFlash");M=Q.getElementById("umDcp");try{if(M&&typeof M.getHardVersion!="undefined"){I.mod=parseInt(M.getHardVersion().replace(/\./g,""),10)||1}}catch(a){}try{if(!G){G=S&&S.md5}}catch(a){}};var ad=function(){var f=Q.getElementById!=K&&Q.getElementsByTagName!=K&&Q.createElement!=K,j=aa.userAgent.toLowerCase(),q=aa.platform.toLowerCase(),b=q?(/win/).test(q):(/win/).test(j),e=q?(/mac/).test(q):(/mac/).test(j),a=/webkit/.test(j)?parseFloat(j.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,o=/msie/.test(j),m=/opera/.test(j),p=!a&&(/gecko/).test(j),k=function(s,r){return aa.plugins&&aa.plugins[s]&&aa.mimeTypes&&aa.mimeTypes[r]&&aa.mimeTypes[r].enabledPlugin?aa.plugins[s]:false},d=function(r){var s=false;try{s=new ActiveXObject(r)}catch(t){}return s};var h,n,i=[0,0,0],c=0,l=0;if(!!(O.ActiveXObject instanceof Function)){o=true;h=d("ShockwaveFlash.ShockwaveFlash");if(h){try{if((n=h.GetVariable("$version"))){n=n.split(" ")[1].split(",");i=[parseInt(n[0],10),parseInt(n[1],10),parseInt(n[2],10)]}}catch(g){}h=null}h=E.enableMod&&d("Aliedit.EditCtrl");if(h){try{c=1;if(typeof h.alieditVersion!="undefined"){c=parseInt(h.alieditVersion(),10)||1}}catch(g){}h=null}h=E.enableMod&&d("Alim.webmod");if(h){try{l=1;if(typeof h.getHardVersion!="undefined"){l=parseInt(h.getHardVersion().replace(/\./g,""),10)||1}}catch(g){}h=null}}else{o=false;h=k("Shockwave Flash","application/x-shockwave-flash");if(h&&h.description){n=h.description.replace(/^.*\s+(\S+\s+\S+$)/,"$1");i[0]=parseInt(n.replace(/^(.*)\..*$/,"$1"),10);i[1]=parseInt(n.replace(/^.*\.(.*)\s.*$/,"$1"),10);i[2]=/[a-zA-Z]/.test(n)?parseInt(n.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;h=null}h=E.enableMod&&k("Alipay webmod control","application/alidcp");if(h){l=1;h=null}}return{w3:f,flash:i,edit:c,mod:l,wk:a,gk:p,ie:o,win:b,mac:e}},ae=function(){if(!E.debug){return}var b=new Date(),a=b.getSeconds()+"."+b.getMilliseconds()+": "+Array.prototype.slice.call(arguments).join(" | ");if(window.console&&console.log){console.log(a)}else{if(!ae.messages){ae.messages=[]}ae.messages.push(a)}},N=function(){var a=[];return function(b){if(!E.debug){return}if(window.Tracker){Tracker.click("um-"+b)}else{if(b){a.push(b);setTimeout(function(){N(a.shift())},100)}}}}(),H=function(b){for(var c=1,d=arguments.length;c<d;c++){for(var a in arguments[c]){if(arguments[c].hasOwnProperty(a)){b[a]=arguments[c][a]}}}return b},ab=function(b,c,a){if(b.attachEvent){b.attachEvent("on"+c,function(d){a.call(b,d)})}else{if(b.addEventListener){b.addEventListener(c,a,false)}else{b["on"+c]=function(d){a.call(b,d)}}}};ae.flush=function(){if(E.debug&&!(window.console&&console.log)){alert(ae.messages.join("\n"))}};var R=function(){var b=Q.getElementsByTagName("head")[0]||Q.documentElement,a=function(c){var d="_"+parseInt(Math.random()*10000,10)+"_"+new Date().getTime();window[d]=function(f){c(f);b.removeChild(Q.getElementById(d));try{delete window[d]}catch(e){}};return d};return function(f,c,g){var h=false,e=document.createElement("script"),j=a(c),k=f,i;i=[];for(var d in g||{}){i.push(d+"="+encodeURIComponent(g[d]))}i.push("_callback="+j);k+=k.indexOf("?")>0?"&":"?";k+=("xv="+E.version+"&");k+=i.join("&");e.id=j;e.onload=e.onreadystatechange=function(){if(!h&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){h=true;e.onload=e.onreadystatechange=null}};e.src=k;b.insertBefore(e,b.firstChild)}}();X.getStatus=function(a){return a?J:J>=200};X.init=function(a){if(u){return}u=true;try{E=H({},V,a||{})}catch(b){}I=ad();J=1;var c=0;Y=setTimeout(function(){if(J<3){L();c++;if(c<10&&S){N(G?"timeout-flash":"timeout-flash-na");setTimeout(arguments.callee,E.timeout>>1);T();return}else{setTimeout(arguments.callee,200)}}J=201},E.timeout);if(E.debug){X.options=E}if(E.enabled&&(E.ratio<=1||!parseInt(Math.random()*E.ratio,10))){try{P()}catch(b){N("init-error")}}};var T=function(){var c=function(d,e){if(typeof d!="boolean"&&(!d||d=="-")){return"-"}switch(e){case 0:if(typeof d===W){d=d==="true"}result=d?"1":"0";break;case 1:result=parseInt(d,10)||0;break;case 2:d=""+d;result=G&&d.length>32?S.md5(d):d;break;case 3:result=""+d;break;default:result="-";break}return result},a={set:function(h,g){try{S&&S.setCookie(h,g)}catch(f){}try{if(O.localStorage){localStorage[h]=g}}catch(f){}if(aa.cookieEnabled){var d=365*1000*60*60*24;var e=h+"="+encodeURIComponent(g);e+=";expires="+new Date(new Date().getTime()+d).toGMTString();Q.cookie=e}if(I.ie&&Z){Z.setAttribute(h,g);try{Z.save("um")}catch(f){}}},get:function(d,f){var e,j="",k=0;if(f==K){f=255}if(G){try{e=S.getCookie(d)||"";if(!j&&(f&1)){j=e}k+=F[0]}catch(i){}}try{if(O.localStorage){e=localStorage[d]||"";if(!j&&(f&4)){j=e}k+=F[2]}}catch(i){}if(Z){try{Z.load("um")}catch(i){}e=Z.getAttribute(d);if(!j&&(f&8)){j=e}k+=F[3]}if(aa.cookieEnabled){var h=Q.cookie.indexOf(d+"=");if(h!=-1){h+=d.length+1;var g=Q.cookie.indexOf(";",h);if(g==-1){g=Q.cookie.length}e=decodeURIComponent(Q.cookie.substring(h,g))||"";if(!j&&(f&16)){j=e}}k+=F[4]}f==255&&N("points-"+k);j&&f==255&&a.set(d,j);return j},remove:function(e,f){if(f==K){f=255}if(aa.cookieEnabled&&(f&16)){Q.cookie=e+"=;expires=Thu, 01-Jan-70 00:00:01 GMT;"}if(I.ie&&(f&8)&&Z){Z.removeAttribute(e);try{Z.save("um")}catch(d){}}try{(f&4)&&O.localStorage&&localStorage.removeItem(e);(f&1)&&G&&S.setCookie(e,"")}catch(d){}}},b=[{avHardwareDisable:[0,0],hasAudio:[0,0],hasAudioEncoder:[0,0],hasMP3:[0,0],hasPrinting:[0,0],hasStreamingAudio:[0,0],hasStreamingVideo:[0,0],hasVideoEncoder:[0,0],maxLevelIDC:[1,0],pixelAspectRatio:[1,0],screenColor:[2,0],screenDPI:[1,1],screenResolutionX:[1,0],screenResolutionY:[1,0]},{hasAccessibility:[0,0],hasEmbeddedVideo:[0,0],hasScreenBroadcast:[0,0],hasScreenPlayback:[0,0],isDebugger:[0,0],isEmbeddedInAcrobat:[0,0],hasIME:[0,0],hasTLS:[0,0],language:[2,0],languages:[2,0],localFileReadDisable:[0,0],os:[2,0],cookieEnabled:[0,1],platform:[2,1,function(d){if(!d){return""}return d.split(" ").shift()}]},{playerType:[2,0],version:[2,0],userAgent:[2,1],appCodeName:[2,1],appMinorVersion:[2,1],appName:[2,1],appVersion:[2,1],systemLanguage:[2,1],userLanguage:[2,1],browserLanguage:[2,1],manufacturer:[2,0],fonts:[2,0],cpuClass:[2,1]},{width:[1,2],height:[1,2],availWidth:[1,2],availHeight:[1,2],clientWidth:[1,3],clientHeight:[1,3],screenTop:[1,5,function(){return(typeof O.screenLeft=="number")?O.screenLeft:O.screenX}],screenLeft:[1,5,function(){return(typeof O.screenTop=="number")?O.screenTop:O.screenY}],language:[2,1],oscpu:[2,1],location:[3,4,function(d){if(!d){return""}return encodeURIComponent(d.href.slice(0,255))}],timezone:[1,5,function(){var d=new Date();d.setDate(1);d.setMonth(5);var e=-d.getTimezoneOffset();d.setMonth(11);var f=-d.getTimezoneOffset();return Math.min(e,f)}],timestamp:[3,5,function(){return new Date().getTime()}]}];if(V.debug){X.cookie=a;X.ua=I}return function(){if(arguments.callee.invoked||!u){return}arguments.callee.invoked=true;J=3;window.__flash__removeCallback=function(t,s){if(t){t[s]=null}};L();var o={xt:E.token||"",xa:E.appName||"",xh:""},l="_umdata";try{if(E.enableMod&&I.ie&&I.edit){var f=new ActiveXObject("Aliedit.EditCtrl");if(f.UseP){o.xp=f.ci2()}}if(E.enableMod&&I.mod){var h=I.ie?new ActiveXObject("Alim.webmod"):M;if(I.mod>=2001){h.timestamp=E.timestamp||"-"}o.xh=h.ciraw()}}catch(j){N("err-run");if(!o.xp){o.xp=""}if(!o.xh){o.xh=""}}try{for(var n=0;n<4;n++){var i=[],e=[],q=b[n];for(var r in q){q.hasOwnProperty(r)&&i.push(r)}i=i.sort();for(var p=0,k=i.length;p<k;p++){var d=b[n][i[p]],g="";try{switch(d[1]){case 0:g=(G&&S.getCapabilities(i[p]))||"";if(g&&d[2]){g=d[2](g)}break;case 1:g=aa[i[p]]||"";if(g&&d[2]){g=d[2](g)}break;case 2:g=O.screen[i[p]]||"";if(g&&d[2]){g=d[2](g)}break;case 3:g=Q.body[i[p]]||"";if(g&&d[2]){g=d[2](g)}break;case 4:g=O[i[p]]||"";if(g&&d[2]){g=d[2](g)}break;case 5:if(d[2]){g=d[2]()}break}}catch(j){}e.push(c(g,d[0]))}o["x"+n]=e.join("^^")}}catch(j){N("err-read")}var m;try{m=o.xs=a.get(l)}catch(j){N("err-read-s")}J=4;try{R(E.serviceUrl,function(s){Y&&clearTimeout(Y);if(!s||!("id" in s)){J=200}else{J=255;m=s.id;if(m){a.set(l,m)}E.debug&&E.onCompleted&&E.onCompleted(s.id)}},o)}catch(j){}}}();var P=function(){X.flashLoaded=function(){if(arguments.callee.invoked||!u){return}arguments.callee.invoked=true;G=true;T()};var b=function(){var f=I.ie?'<object height="1" width="1" classid="clsid:488A4255-3236-44B3-8F27-FA1AECAA8844" id="umEdit" class="umidWrapper" />':'<embed height="1" width="1" id="umEdit" type="application/aliedit" class="umidWrapper" />';var e=document.createElement("span");e.innerHTML=f;document.body.insertBefore(e.firstChild,document.body.firstChild);e=null},a=function(){var g='<embed height="1" width="1" id="umDcp" type="application/alidcp" class="umidWrapper" />';var e=document.createElement("span");e.innerHTML=g;var f=E.containers.dcp?E.containers.dcp:document.body;f.insertBefore(e.firstChild,f.firstChild);e=null},c=function(){var h=E.flashUrl?E.flashUrl:af;var i="";if(E.proxyUrl){i='<param name="flashVars" value="proxyUrl='+E.proxyUrl+'" />'}var g='<object type="application/x-shockwave-flash" data="'+h+'" width="1" height="1" id="umFlash" class="umidWrapper"><param name="movie" value="'+h+'" /><param name="allowScriptAccess" value="always" />'+i+"</object>";var e=document.createElement("span");e.innerHTML=g;var f=E.containers.flash?E.containers.flash:document.body;f.insertBefore(e.firstChild,f.firstChild);e=null},d=function(){var f='<input type="hidden" id="umData" style="behavior:url("#default#userData")"/>';var e=document.createElement("span");e.innerHTML=f;document.body.insertBefore(e.firstChild,document.body.firstChild);e=null};return function(){if(arguments.callee.invoked||!u){return}arguments.callee.invoked=true;J=2;try{I.ie&&d()}catch(e){N("err-ud")}try{E.enableMod&&!I.ie&&I.mod&&a()}catch(e){N("err-dcp")}if(I.flash[0]>=9){try{c()}catch(e){N("err-fl");T()}}else{N("no-flash");T()}}}()})(window.um={});