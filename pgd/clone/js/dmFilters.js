/**
 * Created by david-maser on 28/10/15.
 */
(function ( $ ) {

    $.fn.filterize = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            blur: null,
            brightness: null,
            contrast: null,
            dropShadow: null,
            grayscale: null,
            hueRotate: null,
            invert: null,
            opacity: null,
            saturate: null,
            sepia: null,
            transition:1,
            mode:null
        }, options),
            r = navigator,
            pool = '',
            pref = '',
            nav = r.appName,
            prod = r.product;

        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
            isFirefox = typeof InstallTrigger !== 'undefined',
            isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
            isChrome = !!window.chrome && !isOpera,
            isIE = /*@cc_on!@*/false || !!document.documentMode;

            if(isChrome == true || isSafari == true) {
                pref = '-webkit-';
            }else if(isFirefox == true) {
                pref = '-moz-';
            }

        console.log(options);
        // filterize the collection based on the settings variable.
        if(settings.blur !== null){
            pool += "blur("+settings.blur+"px) ";
        }
        if(settings.brightness !== null){
            pool += "brightness("+settings.brightness+") ";
        }
        if(settings.contrast !== null){
            pool += "contrast("+settings.contrast+") ";
        }
        if(settings.dropShadow !== null){
            pool += "drop-shadow("+settings.dropShadow+") ";
        }
        if(settings.grayscale !== null){
            pool += "grayscale("+settings.grayscale+") ";
        }
        if(settings.hueRotate !== null){
            pool += "hue-rotate("+settings.hueRotate+"deg) ";
        }
        if(settings.invert !== null){
            pool += "invert("+settings.invert+") ";
        }
        if(settings.opacity !== null){
            pool += "opacity("+settings.opacity+") ";
        }
        if(settings.saturate !== null){
            pool += "saturate("+settings.saturate+") ";
        }
        if(settings.sepia !== null){
            pool += "sepia("+settings.sepia+") ";
        }
        if(settings.mode == 'style') {
            return this.css({
                "filter": pool,
                "-webkit-filter": pool,
                "-moz-filter": pool
            });
        }else if(settings.mode == 'hover'){
            $(this).on('mouseover',function(){
                $(this).css({
                    "filter": pool,
                    "-webkit-filter": pool,
                    "-moz-filter": pool
                });
            }).on('mouseout',function(){
                $(this).attr('style','').css('transition',settings.transition+"s");
            });
            return this.css('transition',settings.transition+"s");
        }
    };

}( jQuery ));

/**
 usage
 $( "div" ).filterize({
    blur:2,
    brightness:2,
    sepia:1
 });
 **/