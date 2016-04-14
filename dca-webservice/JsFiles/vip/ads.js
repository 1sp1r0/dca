'use strict';

var template = function(tpl, values) {
    return tpl.replace(/\{\{\s*(.+?)\s*\}\}/g, function(m, v) {
        return values[v] || '';
    });
};

/**
 * 鑾峰彇骞垮憡锛屾瘡涓箍鍛婁綅鍦ㄩ〉闈笂璁剧疆瀵瑰簲鐨刬d锛屾瘮濡備竴涓搴旀樉绀篈D110鐨勫箍鍛婁綅瀹瑰櫒
 * 璁剧疆鐩稿簲鐨勫鍣╥d涓篳#J_ad110`.
 * 鍚屾牱瀵瑰簲姣忎釜骞垮憡瀵瑰簲鐨勬ā鏉胯缃竴涓悕涓篳#J_ad110_tpl`鐨刬d锛屽鏋滄病鏈夋寚瀹氬搴斿箍鍛婁綅
 * 鐨勬ā鏉匡紝浼氫娇鐢ㄤ竴涓粺涓€鐨勯粯璁ゆā鏉縛#J_ad_tpl`閲岄潰鐨勫唴瀹广€�
 */
var adsMod = {
    api: '//pcapi.vip.com/ads/index.php?callback=?',
    /**
     * 鍒濆鍖栬缃鑾峰彇鐨勫箍鍛奿d
     * @method init
     * @params {Array} ids
     */
    init: function(ids) {
        this.ids = ids;
        return this;
    },
    /**
     * 鑾峰彇骞垮憡鎺ュ彛鏁版嵁 鑳屾櫙绫诲箍鍛婄壒娈婂鐞�
     * @method fetch
     * @param {Function} [cb] 鍥炶皟鍑芥暟
     */
    bg: function(id, cb) {
        id = id || this.ids[0];
        $.getJSON(this.api, {
            type: id,
            areaid: VIPSHOP.cookie.get('vip_province'),
            warehouse: VIPSHOP.cookie.get('vip_wh')
        }, function(res) {
            for (var i in res) {
                if (res.hasOwnProperty('AD' + id) && res['AD' + id].items) {
                    var items = res['AD' + id].items[0];
                    $('.J_AD' + id + '_bg').css('background-image', 'url(' + items.img + ')');
                }
            }
        });
    },
    /**
     * 鑾峰彇骞垮憡鎺ュ彛鏁版嵁
     * @method fetch
     * @param {Function} [cb] 鍥炶皟鍑芥暟
     */
    fetch: function(cb) {
        var that = this;
        $.getJSON(this.api, {
            type: this.ids.join(','),
            areaid: VIPSHOP.cookie.get('vip_province') ,
            warehouse: VIPSHOP.cookie.get('vip_wh') 
        }, function(res) {
            that.render(res, cb);
        });
    },
    /**
     * 鐢熸垚骞垮憡浣嶆暟鎹紝杈撳嚭鏁版嵁涔嬪悗浼氳Е鍙戜竴涓猔ads.rendered`浜嬩欢
     * @method render
     * @param {Object} res
     * @param {Function} [cb] 鍥炶皟鍑芥暟
     */
    render: function(res, cb) {
        for (var k in res) {
            var items = res[k].items,
                i, len = items.length,
                // 骞垮憡浣岻D锛岀粺涓€杞崲鎴愬皬鍐欙紝濡俛d115锛岀敤鏉ュ鎵鹃〉闈㈠搴旂殑骞垮憡浣嶅拰妯℃澘

                slotName = k,//.toLowerCase(),
                // 瀵瑰簲骞垮憡浣嶅鍣�

                $slot = $('#J_' + slotName).empty(),
                // 瀵瑰簲骞垮憡浣嶆ā鏉匡紝濡傛灉娌℃湁鎸囧畾锛岄粯璁や娇鐢╜#J_ad_tpl`閲岄潰鐨勬ā鏉垮唴瀹�

                adTpl = $('#J_' + slotName + '_tpl').html() || $('#J_AD_tpl').html();
            for (i = 0; i < len; i++) {
                var item = items[i];
                var $item = $(template(adTpl, item));
                if (!item.link) {
                    if ($item.is('a')) {
                        $item.removeAttr('href');
                    } else {
                        $item.find('a').removeAttr('href');
                    }
                } else if (item.blank) {
                    if ($item.is('a')) {
                        $item.attr('target', '_blank');
                    } else {
                        $item.find('a').attr('target', '_blank');
                    }
                }
                $slot.append($item);
            }
        }
        if (cb && typeof cb === 'function') {
            cb(res);
        }
    }
};
window.adsMod = adsMod;

$(function() {

    // bgad
    var loginregRightHead = $("#J_ADADSBAZW9");
    if (loginregRightHead.length > 0) {
        adsMod.init(['ADSBAZW9']).fetch();
    }

    var regbg = $(".J_ADADS9757C_bg");
    if (regbg.length > 0) {
    adsMod.init(['ADS9757C']).bg();
    }

    var loginbg = $(".J_ADADSJ867S_bg");
    if (loginbg.length > 0) {
        adsMod.init(['ADSJ867S']).bg();
    }
});