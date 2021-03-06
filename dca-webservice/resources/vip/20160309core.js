var VIPSHOP = window.VIPSHOP || {};
VIPSHOP.cookie = {
	set : function(name, value, domain, path, hour) {
		var expire = new Date;
		if (hour) {
			var today = new Date;
			
			expire.setTime(today.getTime() + 36E5 * hour);
		}
		document.cookie = name + "=" + encodeURIComponent(escape(value)) + "; "
				+ (hour ? "expires=" + expire.toGMTString() + "; " : "")
				+ (path ? "path=" + path + "; " : "path=/; ")
				+ (domain ? "domain=" + domain + ";" : "");
		return true;
	},
	get : function(name) {
		var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
		var m = document.cookie.match(r);
		return decodeURIComponent(!m ? "" : m[1]);
	},
	del : function(name, domain, path) {
		document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; "
				+ (path ? "path=" + path + "; " : "path=/; ")
				+ (domain ? "domain=" + domain + ";" : "");
	}
};

//check if in iFrame add by Daniel 2014-04-30

if ( window.location.search.indexOf('gotype=2') >= 0 && Messenger ) {

	$.messenger = {};
	$.messenger.obj = new Messenger('login' , 'vip.com'),
	$.messenger.obj.addTarget(window.parent, 'loginDialog');
	$.messenger.send = function(msg) {
		$.messenger.obj.targets['loginDialog'].send(msg);
	}
			
}

var  resizeIframe = function(){

	var $frameLayout = $('body').find('.frameLayout');
	if($.messenger && $frameLayout.length ){
        $.messenger.send('method=setDialogHeight&args=' + $frameLayout.outerHeight());
	}
}

function clsoseMessenger(){
	if( $.messenger ){
		$.messenger.send('method=closeDialog');
		return true;
	}
	return false;
}
function checkEmail(strEmail) {
	var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	return emailReg.test(strEmail);
}
function checkPhone(strPhone) {
	var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
	return phoneReg.test(strPhone);
}
function checkQQ(strQQ) {
	var QQReg = /^[0-9a-zA-Z@\.\-_]+$/;
	return QQReg.test(strQQ);
}

function checkRegisterUserName(name){
	var result = new Object();
	result.result = true;
	if (!name) {
		result.result = false;
		result.tips = "璇疯緭鍏ョ櫥褰曞悕";
		return result;
	}
	if (!checkEmail(name) && !checkPhone(name)) {
		result.result = false;
		result.tips = "璇疯緭鍏ユ纭殑鎵嬫満鍙锋垨閭";
		return result;
	}
	$.ajax({
		type:'POST',
		url:ctx+'/register/ajaxCheckRegisterUserName', 
		data:{"loginName":name,"anticache":new Date().getTime()},
		async:false,
		success:function(data) {
			if(typeof(data.result)!='undefined' && data.result == 'haslogin'){
				if (clsoseMessenger()){
					return false;
				}
				redirect2Src();
				return;
			}
			if (data == 0) {
				result.result = true;
			}else if(data ==1){
				result.result = false;
				result.tips = "璇ョ敤鎴峰悕宸插瓨鍦�";
			}else if(data == 3){
				result.result = false;
				result.tips = "鎮ㄨ姹傜殑澶绻佷簡锛岃杩�10鍒嗛挓鍚庨噸璇�";
			}else{
				result.result = false;
				result.tips = "楠岃瘉澶辫触锛岃閲嶈瘯";
			}
	}});
	return result;
}

function checkCaptcha(captcha,vipc,type){
	
	var result = new Object();
	result.result = true;
	if(!captcha || !vipc){
		result.result = false;
		result.tips = "璇疯緭鍏ラ獙璇佺爜";
		return result;
	}
	$.ajax({
		url:ctx+'/captcha/ajaxCheckCaptcha', 
		data:{'captcha':captcha,'vipc':vipc,"anticache":new Date().getTime(),"type":type},
		async:false,
		success:function(data) {
			if(typeof(data.result)!='undefined' && data.result == 'haslogin'){
				if (clsoseMessenger()){
					return false;
				}
				redirect2Src();
				return;
			}
			if (!data.result) {
				result.result = false;
				result.tips = "楠岃瘉鐮佹湁璇�";
				if(20203 == data.errorCode){
					result.tips = "楠岃瘉鐮佸凡杩囨湡";
				}
			}
	}});
	return result;
}

