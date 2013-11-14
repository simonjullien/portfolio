/**
 * ...
 * @author emlyn@resn.co.nz
 */

require.config({

	paths: {
		"jquery": "libs/jquery-1.10.2",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"swfobject": "libs/swfobject",
		"handlebars": "libs/handlebars-v1.1.2",
		"text": "libs/text",
		"console": "libs/console-shim",
		"tweenMax": "libs/tweenmax/TweenMax",
		"tweenLite": "libs/tweenmax/TweenLite",
		"sylvester":"libs/sylvester-min",
		"three": "libs/three/three.min",
		"stats": "libs/three/stats.min",

		"copyShader": "libs/three/shaders/CopyShader",
		"horizontalBlurShader": "libs/three/shaders/HorizontalBlurShader",
		"verticalBlurShader": "libs/three/shaders/VerticalBlurShader",

		"effectComposer": "libs/three/postprocessing/EffectComposer",
		"renderPass": "libs/three/postprocessing/RenderPass",
		"maskPass": "libs/three/postprocessing/MaskPass",
		"shaderPass": "libs/three/postprocessing/ShaderPass",

        "libs/createjs/preloadjs": "libs/createjs/preloadjs-NEXT.min",
        "libs/createjs/tweenjs":"libs/createjs/tweenjs-0.5.0.min",
        "libs/createjs/easeljs": "libs/createjs/easeljs-0.7.0.min",
        "libs/createjs/movieclip": "libs/createjs/movieclip-0.7.0.min",
        "libs/createjs/soundjs": "libs/createjs/soundjs-0.5.0.min"
	},

	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'libs/jquery-migrate-1.2.1':{
			deps:['jquery']
		},
		'underscore': {
			exports: '_'
		},
		'sylvester':{
			exports: 'Sylvester'
		},
		'three':{
			exports: 'Three'
		},
		'stats':{
			exports: 'Stats'
		},


		'copyShader':{
			deps: ['three'],
			exports: 'CopyShader'
		},
		'horizontalBlurShader':{
			deps: ['three','copyShader'],
			exports: 'HorizontalBlurShader'
		},
		'verticalBlurShader':{
			deps: ['three','copyShader'],
			exports: 'VerticalBlurShader'
		},


		"effectComposer":{
			deps: ['three'],
			exports: 'EffectComposer'
		},
		"renderPass":{
			deps: ['three','effectComposer'],
			exports: 'RenderPass'
		},
		"maskPass":{
			deps: ['three','renderPass'],
			exports: 'MaskPass'
		},
		"shaderPass":{
			deps: ['three','maskPass'],
			exports: 'ShaderPass'
		},


		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'console': {
			exports: 'console'
		},
		'tweenMax': {
            exports: 'TweenMax'
        },
        'tweenLite': {
            deps:['libs/tweenmax/plugins/CSSPlugin'],
            exports: 'TweenLite'
        },
        'libs/createjs/preloadjs': {
            exports: 'createjs.LoadQueue'
        },
        'libs/createjs/movieclip': {
            deps: ['libs/createjs/easeljs','libs/createjs/tweenjs'],
            exports: 'createjs'
        },
        'libs/createjs/soundjs': {
            deps: ['libs/createjs/preloadjs'],
            exports: 'createjs.Sound'
        },


		'libs/swfobject': {
			deps: ['jquery'],
			exports: 'swfobject'
		},
		'libs/swffit':['libs/swfobject'],
		'libs/swfmacmousewheel':['libs/swfobject'],
		'libs/jquery-swfobject': ['jquery']
	},

	waitSeconds: 12

});
require(["jquery", "config", "view/Preloader"], function($, Config, Preloader) {
	Preloader.start();
	require(["main"], function(Main){
        Main.start();
    });
});

