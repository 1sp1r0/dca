VTM = window.VTM||{};
VTM.protocol = (("https:" == document.location.protocol) ? "https://" : "http://");


function other_loadjs(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript'; script.async = true;
	script.src = VTM.protocol+url.replace('http:\/\/','');
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(script, s);
}

/** ------ 鎵ц绗笁鏂圭粺璁′唬鐮� ------**/

	    //gdt0408
function tencentgdt(url){
	$.Listeners.sub('vtm_000017.loaded').onsuccess(function () {
		window.gdt_tracker = window.gdt_tracker || [];
		gdt_tracker.push(["set_source_id", "9"]);
		//棣栭〉
		if(window.VTM && '215'==VTM.pageId){
			/** 閫氱敤琛屼负  begin **/
			gdt_tracker.push(["add_action","GENERAL",
			    "pageview"                     // 琛屼负绫诲瀷鎻忚堪,鍙€夊€艰鏄�: 娴忚椤甸潰: pageview 鍙戦€佺煭淇★細message ,鍜ㄨ:consult
			]);
		}
		//鍟嗗搧璇︽儏椤�
		if(window.VTM && '218'==VTM.pageId){
			gdt_tracker.push(["add_action" , 'ITEM_VIEW',
					VTM.pageData.goods.id,   			   //鍟嗗搧ID
					VTM.pageData.goods.url,      //鍟嗗搧椤礥RL,绌哄瓧绗︿覆鍒欎笂鎶ュ綋鍓峌RL涓哄晢鍝侀〉URL
					VTM.pageData.goods.category.id,   			   //绫荤洰ID
					VTM.pageData.goods.category.name,   		   //绫荤洰鍚嶇О
					VTM.pageData.goods.brand.id  			   //鍝佺墝ID	
			]);
		}
		//鍝佺墝鍒楄〃椤�
		else if(window.VTM && '217'==VTM.pageId){
			/**  搴楅摵娴忚  begin **/
			gdt_tracker.push(['add_action','SHOP_VIEW',
				VTM.pageData.brand.id,   			   // 搴楅摵ID
				location.href  	   // 搴楅摵椤礥RL, 绌哄瓧绗︿覆鍒欎笂鎶ュ綋鍓嶅綋鍓島rl涓哄簵閾洪〉URL
			]);
		}
		//棰戦亾椤�
		else if(window.VTM && '216'==VTM.pageId){
			/** 绫荤洰娴忚  begin **/
			gdt_tracker.push(['add_action','CATEGORY_VIEW',
				VTM.pageData.channel.id,   			   // 绫荤洰ID
				VTM.pageData.channel.name,   		   // 绫荤洰鍚嶇О
				location.href  	   // 绫荤洰椤礥RL,绌哄瓧绗︿覆鍒欎笂鎶ュ綋鍓嶅綋鍓島rl涓虹被鐩〉URL
			]);

		}
		//绫荤洰椤�
		else if(window.VTM && '222'==VTM.pageId){
			/** 绫荤洰娴忚  begin **/
			gdt_tracker.push(['add_action','CATEGORY_VIEW',
				VTM.pageData.goodsCategory.id,   			   // 绫荤洰ID
				VTM.pageData.goodsCategory.name,   		   // 绫荤洰鍚嶇О
				location.href  	   // 绫荤洰椤礥RL,绌哄瓧绗︿覆鍒欎笂鎶ュ綋鍓嶅綋鍓島rl涓虹被鐩〉URL
			]);
		}
		//璁㈠崟鎴愬姛椤�
		else if(window.VTM && '503'==VTM.pageId){
			gdt_tracker.push(['add_action', 'ORDER_ITEM',
				''
			]);
		}
		gdt_tracker.push(["send"]);
		$.Listeners.sub('addCartSuccess').onsuccess(function(data) {
			//娣诲姞璐墿杞︽垚鍔�
			gdt_tracker.push([ 'add_action', 'ADD_TO_CART',
				VTM.pageData.goods.id,   			   //鍟嗗搧ID
				VTM.pageData.goods.url,       //鍟嗗搧椤礥RL,绌哄瓧绗︿覆鍒欎笂鎶ュ綋鍓峌RL涓哄晢鍝侀〉URL
				VTM.pageData.goods.category.id,   			   //绫荤洰ID
				VTM.pageData.goods.category.name,   		   //绫荤洰鍚嶇О
				VTM.pageData.goods.brand.id   			   //鍝佺墝ID
			]);
			gdt_tracker.push(["send"]);
		});
	})
	
	other_loadjs(url);
	
}
	    Date.prototype.format = function (format) {
	    var o = {
	        "M+": this.getMonth() + 1, //month
	        "d+": this.getDate(), //day
	        "h+": this.getHours(), //hour
	        "m+": this.getMinutes(), //minute
	        "s+": this.getSeconds(), //second
	        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
	        "S": this.getMilliseconds() //millisecond
	    }
	    if (/(y+)/.test(format))
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(format))
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    return format;
}
	    //鐧惧害涓€у寲浠ｇ爜