function checkPassword(psw){
	var result = new Object();
	result.result = true;
	if(!psw){
		result.result = false;
		result.tips = "璇疯緭鍏ュ瘑鐮�";
		return result;
	}
	if (psw.length < 6 || psw.length > 20) {
		result.result = false;
		result.tips = "璇疯緭鍏�6-20浣嶅瓧姣嶅拰鏁板瓧鐨勭粍鍚�";
		return result;
	}
	//鍏ㄦ暟瀛�
	if(/^[0-9]{6,20}$/.exec(psw)){
		result.result = false;
		result.tips = "璇蜂娇鐢ㄥ瓧姣嶅拰鏁板瓧缁勫悎";
		return result;
	}
	//鍏ㄥ瓧姣�
	if(/^[a-zA-Z]{6,20}$/.exec(psw)){
		result.result = false;
		result.tips = "璇蜂娇鐢ㄥ瓧姣嶅拰鏁板瓧缁勫悎";
		return result;
	}
	//闈炲瓧姣嶆垨鑰呮暟瀛�
	if (!/^[a-zA-Z0-9]{6,20}$/.exec(psw)) {
		result.result = false;
		result.tips = "璇蜂娇鐢ㄥ瓧姣嶅拰鏁板瓧缁勫悎";
		return result;
	}
	
	return result;
}

