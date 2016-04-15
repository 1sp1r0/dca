(function($) {
    'use strict';

    //鍒ゆ柇娴忚鍣ㄦ槸鍚︽敮鎸乸laceholder灞炴€�
    var supportPlaceholder = 'placeholder' in document.createElement('input');

    var placeholder = function() {
        var $placeholderInputs;

        // 涓篒E10浠ヤ笅娴忚鍣ㄦ坊鍔爌laceholder鐗规€�
        if (!supportPlaceholder) {
            $placeholderInputs = this.find('input:text, input:password').filter(function() {
                var text = $(this).attr('placeholder');

                return text && text !== ''
            });

            $placeholderInputs.each(function() {
                var $me = $(this),
                    $placeholderSpan,
                    text = $me.attr('placeholder'),
                    spanHtml;

                text = text || '';
                spanHtml = '<span class="ie-placeholder">' + text + '</span>';
                $me.after(spanHtml);
                $placeholderSpan = $me.next('.ie-placeholder');

                $me.on('keypress', function(e) {
                    $placeholderSpan.hide();
                });

                $me.on('blur', function(e) {
                    var $target = $(e.target);
                    var val = $target.val();

                    if (val.length === 0) {
                        $placeholderSpan.show();
                    }
                    else {
                        $placeholderSpan.hide();
                    }
                });

                $placeholderSpan.on('click', function() {
                    $me.focus();
                });
            });
        }

        return this;
    };

    if (typeof define === 'function' && define.cmd) {
        define(function(require, exports, module) {
            $.fn.placeholder = placeholder;
        });
    }
    else {
        $.fn.placeholder = placeholder;
    }
})(jQuery);
