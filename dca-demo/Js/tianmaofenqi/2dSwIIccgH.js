define(function(require,exports,module){require("arale/easing/1.0.0/easing");try{OS.Csaccurate={dataSupportAjaxURL:OS.server.cschannelServer+"/dataSupport.json",dataUseAjaxURL:OS.server.cschannelServer+"/dataUse.json",alreadyShow:false,CSAContainerDOM:function(){DOM='<div class="CSA-container" style="display:none">                            <input type="hidden" name="onlineServiceToken" value="" />                            <input type="hidden" name="onlineServicePointId" value="" />                            <div class="CSA-header">                                以下问题可能是您关心的：                                <a class="CSA-close" href="#" title="关闭">×</a>                            </div>                            <div class="CSA-info">                                <div class="CSA-loading"><img src=" https://i.alipayobjects.com/e/201304/5ZZ66CYXd.gif" width="32" height="32" align="absmiddle" alt="loading..." />正在加载，请耐心等待...</div>                                <div class="CSA-ajax-result CSA-hide">抱歉，数据读取失败</div>                            </div>                            <div class="CSA-footer">                                都不是您的问题？                                <a class="CSA-button" href="#" target="_blank">                                    <span class="CSA-button-text">在线咨询</span>                                </a>                            </div>                            <div class="CSA-container-fix fn-clear">                                <iframe src="javascript:;" frameborder="0" style="height:100%;position:relative;width:100%">                                </iframe>                            </div>                        </div>';return DOM},CSAInfoDOM:function(knowledgeId,outPutId,serviceId,sourceId){DOM='<dl><dt class="CSA-title"><span class="CSA-arrow CSA-arrow-right"></span><a href="#" data-knowledgeId="'+knowledgeId+'" data-outPutId="'+outPutId+'" data-serviceId="'+serviceId+'" data-sourceId="'+sourceId+'">标题</a></dt><dd class="CSA-content" style="display: none; overflow-y:auto">内容</dd></dl>';return DOM},drag:function(){seajs.use("https://a.alipayobjects.com/u/js/201303/2Uf1Xe4FSf.js",function(){jQuery(".CSA-container").drag("start",function(e,dd){jQuery(this).addClass("CSA-draging");dd.limit=jQuery("body").offset();dd.limit.bottom=dd.limit.top+jQuery(window).outerHeight()-jQuery(this).outerHeight();dd.limit.right=dd.limit.left+jQuery(window).outerWidth()-jQuery(this).outerWidth()}).drag(function(e,dd){if(jQuery.browser.msie&&jQuery.browser.version==6){positionY=Math.min(dd.limit.bottom,Math.max(dd.limit.top,dd.offsetY));positionX=Math.min(dd.limit.right,Math.max(dd.limit.left,dd.offsetX))}else{if(jQuery.browser.msie){positionY=Math.min(dd.limit.bottom,Math.max(dd.limit.top,dd.offsetY)-document.documentElement.scrollTop);positionX=Math.min(dd.limit.right,Math.max(dd.limit.left,dd.offsetX)-document.documentElement.scrollLeft)}else{positionY=Math.min(dd.limit.bottom,Math.max(dd.limit.top,dd.offsetY)-window.scrollY);positionX=Math.min(dd.limit.right,Math.max(dd.limit.left,dd.offsetX)-window.scrollX)}}jQuery(this).css({top:positionY,left:positionX})},{handle:".CSA-header"}).drag("end",function(){jQuery(this).removeClass("CSA-draging")})})},addEvent:function(){var that=this;jQuery("#onlineService a").live("click",function(e){that.display();e.preventDefault()});jQuery(".CSA-container a.CSA-close").live("click",function(e){jQuery(".CSA-container").fadeOut(400);e.preventDefault()});jQuery(".CSA-info dt.CSA-title a").live("click",function(e){e.preventDefault();var info_list=jQuery(".CSA-container").find(".CSA-info");var info_title_arrow_this=jQuery(".CSA-arrow",jQuery(this).parents("dl"));var info_content_this=jQuery(".CSA-content",jQuery(this).parents("dl"));if(info_content_this.is(":visible")==false){info_list.find("dl .CSA-content").slideUp("fast");info_list.find("dl .CSA-arrow").removeClass("CSA-arrow-down").addClass("CSA-arrow-right")}info_content_this.slideToggle("fast");info_title_arrow_this.toggleClass("CSA-arrow-right").toggleClass("CSA-arrow-down");if(jQuery(this).attr("used")=="1"){return false}jQuery(this).attr("used","1");jQuery.ajax({url:that.dataUseAjaxURL,dataType:"jsonp",jsonp:"_callback",data:"knowledgeId="+jQuery(this).attr("data-knowledgeId")+"&outPutId="+jQuery(this).attr("data-outPutId")+"&serviceId="+jQuery(this).attr("data-serviceId")+"&sourceId="+jQuery(this).attr("data-sourceId")+"&token="+jQuery("input[name=onlineServiceToken]").val()})})},display:function(){var that=this;if(jQuery(".CSA-container").length==0){jQuery("body").append(that.CSAContainerDOM());that.drag()}jQuery(".CSA-container").css({top:parseFloat(jQuery("#onlineService").css("top").replace("px","")),left:"auto",right:jQuery("#onlineService").width()+10}).show(500,function(){jQuery(this).css({display:"block"})});if(that.alreadyShow){return false}that.alreadyShow=true;that.getData()},getData:function(){var that=this;var CSAContainer=jQuery(".CSA-container");var CSAtoken=jQuery("input[name='onlineServiceToken']",CSAContainer);var CSApointId=jQuery("input[name='onlineServicePointId']",CSAContainer);var CSAInfo=jQuery(".CSA-info",CSAContainer);if(typeof(CSAInfo.data("append"))!="undefined"&&CSAInfo.data("append")==0){return false}CSAInfo.data("append","0");var defualtKnowedge=require("defaultDataConfig");try{var defualtKnowedgeList=defualtKnowedge()}catch(e){var defualtKnowedgeList=[]}jQuery.ajax({url:OS.Csaccurate.dataSupportAjaxURL,dataType:"jsonp",jsonp:"_callback",timeout:3000,data:"sourceId="+jQuery("#onlineService").attr("data-sourceId"),success:function(data){if(data.stat=="ok"&&data.info.alipay_knowledge_output&&data.info.service_pattern_output){jQuery(".CSA-loading").hide();jQuery.each(data.info.alipay_knowledge_output,function(i,ele){CSAInfo.append(that.CSAInfoDOM(ele.knowledgeId,ele.outPutId,ele.serviceId,jQuery("#onlineService").attr("data-sourceId")));jQuery("dl .CSA-title a",CSAInfo).eq(i).html(ele.title);jQuery("dl .CSA-content",CSAInfo).eq(i).html(ele.content).text();jQuery("dl .CSA-content",CSAInfo).eq(i).html(jQuery("dl .CSA-content",CSAInfo).eq(i).text())});jQuery.each(jQuery(".CSA-content img, .CSA-content table, .CSA-content div",CSAInfo),function(i,ele){if(jQuery(ele).width()>450){jQuery(ele).height((450*jQuery(ele).height())/jQuery(ele).width());jQuery(ele).width(450);jQuery(ele).css({marginLeft:"0",marginRight:"0"})}});CSAtoken.val(data.info.token);CSApointId.val(data.info.service_pattern_output.pointId);OS.onlineServer.openWin(OS.config.portalServerURL,jQuery(".CSA-footer a.CSA-button"),jQuery("#onlineService").attr("data-sourceId"),jQuery("input[name='onlineServiceToken']").val(),jQuery("input[name='onlineServicePointId']").val());if(data.info.service_pattern_output.isRouterShow&&(data.info.service_pattern_output.isRouterShow==0)){jQuery(".CSA-footer").hide()}}else{if(data.stat=="deny"){self.location.href=data.target}else{jQuery(".CSA-footer a.CSA-button").live("click",function(e){window.open(OS.server.cliveServer+"/client/index.htm?_output_charset=utf-8&rmode=ali&scenceCode=SCEN00003968&groupId=7","newCliveWindow","toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=1003,height=600");e.preventDefault()});if(defualtKnowedgeList&&defualtKnowedgeList.length){jQuery(".CSA-loading").hide();jQuery.each(defualtKnowedgeList,function(i,ele){CSAInfo.append(that.CSAInfoDOM(ele.id,-1,-1,jQuery("#onlineService").attr("data-sourceId")));jQuery("dl .CSA-title a",CSAInfo).eq(i).html(ele.title);jQuery("dl .CSA-content",CSAInfo).eq(i).html(ele.content)});jQuery.each(jQuery(".CSA-content img, .CSA-content table, .CSA-content div",CSAInfo),function(i,ele){if(jQuery(ele).width()>450){jQuery(ele).height((450*jQuery(ele).height())/jQuery(ele).width());jQuery(ele).width(450);jQuery(ele).css({marginLeft:"0",marginRight:"0"})}})}}}},error:function(XMLHttpRequest,textStatus,errorThrown){jQuery(".CSA-footer a.CSA-button").live("click",function(e){window.open(OS.server.cliveServer+"/client/index.htm?_output_charset=utf-8&rmode=ali&scenceCode=SCEN00003968&groupId=7","newCliveWindow","toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=1003,height=600");e.preventDefault()});if(defualtKnowedgeList&&defualtKnowedgeList.length){jQuery(".CSA-loading").hide();jQuery.each(defualtKnowedgeList,function(i,ele){CSAInfo.append(that.CSAInfoDOM(ele.id,-1,-1,jQuery("#onlineService").attr("data-sourceId")));jQuery("dl .CSA-title a",CSAInfo).eq(i).html(ele.title);jQuery("dl .CSA-content",CSAInfo).eq(i).html(ele.content)});jQuery.each(jQuery(".CSA-content img, .CSA-content table, .CSA-content div",CSAInfo),function(i,ele){if(jQuery(ele).width()>450){jQuery(ele).height((450*jQuery(ele).height())/jQuery(ele).width());jQuery(ele).width(450);jQuery(ele).css({marginLeft:"0",marginRight:"0"})}})}else{jQuery(".CSA-ajax-result").html("请求超时")}}})},init:function(){this.addEvent()}};if(OS.params.trigger==="1"&&OS.params.behavior==="1"){OS.params.behaviorLazyLoad="yes";var SOURCEID=jQuery("#onlineService").data("sourceid");Date.prototype.pattern=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours()%12==0?12:this.getHours()%12,"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};var week={"0":"\u65e5","1":"\u4e00","2":"\u4e8c","3":"\u4e09","4":"\u56db","5":"\u4e94","6":"\u516d"};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}if(/(E+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,((RegExp.$1.length>1)?(RegExp.$1.length>2?"\u661f\u671f":"\u5468"):"")+week[this.getDay()+""])}for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}}return fmt};require.async("gallery/swfobject/2.2.0/swfobject.js",function(Swfobject){jQuery.pushMessage=(function($){if(OS.params.uid==""||OS.params.trigger=="0"){return false}var cometSetting={isOpen:true,timeout:60*1000,method:"GET",crossDomain:"true",dataType:"jsonp",url:OS.server.initiativeServer+"/polling",debug:false,times:10,abortHttpTimeout:70*1000};var trinityContainer=$('<div id="trinityContainer"></div>').appendTo("body"),flashvars={jsentry:"jsEntry",swfid:"pushMessage",group:"_group",debug:"0"},params={allowscriptaccess:"always"},attributes={};Swfobject.embedSWF(OS.config.webpushFlashURL,"trinityContainer","1","1","9.0.0",false,flashvars,params,attributes);var Trinity,connection,midCache=[],hasMessage=false;var params={cid:0,timeout:cometSetting.abortHttpTimeout,uid:OS.params.uid,mid:"",mack:0};var swfReadyTime,masterTime,isMaster=false,isForward=false;function jsEntry(swfid,msg){Trinity=$("#trinityContainer")[0];switch(msg.type){case"master":isMaster=true;if(cometSetting.isOpen){$.pushMessage.connect()}log("build master","建立master节点成功");masterTime=Date.parse(new Date());window.Tracker&&Tracker.click("trinitybuildnode-"+(masterTime-swfReadyTime));break;case"join":if(!isMaster){OS.onlineServer.behavior()}log("build node","建立普通节点成功，发送行为采集数据");break;case"message":var message=$.parseJSON(decodeURIComponent(msg.data.body));log("接收message",message.data.data.info.sourceid+","+SOURCEID);if(message.data.data.info.sourceid==SOURCEID){log("接收message","");OS.initiative.init(message)}break;case"status":break;case"error":params.mack=1;log("push message error","目标页面节点已关闭");break;case"swfReady":Trinity=$("#trinityContainer")[0];log("swfReady","Trinity flash 加载完毕");swfReadyTime=Date.parse(new Date());break;default:return}}window.jsEntry=jsEntry;function log(status,msg){if(!cometSetting.debug){return}var date=new Date();date=date.pattern("yyyy-MM-dd hh:mm:ss");$('<p><span style="color:green">['+date+']</span> <span style="color:red">'+status+"</span> "+msg+"</p>").appendTo("body")}return{connect:function(){if(!cometSetting.isOpen||(cometSetting.times<=0&&!hasMessage)){return}log("发送请求",$.param(params));cometSetting.times--;hasMessage=false;connection=$.ajax({type:cometSetting.method,url:cometSetting.url,cache:false,timeout:cometSetting.timeout,crossDomain:cometSetting.crossDomain,dataType:cometSetting.dataType,jsonp:"_callback",data:params,success:function(data){params.mack=0;if(data.ack==1){params.cid=0;$.pushMessage.disconnect();setTimeout($.pushMessage.connect,1);return}else{if(data.ack==2){$.pushMessage.disconnect();return}}data.cid&&(params.cid=data.cid);if(data.cid&&(!isForward)){OS.onlineServer.behavior();isForward=true}if(data.mid&&data.data){hasMessage=true;params.mid=data.mid;try{Trinity.fire(encodeURIComponent($.stringifyJSON(data)))}catch(e){window.console&&console.log(e)}}setTimeout($.pushMessage.connect,1)},error:function(XMLHttpRequest,textStatus,errorThrown){$.pushMessage.disconnect();if(textStatus=="timeout"){log("请求Timeout","");$.pushMessage.connect()}else{if(textStatus=="abort"){cometSetting.isOpen=false}else{log("请求出错",errorThrown);params.mack=1;setTimeout($.pushMessage.connect,1)}}}})},disconnect:function(){connection.abort()},clearMidCache:function(){Trinity.setItem("midCache",null)}}})(jQuery)});var special={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},escape=function(chr){return special[chr]||"\\u"+("0000"+chr.charCodeAt(0).toString(16)).slice(-4)};jQuery.stringifyJSON=function(data){if(window.JSON&&window.JSON.stringify){return window.JSON.stringify(data)}switch(jQuery.type(data)){case"string":return'"'+data.replace(/[\x00-\x1f\\"]/g,escape)+'"';case"array":return"["+jQuery.map(data,jQuery.stringifyJSON)+"]";case"object":var string=[];jQuery.each(data,function(key,val){var json=jQuery.stringifyJSON(val);if(json){string.push(jQuery.stringifyJSON(key)+":"+json)}});return"{"+string+"}";case"number":case"boolean":return""+data;case"undefined":case"null":return"null"}return data};OS.initiative={_data:"",_alreadyShowPop:false,popDOM:function(){DOM='<div id="OS-initiative-pop" class="initiative-pop">                                <div class="initiative-pop-container">                                    <img src="https://i.alipayobjects.com/e/201402/29Sgj2xGaF.gif" class="J-initiative-pop-light initiative-pop-light" />                                     <a href="javascript:;" class="initiative-pop-close J-initiative-pop-close" seed="initiative-close">×</a>                                    <div class="initiative-pop-content">                                        <a class="J-initiative-show-one" href="#show" seed="initiative-show-one">'+this._data.info.alipay_knowledge_output[0].title+'</a>                                        <a class="J-initiative-show initiative-show" href="#show" seed="initiative-show-more">详情&gt;&gt;</a>                                    </div>                                </div>                            </div>';var contentkey=OS.server.cschannelServer+"/portal.htm?"+jQuery("#onlineService").attr("data-sourceId");window[contentkey]=this._data.info.alipay_knowledge_output[0].content;return DOM},showPop:function(){if(this._alreadyShowPop){return false}this._alreadyShowPop=true;jQuery("body").append(this.popDOM());var initiativePop=jQuery("#OS-initiative-pop");initiativePop.css({right:30,top:parseFloat(jQuery("#onlineService").css("top").replace("px",""))-15,width:0,height:86}).show().animate({right:0,width:250},{duration:500,specialEasing:{width:"easeOutStrong"},complete:function(){jQuery(".J-initiative-pop-light").show()}});jQuery("#OS-initiative-pop").fadeIn();window.Tracker&&Tracker.click("initiative-show-num");this.addEvent()},changLogo:function(imgURL){jQuery("#onlineService img").attr("src",imgURL)},hidePop:function(){jQuery("#OS-initiative-pop").hide();this.changLogo(OS.params.logoUrl)},addEvent:function(){var that=this;jQuery("#onlineService a").live("click",function(e){that.hidePop()});jQuery("#OS-initiative-pop .J-initiative-show-one").live("click",function(e){var infoFirst=jQuery(".CSA-container .CSA-info dl").eq(0);var infoFirstLink=jQuery(".CSA-container .CSA-info dl").eq(0).find(".CSA-title a");infoFirst.find(".CSA-title").find("span").removeClass("CSA-arrow-right").addClass("CSA-arrow-down");infoFirst.find(".CSA-content").slideDown("fast");that.hidePop();infoFirstLink.attr("used","1");var ele=that._data.info.alipay_knowledge_output[0];var info=that._data.info;jQuery.ajax({url:OS.Csaccurate.dataUseAjaxURL,dataType:"jsonp",jsonp:"_callback",data:"knowledgeId="+ele.knowledgeId+"&outPutId="+ele.outPutId+"&serviceId="+ele.serviceId+"&sourceId="+info.sourceid+"&token="+info.token});e.preventDefault()});jQuery("#OS-initiative-pop .J-initiative-show").live("click",function(e){var ele=that._data.info.alipay_knowledge_output[0];var info=that._data.info;jQuery.ajax({url:OS.Csaccurate.dataUseAjaxURL,dataType:"jsonp",jsonp:"_callback",data:"knowledgeId="+ele.knowledgeId+"&outPutId="+ele.outPutId+"&serviceId="+ele.serviceId+"&sourceId="+info.sourceid+"&token="+info.token});that.hidePop();e.preventDefault()});jQuery("#OS-initiative-pop .J-initiative-pop-close").live("click",function(e){that.hidePop();e.preventDefault()})},setData:function(){var data=this._data;OS.Csaccurate.getData=function(){var that=this;var CSAContainer=jQuery(".CSA-container");var CSAtoken=jQuery("input[name='onlineServiceToken']",CSAContainer);var CSApointId=jQuery("input[name='onlineServicePointId']",CSAContainer);var CSAInfo=jQuery(".CSA-info",CSAContainer);if(typeof(CSAInfo.data("append"))!="undefined"&&CSAInfo.data("append")==0){return false}CSAInfo.data("append","0");if(data.info.alipay_knowledge_output&&data.info.service_pattern_output){jQuery(".CSA-loading").hide();jQuery.each(data.info.alipay_knowledge_output,function(i,ele){CSAInfo.append(that.CSAInfoDOM(ele.knowledgeId,ele.outPutId,ele.serviceId,jQuery("#onlineService").attr("data-sourceId")));jQuery("dl .CSA-title a",CSAInfo).eq(i).html(ele.title);jQuery("dl .CSA-content",CSAInfo).eq(i).html(ele.content).text()});jQuery.each(jQuery(".CSA-content img, .CSA-content table, .CSA-content div",CSAInfo),function(i,ele){if(jQuery(ele).width()>450){jQuery(ele).height((450*jQuery(ele).height())/jQuery(ele).width());jQuery(ele).width(450);jQuery(ele).css({marginLeft:"0",marginRight:"0"})}});CSAtoken.val(data.info.token);CSApointId.val(data.info.service_pattern_output.pointId)}}},init:function(message){if(OS.Csaccurate.alreadyShow){return false}this.changLogo("https://i.alipayobjects.com/e/201402/295sni2FYF.png");this._data=message.data.data;this.showPop();this.setData();OS.onlineServer.openWin(OS.server.cschannelServer+"/portal.htm",jQuery(".J-initiative-show-one"),jQuery("#onlineService").attr("data-sourceId")+"&question="+encodeURIComponent(jQuery.trim(jQuery(".J-initiative-show-one").text())),jQuery("input[name='onlineServiceToken']").val(),jQuery("input[name='onlineServicePointId']").val());OS.onlineServer.openWin(OS.server.cschannelServer+"/portal.htm",jQuery(".J-initiative-show"),jQuery("#onlineService").attr("data-sourceId")+"&question="+encodeURIComponent(jQuery.trim(jQuery(".J-initiative-show-one").text())),jQuery("input[name='onlineServiceToken']").val(),jQuery("input[name='onlineServicePointId']").val())}}}OS.onlineServer.openWin(OS.server.cschannelServer+"/portal.htm",jQuery("#onlineService"),jQuery("#onlineService").attr("data-sourceId"),jQuery("input[name='onlineServiceToken']").val(),jQuery("input[name='onlineServicePointId']").val())}catch(e){window.console&&console.log&&console.log(e);window.Tracker&&Tracker.click("onlineServer-error-push-"+e)}});