function callb2c(signedApiUrl,isrisk){
	
	$.ajax({
		url: signedApiUrl+"&callback=?", 
		cache:false,
		crossDomain:true,
		contentType:'application/json',
		dataType: "jsonp",
		success: function(result) {
			if(result.status==1){
                if(isrisk){
                    redirect2Src();
                    return;
                }
				bindPhoneIfDemand();
			} else {
				alert('璇锋眰澶辫触锛岃鍒锋柊椤甸潰閲嶈瘯 ');
			}
		},
		error:function(jqXHR, textStatus, errorThrown){			
			redirect2Src();
			return;
		}
	});
}
// 甯愬彿寮傚父椋庨櫓寮圭獥
function risktips(risk_func) {
    if($('#J_risktips')[0]) {return false;}
    var that = this;
    that.config = {
        closeFunc : risk_func,
        $mask: $('.ui-window-mask'),
        nickname: VIPSHOP.cookie.get('VipRNAME') || '',
        username:VIPSHOP.cookie.get('login_username') ,
        capsLock: false,
        timeout: {
            delay: null
        },
        interval: {
            countdown: null
        }
    };
    that.configReset = function() {
        that.config.nickname = VIPSHOP.cookie.get('VipRNAME') || '',
            that.config.$risk = $('#J_risktips');
        that.config.$mask = $('.ui-window-mask');
        that.config.$risk_pwd = $('.J_risk_pwd');
        that.config.$risk_pwd1 = $('#J_risk_pwd1');
        that.config.$risk_pwd2 = $('#J_risk_pwd2');
        that.config.$show_warn1 = $('#J_show_warn1');
        that.config.$show_warn2 = $('#J_show_warn2');
        that.config.$content = $('#J_risktips_content');
        that.config.$submit = $('#J_submit_editorpwd');
        that.config.$success = $('#J_risk_succ');
        that.config.$fail = $('#J_risk_fail');
        that.config.$iknow = $('#J_risk_iknow');
        that.config.$again = $('#J_risk_again');
        that.config.$second = $('.J_risk_second');
        that.config.$close = $('.J_risktips_close');
        that.config.$degree = $('#J_degree');
        that.config.$J_L_psw = $('#J_L_psw');
    };
    that.ui = {
        init: function() {
            that.ui.dialogOpen();
        },
        dialogOpen: function() {
            var _mask = that.config.$mask[0] ? '' : '<div class="ui-window-mask"></div>';
            
            $('body').append($(_mask + $('#J_risktips_tpl').html()));
            that.configReset();
            that.config.$risk.find('.J_risk_username').html(that.config.nickname);
            if(window.location.search.indexOf('gotype=2') >= 0){
                that.config.$close.removeClass('f-hidden');
                that.config.$risk.addClass('z-dialog-small');
            }
            var
                left = ($(window).width() - that.config.$risk.width()) / 2,
                top = ($(window).height() - that.config.$risk.height()) / 2;
            that.config.$risk.css({
                'left': left,
                'top': top
            }).addClass('z-ui-dialog-in');
            that.config.$mask.show();
            that.config.$risk_pwd1.parent().placeholder();
            that.config.$risk_pwd2.parent().placeholder();
            
        },
        dialogClose: function() {
            that.config.$mask.hide();
            that.config.$risk.remove();
            that.config.closeFunc && that.config.closeFunc();
        },
        focuswarn: function(result, iswarn) {
            var red_border_warn = 'z-ui-form-item-warning'; //绾㈣壊杈规
            var red_tips_warn = 'z-ui-tooltips-in'; //绾㈣壊鎻愮ず
            var blue_warn = 'z-ui-tooltips-info'; //钃濊壊璀﹀憡
            var $elem = result.elem;
            that.config.$content.find('.z-ui-tooltips-in').removeClass(red_tips_warn);
            if (!result.result) { //鍐呭涓嶆纭�
                if (iswarn) { //绾�
                    $elem.find('.J_err_msg').html(result.tips);
                    $elem.removeClass([blue_warn, red_border_warn].join(' ')).addClass(red_tips_warn);
                } else { //钃�
                    $elem.find('.J_warn_msg').html(result.tips);
                    $elem.removeClass([red_tips_warn, red_border_warn].join(' ')).addClass(blue_warn);
                }
            } else {
                $elem.removeClass([red_border_warn, red_tips_warn, blue_warn].join(' '));
            }
        },
        blurwarn: function(result) {
            var blue_warn = 'z-ui-tooltips-info'; //钃濊壊璀﹀憡
            var red_border_warn = 'z-ui-form-item-warning'; //绾㈣壊杈规
            var red_tips_warn = 'z-ui-tooltips-in'; //绾㈣壊鎻愮ず
            // 鍐呭涓嶆纭�
            if (!result.result) {
                result.elem.removeClass([red_tips_warn, blue_warn].join(' ')).addClass(red_border_warn);
            } else {
                result.elem.removeClass([red_tips_warn, blue_warn, red_tips_warn].join(' '));
            }
        },
        submitType: function(step) {
            // 0绂佹鎻愪氦|1鍏佽鎻愪氦|2鎻愪氦涓瓅3鎻愪氦鎴愬姛|4鎻愪氦澶辫触
            var c_loading = 'z-ui-btn-loading';
            var c_disable = 'ui-btn-disable';
            that.config.$submit.data('cansubmit', false);
            if (step == 0) {
                that.config.$submit.removeClass(c_loading).addClass(c_disable);
                that.config.$content.removeClass('f-hidden');
                that.config.$fail.addClass('f-hidden');
            } else if (step == 1) {
                that.config.$submit.removeClass(c_loading + ' ' + c_disable);
                that.config.$submit.data('cansubmit', true);
                that.config.$content.removeClass('f-hidden');
                that.config.$fail.addClass('f-hidden');
            } else if (step == 2) {
                that.config.$submit.addClass(c_loading).removeClass(c_disable);
            } else if (step == 3) {
                that.config.$content.addClass('f-hidden');
                that.config.$success.removeClass('f-hidden');
            } else if (step == 4) {
                that.config.$content.addClass('f-hidden');
                that.config.$fail.removeClass('f-hidden');
            }
        },
        degree:function(lv){
            var _lv= ['z-step-0', 'z-step-1','z-step-2','z-step-3'];
            var _type = ['寮�','寮�','涓�','楂�'];
            that.config.$degree.removeClass(_lv.join(' ')).addClass(_lv[lv]);
            that.config.$degree.find('.u-progess-text').html(_type[lv]);
        }
    };
    that.ev = {
        init: function() {
            that.ui.init();
            var _init = ['focus', 'blur', 'press', 'submit', 'click'];
            for (var i = 0; i < _init.length; i++) {
                that.ev[_init[i]]();
            }
        },
        checkpwd_1: function(iswarn) {
            var
                letterPattern = /[a-zA-Z]+/,
                numbericPattern = /[0-9]+/,
                specialPattern = /[~!@#$%^&*()_+`\-=\[\]\\{}\|;':",\.\/<>\?]/,
                illegalPattern = /[^a-zA-Z0-9~!@#$%^&*()_+`\-=\[\]\\{}\|;':",\.\/<>\?]+/,
                result = new Object(),
                pwd = that.config.$risk_pwd1.val(),
                iswarn = iswarn || that.config.$risk_pwd1.data('iswarn'),
                calcCharsCategory = function(pwd) {
                    var category = 0;
                    if (letterPattern.test(pwd)) {
                        category++;
                    }
                    if (numbericPattern.test(pwd)) {
                        category++;
                    }
                    if (specialPattern.test(pwd)) {
                        category++;
                    }
                    return category;
                };

            result.elem = that.config.$show_warn1;
            result.result = false;
            result.degree = 0;
            if(pwd && calcCharsCategory(pwd) <= 1){
                result.degree = 1;
            }else if(pwd && calcCharsCategory(pwd) ==2 &&pwd.length <6){
                result.degree = 1;
            }else if(pwd && calcCharsCategory(pwd) ==2 &&pwd.length >= 6 && pwd.length < 12){
                result.degree = 2;
            }else if(pwd && calcCharsCategory(pwd) ==2 &&pwd.length >= 12 ){
                result.degree = 3;
            }else if(pwd && calcCharsCategory(pwd) ==3 &&pwd.length <6){
                result.degree = 1;
            }else if(pwd && calcCharsCategory(pwd) ==3 &&pwd.length >=6 && pwd.length <10){
                result.degree = 2;
            }else if(pwd && calcCharsCategory(pwd) ==3 && pwd.length >= 10){
                result.degree = 3;
            }
            if (!pwd && !iswarn) {
                result.tips = "瀵嗙爜涓�6-20浣嶅瓧绗︼紝鍖呭惈瀛楁瘝銆佹暟瀛楀拰绗﹀彿涓殑涓ょ";
            } else if (!pwd && iswarn) {
                result.tips = "瀵嗙爜涓嶈兘涓虹┖";
            } else if (pwd.length < 6) {
                result.tips = "瀵嗙爜涓嶈兘灏戜簬6浣�";
            } else if (illegalPattern.test(pwd)) {
                result.degree = 1;
                result.tips = "瀵嗙爜涓寘鍚潪娉曞瓧绗�";
            } else if (calcCharsCategory(pwd) <= 1) { //鍗曠绫�
                result.tips = "瀵嗙爜闇€瑕佸寘鍚瓧姣嶃€佹暟瀛椼€佺鍙蜂腑鑷冲皯涓ょ";
            } else if (that.config.username == pwd) {
                result.tips = "瀵嗙爜涓嶈兘涓庣櫥褰曞悕涓€鑷�";
            } else if (that.config.$J_L_psw.val() == pwd){
                result.tips = "鏂板瘑鐮佷笉鑳戒笌鏃у瘑鐮佷竴鑷�";
            } else {
                result.result = true;
            }


            return result;
        },
        checkpwd_2: function(iswarn) {
            var result = new Object(),
                pwd = that.config.$risk_pwd2.val(),
                iswarn = iswarn || that.config.$risk_pwd2.data('iswarn'),
                rc_pwd = that.config.$risk_pwd1.val();
            result.result = false;
            result.elem = that.config.$show_warn2;
            if (!pwd && !iswarn) {
                result.tips = "璇峰啀娆¤緭鍏ヤ笂闈㈢殑瀵嗙爜";
            } else if (!pwd && iswarn) {
                result.tips = "涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷�";
            } else if (pwd && rc_pwd != pwd) {
                result.tips = "涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷达紝璇烽噸璇�";
            } else if (pwd && rc_pwd == pwd) {
                result.result = true;
            }
            return result;
        },
        cansubmit: function() {
            if (that.ev.checkpwd_1().result && that.ev.checkpwd_2().result) {
                return true;
            }
            return false;
        },
        delayhide: function(index) {
            that.config.timeout.delay = setTimeout(function() {
                that.ui.focuswarn({
                    result: true,
                    elem: that.config['$show_warn' + index]
                });
            }, 3000);
        },
        click: function() {
            that.config.$iknow.click(function() {
                that.ui.dialogClose();
                clearInterval(that.config.interval.countdown);
            });
            that.config.$again.click(function() {
                that.ui.submitType(0);
                that.config.$risk_pwd1.val('');
                that.config.$risk_pwd2.val('');
                that.ui.degree(0);
                clearInterval(that.config.interval.countdown);
            })
            that.config.$close.click(function() {
                that.ui.dialogClose();
            })
        },
        focus: function() {
            that.config.$risk_pwd1.focus(function() {
                var iswarn = that.config.$risk_pwd1.data('iswarn');
                that.config.$degree.removeClass('f-hidden');
                that.ui.focuswarn(that.ev.checkpwd_1(iswarn), iswarn);
            });
            that.config.$risk_pwd2.focus(function() {
                var iswarn = that.config.$risk_pwd2.data('iswarn');
                that.ui.focuswarn(that.ev.checkpwd_2(iswarn), iswarn);
            });
        },
        blur: function() {
            that.config.$risk_pwd1.blur(function() {
                var result = that.ev.checkpwd_1();
                if (!result.result) {
                    that.config.$risk_pwd1.data('iswarn', true);
                }
                that.ui.blurwarn(result);
                clearTimeout(that.config.timeout.delay);
            });
            that.config.$risk_pwd2.blur(function() {
                var result = that.ev.checkpwd_2();
                if (!result.result) {
                    that.config.$risk_pwd2.data('iswarn', true);
                }
                that.ui.blurwarn(result);
                clearTimeout(that.config.timeout.delay);
            });
        },
        press: function() {
            that.config.$risk_pwd.each(function(i, v) {
                (function(i, $elem) {
                    var index = i + 1;
                    $elem.keypress(function(event) {
                        that.config.capsLock = capslock.detect(event);
                        if (that.config.capsLock) {
                            that.ui.focuswarn({
                                tips: '閿洏澶у啓閿佸畾宸叉墦寮€锛岃娉ㄦ剰澶у皬鍐�',
                                result: false,
                                elem: that.config['$show_warn' + index]
                            });
                            that.config['$risk_pwd' + index].data('capsLock', true);
                        } else {
                            if (that.config['$risk_pwd' + index].data('capsLock')) {
                                that.ui.focuswarn({
                                    result: true,
                                    elem: that.config['$show_warn' + index]
                                });
                                that.config['$risk_pwd' + index].data('capsLock', false);
                            } else if (that.config['$risk_pwd' + index].data('iswarn')) {
                                that.config['$risk_pwd' + index].data('iswarn', false);
                                that.ev.delayhide(index);
                            }
                        }
                    });
                    that.config['$risk_pwd' + index].keyup(function() {
                        if (that.ev.cansubmit()) {
                            that.ui.submitType(1);
                        } else {
                            that.ui.submitType(0);
                        }
                    });
                    that.config['$risk_pwd' + index].keydown(function(e) {
                        e.stopPropagation();
                    });
                }(i, $(v)));
            });
            that.config['$risk_pwd1'].keyup(function(e) {
                var val = $(this).val();
                var result = that.ev.checkpwd_1(val);
                that.ui.degree(result.degree);
                var code = e.keyCode;
                if(code == 13){
                    that.config['$risk_pwd2'].focus();
                }

            });
            that.config['$risk_pwd2'].keyup(function(e) {
                var code = e.keyCode;
                if(code == 13 ){  
                    that.config.$submit.trigger('click');
                }
            });
        },
        submitSuccess: function() {
            var time = 3;
            that.config.$second.html(time);
            that.ui.submitType(3);
            that.config['$risk_pwd2'].off('keyup');
            $(document).off('keydown keypress').on('keypress',function(e) {
                var code = e.keyCode;
                if(code == 13){
                    that.config.$iknow.trigger('click');
                }
            });
            that.config.interval.countdown = setInterval(function() {
                time = --time > 0 ? time : 0;
                if (!time) {
                    clearInterval(that.config.interval.countdown);
                    that.ui.dialogClose();
                }
                that.config.$second.html(time);
            }, 1000);
        },
        submitFail: function() {
            var time = 3;
            that.config.$second.html(time);
            that.ui.submitType(4);
            that.config.interval.countdown = setInterval(function() {
                time = --time > 0 ? time : 0;
                if (!time) {
                    clearInterval(that.config.interval.countdown);
                    that.ui.dialogClose();
                }
                that.config.$second.html(time);
            }, 1000);
        },
        submit: function() {
            that.config.$submit.on('click', function() {
                var cansubmit = $(this).data('cansubmit');
                if (cansubmit) {
                    var pwd1 = that.config.$risk_pwd1.val();
                    var pwd2 = that.config.$risk_pwd2.val();
                    that.ui.submitType(2);
                    that.data.resetpwd(pwd1, pwd2)
                        .done(function(rtn) {
                            if (rtn.code == 0) {
                                that.ev.submitSuccess();
                            } else {
                                that.ev.submitFail();
                            }
                        })
                        .fail(function() {
                            that.ev.submitFail();
                        });
                }
            });
        }
    };
    that.data = {
        resetpwd: function(pwd1, pwd2) {
            return $.ajax({
                type: "post",
                url: 'https://passport.vip.com/reset_password',
                dataType: "json",
                cache: false,
                data: {
                    password: pwd1,
                    confirm: pwd2
                }
            });
        }
    };
    that.ev.init();
}
// 	灏唒honeBind&tips 鎻愬墠杩涜鍔犺浇  闃叉cdn缃戠粶椋庢毚
$( function(){
	if( window.PhoneBind && /login/.test( window.location.href ) ){
		window.phoneBind 	= new PhoneBind({
					phoneNum 	: "",
					isBg 		: true,
					haveTip 	: true,
					show 		: false ,
					success 	: function(phone){
						redirect2Src();
					},
					cancel 		:function(){
						redirect2Src();
					}
				});
	}
} );

function bindPhoneIfDemand(){
	if( typeof PhoneBind == "undefined" ) {
		redirect2Src();
	} else {
		$.ajax({
			type: "get",
			url: "//myi.vip.com/jsonp/api/phone/phone_safe_number?callback=?", 
			dataType: "json",
			cache:false,
			crossDomain:true,
			success: function(result) {
				if( result.code==200 && !result.data ){
					try{
						phoneBind.show();
					} catch(e) {
						redirect2Src();
					}
				} else {
					redirect2Src();
				}
			},
			error:function(jqXHR, textStatus, errorThrown){			
				redirect2Src();
			}
		});
	}
}

function redirect2Src(){
	if ( $.messenger && $.messenger.send ){
		$.messenger.send('method=loginSuccess');
	}else{
		var redirectURLObj = $("#redirectURL");	
		var src = redirectURLObj.length > 0 ?  (redirectURLObj.val() ? redirectURLObj.val() : VIPSHOP.cookie.get("vipshop_passport_src")) : VIPSHOP.cookie.get("vipshop_passport_src");
		window.location= src;	
	}	
}

var ajaxSending = 0;
function sendAjax(url,data,successcallback,async,errorcallback){
	if(arguments.length <1){
		alert('url is needed');
	}
	if(url.indexOf('?') != -1){
		url = url +'&callback=?';
	}else{
		url = url +'?callback=?';
	}
	if(!data){
		data = {};
	}
	if(!async){
		async = true;
	}
	
	if(ajaxSending>0){
		return;
	}
	
	ajaxSending ++;
	$.ajax({
		type :'POST',
		url : url,
		data :data,
		async:async,
		success:function(result){
			ajaxSending = 0;
			if(typeof(data.result)!='undefined' && data.result == 'haslogin'){
				if (clsoseMessenger()){
					return false;
				}
				redirect2Src();
				return;
			}
			if(!successcallback){
				eval(successcallback+'(result)');
				return;
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			if(!errorcallback){
				eval(errorcallback);
				return;
			}
		}
	});
}

(function() {
	  // Private array of chars to use
	  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	 
	  Math.uuid = function (len, radix) {
	    var chars = CHARS, uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      // Compact form
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      // rfc4122, version 4 form
	      var r;
	 
	      // rfc4122 requires these characters
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '';
	      uuid[14] = '4';
	 
	      // Fill in random data.  At i==19 set the high bits of clock sequence as
	      // per rfc4122, sec. 4.1.5
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	 
	    return uuid.join('');
	  };
	 
	  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	  // by minimizing calls to random()
	  Math.uuidFast = function() {
	    var chars = CHARS, uuid = new Array(36), rnd=0, r;
	    for (var i = 0; i < 36; i++) {
	      if (i==8 || i==13 ||  i==18 || i==23) {
	        uuid[i] = '-';
	      } else if (i==14) {
	        uuid[i] = '4';
	      } else {
	        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
	        r = rnd & 0xf;
	        rnd = rnd >> 4;
	        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	      }
	    }
	    return uuid.join('');
	  };
	 
	  // A more compact, but less performant, RFC4122v4 solution:
	  Math.uuidCompact = function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	    });
	  };
	})();