function baidu_zyx() {
	window._hmt=window._hmt||[];
   if('101'==VTM.pageId||'102'==VTM.pageId){
   	return ;
   }
   other_loadjs(VTM.protocol+"ms.vipstatic.com/vtm/jquery.md5.min.js");

    //棣栭〉锛岄閬撻〉锛屽垪琛ㄩ〉
    if('215'==VTM.pageId||'216'==VTM.pageId||'217'==VTM.pageId||'301'==VTM.pageId||'222'==VTM.pageId){
	    var pageTypeConsts={'215':'index','216':'channel','217':'brand','301':'index','222':'list'};
	    var brand='217'==VTM.pageId?VTM.pageData.brand.name:'';
	    var rtTag ={
	    "data": {
		 "ecom_page": {
		   "page_type": pageTypeConsts[VTM.pageId], //椤甸潰绫诲瀷
		    "p_brand":brand,  //鍝佺墝鍚嶇О锛屽綋浠呮湁涓€涓搧鐗屾椂濉啓锛屽惁鍒欑疆绌�
		    "p_class1": "",  //涓€绾у搧绫�
		    "p_class2": ""  //浜岀骇鍝佺被

		  }
	      }
	    };
	   _hmt.push(['_trackRTEvent', rtTag]);
    }
    //璇︽儏椤�
    if('218'==VTM.pageId||'303'==VTM.pageId){
    $.Listeners.sub('stock_status').onsuccess(function (data) {
			var stock_status = data.total? 1 : 0 ;
			var rtTag ={
			     "data": {
		              "ecom_view": {
		                  "prod": [{
					"p_id": VTM.pageData.goods.id,
					"p_name": VTM.pageData.goods.name,
					"p_brand": VTM.pageData.goods.brand.name,
					"p_price": VTM.pageData.goods.currentPrice,
					"p_class1": "",
					"p_class2": VTM.pageData.goods.category.name,
					"p_class3": "",
					"p_class4": "",
					"p_stock":stock_status,
					"p_img_url":VTM.pageData.goods.previewImgUrl,
					"p_url":VTM.pageData.goods.url,
					"p_discount":VTM.pageData.goods.aigo,
					"p_logo":VTM.pageData.goods.brand.logoImgUrl,
					"p_orginal_price":VTM.pageData.goods.price,
					"p_campaign_end":new Date(parseInt(VTM.pageData.goods.underShelfTime)*1000).format("yyyy-MM-dd")
				    }]
		            }
		          }
		       };

       _hmt.push(['_trackRTEvent', rtTag]);
       });
    }
    //璁㈠崟纭椤�
    if('508'==VTM.pageId){
	var arr = [];
	for(var d=0;d<VTM.pageData.details.length;d++){
	      var num=Math.floor(Math.random()*10+1);
              arr.push({
                p_id:VTM.pageData.details[d].goodsId,
		p_price:VTM.pageData.details[d].goodsPrice,
		p_num:num
              });
	}
	var random_id=(new Date()).getTime().toString();
	var random_first=(Math.random()>0.495);
	var rtTag ={
	  "data": {
		"ecom_order": {
                "order_id": random_id,
                "order_first": random_first,
                "order_sum": (new Date()).getTime().toString().slice(9,13),
                "prod":arr
                 }
          }
	}
	_hmt.push(['_trackRTEvent', rtTag]);
     }
     if(window.VTM && VTM.sessionUser && VTM.sessionUser.id && VTM.sessionUser.id!=''){
	     $.Listeners.sub("vtm_0000md.loaded").onsuccess(function(){
	     	var userId=$.md5($.md5(VTM.sessionUser.id+'#$%@')+'!@#@')
	     	_hmt.push(["_setUserId", userId]);
	     })
     }
	
    //娣诲姞璐墿杞�
     $.Listeners.sub('addCartSuccess').onsuccess(function() {
	     if(window.VTM && VTM.sessionUser && VTM.sessionUser.id && VTM.sessionUser.id!=''){
		     $.Listeners.sub("vtm_0000md.loaded").onsuccess(function(){
		     	var userId=$.md5($.md5(VTM.sessionUser.id+'#$%@')+'!@#@')
		     	_hmt.push(["_setUserId", userId]);
		     })
	     }
		
     });
    var scriptEl = document.createElement("script");
    scriptEl.src = VTM.protocol+'hm.baidu.com/hm.js?53a0d71dba66835ff1aa907db99144d8';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(scriptEl, s);
}
	        function mediav(url) {
	var _mvq = window._mvq || []; 
    _mvq.push(['$setAccount', 'm-120-0']);
	_mvq.push(['$logConversion']);
    window._mvq = _mvq;
	
	//鏀粯鎴愬姛椤�
	if(window.VTM && '503'==VTM.pageId) {
		var randomOrderId = Math.random().toString().slice(2,18) + (new Date).getTime();
		_mvq.push(["$setGeneral", "ordercreate", "", "", ""]);
		_mvq.push(["$addOrder", randomOrderId, ""]);
		_mvq.push(["$addItem", randomOrderId, "12345", "12345", "", "", "", ""]);
	}
	other_loadjs(url);
	
	//鐗瑰崠浼氬晢鍝佽鎯呴〉鍙栧晢鍝佷俊鎭�
	if(window.VTM && '218'==VTM.pageId) {
	    $.Listeners.sub('stock_status').onsuccess(function (data) {
			var stock_status = data.total ? 1 : 0;
			_mvq.push(['$setGeneral', 'goodsdetail', '', /*鐢ㄦ埛鍚�*/ '', /*鐢ㄦ埛id*/ '']);
			_mvq.push(['$addGoods',  /*鍒嗙被id*/ VTM.pageData.goods.category.id, /*鍝佺墝id*/ VTM.pageData.goods.brand.id, /*鍟嗗搧鍚嶇О*/ VTM.pageData.goods.name ,/*鍟嗗搧ID*/ VTM.pageData.goods.id,/*鍟嗗搧鍞环*/ VTM.pageData.goods.currentPrice, /*鍟嗗搧鍥剧墖url*/ VTM.pageData.goods.imgUrls, /*鍒嗙被鍚�*/ VTM.pageData.goods.category.name, /*鍝佺墝鍚�*/ VTM.pageData.goods.brand.name, /*鍟嗗搧搴撳瓨鐘舵€�1鎴栨槸0*/ stock_status, /*缃戠粶浠�*/ VTM.pageData.goods.price,/*鏀惰棌浜烘暟*/ VTM.pageData.goods.favoriteNumber, /*鍟嗗搧涓嬫灦鏃堕棿*/ VTM.pageData.goods.underShelfTime]);
			_mvq.push(['$addPricing', /*鍟嗗搧LOGO*/ VTM.pageData.goods.brand.logoImgUrl]);
			_mvq.push(['$logData']);
		})
	}
	window._mvq = _mvq;
}
	    	    	    //鏄撳崥
