define([
    "util/animation/AnimationUtil"
], function (
    AnimationUtils
) {
    "use strict";

    /**
        Transform - 3d / 2d / CSS
        interface to matrixMath.js
        Calculates and sets 3d transform matrix on target element


        Example:
        var targetScale = { x: 1, y: 2 };
        var targetRotation = { y: 200, z: 60 };
        var targetTranslate = { x: 400, y: 100};

        transform.set({
          target: $('#test'),
          data: { scale: targetScale,
                  rotate: targetRotation,
                  translate: targetTranslate
          }
        });
    */

    var transform = {

        // Public method
        set: function (options) {

            // if origin property defined
            if(options.data.origin){
                setOrigin(options);
            }

            var cssTransform = getTransformation(options.data);
            setTransformation({
                target: options.target,
                value: cssTransform
            });
        }
    };



    // Private methods
    function getTransformation(data) {

        var cssTransform;

        if( Modernizr.csstransforms3d ){

            // 3d Transform
            cssTransform = get3dTransform(data);
        }
        else if( Modernizr.csstransforms ){

            // 2d Transform
            cssTransform = get2dTransform(data);
        }
        else{

            // CSS positioning
            cssTransform = getCSSPosition(data);
        }

        return cssTransform;
    }



    function get3dTransform(data) {

        var listTransform = [];

        // translate
        if (data.translate) {
            var translateM = AnimationUtils.getTransformationMatrix(data.translate.x, data.translate.y, data.translate.z);
            listTransform.push(translateM);
        }
        // rotate
        if (data.rotate) {
            if (data.rotate.x) {
                var rotateXM = AnimationUtils.getRotationXMatrix(data.rotate.x);
                listTransform.push(rotateXM);
            }
            if (data.rotate.y) {
                var rotateYM = AnimationUtils.getRotationYMatrix(data.rotate.y);
                listTransform.push(rotateYM);
            }
            if (data.rotate.z) {
                var rotateZM = AnimationUtils.getRotationZMatrix(-data.rotate.z);
                listTransform.push(rotateZM);
            }
        }
        // scale
        if (data.scale) {
            var scaleM = AnimationUtils.getScaleMatrix(data.scale.x, data.scale.y, data.scale.z);
            listTransform.push(scaleM);
        }
        // result
        var resultM = AnimationUtils.getResultMatrix(listTransform);
        return AnimationUtils.getStringTransform3d(resultM);
    }



    function get2dTransform(data) {

        var listTransform = [];

        // translate
        if (data.translate) {
            if(data.translate.x === undefined){
                console.log('translate.js expects x parameter');
            }
            if(data.translate.y === undefined){
                console.log('translate.js expects y parameter');
            }

            var translate = AnimationUtils.getStringTranslate2d(data.translate.x, data.translate.y);
            listTransform.push(translate);
        }
        // rotate
        if (data.rotate) {
            if (data.rotate.z) {
                var rotate = AnimationUtils.getStringRotate2d(data.rotate.z);
                listTransform.push(rotate);
            }
        }
        // scale
        if (data.scale) {
            var scale = AnimationUtils.getStringScale2d(data.scale.x, data.scale.y);
            listTransform.push(scale);
        }

        return listTransform;
    }



    // stone age ie browsers
    function getCSSPosition(data) {

        var translate = {};

        if (data.translate) {
            translate = AnimationUtils.getObjectTopLeft(data.translate.x, data.translate.y);
        }

        return translate;
    }



    function setTransformation(options) {

        var target = options.target;
        var cssProperties = options.value;

        if ( Modernizr.csstransforms3d ){

            target.css({
                'transform': cssProperties,
                '-ms-transform': cssProperties,
                '-webkit-transform': cssProperties,
                '-moz-transform': cssProperties,
                '-o-transform': cssProperties
            });
        }
        else if ( Modernizr.csstransforms ){
            var concatCssProperties = cssProperties.join(' ');
            target.css({
                'transform': concatCssProperties,
                '-ms-transform': concatCssProperties,
                '-webkit-transform': concatCssProperties,
                '-moz-transform': concatCssProperties,
                '-o-transform': concatCssProperties
            });
        }
        else {

            // CSS positioning
            if(cssProperties){
                target.css(cssProperties);
            }
        }
    }



    function setOrigin(options) {

        var target = options.target;
        var origin = options.data.origin;

        if ( Modernizr.csstransforms3d ) {

            // if origin.z not defined then set to 0
            origin.z = (origin.z) ? origin.z+'%' : 0;
            var origin3d = origin.x + '% ' + origin.y + '% ' + origin.z;

            target.css({
                'transform-origin': origin3d,
                '-ms-transform-origin': origin3d,
                '-webkit-transform-origin': origin3d,
                '-moz-transform-origin': origin3d,
                '-o-transform-origin': origin3d
            });
        }
        else if ( Modernizr.csstransforms ) {

            var origin2d = origin.x + '% ' + origin.y + '%';
            target.css({
                'transform-origin': origin2d,
                '-ms-transform-origin': origin2d,
                '-webkit-transform-origin': origin2d,
                '-moz-transform-origin': origin2d,
                '-o-transform-origin': origin2d
            });
        }
    }



    return transform;
});