;(function($){
	// btn loading
	// eg: 	
	// 杩涘叆btn loading鐘舵€侊細$(".btnReg").btnLoading("on");
	// 閫€鍑篵tn loading鐘舵€侊細$(".btnReg").btnLoading("off");
	$.fn.btnLoading = function( flag ){
		var $body = $("body"),
			$this = $(this),
			$loading = $("<div class='btnLoading'></div>");
		if( flag == "on"){
			if ($body.find(".btnLoading").length) {
				$body.find(".btnLoading").remove();
				$body.find("[data-act='btnLoading']").removeClass("on").removeAttr("data-act");
			};
			$loading.appendTo("body").css({
				"top":$this.offset().top + 'px',
				"left":$this.offset().left + 'px'
			});
			$this.addClass("on").attr("data-act","btnLoading");
		}else{
			$body.find(".btnLoading").remove();
			$body.find("[data-act='btnLoading']").removeClass("on").removeAttr("data-act");
		}
	};
	//input 閿欒鎻愮ず
	$.fn.errorMsg = function(msg){
		var $this = $(this),
			interval,
			isRed = 0,
			toggle = function(ele){
				if(isRed % 2 !== 0){
					ele.removeClass('error');
				}else{
					ele.addClass('error');
				}
				if(isRed === 4){
					clearInterval(interval);
				}
			};
		//$this.next('label').addClass("hide");
		if( $this.closest("p.inputs").length ){
			var $parent = $this.closest("p.inputs");
			if ($parent.next("p.labels").length) {
				var $label = $parent.next("p.labels");
				interval = setInterval(function(){
					if(isRed === 0){
						$label.html("<span class='dred'>" + msg + "</span>");
					}
					toggle($this);
					isRed++;
				},100);
			};
		}
	};
	//input 涓€鑸彁绀�
	$.fn.tipMsg = function(msg){
		var $this = $(this),
			tips,
			toggle = function(ele){
				if(isRed % 2 !== 0){
					ele.removeClass('error');
				}else{
					ele.addClass('error');
				}
			};
		//$this.next('label').addClass("hide");
		if( $this.closest("p.inputs").length ){
			var $parent = $this.closest("p.inputs");
			if ($parent.next("p.labels").length) {
				var $label = $parent.next("p.labels");
			};
		}
		$('.auth-tips').addClass('z-hide');
		tips = $('[for="tips_' + $this.attr("id") + '"]');
		if(tips.length > 0){
			if ( tips.attr('data-direction') && tips.attr('data-direction') == 'top' ) {
				tips.removeClass('z-hide').css({
					'top' : $this.offset().top - tips.outerHeight() + 1 + 'px',
					'left' : $this.offset().left + 'px',
					'width' : $this.outerWidth() - 20
				});
			}else{
				tips.removeClass('z-hide').css({
					'top' : $this.offset().top + 'px',
					'left' : $this.offset().left + 280 + 'px'
				});
			}
		}
	};
	//input 楠岃瘉姝ｇ‘
	$.fn.verified = function(){
		var $this = $(this);
		//$this.next('label').addClass("hide");
		$this.addClass("verified").removeClass("error");
		if( $this.closest("p.inputs").length ){
			var $parent = $this.closest("p.inputs");
			if ($parent.next("p.labels").length) {
				var $label = $parent.next("p.labels");
				$label.text("");
			};
		}
	};
	//input 鐘舵€侀噸缃�
	$.fn.iptReset = function(msg){
		var $this = $(this);
		$this.removeClass("verified").removeClass("error");
		if( $this.closest("p.inputs").length ){
			var $parent = $this.closest("p.inputs");
			if ($parent.next("p.labels").length) {
				var $label = $parent.next("p.labels");
				$label.text("");
			};
		}
	};
})(jQuery);

