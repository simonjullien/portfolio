define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "router",
    "tweenMax",
    "handlebars",
    "view/common/base_view",
    "view/modules/logo/Logo",
    "util/animation/AnimationUtil",
    "text!templates/pages/home.hbs"
], function (
    $,
    _,
    Backbone,
    Config,
    Router,
    TweenMax,
    Handlebars,
    BaseView,
    Logo,
    AnimationUtils,
    template
) {

    "use strict";

  return BaseView.extend({

        logoView:null,
        $intro:null,
        $links:null,
        $logoText:null,
        $rootNode:null,
        $topLine:null,
        $bottomLine:null,
        $listLink:null,
        $info:null,
        $infoContainer:null,
        $infoTitle:null,
        $infoAwardList:null,
        $infoMore:null,

        objTween:null,
        objTweenLine:null,

        isInfoOpened:false,

        initialize: function() {
            _.bindAll(this,
                "onResize",
                "affectTransformationsLine",
                "showLinks",
                "onMouseEnter",
                "onMouseLeave",
                "onMouseClick",
                "selectInfo",
                "unselectInfo",
                "removeInfo",
                "linkAreaEnter",
                "linkAreaLeave"
            );
            this.objTween = {'progress':0};
            this.objTweenLine = {'scalet':0.00001, 'scaleb':0.00001};
            this.$rootNode = $('#rootNode');
            //var compiledTemplate = Handlebars.compile(template);
            this.onTemplateLoaded();
            //# Load HTML template
            //require(["text!"+Config.BASE_URL+"templates/pages/home.hbs!strip"], _.bind(this.onTemplateLoaded, this) );
        },

        onTemplateLoaded: function(  ) {
            var templateFunction = Handlebars.compile( template );
            this.$el.append(
                $( templateFunction({}))
            );
            this.$infoContainer = $('.info-container-js', this.$el);
            this.$infoTitle = $('.info-title-js', this.$el);
            this.$infoAwardList = $('.info-award-js', this.$el);
            this.$infoMore = $('.info-more-js', this.el);
            $('.logo-links-js').css({'display':'none'});
            this.$topLine = $('.line-top-js', this.$el);
            this.$bottomLine = $('.line-bottom-js', this.$el);
            this.$links = $('.logo-links-js',this.$el);
            this.$intro = $('.intro-js',this.$el);
            this.$logoText = $('.logo-text-js',this.$el);
            this.$listLink = $('.link',this.$el);
            this.$info = $('.info-holder-js', this.el);
            this.logoView = new Logo({
                el:$('.logo-holder-js',this.$intro),
                'width':222,
                'height':66
            });

            this.$info.on('click',this.selectInfo);
            this.$infoContainer.on('click',this.unselectInfo);

            this.$links.on('mouseenter', this.linkAreaEnter);
            this.$links.on('mouseleave', this.linkAreaLeave);

            this.affectTransformationsLine(this.$topLine);
            this.affectTransformationsLine(this.$bottomLine);
            for (var i = 0; i < this.$listLink.length; i++) {
                var $it = $(this.$listLink[i]);
                TweenMax.to($it, 0, {alpha:0});
            }
            TweenMax.to(this.$info, 0, {alpha:0});
            TweenMax.to(this.$logoText, 0, {alpha:0});
            TweenMax.to(this.$logoText, 2, {alpha:1, delay:2.5, ease:Expo.easeInOut});
            TweenMax.to(this.$logoText, 1, {alpha:0, delay:5.5, ease:Expo.easeInOut});
            TweenMax.to(this.$info, 1, {alpha:1, delay:6.5, ease:Expo.easeInOut});
            TweenMax.to(this.objTween, 3, {progress:200, delay:5.5, onStart:this.showLinks, onUpdate:this.onResize, ease:Expo.easeInOut});
            this.onResize();
        },

        unselectInfo: function(event){
            if(this.isInfoOpened){
                this.isInfoOpened = false;
                this.trigger('HOME:HOME');
                this.closeInfos();
            }
        },

        selectInfo: function(event){
            if(!this.isInfoOpened){
                this.isInfoOpened = true;
                this.trigger('HOME:ABOUT');
                this.openInfos();
            }
        },

        linkAreaEnter: function(){
            this.trigger('HOME:OVER', 0);
        },

        linkAreaLeave: function(){
            this.trigger('HOME:OUT');
        },

        showLinks:function(){
            $('.logo-links-js').css({'display':'block'});
            TweenMax.to(this.objTweenLine, 2, {scalet:1, delay:0.9, onUpdate:this.affectTransformationsLine, onUpdateParams:[this.$topLine], ease:Expo.easeInOut});
            TweenMax.to(this.objTweenLine, 2, {scaleb:1, delay:0.9, onUpdate:this.affectTransformationsLine, onUpdateParams:[this.$bottomLine], ease:Expo.easeInOut});
            for (var i = 0; i < this.$listLink.length; i++) {
                var $it = $(this.$listLink[i]);
                $it.css({'display':'none'});
                TweenMax.to($it, 2, {alpha:0.5, delay:0.9+i*0.1, onStart:this.activate, ease:Expo.easeInOut});
                $it.on('mouseenter', this.onMouseEnter);
                $it.on('mouseleave', this.onMouseLeave);
                $it.on('click', this.onMouseClick);
            }
        },

        activate: function(){
            //console.log(this);
            var $tg = this.target;
            $tg.css({'display':'block'});
        },

        onMouseEnter: function(event){
           event.preventDefault();
           if(!this.isInfoOpened){
               var $tg = $(event.currentTarget);
               var attrID = $tg.attr('id');
               TweenMax.to($tg, 0.25, {alpha:1, ease:Expo.easeOut});
           }
        },

        onMouseLeave: function(event){
            event.preventDefault();
            if(!this.isInfoOpened){
                var $tg = $(event.currentTarget);
                TweenMax.to($tg, 0.5, {alpha:0.5, ease:Expo.easeOut});
            }
        },

        onMouseClick: function(event){
            /*event.preventDefault();
            console.log(event.target);*/
        },

        affectTransformationsLine:function($tg){
            var returnObj = {};
            var tran = Config.getVendorPrefix().css+'transform';
            var scaleM = AnimationUtils.getScaleMatrix(this.objTweenLine.scalet, 1, 1);
            var resltM = AnimationUtils.getResultMatrix([scaleM]);
            var cssTransformMatrix = AnimationUtils.getStringTransform3d(resltM);
            returnObj[tran] = cssTransformMatrix;
            $tg.css(returnObj);
        },

        affectTransformations:function(x, y){
            var returnObj = {};
            var tran = Config.getVendorPrefix().css+'transform';
            var translationM = AnimationUtils.getTransformationMatrix(x, y, 0);
            var resltM = AnimationUtils.getResultMatrix([translationM]);
            var cssTransformMatrix = AnimationUtils.getStringTransform3d(resltM);
            returnObj[tran] = cssTransformMatrix;
            this.$intro.css(returnObj);
        },

        affectTransformationsLinks:function(x, y){
            var returnObjL = {};
            var tranL = Config.getVendorPrefix().css+'transform';
            var translationML = AnimationUtils.getTransformationMatrix(x, y, 0);
            var resltML = AnimationUtils.getResultMatrix([translationML]);
            var cssTransformMatrixL = AnimationUtils.getStringTransform3d(resltML);
            returnObjL[tranL] = cssTransformMatrixL;
            this.$links.css(returnObjL);
        },

        affectTransformationsInfo:function(x, y){
            var returnObjL = {};
            var tranL = Config.getVendorPrefix().css+'transform';
            var translationML = AnimationUtils.getTransformationMatrix(x, y, 0);
            var resltML = AnimationUtils.getResultMatrix([translationML]);
            var cssTransformMatrixL = AnimationUtils.getStringTransform3d(resltML);
            returnObjL[tranL] = cssTransformMatrixL;
            this.$infoContainer.css(returnObjL);
        },

        openInfos: function(){
            this.$infoContainer.css({'display':'block'});
            TweenMax.to(this.$info, 0.5, {alpha:0, ease:Expo.easeInOut});
            for (var i = 0; i < this.$listLink.length; i++) {
                var $it = $(this.$listLink[i]);
                TweenMax.to($it, 1, {alpha:0, delay:i*0.1, ease:Expo.easeInOut});
            }

            this.$infoTitle.css({'opacity':0});
            this.$infoAwardList.css({'opacity':0});
            this.$infoMore.css({'opacity':0});

            TweenMax.to(this.$topLine, 1, {alpha:1, ease:Expo.easeInOut});
            TweenMax.to(this.$bottomLine, 1, {alpha:1, ease:Expo.easeInOut});
            TweenMax.to(this.objTweenLine, 2, {scalet:1.5, onUpdate:this.affectTransformationsLine, onUpdateParams:[this.$topLine], ease:Expo.easeInOut});
            TweenMax.to(this.objTweenLine, 2, {scaleb:1.5, onUpdate:this.affectTransformationsLine, onUpdateParams:[this.$bottomLine], ease:Expo.easeInOut});
            TweenMax.to(this.$infoTitle, 1, {alpha:1, delay:1, ease:Expo.easeInOut});
            for (var j = 0; j < this.$infoAwardList.length; j++) {
                var $itI = $(this.$infoAwardList[j]);
                TweenMax.to($itI, 1, {alpha:1, delay:1+j*0.1, ease:Expo.easeInOut});
            }
            TweenMax.to(this.$infoMore, 1, {alpha:1, delay:1.1, ease:Expo.easeInOut});
        },

         closeInfos: function(){

            for (var i = 0; i < this.$listLink.length; i++) {
                var $it = $(this.$listLink[i]);
                TweenMax.to($it, 1, {alpha:0.5, delay:0.5+i*0.1, ease:Expo.easeInOut});
            }

            TweenMax.to(this.$topLine, 1, {alpha:0.5, ease:Expo.easeInOut});
            TweenMax.to(this.$bottomLine, 1, {alpha:0.5, ease:Expo.easeInOut});
            TweenMax.to(this.objTweenLine, 1, {scalet:1, onUpdate:this.affectTransformationsLine, onUpdateParams:[this.$topLine], ease:Expo.easeInOut});
            TweenMax.to(this.objTweenLine, 1, {scaleb:1, onUpdate:this.affectTransformationsLine, onUpdateParams:[this.$bottomLine], ease:Expo.easeInOut});
            TweenMax.to(this.$info, 0.5, {alpha:1, ease:Expo.easeInOut});
            TweenMax.to(this.$infoTitle, 1, {alpha:0, ease:Expo.easeInOut});
            for (var j = 0; j < this.$infoAwardList.length; j++) {
                var $itI = $(this.$infoAwardList[j]);
                TweenMax.to($itI, 1, {alpha:0, delay:j*0.1, ease:Expo.easeInOut});
            }
            TweenMax.to(this.$infoMore, 1, {alpha:0, ease:Expo.easeInOut, onComplete:this.removeInfo});
        },

        removeInfo: function(){
            this.$infoContainer.css({'display':'none'});
        },

        onResize: function (evt) {
            var w = this.$rootNode.width();
            var h = this.$rootNode.height();
            if(this.$intro){
                var posX =  (this.$rootNode.width()-this.$intro.width())/2;
                var posY =  Math.round((this.$rootNode.height()-this.$intro.height())/2) - this.objTween.progress;
                this.affectTransformations(Math.round(posX), posY);
            }
            if(this.$links){
                var posLX =  (this.$rootNode.width()-this.$links.width())/2;
                var posLY =  (this.$rootNode.height()-this.$links.height())/2;
                this.affectTransformationsLinks(Math.round(posLX), Math.round(posLY));
            }
            if(this.$infoContainer){
                var posLCX =  (this.$rootNode.width()-this.$infoContainer.width())/2;
                var posLCY =  (this.$rootNode.height()-this.$infoContainer.height())/2 + 40;
                this.affectTransformationsInfo(Math.round(posLCX), Math.round(posLCY));
            }
        },

		render: function() {
            // this.$el.append('What an awesome about page!!');
		}
	});
});
