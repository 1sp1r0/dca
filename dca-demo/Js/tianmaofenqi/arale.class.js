arale.module("arale.declare",function(){var a=arale,contextStack=[];var safeMixin=function(){var baseClass=arguments[0],clazzs=[].slice.call(arguments,1);
for(var i=0,len=clazzs.length;i<len;i++){var clazz=clazzs[i];a._mixin(baseClass.prototype,clazz.prototype)
}};var getPpFn=function(couns,fn,fnName){var superCouns=couns.superCouns,superProto=superCouns.prototype;
if(fn!==superProto[fnName]){return superProto[fnName]}else{return getPpFn(superCouns,fn,fnName)
}};var getFnName=function(couns,fn){if(fn.fnName){return fn.fnName}var fnName=$H(couns.prototype).keyOf(fn);
if(fnName==null){return getFnName(couns.superCouns,fn)}fn.fnName=fnName;return fnName
};var ConstructorFactory=function(className,parents,proto){var current=a.namespace(className),parent=null;
var couns=function(){this.declaredClass=className;this.init&&this.init.apply(this,arguments);
this.create&&this.create.apply(this,arguments)};if(parents&&arale.isArray(parents)){parent=parents.shift()
}else{parent=parents}parent&&a.inherits(couns,parent);a.augment(couns,proto);couns.prototype.parent=function(){var couns=this.constructor;
var fn=arguments[0].callee;var fnName=getFnName(couns,fn);fn=getPpFn(couns,fn,fnName);
return fn.apply(this,arguments[0])};if(parents&&parents.length>0){safeMixin.apply(null,[couns].concat(parents))
}current._parentModule[current._moduleName]=couns};return ConstructorFactory},"$Declare");(function(){var cache={};arale.tmpl=function tmpl(str,data,opt_context){var fn=!/\W/.test(str)?cache[str]=cache[str]||arale.tmpl(document.getElementById(str).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return data?fn.call(opt_context||window,data):fn}})();arale.module("arale.aspect",(function(arale){var a=arale,aop=arale.aspect,ap=Array.prototype,contextStack=[],context;
var Advice=function(){this.next_before=this.prev_before=this.next_around=this.prev_around=this.next_afterReturning=this.prev_afterReturning=this.next_afterThrowing=this.prev_afterThrowing=this;
this.counter=0};arale.augment(Advice,{add:function(advice){var dyn=a.isFunction(advice),node={advice:advice,dynamic:dyn};
this._add(node,"before","",dyn,advice);this._add(node,"around","",dyn,advice);this._add(node,"after","Returning",dyn,advice);
this._add(node,"after","Throwing",dyn,advice);++this.counter;return node},_add:function(node,topic,subtopic,dyn,advice){var full=topic+subtopic;
if(dyn||advice[topic]||(subtopic&&advice[full])){var next="next_"+full,prev="prev_"+full;
(node[prev]=this[prev])[next]=node;(node[next]=this)[prev]=node}},remove:function(node){this._remove(node,"before");
this._remove(node,"around");this._remove(node,"afterReturning");this._remove(node,"afterThrowing");
--this.counter},_remove:function(node,topic){var next="next_"+topic,prev="prev_"+topic;
if(node[next]){node[next][prev]=node[prev];node[prev][next]=node[next]}},isEmpty:function(){return !this.counter
}});var getDispatcher=function(){return function(){var self=arguments.callee,advices=self.advices,ret,i,a,e,t;
if(context){contextStack.push(context)}context={instance:this,joinPoint:self,depth:contextStack.length,around:advices.prev_around,dynAdvices:[],dynIndex:0};
try{for(i=advices.prev_before;i!=advices;i=i.prev_before){if(i.dynamic){context.dynAdvices.push(a=new i.advice(context));
if(t=a.before){t.apply(a,arguments)}}else{t=i.advice;t.before.apply(t,arguments)}}try{ret=(advices.prev_around==advices?self.target:arale.aspect.proceed).apply(this,arguments)
}catch(e){context.dynIndex=context.dynAdvices.length;for(i=advices.next_afterThrowing;
i!=advices;i=i.next_afterThrowing){a=i.dynamic?context.dynAdvices[--context.dynIndex]:i.advice;
if(t=a.afterThrowing){t.call(a,e)}if(t=a.after){t.call(a)}}throw e}context.dynIndex=context.dynAdvices.length;
for(i=advices.next_afterReturning;i!=advices;i=i.next_afterReturning){a=i.dynamic?context.dynAdvices[--context.dynIndex]:i.advice;
if(t=a.afterReturning){t.call(a,ret)}if(t=a.after){t.apply(a,arguments)}}var ls=self._listeners;
for(i in ls){if(!(i in ap)){ls[i].apply(this,arguments)}}}finally{for(i=0;i<context.dynAdvices.length;
++i){a=context.dynAdvices[i];if(a.destroy){a.destroy()}}context=contextStack.length?contextStack.pop():null
}return ret}};return{advise:function(obj,method,advice){if(typeof obj!="object"){obj=obj.prototype
}var methods=[];if(!(method instanceof Array)){method=[method]}for(var j=0;j<method.length;
++j){var t=method[j];if(t instanceof RegExp){for(var i in obj){if(a.isFunction(obj[i])&&t.test(i)){methods.push(i)
}}}else{if(a.isFunction(obj[t])){methods.push(t)}}}if(!a.isArray(advice)){advice=[advice]
}return arale.aspect.adviseRaw(obj,methods,advice)},adviseRaw:function(obj,methods,advices){if(!methods.length||!advices.length){return null
}var m={},al=advices.length;for(var i=methods.length-1;i>=0;--i){var name=methods[i],o=obj[name],ao=new Array(al),t=o.advices;
if(!t){var x=obj[name]=getDispatcher();x.target=o.target||o;x.targetName=name;x._listeners=o._listeners||[];
x.advices=new Advice;t=x.advices}for(var j=0;j<al;++j){ao[j]=t.add(advices[j])}m[name]=ao
}return[obj,m]},unadvise:function(handle){if(!handle){return}var obj=handle[0],methods=handle[1];
for(var name in methods){var o=obj[name],t=o.advices,ao=methods[name];for(var i=ao.length-1;
i>=0;--i){t.remove(ao[i])}if(t.isEmpty()){var empty=true,ls=o._listeners;if(ls.length){for(i in ls){if(!(i in ap)){empty=false;
break}}}if(empty){obj[name]=o.target}else{var x=obj[name]=d._listener.getDispatcher();
x.target=o.target;x._listeners=ls}}}},getContext:function(){return context},getContextStack:function(){return contextStack
},proceed:function(){var joinPoint=context.joinPoint,advices=joinPoint.advices;for(var c=context.around;
c!=advices;c=context.around){context.around=c.prev_around;if(c.dynamic){var a=context.dynAdvices[context.dynIndex++],t=a.around;
if(t){return t.apply(a,arguments)}}else{return c.advice.around.apply(c.advice,arguments)
}}return joinPoint.target.apply(context.instance,arguments)}}})(arale),"$Aspect");
Aspect=$Aspect;arale.declare("aralex.View",null,{show:function(){this.domNode&&$Node(this.domNode).setStyle("display","block")
},hide:function(){this.domNode&&$Node(this.domNode).setStyle("display","none")}});
arale.declare("aralex.Widget",null,{id:null,domNode:null,init:function(params){},create:function(params){arale.mixin(this,params,true);
this._connects=[];this.actionFilters={};this.beforeCreate.apply(this,arguments);this.initDom.apply(this,arguments);
this.bind.apply(this,arguments);this.postCreate();this._created=true},beforeCreate:function(){},initDom:function(){if(this.id){this.domNode=$(this.id)
}},postCreate:function(){},bind:function(){},addEvent:function(eventType,handler,selector){var handler=$E.delegate(this.domNode,eventType,arale.hitch(this,handler),selector);
this._connects.push(handler)},aroundFn:function(fn){var that=this;var tracer={before:function(){$E.publish(that._getEventTopic(fn,"before"),[].slice.call(arguments))
},after:function(){$E.publish(that._getEventTopic(fn,"after"),[].slice.call(arguments))
}};$Aspect.advise(this,fn,tracer);this.defaultFn(fn)},defaultFn:function(fn){var b="before"+$S(fn).capitalize();
var a="after"+$S(fn).capitalize();this[b]&&this.before(fn,this[b]);this[a]&&this.after(fn,this[a]);
var that=this;var tracer={around:function(){var checkFuncs;if(checkFuncs=that.getActionFilters_(fn)){for(var e in checkFuncs){var isValid=checkFuncs[e];
if(arale.isFunction(isValid)&&!isValid.apply(that,arguments)){return}}}return arale.aspect.proceed.apply(null,arguments)
}};$Aspect.advise(this,fn,tracer)},addActionFilter:function(fn,filter){var id=arale.getUniqueId();
(this.actionFilters[fn]||(this.actionFilters[fn]={}))[id]=filter;return[fn,id]},getActionFilters_:function(fn){return this.actionFilters[fn]
},removeActionFilter:function(handler){if(arale.isArray(handler)){var fn=handler[0],id=handler[1];
if(fn&&arale.isNumber(id)&&arale.isObject(this.actionFilters[fn])){delete this.actionFilters[fn][id]
}}},_getEventTopic:function(fn,phase){return this.declaredClass+"/"+(this.id||1)+"/"+fn+"/"+phase
},before:function(fn,callback){return $E.subscribe(this._getEventTopic(fn,"before"),arale.hitch(this,callback))
},after:function(fn,callback){return $E.subscribe(this._getEventTopic(fn,"after"),arale.hitch(this,callback))
},rmFn:function(handler){$E.unsubscribe(handler)},attr:function(key,value){if((key in this)&&value!==undefined){return(this[key]=value)
}return this[key]},destroy:function(){$A(this._connects).each(function(handler){$E.disConnect(handler)
})}});arale.declare("aralex.TplWidget",aralex.Widget,{onlyWidget:false,srcId:null,parentId:null,data:null,templatePath:null,tmpl:null,tmplReg:/<script\s+type=\"text\/html"\s+id=\"([^"]+)\"[^>]*>([\s\S]*?)<\/script>/g,templateString:null,isUrlDecode:true,initDom:function(){this.tmpl={};
this._initParent();if(!this.id){this._initWidgetId.apply(this,arguments)}if(!this.domNode){this._initDomNode.apply(this,arguments)
}},_initParent:function(){this.parentNode=this.parentId?$(this.parentId):$(document.body)
},_initWidgetId:function(params){if(this.srcId){this.id=this.srcId;return}if(this.domNode){this.id=$(this.domNode).attr("id")
}else{this.id=arale.getUniqueId(this.declaredClass.replace(/\./g,"_"))}},_initDomNode:function(params){this._initTmpl();
this._mixinProperties();this.domNode=$Node($D.toDom(this.templateString));this.domNode.attr("id",this.id);
if(this.srcId){$(this.srcId).replace(this.domNode)}else{this.domNode.inject(this.parentNode.node,"bottom")
}if(this.data){this.renderData(this.data)}},_mixinProperties:function(){this.templateString=$S(this.templateString).substitute(this)
},_initTmpl:function(){var that=this;if(!this.templateString){this.templateString=$Ajax.text(this.templatePath)
}else{if(this.isUrlDecode){this.templateString=$S(this.templateString).urlDecode()
}}var num=0,defaultTmpl;this.templateString=this.templateString.replace(this.tmplReg,function(tmpl,id,tmplContent){that.tmpl[id]=tmplContent;
num++;defaultTmpl=id;return""});if(num==1){this.defaultTmpl=defaultTmpl}},renderData:function(data,tmplId,isReplace){var that=this;
if(tmplId){this._fillTpl(data,tmplId,isReplace)}else{$H(this.tmpl).each(function(tmplId,tmpl,isReplace){that._fillTpl(data,tmplId)
})}},_fillTpl:function(data,tmplId,isReplace){var html=this.getTmplHtml(data,tmplId);
if(isReplace){var id=$(this._getTmplId(tmplId)).attr("id");var node=$D.toDom(html);
$Node(node).attr("id",id);$D.replace($Node(node).node,node)}else{$(this._getTmplId(tmplId)).setHtml(html)
}},_getTmplId:function(tmplId){if(this.onlyWidget){return tmplId}else{return this.id+"_"+tmplId
}},getTmplHtml:function(data,tmplId){var tmpl=this.tmpl[tmplId];return arale.tmpl(tmpl,data,this)
}});arale.declare("aralex.utils.IframeShim",[aralex.Widget,aralex.View],{element:null,shim_:null,display:true,simpleMode:false,postCreate:function(){this.element=$(this.element);
this.refresh();this.domNode=this.shim_;this.shim_.inject(this.element,"bottom");this.display?this.show():this.hide()
},refresh:function(){var style={position:"absolute",zIndex:-1,scrolling:"no",border:"none",filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"};
var $f=this.getIframe_();if(this.simpleMode){style.width="100%";style.height="100%";
style.top=0;style.left=0}else{var pos=this.element.getStyle("position");if(!pos||pos=="static"||pos=="auto"){this.element.setStyle("position","relative")
}var borderLeft=$S(this.element.getStyle("borderLeftWidth")).toInt()||0;var borderRight=$S(this.element.getStyle("borderRightWidth")).toInt()||0;
style.left=-borderLeft+"px";style.top=-borderRight+"px";var size=this.element.getViewportSize();
style.width=size.width+"px";style.height=size.height+"px"}$f.setStyle(style)},getIframe_:function(){if(!this.shim_){var $f=$Node($D.toDom("<iframe></iframe>"));
this.shim_=$f;$f.node.src="javascript:'';";$f.setStyle("zoom",1)}return this.shim_
},dispose:function(){this.shim_&&this.shim_.dispose()}});(function(){function Animator(options){this.setOptions(options);var _this=this;this.timerDelegate=function(){_this.onTimerEvent()
};this.subjects=[];this.target=0;this.state=0;this.lastTime=null}Animator.prototype={setOptions:function(options){this.options=Animator.applyDefaults({interval:20,duration:400,onComplete:function(){},onStep:function(){},transition:Animator.tx.easeInOut},options)
},seekTo:function(to){this.seekFromTo(this.state,to)},seekFromTo:function(from,to){this.target=Math.max(0,Math.min(1,to));
this.state=Math.max(0,Math.min(1,from));this.lastTime=new Date().getTime();if(!this.intervalId){this.intervalId=window.setInterval(this.timerDelegate,this.options.interval)
}},jumpTo:function(to){this.target=this.state=Math.max(0,Math.min(1,to));this.propagate()
},toggle:function(){this.seekTo(1-this.target)},addSubject:function(subject){this.subjects[this.subjects.length]=subject;
return this},clearSubjects:function(){this.subjects=[]},propagate:function(){var value=this.options.transition(this.state);
for(var i=0;i<this.subjects.length;i++){if(this.subjects[i].setState){this.subjects[i].setState(value)
}else{this.subjects[i](value)}}},onTimerEvent:function(){var now=new Date().getTime();
var timePassed=now-this.lastTime;this.lastTime=now;var movement=(timePassed/this.options.duration)*(this.state<this.target?1:-1);
if(Math.abs(movement)>=Math.abs(this.state-this.target)){this.state=this.target}else{this.state+=movement
}try{this.propagate()}finally{this.options.onStep.call(this);if(this.target==this.state){window.clearInterval(this.intervalId);
this.intervalId=null;this.options.onComplete.call(this)}}},play:function(){this.seekFromTo(0,1)
},reverse:function(){this.seekFromTo(1,0)},inspect:function(){var str="#<Animator:\n";
for(var i=0;i<this.subjects.length;i++){str+=this.subjects[i].inspect()}str+=">";
return str}};Animator.applyDefaults=function(defaults,prefs){prefs=prefs||{};var prop,result={};
for(prop in defaults){result[prop]=prefs[prop]!==undefined?prefs[prop]:defaults[prop]
}return result};Animator.makeArray=function(o){if(o==null){return[]}if(!o.length){return[o]
}var result=[];for(var i=0;i<o.length;i++){result[i]=o[i]}return result};Animator.camelize=function(string){var oStringList=string.split("-");
if(oStringList.length==1){return oStringList[0]}var camelizedString=string.indexOf("-")==0?oStringList[0].charAt(0).toUpperCase()+oStringList[0].substring(1):oStringList[0];
for(var i=1,len=oStringList.length;i<len;i++){var s=oStringList[i];camelizedString+=s.charAt(0).toUpperCase()+s.substring(1)
}return camelizedString};Animator.apply=function(el,style,options){if(style instanceof Array){return new Animator(options).addSubject(new CSSStyleSubject(el,style[0],style[1]))
}return new Animator(options).addSubject(new CSSStyleSubject(el,style))};Animator.makeEaseIn=function(a){return function(state){return Math.pow(state,a*2)
}};Animator.makeEaseOut=function(a){return function(state){return 1-Math.pow(1-state,a*2)
}};Animator.makeElastic=function(bounces){return function(state){state=Animator.tx.easeInOut(state);
return((1-Math.cos(state*Math.PI*bounces))*(1-state))+state}};Animator.makeADSR=function(attackEnd,decayEnd,sustainEnd,sustainLevel){if(sustainLevel==null){sustainLevel=0.5
}return function(state){if(state<attackEnd){return state/attackEnd}if(state<decayEnd){return 1-((state-attackEnd)/(decayEnd-attackEnd)*(1-sustainLevel))
}if(state<sustainEnd){return sustainLevel}return sustainLevel*(1-((state-sustainEnd)/(1-sustainEnd)))
}};Animator.makeBounce=function(bounces){var fn=Animator.makeElastic(bounces);return function(state){state=fn(state);
return state<=1?state:2-state}};Animator.tx={easeInOut:function(pos){return((-Math.cos(pos*Math.PI)/2)+0.5)
},linear:function(x){return x},easeIn:Animator.makeEaseIn(1.5),easeOut:Animator.makeEaseOut(1.5),strongEaseIn:Animator.makeEaseIn(2.5),strongEaseOut:Animator.makeEaseOut(2.5),elastic:Animator.makeElastic(1),veryElastic:Animator.makeElastic(3),bouncy:Animator.makeBounce(1),veryBouncy:Animator.makeBounce(3)};
function NumericalStyleSubject(els,property,from,to,units){this.els=Animator.makeArray(els);
if(property=="opacity"&&window.ActiveXObject&&Number(arale.browser.ver())<9){this.property="filter"
}else{this.property=Animator.camelize(property)}this.from=parseFloat(from);this.to=parseFloat(to);
this.units=units!=null?units:"px"}NumericalStyleSubject.prototype={setState:function(state){var style=this.getStyle(state);
var visibility=(this.property=="opacity"&&state==0)?"hidden":"";var j=0;for(var i=0;
i<this.els.length;i++){try{this.els[i].style[this.property]=style}catch(e){if(this.property!="fontWeight"){throw e
}}if(j++>20){return}}},getStyle:function(state){state=this.from+((this.to-this.from)*state);
if(this.property=="filter"){return"alpha(opacity="+Math.round(state*100)+")"}if(this.property=="opacity"){return state
}return Math.round(state)+this.units},inspect:function(){return"\t"+this.property+"("+this.from+this.units+" to "+this.to+this.units+")\n"
}};function ColorStyleSubject(els,property,from,to){this.els=Animator.makeArray(els);
this.property=Animator.camelize(property);this.to=this.expandColor(to);this.from=this.expandColor(from);
this.origFrom=from;this.origTo=to}ColorStyleSubject.prototype={expandColor:function(color){var hexColor,red,green,blue;
hexColor=ColorStyleSubject.parseColor(color);if(hexColor){red=parseInt(hexColor.slice(1,3),16);
green=parseInt(hexColor.slice(3,5),16);blue=parseInt(hexColor.slice(5,7),16);return[red,green,blue]
}if(window.DEBUG){alert("Invalid colour: '"+color+"'")}},getValueForState:function(color,state){return Math.round(this.from[color]+((this.to[color]-this.from[color])*state))
},setState:function(state){var color="#"+ColorStyleSubject.toColorPart(this.getValueForState(0,state))+ColorStyleSubject.toColorPart(this.getValueForState(1,state))+ColorStyleSubject.toColorPart(this.getValueForState(2,state));
for(var i=0;i<this.els.length;i++){this.els[i].style[this.property]=color}},inspect:function(){return"\t"+this.property+"("+this.origFrom+" to "+this.origTo+")\n"
}};ColorStyleSubject.parseColor=function(string){var color="#",match;if(match=ColorStyleSubject.parseColor.rgbRe.exec(string)){var part;
for(var i=1;i<=3;i++){part=Math.max(0,Math.min(255,parseInt(match[i])));color+=ColorStyleSubject.toColorPart(part)
}return color}if(match=ColorStyleSubject.parseColor.hexRe.exec(string)){if(match[1].length==3){for(var i=0;
i<3;i++){color+=match[1].charAt(i)+match[1].charAt(i)}return color}return"#"+match[1]
}return false};ColorStyleSubject.toColorPart=function(number){if(number>255){number=255
}var digits=number.toString(16);if(number<16){return"0"+digits}return digits};ColorStyleSubject.parseColor.rgbRe=/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
ColorStyleSubject.parseColor.hexRe=/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function DiscreteStyleSubject(els,property,from,to,threshold){this.els=Animator.makeArray(els);
this.property=Animator.camelize(property);this.from=from;this.to=to;this.threshold=threshold||0.5
}DiscreteStyleSubject.prototype={setState:function(state){var j=0;for(var i=0;i<this.els.length;
i++){this.els[i].style[this.property]=state<=this.threshold?this.from:this.to}},inspect:function(){return"\t"+this.property+"("+this.from+" to "+this.to+" @ "+this.threshold+")\n"
}};function CSSStyleSubject(els,style1,style2){els=Animator.makeArray(els);this.subjects=[];
if(els.length==0){return}var prop,toStyle,fromStyle;if(style2){fromStyle=this.parseStyle(style1,els[0]);
toStyle=this.parseStyle(style2,els[0])}else{toStyle=this.parseStyle(style1,els[0]);
fromStyle={};for(prop in toStyle){fromStyle[prop]=CSSStyleSubject.getStyle(els[0],prop)
}}var prop;for(prop in fromStyle){if(fromStyle[prop]==toStyle[prop]){delete fromStyle[prop];
delete toStyle[prop]}}var prop,units,match,type,from,to;for(prop in fromStyle){var fromProp=String(fromStyle[prop]);
var toProp=String(toStyle[prop]);if(toStyle[prop]==null){if(window.DEBUG){alert("No to style provided for '"+prop+'"')
}continue}if(from=ColorStyleSubject.parseColor(fromProp)){to=ColorStyleSubject.parseColor(toProp);
type=ColorStyleSubject}else{if(fromProp.match(CSSStyleSubject.numericalRe)&&toProp.match(CSSStyleSubject.numericalRe)){from=parseFloat(fromProp);
to=parseFloat(toProp);type=NumericalStyleSubject;match=CSSStyleSubject.numericalRe.exec(fromProp);
var reResult=CSSStyleSubject.numericalRe.exec(toProp);if(match[1]!=null){units=match[1]
}else{if(reResult[1]!=null){units=reResult[1]}else{units=reResult}}}else{if(fromProp.match(CSSStyleSubject.discreteRe)&&toProp.match(CSSStyleSubject.discreteRe)){from=fromProp;
to=toProp;type=DiscreteStyleSubject;units=0}else{if(window.DEBUG){alert("Unrecognised format for value of "+prop+": '"+fromStyle[prop]+"'")
}continue}}}this.subjects[this.subjects.length]=new type(els,prop,from,to,units)}}CSSStyleSubject.prototype={parseStyle:function(style,el){var rtn={};
if(style.indexOf(":")!=-1){var styles=style.split(";");for(var i=0;i<styles.length;
i++){var parts=CSSStyleSubject.ruleRe.exec(styles[i]);if(parts){rtn[parts[1]]=parts[2]
}}}else{var prop,value,oldClass;oldClass=el.className;el.className=style;for(var i=0;
i<CSSStyleSubject.cssProperties.length;i++){prop=CSSStyleSubject.cssProperties[i];
value=CSSStyleSubject.getStyle(el,prop);if(value!=null){rtn[prop]=value}}el.className=oldClass
}return rtn},setState:function(state){for(var i=0;i<this.subjects.length;i++){this.subjects[i].setState(state)
}},inspect:function(){var str="";for(var i=0;i<this.subjects.length;i++){str+=this.subjects[i].inspect()
}return str}};CSSStyleSubject.getStyle=function(el,property){var style;if(document.defaultView&&document.defaultView.getComputedStyle){style=document.defaultView.getComputedStyle(el,"").getPropertyValue(property);
if(style){return style}}property=Animator.camelize(property);if(el.currentStyle){style=el.currentStyle[property]
}return style||el.style[property]};CSSStyleSubject.ruleRe=/^\s*([a-zA-Z\-]+)\s*:\s*(\S(.+\S)?)\s*$/;
CSSStyleSubject.numericalRe=/^-?\d+(?:\.\d+)?(%|[a-zA-Z]{2})?$/;CSSStyleSubject.discreteRe=/^\w+$/;
CSSStyleSubject.cssProperties=["azimuth","background","background-attachment","background-color","background-image","background-position","background-repeat","border-collapse","border-color","border-spacing","border-style","border-top","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","border-top-width","border-right-width","border-bottom-width","border-left-width","border-width","bottom","clear","clip","color","content","cursor","direction","display","elevation","empty-cells","css-float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","height","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-top","margin-right","margin-bottom","margin-left","max-height","max-width","min-height","min-width","orphans","outline","outline-color","outline-style","outline-width","overflow","padding","padding-top","padding-right","padding-bottom","padding-left","pause","position","right","size","table-layout","text-align","text-decoration","text-indent","text-shadow","text-transform","top","vertical-align","visibility","white-space","width","word-spacing","z-index","opacity","outline-offset","overflow-x","overflow-y"];
function AnimatorChain(animators,options){this.animators=animators;this.setOptions(options);
for(var i=0;i<this.animators.length;i++){this.listenTo(this.animators[i])}this.forwards=false;
this.current=0}AnimatorChain.prototype={setOptions:function(options){this.options=Animator.applyDefaults({resetOnPlay:true},options)
},play:function(){this.forwards=true;this.current=-1;if(this.options.resetOnPlay){for(var i=0;
i<this.animators.length;i++){this.animators[i].jumpTo(0)}}this.advance()},reverse:function(){this.forwards=false;
this.current=this.animators.length;if(this.options.resetOnPlay){for(var i=0;i<this.animators.length;
i++){this.animators[i].jumpTo(1)}}this.advance()},toggle:function(){if(this.forwards){this.seekTo(0)
}else{this.seekTo(1)}},listenTo:function(animator){var oldOnComplete=animator.options.onComplete;
var _this=this;animator.options.onComplete=function(){if(oldOnComplete){oldOnComplete.call(animator)
}_this.advance()}},advance:function(){if(this.forwards){if(this.animators[this.current+1]==null){return
}this.current++;this.animators[this.current].play()}else{if(this.animators[this.current-1]==null){return
}this.current--;this.animators[this.current].reverse()}},seekTo:function(target){if(target<=0){this.forwards=false;
this.animators[this.current].seekTo(0)}else{this.forwards=true;this.animators[this.current].seekTo(1)
}}};function Accordion(options){this.setOptions(options);var selected=this.options.initialSection,current;
if(this.options.rememberance){current=document.location.hash.substring(1)}this.rememberanceTexts=[];
this.ans=[];var _this=this;for(var i=0;i<this.options.sections.length;i++){var el=this.options.sections[i];
var an=new Animator(this.options.animatorOptions);var from=this.options.from+(this.options.shift*i);
var to=this.options.to+(this.options.shift*i);an.addSubject(new NumericalStyleSubject(el,this.options.property,from,to,this.options.units));
an.jumpTo(0);var activator=this.options.getActivator(el);activator.index=i;activator.onclick=function(){_this.show(this.index)
};this.ans[this.ans.length]=an;this.rememberanceTexts[i]=activator.innerHTML.replace(/\s/g,"");
if(this.rememberanceTexts[i]===current){selected=i}}this.show(selected)}Accordion.prototype={setOptions:function(options){this.options=Object.extend({sections:null,getActivator:function(el){return document.getElementById(el.getAttribute("activator"))
},shift:0,initialSection:0,rememberance:true,animatorOptions:{}},options||{})},show:function(section){for(var i=0;
i<this.ans.length;i++){this.ans[i].seekTo(i>section?1:0)}if(this.options.rememberance){document.location.hash=this.rememberanceTexts[section]
}}};arale.animator=window.$Animator=Animator;$Animator.prototype.stop=function(){this.clearSubjects();
return this};$Animator.prototype.addMotion=function(ele,prop,from,to){var obj=function(){};
ele=ele.node?ele.node:ele;switch(arale.typeOf(from)){case"number":obj=new NumericalStyleSubject(ele,prop,from,to);
break;case"string":obj=from.charAt(0)=="#"?new ColorStyleSubject(ele,prop,from,to):new DiscreteStyleSubject(ele,prop,from,to,arguments[4]);
break}this.addSubject(obj);return this};$Animator.prototype.addCSSMotion=function(ele,fromStyle,toStyle){ele=ele.node?ele.node:ele;
this.addSubject(new CSSStyleSubject(ele,fromStyle,toStyle));return this};$Node.fn.fadeTo=function(duration,opacity,callback){var anim=new $Animator({duration:duration,onComplete:function(){callback&&callback()
}});anim.addCSSMotion(this,"opacity:"+opacity);anim.play();return this};$Node.fn.fadeIn=function(duration,callback){var o={opacity:0};
if(this.getStyle("display")=="none"){o.display="block"}return this.setStyle(o).fadeTo(duration,1,callback)
};$Node.fn.fadeOut=function(duration,callback){if(this.getStyle("display")=="none"){return this
}var that=this;return this.setStyle("opacity",1).fadeTo(duration,0,function(){that.setStyle({display:"none",opacity:1});
callback&&callback()})};$Node.fn.hide=function(duration,callback){var display=this.getStyle("display");
if(display=="none"){return}var that=this;if(duration&&arale.isNumber(duration)){var height=this.getStyle("height");
var width=this.getStyle("width");var overflow=this.getStyle("overflow");this.setStyle("overflow","hidden");
var anim=new $Animator({duration:duration,onComplete:function(){that.setStyle({display:"none",width:width,height:height,overflow:overflow});
callback&&callback()}});anim.addCSSMotion(this,"width:0;height:0;");anim.play();return anim
}else{this.setStyle("display","none")}return this};$Node.fn.show=function(duration,callback){var display=this.getStyle("display");
if(display!="none"){return this}var that=this;if(duration&&arale.isNumber(duration)){var height=this.getStyle("height");
var width=this.getStyle("width");var overflow=this.getStyle("overflow");this.setStyle({width:0,height:0,display:"block",overflow:"hidden"});
var anim=new $Animator({duration:duration,onComplete:function(){that.setStyle("overflow",overflow);
callback&&callback()}});anim.addCSSMotion(this,"width:"+width+";height:"+height+";overflow:"+overflow);
anim.play();return anim}else{this.setStyle("display","block")}return this};$Node.fn.slideDown=function(duration,callback){var display=this.getStyle("display");
if(display!="none"){return}var that=this;var height=this.getStyle("height");var of=this.getStyle("overflow");
this.setStyle({height:0,display:"block",overflow:"hidden"});var duration=duration?duration:400;
var anim=new $Animator({duration:duration,onComplete:function(){that.setStyle({overflow:of});
callback&&callback()}});anim.addCSSMotion(this,"height:"+height);anim.play();return this
};$Node.fn.slideUp=function(duration,callback){var display=this.getStyle("display");
if(display=="none"){return}var that=this;var height=this.getStyle("height");var of=this.getStyle("overflow");
this.setStyle({overflow:"hidden"});var duration=duration?duration:400;var anim=new $Animator({duration:duration,onComplete:function(){that.setStyle({display:"none",height:height,overflow:of});
callback&&callback()}});anim.addCSSMotion(this,"height:0");anim.play();return this
}})();Animator=$Animator;arale.declare("aralex.Switchable",[aralex.Widget],{auto:false,triggerId:null,triggerEvent:"click",currentTrigger:0,currentView:0,start:0,activeTriggerClass:"current",activeViewClass:"current",delay:5000,effect:"loop",direction:1,step:1,hoverStop:true,autoTimer:null,useCache:true,init:function(){if(this.useCache){this.cache={}
}},bind:function(){this.hoverStop&&this._hoverStop();this.triggerId&&this.bindTrigger()
},bindTrigger:function(id){id&&(this.triggerId=id);this._autoSwitchTrigger();var h=this._dl(this.triggerId,this.triggerEvent,function(t,i,e){this.switchView(this.getView(t,i))
});h&&this._connects.push(h)},_dl:function(ele,event,callback){ele=$(ele);var t=this;
var h=function(e){var index=-1,target=e.target;var b=$A(t._getChildren(ele)).some(function(v,i){target=v.node;
index=i;return $E._isInDomChain(e.target,v.node,ele.node)});if(b){callback.call(t,target,index,e)
}};return $E.connect(ele,event,h)},getView:function(ele,index){return index},getTrigger:function(target){return target
},_hoverStop:function(){var b=false;this.addEvent("mouseover",function(){if(this.auto){b=true;
this.stop()}});this.addEvent("mouseout",function(){if(b){b=false;this.play()}})},_autoSwitchTrigger:function(){var t=this;
return this.before("switchView",function(from,to){t.switchTrigger(t.getTrigger(to))
})},switchView:function(target){$E.publish(this._getEventTopic("switchView","before"),[this.currentView,target]);
var self=this;this.switchViewEffect(this.currentView,target,function(){$E.publish(self._getEventTopic("switchView","after"),[self.currentView,target]);
self.auto&&self._auto()});self.currentView=target;return this},switchViewEffect:function(from,to,callback){var views=this._getChildren(this.domNode);
var c=views[from],n=views[to],avc=this.activeViewClass;if(avc){c.removeClass(avc);
n.addClass(avc)}callback.apply(this)},switchTrigger:function(target){if(this.currentTrigger==target){return
}$E.publish(this._getEventTopic("switchTrigger","before"),[this.currentTrigger,target]);
var self=this;this.switchTriggerEffect(this.currentTrigger,target,function(){$E.publish(self._getEventTopic("switchTrigger","after"),[self.currentTrigger,target])
});this.currentTrigger=target;return this},switchTriggerEffect:function(from,to,callback){var triggers=this._getChildren(this.triggerId);
var c=triggers[from],n=triggers[to],atc=this.activeTriggerClass;c.removeClass(atc);
n.addClass(atc);callback.apply(this)},postCreate:function(){this.prepare();this.defaultFn("switchTrigger");
this.defaultFn("switchView");if(this.auto){this.play()}},prepare:function(){this.currentView=this.currentTrigger=this.start;
$A(this._getChildren(this.domNode)).each(function(v,i){if(i!=this.currentView){this.activeViewClass&&v.removeClass(this.activeViewClass)
}else{this.activeViewClass&&v.addClass(this.activeViewClass)}},this);this.triggerId&&this.activeTriggerClass&&$A(this._getChildren(this.triggerId)).each(function(v,i){if(i!=this.currentTrigger){v.removeClass(this.activeTriggerClass)
}else{v.addClass(this.activeTriggerClass)}},this)},next:function(step){step=step||1;
var target=this.currentView+step;return this.validIndex_(target)?this.switchView(target):this
},validIndex_:function(target){return(target>=0&&target<=this._getChildren(this.domNode).length-1)
},previous:function(step){step=step||1;var target=this.currentView-step;return this.validIndex_(target)?this.switchView(target):this
},play:function(){this.auto=true;return this._auto()},stop:function(){clearTimeout(this.autoTimer);
this.autoTimer=null;this.auto=false;return this},_auto:function(){var t=this;clearTimeout(this.autoTimer);
this.autoTimer=setTimeout(function(){t.switchView(t.getNextAutoView())},t.delay);
return this},getNextAutoView:function(){var i=this.currentView+this.direction*this.step,b=this._checkViewValid(i);
if(b){return i}switch(this.effect){case"loop":return Math.abs(Math.abs(i)-this._getChildren(this.domNode).length);
case"back":this.direction*=(-1);return this.getNextAutoView();default:break}},_checkViewValid:function(i){if(i<0){return false
}var arr=this._getChildren(this.domNode);if(i>=arr.length){return false}return true
},_getChildren:function(e){e=$(e);if(this.useCache){var b=this.cache[e.attr("id")]||(this.cache[e.attr("id")]=e.nodes());
return b}return e.nodes()},destroy:function(){this.parent(arguments);clearTimeout(this.autoTimer)
}});arale.declare("aralex.slider.ScrollSlider",[aralex.Switchable],{type:"scrollX",duration:500,auto:true,capacity:1,effect:"loop",switchViewEffect:function(from,to,callback){if(from==to){callback();
return}var views=this._getChildren(this.domNode);this._currentAnim&&this._currentAnim.clearSubjects();
var that=this;this._currentAnim=new $Animator({duration:that.duration,interval:20,onComplete:function(){callback.apply(this)
}});var anim=this._currentAnim;var prop=this.type=="scrollY"?"top":"left";anim.addCSSMotion(this.domNode.node,prop+":-"+views[to].node.startPos+"px");
anim.play()},prepare:function(){this.currentView=this.currentTrigger=this.start;var eles=this._getChildren(this.domNode);
var _w=0,prop,style={position:"relative"};if(this.type=="scrollX"){prop="width";style.left=0
}else{if(this.type=="scrollY"){prop="height";style.top=0}}for(var i=0,l=eles.length;
i<l;i++){eles[i].node.startPos=_w;var s=$Node(eles[i]).getStyle(prop);var t=s?$S(s).toInt():$Node(eles[i]).getViewportSize()[prop];
_w+=t}style[prop]=_w+"px";this.domNode.setStyle(style);this.domNode.setStyle(this.type=="scrollX"?"left":"top",-eles[this.start].node.startPos+"px");
this.parent(arguments)},next:function(step){if(this.effect=="persistent"){step=step||1;
var target=this.currentView+step;if(this.validIndex_(this.currentView+step+this.capacity-1)){return this.switchView(target)
}else{this._dealPersistentEffect(1);return this.next(step)}}else{return this.parent(arguments)
}},previous:function(step){if(this.effect=="persistent"){step=step||1;var target=this.currentView-step;
if(this.validIndex_(target)){return this.switchView(target)}else{this._dealPersistentEffect(-1);
return this.previous(step)}}else{return this.parent(arguments)}},getNextAutoView:function(){if(this.effect=="persistent"){var target=this.currentView+this.direction*this.step,b=this.validIndex_(this.direction>0?(target+this.capacity-1):target);
if(b){return target}this._dealPersistentEffect(this.direction);return this.getNextAutoView()
}else{return this.parent(arguments)}},_dealPersistentEffect:function(direction){direction=direction||this.direction;
this.useCache=false;var children=this._getChildren(this.domNode);if(direction>0){var toBeMoved=children.slice(this.currentView),pos="top";
for(var i=toBeMoved.length-1;i>=0;i--){toBeMoved[i].inject(this.domNode,pos)}}else{var toBeMoved=children.slice(0,this.currentView+this.capacity),pos="bottom";
for(var i=0,l=toBeMoved.length;i<l;i++){toBeMoved[i].inject(this.domNode,pos)}}this.start=direction>0?0:children.length-this.capacity;
this.prepare()}});arale.declare("aralex.slider.FadeSlider",[aralex.Switchable],{zIndex:0,duration:800,auto:true,start:0,prepare:function(){this.domNode.setStyle("position","relative");
var arr=this._getChildren(this.domNode);$A(arr).each(function(v,i){v.setStyle({zIndex:this.zIndex-1,position:"absolute",left:0,top:0,opacity:0})
},this);arr[this.start].setStyle({zIndex:this.zIndex,opacity:0.99});this.parent(arguments)
},switchViewEffect:function(from,to,callback){if(from==to){callback();return}var views=this._getChildren(this.domNode),c=views[from],n=views[to];
var that=this;if(this._currentAnim){this._currentAnim.clearSubjects();this.c&&this.c.setOpacity(0);
that.n&&that.n.setStyle({zIndex:that.zIndex+1});that.c&&that.c.setStyle({zIndex:that.zIndex})
}if(!this._currentAnim){this._currentAnim=new $Animator({duration:that.duration,interval:20,onComplete:function(){that.n&&that.n.setStyle({zIndex:that.zIndex+1});
that.c&&that.c.setStyle({zIndex:that.zIndex});callback&&callback()}})}c.setStyle({zIndex:this.zIndex+1});
n.setStyle({zIndex:this.zIndex});this.c=c;this.n=n;n.setOpacity(1);this._currentAnim.addCSSMotion(c.node,"opacity:1","opacity:0");
this._currentAnim.play()}});arale.namespace("alipay.index");
alipay.index.utils={imgAttr:"src,class,id,width,height,alt".split(","),makePic:function(a,e){var b=a.attr("innerHTML"),c=null,f="";if(b)c=D.toDom(S(b).unescapeHTML()),c=$(c);else{c=document.createElement("IMG");c=$(c);for(b=0;b<alipay.index.utils.imgAttr.length;b++)f=alipay.index.utils.imgAttr[b],""!=a.attr("data-"+f)&&c.attr(f,a.attr("data-"+f))}c.inject(a,"before");e&&e(a)},setCookie:function(a,e,b){var b=b||4,c=new Date;c.setTime(c.getTime()+864E5*b);document.cookie=a+"="+escape(e)+";expires="+
c.toGMTString()},getCookie:function(a){a=document.cookie.match(RegExp("(^| )"+a+"=([^;]*)(;|$)"));return null!=a?unescape(a[2]):null},slideUp:function(a,e,b){var c=300;(function(){if(0<c){c-=30;a&&a.setStyle("height",c+"px");var f=setTimeout(arguments.callee,e)}else b(),clearTimeout(f)})()}};
alipay.index.adjust={headLogin:function(a,e){$("headLogin");if(a){$$(".topmenu-item-first")[0].node.innerHTML='<a href="https://lab.alipay.com/user/i.htm" title="\u8fdb\u5165\u6211\u7684\u652f\u4ed8\u5b9d">'+a+"</a>";var b="";if(!e||0>e.indexOf("login/logout.htm"))e+="/login/logout.htm";b=D.toDom('<li class="topmenu-item"><a seed="logout" href="'+e+'">\u9000\u51fa</a></li>');$(b).inject($$(".topmenu-item-dropdown")[0],"after")}},showLoginRecord:0,showLogin:function(){0==alipay.index.adjust.showLoginRecord?
arale.isIE()?($("loginLoading")&&$("loginLoading").dispose(),$("loginIframe")&&$("loginIframe").setStyle("height","297px"),$("loginIframe")&&$("loginIframe").removeClass("fn-hide")):($("loginIframe")&&$("loginIframe").node.contentDocument&&$$(".alieditContainer",$($("loginIframe").node.contentDocument))[0]&&$$(".alieditContainer",$($("loginIframe").node.contentDocument))[0].setStyle("visibility","hidden"),$("loginIframe")&&$("loginIframe").setStyle("opacity","0"),$("loginIframe")&&$("loginIframe").removeClass("fn-hide"),
++alipay.index.adjust.showLoginRecord):($("loginLoading")&&$("loginLoading").dispose(),$("loginIframe")&&$("loginIframe").removeClass("fn-hide"))},heightAdjust:function(){},iframeAdjust:function(a){$("loginIframe").setStyle("top",a+"px")}};
alipay.index.lazyload=function(a,e,b,c){for(var b=b||10,c=c||100,f=function(h){A(h).each(function(h){h&&alipay.index.utils.makePic(h,e.doing)})},g=a.length,j=Math.ceil(g/b),d=0,h=0;h<j;h++)(function(h){var o=h*b,k=(h+1)*b,k=k<g?k:g;setTimeout(function(){f(a.slice(o,k));d++;d==j&&e&&e.done()},c*h)})(h)};alipay.index.lazyloadBanner=function(a){arale.isIE6()||A(a).each(function(a){a.addClass(a.attr("data-class"))})};
alipay.index.randomBank=function(a,e,b){e&&(a&&a.length&&(b=a[Math.floor(a.length*Math.random())]),e.attr("class",b))};alipay.index.banner=function(a,e){var b=alipay.index.utils,c=parseInt(b.getCookie("indexBannerIsShow")||0);$("indexBanner");var f=$$(".banner-expand")[0],g=$$(".banner-fold")[0];c?g&&g.removeClass("fn-hide"):f&&(f.removeClass("fn-hide"),b.setCookie("indexBannerIsShow",1,a),setTimeout(function(){b.slideUp(f,100,function(){f.addClass("fn-hide");g.removeClass("fn-hide")})},e))};
alipay.index.nav=function(){var a=$("J-topmenu-dropdown");E.on(a,"mouseover",function(){a.addClass("topmenu-item-dropdown-hover")});E.on(a,"mouseout",function(){a.removeClass("topmenu-item-dropdown-hover")});var e=$$("#J-nav .nav-item");A(e).each(function(a){E.on(a,"mouseover",function(){a.addClass("nav-item-hover");$$(".nav-item-link",a)[0].addClass("nav-item-link-active");$$(".angle",a)[0]&&($$(".angle",a)[0].setStyle({display:"block"}),$$(".nav-item-sub",a)[0].setStyle({display:"block"}))});E.on(a,
"mouseout",function(){a.removeClass("nav-item-hover");$$(".nav-item-link",a)[0].removeClass("nav-item-link-active");$$(".angle",a)[0]&&($$(".angle",a)[0].setStyle({display:"none"}),$$(".nav-item-sub",a)[0].setStyle({display:"none"}))})})};alipay.index.scroller=function(){$$("#J-views li")[0]&&2<$$("#J-views li").length&&new aralex.slider.ScrollSlider({id:"J-views",type:"scrollY",delay:8E3,capacity:2,effect:"persistent"})};
alipay.index.bannerSlider=function(a){var e="undefined"==typeof a?1E3:a,b=function(){var h=[],a=null,b=function(){for(var b=0;b<h.length;b++)h[b].end?h.splice(b--,1):h[b]();h.length||(clearInterval(a),a=null)};return function(c,e,d,f){var g,j,n,l,m,i=new Image;i.src=c;i.complete?(e.call(i),d&&d.call(i)):(j=i.width,n=i.height,i.onerror=function(){f&&f.call(i);g.end=!0;i=i.onload=i.onerror=null},g=function(){l=i.width;m=i.height;if(l!==j||m!==n||1024<l*m)e.call(i),g.end=!0},g(),i.onload=function(){!g.end&&
g();d&&d.call(i);i=i.onload=i.onerror=null},g.end||(h.push(g),null===a&&(a=setInterval(b,40))))}}(),a=$("banner");"undefined"!=typeof a.node.attributes["data-banner"]&&""!=a.node.attributes["data-banner"]?(a=a.node.attributes["data-banner"].value,a="true"==a?!0:!1):a=!0;if(!a||arale.isIE()&&10>arale.browser.Engine.ie){for(var c=$$("#banner .slide"),f=$$("#banner .bg"),g=$$("#banner .txt"),j=[],d=0;d<c.length;d++)"undefined"!=typeof c[d].node.attributes["data-iebg"]&&""!=c[d].node.attributes["data-iebg"]&&
j.push(c[d].node.attributes["data-iebg"].value);Loader.use("aralex.slider.FadeSlider",function(){var a=new aralex.slider.FadeSlider({id:"J-slide",triggerId:"J-slide-number",triggerEvent:"click",activeTriggerClass:"slide-number-active",delay:8E3});a.stop();b(j[0],function(){f[0].setStyle({backgroundImage:"url("+j[0]+")"});g[0].setStyle({top:"50px"})},function(){a.play();setTimeout(function(){if(arale.isIE()&&arale.browser.Engine.ie<10)for(var a=1;a<c.length;a++){f[a].setStyle({backgroundImage:"url("+
j[a]+")"});g[a].setStyle({top:"50px"})}else for(a=1;a<c.length;a++){f[a].setStyle({backgroundImage:"url("+j[a]+")",opacity:1});g[a].setStyle({opacity:1,left:0,top:"50px"})}},e)},function(){});E.on($$("#J-slide-number a"),"click",function(a){a.preventDefault()})})}else({banner:document.getElementById("banner"),triggers:$$("#J-slide-number a"),slider:$$("#banner .slide"),bg:$$("#banner .bg"),pic:$$("#banner .pic"),txt:$$("#banner .txt"),length:$$("#banner .slide").length,bgArr:[],picArr:[],txtArr:[],
picAmin:[],txtAmin:[],index:1,SLIDE:null,getDataValue:function(a,b,c){return typeof a[b].node.attributes[c]!="undefined"&&a[b].node.attributes[c]!=""?value=a[b].node.attributes[c].value:value=""},getImage:function(a,c,d){var f=this;b(c[d],function(){a[d].setStyle({backgroundImage:"url("+c[d]+")"})},function(){a[d].setAttributes({"data-load":"true"});if(f.getDataValue(f.bg,d,"data-load")=="true"&&f.getDataValue(f.pic,d,"data-load")=="true"&&f.getDataValue(f.txt,d,"data-load")=="true"){f.slider[d].setAttributes({"data-load":"true"});
setTimeout(function(){f.loadNextImg(d)},e)}},function(){})},getNextimg:function(a,c,d){b(c[d],function(){},function(){},function(){})},loadNextImg:function(a){if(a<this.length-1&&this.getDataValue(this.slider,a+1,"data-load")=="false"){this.getNextimg(this.bg,this.bgArr,a+1);this.getNextimg(this.pic,this.picArr,a+1);this.getNextimg(this.txt,this.txtArr,a+1)}},slideTo:function(a){this.index=parseInt(a);if(this.getDataValue(this.slider,this.index-1,"data-load")=="false"){this.getImage(this.bg,this.bgArr,
this.index-1);this.getImage(this.pic,this.picArr,this.index-1);this.getImage(this.txt,this.txtArr,this.index-1)}this.banner.className="slide-"+a;for(d=0;d<this.length;d++){this.txt[d].removeClass("anim-"+this.txtAmin[d]+"-over");this.pic[d].removeClass("anim-"+this.picAmin[d]+"-over");this.triggers[d].removeClass("slide-number-active")}this.txt[this.index-1].addClass("anim-"+this.txtAmin[this.index-1]+"-over");this.pic[this.index-1].addClass("anim-"+this.picAmin[this.index-1]+"-over");this.triggers[this.index-
1].addClass("slide-number-active")},interVal:function(){if(this.getDataValue(this.slider,this.index-1,"data-load")=="true"){if(this.index>=this.length)this.index=0;this.index++;this.slideTo(this.index)}},clearInterVal:function(){clearInterval(this.SLIDE)},init:function(){for(var a=this,b=0;b<a.length;b++){a.bgArr.push(a.getDataValue(a.slider,b,"data-bg"));a.picArr.push(a.getDataValue(a.slider,b,"data-pic"));a.txtArr.push(a.getDataValue(a.slider,b,"data-txt"));a.picAmin.push(a.getDataValue(a.pic,b,
"data-anim"));a.txtAmin.push(a.getDataValue(a.txt,b,"data-anim"))}for(d=0;d<a.triggers.length;d++)a.triggers[d].click(function(b){b.preventDefault();a.slideTo(b.target.innerHTML)});a.SLIDE=setInterval(function(){a.interVal()},8E3);E.on(a.banner,"mouseover",function(){a.clearInterVal()});E.on(a.banner,"mouseout",function(){a.SLIDE=setInterval(function(){a.interVal()},8E3)});a.slideTo(a.index)}}).init()};