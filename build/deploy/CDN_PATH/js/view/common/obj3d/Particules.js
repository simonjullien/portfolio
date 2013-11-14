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

        geometryParticules: null,
        particleCount: 30000,
        particles: null,

        initialize: function(options) {
            //_.bindAll(this, "moveItem","moveItemToPosition");
            this.init();
        },

        update: function(direction){
           this.particles.rotation.y += 0.0005;
        },

        init:function() {
            this.geometryParticules = new THREE.Geometry();

            for ( var i = 0; i < this.particleCount; i ++ ) {

                var pX = (Math.random() * 1000 - 500)*3;
                var pY = (Math.random() * 1000 - 500)*3;
                var pZ = (Math.random() * 1000 - 500)*3;
                var particle = new THREE.Vector3(pX, pY, pZ);
                particle.velocity = new THREE.Vector3(0, 0, 0);
                particle.targetPos = new THREE.Vector3(
                    (Math.random() * 1000 - 500)*3,
                    (Math.random() * 1000 - 500)*3,
                    (Math.random() * 1000 - 500)*3
                );
                this.geometryParticules.vertices.push( particle );
                
            }

            var color = 0x000000;
            var size  = 4;
            
            var mat = new THREE.ParticleBasicMaterial({
                color: color,
                size: size,
                map: THREE.ImageUtils.loadTexture("CDN_PATH/img/particule.png"),
                //blending: THREE.AdditiveBlending,
                transparent: true
            });
            //mat.alphaTest = 0.1;

            this.particles = new THREE.ParticleSystem( this.geometryParticules, mat );
            this.particles.sortParticles = false;
        },

        render: function() {
        }
	});
});