function changeCode(type) {
	var img_id;
	var vipc;
	if (type) {
		img_id = "verify_image1";
		vipc = $("#user_reg_form").find(':input[name="vipc"]').val();
	} else {
		img_id="verify_image";
		vipc = $("#J_L_vipc").val();
	}
	
	$("#"+img_id).attr('src',ctx+'/captcha/getCaptcha?type='+type+'&vipc='+vipc+'&v=' + new Date().getTime());
	$("#"+img_id).onload=function(){$("#"+img_id).attr('src',staticHost+'/images/reg_loading.gif');};
	$("#"+img_id).error=function(){$("#"+img_id).attr('src',staticHost+'/images/reg_loading.gif');};
	
	
}
function changeCodeForCorp() {
	var img_id = "verify_image";
	var vipc = $("#corp_update_form").find(':input[name="vipc"]').val();
	var $img = $("#" + img_id );
	$img.attr( 'src' , ctx + '/captcha/getCaptcha?type=1&vipc=' + vipc + '&v=' + new Date().getTime());
	$img.onload = function(){ $img.attr( 'src' , staticHost + '/images/reg_loading.gif' ); };
	$img.error = function(){ $img.attr( 'src' , staticHost + '/images/reg_loading.gif' ); };
	
	
}

function format_name( name ){
	return name.replace(/\s/g,"");
}

