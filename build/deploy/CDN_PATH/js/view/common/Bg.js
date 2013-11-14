define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "three",
    "copyShader",
    "horizontalBlurShader",
    "verticalBlurShader",
    "effectComposer",
    "renderPass",
    "maskPass",
    "shaderPass",
    "handlebars",
    "view/common/base_view",
    "view/common/obj3d/Obj3d",
    "view/common/obj3d/Particules",
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
    CopyShader,
    HorizontalBlurShader,
    VerticalBlurShader,
    EffectComposer,
    RenderPass,
    MaskPass,
    ShaderPass,
    Handlebars,
    BaseView,
    Obj3d,
    Particules,
    AnimationUtils,
    MathUtils,
    AnimFrame,
    TweenMax
) {

    "use strict";

  return BaseView.extend({

        camera:null,
        scene:null,
        renderer:null,
        parent:null,
        pointLight:null,
        listMesh:null,
        particules:null,

        composer:null,
        hblur:null,
        vblur:null,

        mouseX:0,
        mouseY:0,
        tgRotationX:0,
        tgRotationY:0,

        totalAngle:1280,

        initialize: function() {
           _.bindAll(
                this,
                "onWindowResize",
                "onMouseMove",
                "animate",
                "render"
            );
            this.mouse = new THREE.Vector2();
            this.init();
        },

        init:function() {
            this.parent = new THREE.Object3D();
            //this.parent.rotation.x = Math.PI/2;

            this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
            this.camera.position.z = 2500;

            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog( 0xa9cfd5, 500, 2500 );

            this.renderer = new THREE.WebGLRenderer( { antialias: true } );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.setClearColor( 0xa9cfd5, 1 );

            this.pointLight = new THREE.PointLight( 0xffffff, 0.5, 5000);
            //this.scene.add(this.pointLight);
            this.pointLight.position.z = 2500;

            var geometry = new THREE.CubeGeometry(300, 300, 300, 1, 1, 1);
            var material = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0xffffff, shading: THREE.SmoothShading, transparent: false } );

            this.listMesh = [];
            for ( var i = 0; i < 10; i ++ ) {
                var tmpMesh = new Obj3d({geometry:geometry, material:material});
                this.parent.add( tmpMesh.mesh );
                this.listMesh.push(tmpMesh);
            }

            this.scene.add(this.parent);
            this.el.appendChild( this.renderer.domElement );

            window.addEventListener( 'resize', this.onWindowResize, false );
            window.addEventListener( 'mousemove', this.onMouseMove, false );

            /*this.composer = new THREE.EffectComposer( this.renderer );
            this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

            this.hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
            this.composer.addPass( this.hblur );
            this.hblur.uniforms[ 'h' ].value = 0.001;
                
            this.vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );
            this.vblur.renderToScreen = true;
            this.composer.addPass( this.vblur );
            this.vblur.uniforms[ 'v' ].value = 0.001;*/

            //this.createParticules();
            this.animate();


            //this.animateTo();
        },

        onMouseMove:function(event){
            this.mouseX = ( event.clientX - window.innerWidth/2);
            this.mouseY = ( event.clientY - window.innerHeight/2);
        },

        hideCubes: function(){
            for (var i = 0; i < this.listMesh.length; i++) {
                var currentM = this.listMesh[i];
                currentM.hideCubes();
            }
        },

        showCubes: function(){
            for (var i = 0; i < this.listMesh.length; i++) {
                var currentM = this.listMesh[i];
                currentM.showCubes();
            }
        },

        triggerOver: function(){
            for (var i = 0; i < this.listMesh.length; i++) {
                var currentM = this.listMesh[i];
                currentM.moveItemToPosition();
            }
            /*TweenMax.killTweensOf(this.parent.rotation);
            TweenMax.to(this.parent.rotation, 20, {
                z:(Math.random() * Math.PI *2),
                ease:Expo.easeInOut
            });*/
        },

        triggerOut: function(){
            for (var i = 0; i < this.listMesh.length; i++) {
                var currentM = this.listMesh[i];
                currentM.moveItem();
            }
        },

        createParticules: function(){
            this.particules = new Particules();
            this.scene.add( this.particules.particles );
        },

        onWindowResize:function () {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( window.innerWidth, window.innerHeight );

        },

        goToBlack:function(){
            this.isWhite = false;
            this.renderer.setClearColor( 0x191919, 1 );
            this.scene.fog = new THREE.Fog( 0x191919, 500, 2500 );
            this.pointLight.intensity = 0.5;
        },

        goToWhite:function(){
            this.isWhite = true;
            this.renderer.setClearColor( 0xebebeb, 1 );
            this.scene.fog = new THREE.Fog( 0xebebeb, 500, 2500 );
            this.pointLight.intensity = 1;
        },

        animateTo: function(){
            for (var i = 0; i < this.listMesh.length; i++) {
                var item = this.listMesh[i];
                this.moveItem(item);
            }
        },

        animate:function () {
            requestAnimationFrame( this.animate );
            this.render();
        },

        positionOnSpiral: function(it){
            var currentMesh = it.mesh;
            var angleRad = (it.progress * this.totalAngle) * MathUtils.DEG_2_RAD;
            var posX = Math.cos(angleRad) * 500;
            var posY = (it.progress * 500 - 250) * 2;
            var posZ = Math.sin(angleRad) * 500;
            currentMesh.position.x = posX;
            currentMesh.position.y = posY * -1;
            currentMesh.position.z = posZ;
        },

        render: function() {

            this.tgRotationY += (this.mouseX - this.tgRotationY)*0.01;
            this.tgRotationX += (this.mouseY - this.tgRotationX)*0.01;

            //this.parent.rotation.y = this.tgRotationY*MathUtils.DEG_2_RAD * 0.1;
            //this.parent.rotation.x = this.tgRotationX*MathUtils.DEG_2_RAD * 0.1;
            this.camera.lookAt( this.scene.position );

            /*for (var i = 0; i < this.listMesh.length; i++) {
                var currentM = this.listMesh[i];
                this.positionOnSpiral(currentM);
                currentM.update(-1);
            }*/
            if(this.particules){
                this.particules.update();
            }
            this.renderer.render( this.scene, this.camera );
            if(this.composer){
                this.composer.render();
            }

        }
	});
});