function yibo(url){
	
	 window._adwq = window._adwq || [];
    _adwq.push(['_setAccount', 'phe73']);
    _adwq.push(['_setDomainName', '.vip.com']);
    _adwq.push(['_trackPageview']);
    //鍟嗗搧璇︽儏椤�
    if(window.VTM && VTM.pageId=='218'){
    	_adwq.push([ '_setDataType','view']);
    	var random_id=(new Date()).getTime().toString()+Math.floor(Math.random()*10);
    	_adwq.push([ '_setCustomer',random_id]);
    	$.Listeners.sub('stock_status').onsuccess(function (data) {
			var stock_status = data.total? 'Y' : 'N' ;
			_adwq.push(['_setItem',
		        VTM.pageData.goods.id,    // 09890鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佺紪鍙�  - 蹇呭～椤�
		        VTM.pageData.goods.name,       // 鐢佃鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸悕绉�  - 蹇呭～椤�
		        VTM.pageData.goods.currentPrice,    // 12.00鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝侀噾棰濓紙鐜颁环锛�  - 蹇呭～椤�
		        '1',        // 1鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佹暟閲�  - 蹇呭～椤�
		        VTM.pageData.goods.category.id,     // A123鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸垎绫荤紪鍙�  - 蹇呭～椤�
		        VTM.pageData.goods.category.name,        // 瀹剁數鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸垎绫诲悕绉�  - 蹇呭～椤�
		        VTM.pageData.goods.price,        // 10.00鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸師浠� - 蹇呭～椤�
		        VTM.pageData.goods.previewImgUrl,     // 璇峰～鍏ョ礌鏉�(鍥剧墖)鍦板潃 - 蹇呭～椤�
		       stock_status,        // 璇峰～鍏ュ晢鍝佺姸鎬侊紝Y浠ｈ〃棰勫敭銆佸湪鍞紱N浠ｈ〃涓嬫灦 - 蹇呭～椤�
		       VTM.pageData.goods.url, //鍟嗗搧url
		       VTM.pageData.goods.underShelfTime,//涓嬫灦鏃堕棿
		       VTM.pageData.goods.brand.id, //鍝佺墝id
		       VTM.pageData.goods.brand.name //鍝佺墝鍚嶇О
	    	])
			_adwq.push([ '_trackTrans' ]);
		});
    }
    //璁㈠崟鎴愬姛椤�
    if(window.VTM && '503'==VTM.pageId){
    	_adwq.push([ '_setDataType','order']);
    	var random_id=(new Date()).getTime().toString()+Math.floor(Math.random()*10);
    	_adwq.push([ '_setCustomer',random_id]);
		var random_order_id=(new Date()).getTime().toString();
    	_adwq.push(['_setOrder',random_order_id,'100.00','']);
		_adwq.push([ '_trackTrans' ])
    }
    other_loadjs(url);
    //娣诲姞璐墿杞�
    $.Listeners.sub('addCartSuccess').onsuccess(function() {
    	_adwq.push([ '_setDataType','cart']);
    	var random_id=(new Date()).getTime().toString()+Math.floor(Math.random()*10);
    	_adwq.push([ '_setCustomer',random_id]);
    	_adwq.push(['_setItem',
	        VTM.pageData.goods.id,    // 09890鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佺紪鍙�  - 蹇呭～椤�
	        VTM.pageData.goods.name,       // 鐢佃鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸悕绉�  - 蹇呭～椤�
	        VTM.pageData.goods.currentPrice,    // 12.00鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝侀噾棰�  - 蹇呭～椤�
	        '1',        // 1鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佹暟閲�  - 蹇呭～椤�
	        VTM.pageData.goods.category.id,     // A123鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸垎绫荤紪鍙�  - 蹇呭～椤�
	        VTM.pageData.goods.category.name        // 瀹剁數鏄竴涓緥瀛愶紝璇峰～鍏ュ晢鍝佸垎绫诲悕绉�  - 蹇呭～椤�
   		]);
		_adwq.push([ '_trackTrans' ]);
    });
}
	    function admaster (url) {
	if('101'==VTM.pageId||'102'==VTM.pageId){
		return;
	}
	var _smq = _smq || [];
	_smq.push(['_setAccount', '6230a49', new Date()]);
	_smq.push(['_setHeatmapEnabled', 'no']);
	_smq.push(['_setDomainName', 'vip.com']);
	_smq.push(['pageview']);
	window._smq = _smq;
	new Image().src='http://v.admaster.com.cn/i/a58434,b715772,c2,i0,m202,h';
	other_loadjs(url);	
}
	        function mjoy(url){
	var _mjoy = window._mjoy || [];
	_mjoy.push(['advertiser','VIPSHOP']); //骞垮憡涓荤殑鍞竴鏍囩ず
	var userId=Math.random().toString().slice(5,10)+(new Date).getTime().toString().slice(8,11);
	_mjoy.push(['userId',userId]);    //璁垮鐨勫敮涓€鏍囩ず
	var isRegister=Math.random()>0.495?0:1
	_mjoy.push(['isRegister',isRegister]);  //璁垮鏄惁宸茬櫥褰�  宸茬櫥褰� 1 鏈櫥褰� 0
	if(window.VTM && VTM.sessionUser && VTM.sessionUser.id != ''){
		_mjoy.push(['isLogin','1']);
	}else{
		_mjoy.push(['isLogin','0']);
	}
	//棣栭〉
	if(window.VTM && VTM.pageId=='215'){
		_mjoy.push(['pageLv','index']);
	}else if(window.VTM && '102'==VTM.pageId){
		_mjoy.push(['pageLv','register']);
	}else if(window.VTM && '101'==VTM.pageId){
		_mjoy.push(['pageLv','login']);
	}else if(window.VTM && '216'==VTM.pageId){
		_mjoy.push(['pageLv','special']);
	}
	//鍝佺墝椤�
	else if(window.VTM && VTM.pageId=='217'){
		_mjoy.push(['_item','brand',
					{id:VTM.pageData.brand.id,
					 name:VTM.pageData.brand.name,
					 logoImgUrl:VTM.pageData.brand.logoImgUrl
			}]);
		_mjoy.push(['pageLv','brand']);
	}
	//鍒嗙被椤�	
	else if(window.VTM && VTM.pageId=='222'){
		_mjoy.push(['_item','category',
					{ id: VTM.pageData.goodsCategory.id,
					name:VTM.pageData.goodsCategory.name}
			]);
		_mjoy.push(['pageLv','category']);
	}
	//娲诲姩椤甸潰
	else if(window.VTM && VTM.pageId=='224'){
		_mjoy.push(['_item','act',
					{name: VTM.Act.name,
					url: location.href,
					actImgUrl: ""}
			]);
	}
	//璇︽儏椤�
	else if(window.VTM && VTM.pageId=='218'){
		$.Listeners.sub('stock_status').onsuccess(function (data) {
			var stock_status = data.total? 1 : 0 ;
			var msgs=[];
			$.Listeners.sub('activetips.getData.success').onsuccess(function(data){
				if(data != null){
					for(var a in data){
						msgs.push(data[a].msg);
					}
				}
			})

			_mjoy.push(['_item','goods',{
				    id: VTM.pageData.goods.id,  //鍟嗗搧ID
				    name: VTM.pageData.goods.name, //鍟嗗搧鍚嶇О
				    url:location.href,  //鍟嗗搧鐨勮鎯呴〉URL
				    nowPrice:VTM.pageData.goods.currentPrice, //鍟嗗搧鐜颁环
				    price:VTM.pageData.goods.price,  //鍟嗗搧甯傚満浠�
					aigo:VTM.pageData.goods.aigo,    //鍟嗗搧鎶樻墸
					brand: {
						id:VTM.pageData.goods.brand.id,
						logoImgUrl:VTM.pageData.goods.brand.logoImgUrl,
						name:VTM.pageData.goods.brand.name
					},
					category: {
						id: VTM.pageData.goods.category.id,
						name:VTM.pageData.goods.category.name
					},
					imgUrls:VTM.pageData.goods.previewImgUrl,//鍟嗗搧鐨勫浘鐗囧垪琛�
					stockStatus: stock_status, //鍟嗗搧鐨勫簱瀛樼姸鎬� 1鏈夊簱瀛� 0 鏃犲簱瀛�
					endTime:VTM.pageData.goods.underShelfTime, //鍟嗗搧涓嬫灦鏃堕棿
					promotion:msgs
				}
			]);
			_mjoy.push(['pageLv','goods']);
		});

		
	}else{
		_mjoy.push(['pageLv','na']);
	}	
	//璁㈠崟纭椤�
	if(window.VTM && VTM.pageId=='508'){
		var goods=[];
		for(var d=0;d<VTM.pageData.details.length;d++){
			var goodsIds={};
			goodsIds.id = VTM.pageData.details[d].goodsId;
			goodsIds.num=1;
			goodsIds.money=VTM.pageData.details[d].goodsPrice;
			goods.push(goodsIds);
		}
		_mjoy.push(['_order','order',{
			goods :goods  //璁㈠崟鍟嗗搧鍒楄〃 {id锛氬晢鍝両D锛� num锛氭暟閲忥紝 money锛� 浠锋牸}
		}]);
	}
	//璁㈠崟鎴愬姛椤�
	if(window.VTM && VTM.pageId=='503'){
		_mjoy.push(['_pay','order',{}]);
	}	

	window._mjoy = _mjoy;
	other_loadjs(url);	
	//鍔犲叆璐墿杞�
	$.Listeners.sub('addCartSuccess').onsuccess(function() {
		var _mjoy = window._mjoy || [];
		_mjoy.push(['_andCart','goods',{id: VTM.pageData.goods.id}]);
     	window._mjoy = _mjoy;
    });
    //鏀惰棌
    $.Listeners.sub('addProIntoList').onsuccess(function(){
    	var _mjoy = window._mjoy || [];
    	_mjoy.push(['_love','goods',{id: VTM.pageData.goods.id}]); 
    	window._mjoy = _mjoy;
    })
}
	    //pairui
