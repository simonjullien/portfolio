/* global createjs: true, Expo: true */
define([
    "jquery",
    "underscore",
    "backbone",
    "tweenMax",
    "config",
    "router",
    "handlebars",
    "view/common/base_view"
], function (
	$,
	_,
	Backbone,
	TweenMax,
	Config,
	Router,
	Handlebars,
	BaseView
) {

	"use strict";

	return BaseView.extend({

		canvas: null,
		widthLogo: null,
		heightLogo: null,
		stage: null,

		bgGraphic:null,
		bgShape:null,

		lineHeight:33,
		bitmap:null,

		initialize: function(options) {
			_.bindAll(this,
				"tick",
				"draw",
				"stopAnimation"
			);
			this.widthLogo = options.width;
			this.heightLogo = options.height;
			this.createCanvas();
		},

		createCanvas: function(){
			this.canvas = document.createElement('canvas');
			$(this.el).prepend(this.canvas);
			this.canvas.width  = this.widthLogo * 2;
			this.canvas.height = this.heightLogo * 2;
			this.canvas.style.width  = (this.widthLogo )+'px';
			this.canvas.style.height = (this.heightLogo )+'px';

			this.stage = new createjs.Stage(this.canvas);
			this.stage.snapToPixelEnabled = false;
			this.stage.autoClear = true;

			this.bgGraphic = new createjs.Graphics();
			this.bgShape = new createjs.Shape(this.bgGraphic);
			this.stage.addChild(this.bgShape);

			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener('tick', this.tick);
			this.draw();
			TweenMax.to(this, 1, {lineHeight:4, onUpdate:this.draw, delay:2, ease:Expo.easeOut, onComplete:this.stopAnimation});

			this.bitmap = new createjs.Bitmap(Config.CDN+'/img/name.png');
			this.bitmap.x = 18*2;
			this.bitmap.y = 15*2;
			this.bitmap.alpha = 0;
			this.stage.addChild(this.bitmap);

			TweenMax.to(this.bitmap, 2, {alpha:1, delay:1, ease:Expo.easeInOut});
		},

		draw:function(){
			//console.log(this.lineHeight);
			this.bgGraphic.clear();
			this.bgGraphic.beginFill(createjs.Graphics.getRGB(239, 239, 239));
			this.bgGraphic.drawRect(0, 0, this.widthLogo * 2, this.lineHeight * 2);
			this.bgGraphic.drawRect(0, (this.heightLogo-this.lineHeight)*2, this.widthLogo * 2, this.lineHeight * 2);
			this.bgGraphic.drawRect(0, 0, this.lineHeight * 2, this.heightLogo * 2);
			this.bgGraphic.drawRect((this.widthLogo - this.lineHeight) * 2, 0, this.lineHeight * 2, this.heightLogo * 2);
			this.bgGraphic.endFill();
		},

		stopAnimation: function(){
			if(createjs.Ticker){
				createjs.Ticker.removeEventListener('tick', this.tick);
			}
		},

		tick: function() {
			//console.log('tick');
			this.stage.update();
		},

		cleanUp:function(){
			this.stopAnimation();
		},


		render: function() {
		}
	});
});