function check_reg_name($input) {
	$input.iptReset();
	var check_result = checkRegisterUserName($input.val());
	if(!check_result.result){
		$input.errorMsg(check_result.tips);
	}else{
		$input.verified();
	}
	return check_result.result;
}

function check_reg_pwd($input,type){
	$input.iptReset();
	if(1 == type){
		var pwd = $("#J_R_psw").val();
		if($input.val() != pwd){
			$input.errorMsg('涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷�');
			return false;
		}
		$input.verified();
		return true;
	}
	var check_result = checkPassword($input.val());
	if(!check_result.result){
		$input.errorMsg(check_result.tips);
	}else{
		$input.verified();
	}
	return check_result.result;
}

function check_captcha($captcha,$vipc,type){
	$captcha.iptReset();
	if(!$captcha.val() || !$vipc.val()){
		$captcha.errorMsg('璇疯緭鍏ラ獙璇佺爜');
		return false;
	}
	var check_result = checkCaptcha($captcha.val(),$vipc.val(),type);
	if(!check_result.result){
		$captcha.errorMsg(check_result.tips);
		changeCode(type);
		$captcha.val();
	}else{
		$captcha.verified();
	}
	return check_result.result;
}

function check_agreed($input){
	if("1" != $input.val()){
		$input.errorMsg('鎺ュ彈鏈嶅姟鏉℃鎵嶈兘娉ㄥ唽');
		return false;
	}
	return true;
}