function pairui(url){
	window.sg_dsp_data = window.sg_dsp_data || [];
	window. sg_dsp_id = '411102';
	var pageTypeConsts = {'215':'index','216':'channel','224':'campaign'}
	//棣栭〉
	if(window.VTM && VTM.pageId=='215' || VTM.pageId=='216' || VTM.pageId=='224'){
		var sg_tag = {
	    	"data": {	        	
			    "ecom_page": {
			        "page_type": pageTypeConsts[VTM.pageId], //椤甸潰绫诲瀷
					"p_brand":"",  //鍝佺墝鍚嶇О锛屽涓搧鐗屼互|鍒嗛殧 
			        "p_class1": "",  //涓€绾у搧绫�
					"p_class2": "", //浜岀骇鍝佺被
					"p_class3": "",
					"p_class4": ""  
			    	}			    
				}
		};
		sg_dsp_data.push(sg_tag);
	}
	//鍒楄〃椤�
	if(window.VTM && VTM.pageId=='217'){
		var sg_tag = {
	    	"data": {	        	
			    "ecom_page": {
			        "page_type": "list", //椤甸潰绫诲瀷
					"p_brand":VTM.pageData.brand.name,  //鍝佺墝鍚嶇О锛屽涓搧鐗屼互|鍒嗛殧 
			        "p_class1": "",  //涓€绾у搧绫�
					"p_class2": "",  //浜岀骇鍝佺被
					"p_class3": "",
					"p_class4": "" 
			    	} 
			}
		};
		sg_dsp_data.push(sg_tag);
	}
	//鍟嗗搧椤�
	if(window.VTM && VTM.pageId=='218'){
	$.Listeners.sub('stock_status').onsuccess(function (data) {
		var stock_status = data.total? 1 : 0 ;
		var sg_tag = {
     		"data": {
    			"ecom_view": {
        			"prod": [
            		{
	                	"p_id": VTM.pageData.goods.id,
	                	"p_name": VTM.pageData.goods.name,
	                	"p_brand": VTM.pageData.goods.brand.name,
						"p_pre_price": VTM.pageData.goods.price,
	                	"p_price": VTM.pageData.goods.currentPrice,
	                	"p_discount": VTM.pageData.goods.aigo,
	                	"p_class1": "",
	                	"p_class2": "",
	                	"p_class3": VTM.pageData.goods.category.name,
	                	"p_class4": "",
						"p_stock": stock_status,
						"p_img_url": VTM.pageData.goods.previewImgUrl,
						"p_url": VTM.pageData.goods.url,
						"p_expire_time":new Date(parseInt(VTM.pageData.goods.underShelfTime)*1000).format("yyyyMMdd hh:mm:ss")
            		}]
    			}
    		}
		};
		sg_dsp_data.push(sg_tag)
	});	
	}
	//璁㈠崟纭椤�
	if('508'==VTM.pageId){
		var arr = [];
		for(var d=0;d<VTM.pageData.details.length;d++){
	      var num=Math.floor(Math.random()*3+1);
              arr.push({
                p_id:VTM.pageData.details[d].goodsId,
				p_price:VTM.pageData.details[d].goodsPrice,
				p_num:num
              });
		}
		var sg_tag = {
    		"data": {
		     "ecom_order": {
			        "order_id": "",
			        "order_first": "",
			        "order_sum": "",
			        "prod":arr
		    	}
    		}
		};
		sg_dsp_data.push(sg_tag);
	}
	//鏀粯鎴愬姛椤�
	if(window.VTM && VTM.pageId=='503'){
		var sg_tag = {
	    "data": {
	     "ecom_pay_online": {
	        "order_id": "",
	        "order_first": "",
	        "order_sum": "",
	        "prod": [
	            {
	                "p_id": "",
	                "p_price": "",
	                "p_num": ""
	            }
	        ]}
	    }
	};
	sg_dsp_data.push(sg_tag);
	}
	
	$.Listeners.sub('loginSuccess').onsuccess(function(){
		if(window.VTM && VTM.sessionUser && VTM.sessionUser.id && VTM.sessionUser.id!=''){
		     $.Listeners.sub("vtm_0000md.loaded").onsuccess(function(){
		    	var sg_tag = {
				    "data": {
				    "ecom_login": {
				        "id":$.md5($.md5(VTM.sessionUser.id+'#$%@')+'!@#@')
				    	}
				    }
				};
		       sg_dsp_data.push(sg_tag);
		       other_loadjs(url);
		     })
	     }	
	})

	$.Listeners.sub('addCartSuccess').onsuccess(function() {
		var sg_tag = {
			"data": {
				"ecom_ cart ": { //娣诲姞璐墿杞�
				"prod": [{
					"p_id": VTM.pageData.goods.id,
					"p_price": VTM.pageData.goods.currentPrice
					}]
				}
			}
		};
		sg_dsp_data.push(sg_tag);
		other_loadjs(url);
	})

	other_loadjs(url);

}
function startDsp(){
            tencentgdt('http://ms.vipstatic.com/vtm/vtm_config_res/prod/1428025414396_js_core.js');
            baidu_zyx('');
            mediav('http://ms.vipstatic.com/vtm/vtm_config_res/prod/1440739530222_js_core.js');
            yibo('http://ms.vipstatic.com/vtm/vtm_config_res/prod/1440739651257_js_core.js');
            admaster ('http://ms.vipstatic.com/vtm/vtm_config_res/prod/1442299649565_js_core.js');
            mjoy('http://ms.vipstatic.com/vtm/vtm_config_res/prod/1443422475906_js_core.js');
            pairui('http://ms.vipstatic.com/vtm/vtm_config_res/prod/1447035324925_js_core.js');
    }
function startNotDsp(){
    }
function startVtm(){
    /**cart**/
    if('501'==VTM.pageId) return;
    startDsp();
    startNotDsp();
}

startVtm();

$.Listeners && $.Listeners.pub('vtm.loaded').success();


