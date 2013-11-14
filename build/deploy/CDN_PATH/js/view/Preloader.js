define([
    "jquery",
    "underscore",
    "config",
    "tweenLite"

],function(
    $,
    _,
    Config,
    TweenLite
) {

    "use strict";

return {

    $preloader:null,
    $preloaderPosition:null,
    $preloaderProgress:null,

    tweenObj:null,

    start: function () {
        _.bindAll(this,
            "updatePreloader",
            "hidePreloader",
            "showPreloader",
            "killPreloader",
            "removePreloader"
        );
        window.killPreloader = this.killPreloader;
        this.tweenObj = {'progress':0, 'position':0};
        this.$preloader = $('.preloader');
        this.$preloaderPosition = $('.loader-graphic-position');
        this.$preloaderProgress = $('.loader-graphic');
        TweenLite.to(this.$preloaderProgress,0, {opacity:0});
        TweenLite.to(this.$preloader,1, {opacity:1, delay:0.5, ease:Power4.easeOut});
        TweenLite.to(this.tweenObj,1, {progress:1, delay:0.5, onUpdate:this.updatePreloader ,ease:Power4.easeInOut});
        this.showPreloader();
    },

    killPreloader: function(){
        TweenLite.to(this.$preloaderProgress,1, {opacity:1 ,ease:Power4.easeInOut});
        TweenLite.to(this,1.6, {onComplete:this.removePreloader});
    },

    removePreloader: function(){
        this.$preloader.remove();
    },

    showPreloader: function(){
        this.updatePreloader();
        this.tweenObj.position = 0;
        TweenLite.to(this.$preloaderProgress,1, {opacity:0.6 ,ease:Power4.easeInOut, onComplete:this.hidePreloader});
    },

    hidePreloader: function(){
        TweenLite.to(this.$preloaderProgress,1, {opacity:0.1 ,ease:Power4.easeInOut, onComplete:this.showPreloader});
    },

    updatePreloader: function(){
        this.$preloaderProgress.css({
            'transform': 'scaleX('+this.tweenObj.progress+')',
            '-ms-transform': 'scaleX('+this.tweenObj.progress+')',
            '-webkit-transform': 'scaleX('+this.tweenObj.progress+')',
            '-moz-transform': 'scaleX('+this.tweenObj.progress+')',
            '-o-transform': 'scaleX('+this.tweenObj.progress+')'
        });
        this.$preloaderPosition.css({
            'transform': 'translateX('+this.tweenObj.position+'px) ',
            '-ms-transform': 'translateX('+this.tweenObj.position+'px) ',
            '-webkit-transform': 'translateX('+this.tweenObj.position+'px) ',
            '-moz-transform': 'translateX('+this.tweenObj.position+'px) ',
            '-o-transform': 'translateX('+this.tweenObj.position+'px) ',
        });
    }

};
});