function check_pv(name){
	if( checkPhone(name) ) {
		if( !window.pv.ssid ) {
			pv.showError(1); //璇疯幏鍙栨墜鏈洪獙璇佺爜
			return false;
		}
		
		var inputVC = window.pv.getVerifyCode(); 
		if( !inputVC || inputVC=='鐭俊楠岃瘉鐮�'  ) {
			pv.showError(2); //璇疯緭鍏ユ墜鏈洪獙璇佺爜
			return false;
		}
	}
	return true;
}

function show_error(errorMsg) {
	if (!errorMsg) {
		return false;
	}
	if (!errorMsg['type']) {
		return false;
	}
	var errorStatus = errorMsg['status'];
	var loginError;
	if (errorMsg['type'] == 1) {
		loginError = {
			0 : [ 'J_L_code', 2, '楠岃瘉鐮佹湁璇�' ],
			1 : [ 'J_L_name', 0, '鐧诲綍鍚嶅拰瀵嗙爜涓嶈兘涓虹┖' ],
			2 : [ 'J_L_name', 0, '鐧诲綍鍚嶆湁璇�' ],
			3 : [
					'J_L_name',
					0,
					'璇ョ櫥褰曞悕涓嶅瓨鍦�<a href="'+ctx+'/register" class="wrong_link" title="鍏嶈垂娉ㄥ唽" target="_blank">鍏嶈垂娉ㄥ唽</a>?' ],
			4 : [
					'J_L_psw',
					1,
					'鐧诲綍鍚嶆垨瀵嗙爜鏈夎<a href="https://safe.vip.com/login/findPW/page" class="wrong_link" title="鎵惧洖瀵嗙爜" target="_blank">鎵惧洖瀵嗙爜</a>?' ],
			5 : [ 'J_L_name', 0, '璐︽埛宸茶鍐荤粨锛岃鑱旂郴瀹㈡湇' ],
			6 : [ 'J_L_name', 0, '鎮ㄧ殑璐︽埛鍙兘瀛樺湪寮傚父锛屾湰娆＄櫥褰曞け璐ャ€傚鏈夐渶瑕侊紝璇疯仈绯诲鏈嶏細400-6789-888' ]
		};
		if (errorStatus == 6) {
			alert(loginError[errorStatus][2]);
			return true;
		}
		if (errorStatus == 1 || errorStatus == 3 || errorStatus == 4) {
			len = 1;
		}
	} else {
		loginError = {
			0 : [ 'J_R_code', 2, '楠岃瘉鐮佹湁璇�' ],
			1 : [ 'saveagree', 3, '鎺ュ彈鏈嶅姟鏉℃鎵嶈兘娉ㄥ唽' ],
			2 : [ 'J_R_name', 0, '鐧诲綍鍚嶄笉鑳戒负绌�' ],
			3 : [ 'J_R_name', 0, '璇疯緭鍏ユ纭殑鎵嬫満鍙锋垨閭' ],
			4 : [ 'gender', 4, '璇烽€夋嫨鎬у埆' ],
			5 : [ 'J_R_psw', 1, '瀵嗙爜涓嶈兘涓虹┖' ],
			6 : [ 'J_R_psw', 1, '瀵嗙爜鏈夎' ],
			7 : [ 'J_R_psw', 1, '涓嶈兘鍏ㄤ负鏁板瓧锛岃浣跨敤瀛楁瘝鍜屾暟瀛楃粍鍚�' ],
			8 : [ 'J_R_psw', 1, '涓嶈兘鍏ㄤ负瀛楁瘝锛岃浣跨敤瀛楁瘝鍜屾暟瀛楃粍鍚�' ],
			9 : [ 'J_R_name', 0, '鐧诲綍鍚嶅凡瀛樺湪' ],
			10 : [ 'J_R_name', 0, '璇锋眰澶辫触锛岃鍒锋柊椤甸潰閲嶈瘯' ],
			11 : [ 'J_R_name', 0, '宸茶秴杩囨敞鍐岄檺鍒讹紝璇风◢绛夌墖鍒�' ]
		};
		if (errorStatus == 1 || errorStatus == 3 || errorStatus == 8) {
			len = 1;
		}
	}
	if (!loginError[errorStatus])
		return false;
	$input = jQuery("#" + loginError[errorStatus][0]);
	$input.errorMsg(loginError[errorStatus][2]);
	return true;
}

