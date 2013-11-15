define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "three",
    "handlebars",
    "view/common/base_view",
    "util/animation/AnimationUtil",
    "util/MathUtils",
    "util/anim_frame",
    "tweenMax"
], function (
    $,
    _,
    Backbone,
    Config,
    Three,
    Handlebars,
    BaseView,
    AnimationUtils,
    MathUtils,
    AnimFrame,
    TweenMax
) {

    "use strict";

  return BaseView.extend({

        geometry: null,
        material: null,
        mesh:null,

        progress:0,
        speed:0,

        initialScale:null,

        initialize: function(options) {
            _.bindAll(this, "moveItem","moveItemToPosition");
            this.geometry = options.geometry;
            this.material = options.material;
            this.progress = Math.random();
            this.init();
        },

        moveItem: function(){
            var delay = 0;
            var time = Math.random() * 5 + 5;
            TweenMax.killTweensOf(this.mesh.position);
            TweenMax.killTweensOf(this.mesh.scale);
            TweenMax.killTweensOf(this.mesh.rotation);
            TweenMax.to(this.mesh.position, time, {
                x:(Math.random() * 1000 - 500),
                y:(Math.random() * 1000 - 500),
                z:(Math.random() * 1000 - 500)/3,
                delay:delay,
                onComplete:this.moveItem,
                onCompleteParams:[this.mesh],
                ease:Expo.easeInOut
            });
            /*TweenMax.to(this.mesh.scale, time, {
                x:this.initialScale.x,
                y:this.initialScale.y,
                z:this.initialScale.z,
                delay:delay,
                ease:Expo.easeInOut
            });*/
            TweenMax.to(this.mesh.rotation, time, {
                x:Math.random() * 1 * Math.PI,
                y:Math.random() * 1 * Math.PI,
                delay:delay,
                ease:Expo.easeInOut
            });
        },

        moveItemToPosition: function(){
            var delay = 0;
            var time = Math.random() * 2 + 2;
            TweenMax.killTweensOf(this.mesh.position);
            TweenMax.killTweensOf(this.mesh.scale);
            TweenMax.killTweensOf(this.mesh.rotation);
            TweenMax.to(this.mesh.position, time, {
                x:(Math.random() * 600 - 300),
                y:(Math.random() * 600 - 300),
                z:(Math.random() * 200 + 100),
                delay:delay,
                //onComplete:this.moveItemToPosition,
                //onCompleteParams:[this.mesh],
                ease:Expo.easeInOut
            });
            /*TweenMax.to(this.mesh.scale, time, {
                x:Math.random()*0.1,
                y:Math.random()*0.1,
                z:Math.random()*0.1,
                delay:delay,
                //onComplete:this.moveItemToPosition,
                //onCompleteParams:[this.mesh],
                ease:Expo.easeInOut
            });*/
            TweenMax.to(this.mesh.rotation, time, {
                x:0,
                y:0,
                delay:delay,
                ease:Expo.easeInOut
            });
        },

        hideCubes: function(){
            var delay = 0;
            var time = Math.random() * 2 + 2;
            TweenMax.killTweensOf(this.mesh.position);
            TweenMax.killTweensOf(this.mesh.rotation);
            TweenMax.to(this.mesh.position, time, {
                x:(Math.random() * 600 - 300)*2,
                y:(Math.random() * 600 - 300)*2,
                z:(Math.random() * 1000) * -1 - 500,
                delay:delay,
                ease:Expo.easeInOut
            });
            TweenMax.to(this.mesh.rotation, time, {
                x:0,
                y:0,
                delay:delay,
                ease:Expo.easeInOut
            });
        },

        showCubes: function(){
            this.moveItem();
        },

        update: function(direction){
            /*if(this.progress > 1 || this.progress < 0){
                this.reinit(direction);
            }else{
                this.progress += this.speed * direction;
            }*/
        },

        reinit:function(direction){
            if(direction > 0){
                this.progress = 0;
            }else{
                this.progress = 1;
            }
        },

        init:function() {
            this.speed = Math.random() * 0.0007;
            this.mesh = new THREE.Mesh( this.geometry, this.material );

            this.mesh.position.x = (Math.random() * 1000 - 500) * 2;
            this.mesh.position.y = (Math.random() * 1000 - 500) * 2;
            this.mesh.position.z = (Math.random() * 1000) * -1 - 500;

            this.mesh.rotation.x = Math.random() * 2 * Math.PI;
            this.mesh.rotation.y = Math.random() * 2 * Math.PI;

            this.initialScale = new THREE.Vector3(Math.random() + 1, Math.random() + 1, Math.random() + 1);
            this.mesh.scale.x = this.initialScale.x;
            this.mesh.scale.y = this.initialScale.y;
            this.mesh.scale.z = this.initialScale.z;

            this.moveItem();
        },

        render: function() {
        }
	});
});