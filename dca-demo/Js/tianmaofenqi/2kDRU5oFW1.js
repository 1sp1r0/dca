define(function (require, exports, module) {
    OS.onlineServer = {
        onlineServiceDOM: function (config, logourl, seed) {
            if (typeof (seed) == 'undefined') {
                var seed = '';
            }
            DOM = jQuery('<div id="onlineService" seed="online-service" data-sourceId=' + config.sourceId + '></div>')
                .html('<a href="javascript:void(0)" seed="' + seed + '" style="position:relative;display:inline-block;">' +
                    '<img style="display: none" src="' + logourl + '" />' +
                    '<span title="关闭" class="J-close-online-service-trigger" style="position: absolute;right:5px;top:-12px;font-size:14px;background:#eee;padding:1px 2px;border-radius:3px;font-family:simsun;line-height: normal;color: #AC593F;" seed="pcportal_close_icon_trigger">' +
                    '&times;' +
                    '</span>' +
                    '</a>');
            return DOM;
        },
        behavior: function () {
            if (OS.params.uid == '' || OS.params.behavior != '1') {
                return false
            };
            jQuery.ajax({
                url: OS.server.initiativeServer + '/forward',
                dataType: 'jsonp',
                jsonp: '_callback',
                jsonpCallback: "jquery_callback",
                data: {
                    userId: OS.params.uid,
                    token: '',
                    sourceTag: 'SERVICE_POINT_' + OS.params.sourceId,
                    applicationTag: ''
                },
                success: function (data) {},
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    window.Tracker && Tracker.click('os-forward-error-' + textStatus);
                }
            });
        },
        buildOnlineService: function (config) {
            var that = this,
                random = Math.random().toFixed(2);
            jQuery.extend(OS.params, config)
            var build = function () {
                jQuery('body').append(that.onlineServiceDOM(config, that.buildLogo(config.logoId), config.scriptTag));
                if (jQuery('#onlineService img')) {
                    jQuery('#onlineService img').fadeIn(300, function () {
                        jQuery('#onlineService img').css({
                            display: 'block'
                        });
                    });
                }
                if (config.scriptTag) {
                    jQuery('#onlineService a').attr('seed', config.scriptTag);
                    that.buildScriptTag(config.scriptTag);
                }
                //图标可被关闭
                jQuery("#onlineService .J-close-online-service-trigger").live("click", function (e) {
                    jQuery(this).parents('#onlineService').remove()
                    e.stopPropagation()
                    e.preventDefault();
                });
            }
            if ((config.showProbability < 1) && (random < config.showProbability)) {
                build();
            } else if (config.showProbability == 1) {
                build();
            }
        },
        matchURL: function () {
            var that = this,
                currentUrl = window.location.hostname + window.location.pathname,
                isContinueMatch = true;
            jQuery.each(window.ONLINESERVERCONFIG.preciseMatchURL, function (i, o) {
                if (o.url == currentUrl) {
                    that.buildOnlineService(o);
                    that.openWin(OS.config.onlineServerURL, jQuery("#onlineService a"), o.sourceId)
                    isContinueMatch = false;
                    return false;
                }
            });
            if (isContinueMatch) {
                jQuery.each(window.ONLINESERVERCONFIG.vagueMatchURL, function (i, o) {
                    if (currentUrl.indexOf(o.url) >= 0) {
                        that.buildOnlineService(o);
                        that.openWin(OS.config.onlineServerURL, jQuery("#onlineService a"), o.sourceId)
                        isContinueMatch = false;
                        return false;
                    }
                });
            }
            if (!window.PORTALSERVERCONFIG) return false;
            if (isContinueMatch) {
                jQuery.each(window.PORTALSERVERCONFIG.excludeMatchURL, function (i, o) {
                    if (o.url == currentUrl) {
                        isContinueMatch = false;
                        return false;
                    }
                });
            }
            if (isContinueMatch) {
                jQuery.each(window.PORTALSERVERCONFIG.preciseMatchURL, function (i, o) {
                    if (o.url == currentUrl) {
                        that.buildOnlineService(o);
                        isContinueMatch = false;
                        return false;
                    }
                });
            }
            if (isContinueMatch) {
                jQuery.each(window.PORTALSERVERCONFIG.vagueMatchURL, function (i, o) {
                    if (currentUrl.indexOf(o.url) >= 0) {
                        that.buildOnlineService(o);
                        return false;
                    }
                });
            }
        },
        matchID: function () {
            if (!window.PORTALSERVERCONFIG) return false;
            if (!window.PORTALSERVERCONFIG.preciseMatchID) return false;
            var that = this;
            jQuery.each(jQuery("*[portalServer]"), function (s, el) {
                jQuery.each(window.PORTALSERVERCONFIG.preciseMatchID, function (i, o) {
                    if (o.ruleId == jQuery(el).attr('portalServer')) {
                        jQuery(el).attr('data-sourceId', o.sourceId)
                        that.openWin(OS.config.portalServerURL, jQuery(el), o.sourceId)
                    }
                });
            });
        },
        buildLogo: function (logoId) {
            var logoUrl;
            jQuery.each(window.PORTALSERVERCONFIG.logoDATA, function (i, o) {
                if (o.logoId == logoId) {
                    logoUrl = o.logoUrl;
                    return false;
                }
            });
            OS.params.logoUrl = logoUrl;
            return logoUrl;
        },
        buildScriptTag: function (scriptTagId) {
            var that = this;
            if (!window.PORTALSERVERCONFIG.scriptDATA) return false;
            if (!scriptTagId) return false;
            var scriptTagUrl;
            jQuery.each(window.PORTALSERVERCONFIG.scriptDATA, function (i, o) {
                if (o.scriptTag == scriptTagId) {
                    seajs.use(o.scriptUrl, function () {
                        if (typeof (OS.params.behaviorLazyLoad) == 'undefined') {
                            that.behavior();
                        };
                    });
                }
            });
        },
        openWin: function (url, dom, sourceId, token, pointId) {
            if (typeof (token) == 'undefined') {
                var token = '';
            }
            if (typeof (pointId) == 'undefined') {
                var pointId = '';
            }
            dom.live("click", function (e) {
                window.open(url + '?sourceId=' + sourceId + '&token=' + token + '&pointId=' + pointId + '&enterurl=' + encodeURIComponent(document.URL), 'newCliveWindow', 'toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=1003,height=600');
                e.preventDefault();
            });
        },
        init: function () {
            this.matchURL();
            this.matchID();
        }
    };
    OS.onlineServer.init();
});