function check_login_name($input){
	$input.iptReset();
	if(!$input.val()){
		$input.errorMsg('璇疯緭鍏ョ櫥褰曞悕');
		return false;
	}
	var _val = format_name($input.val());
	$input.val(_val);
	if (!checkQQ(_val)) {
		$input.errorMsg('鐧诲綍鍚嶆湁璇�');
		return false;
	}
	return true;
}

function check_login_pwd($input){
	$input.iptReset();
	if(!$input.val()){
		$input.errorMsg('璇疯緭鍏ュ瘑鐮�');
		return false;
	}
	return true;
}
function ajaxCheckLoginNeedCaptcha(loginName){
	var checkLoginName = loginName;
	if(!loginName){
		checkLoginName = VIPSHOP.cookie.get("login_username");
	}
	if(!checkLoginName){
		checkLoginName = "";
	}
	$.ajax({
		url:ctx+'/login/ajaxCheckNeedCaptcha', 
		data:{"loginName":checkLoginName,"anticache":new Date().getTime()},
		async:true,
		success:function(data) {
			if(typeof(data.result)!='undefined' && data.result == 'haslogin'){
				if (clsoseMessenger()){
					return false;
				}
				redirect2Src();
				return;
			}
			if (data == 1) {
				var $vipc = $("#J_L_vipc");
				if(!$vipc.val()){
					vipc = Math.uuid(32);
					$vipc.val(vipc);
				}
				changeCode(0);
				$(".captcha").removeClass('hide');
				$("#login_code_li").attr('nocheck','false');
				resizeIframe();
				return;
			}
			$("#login_code_li").attr('nocheck','true');
	}});
}

function getQueryStringByName(name){
	var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

	if(result == null || result.length < 1){
		return "";
	}

	return result[1];
}
