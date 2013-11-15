define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "tweenMax",
    "view/common/base_view"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    TweenMax,
    BaseView
) {

    "use strict";

  return BaseView.extend({

        $shell:null,
        tweenObj:null,

        initialize: function() {
            _.bindAll(this,
                "affectTransformations"
            );
            this.$shell = $('#shellNode');
            this.tweenObj = {'progress':0};
            TweenMax.to(this.tweenObj, 2, {progress:20, onUpdate:this.affectTransformations, delay:2, ease:Power4.easeInOut});
            
            //# Load HTML template
            //require(["text!"+Config.BASE_URL+"templates/modules/shell.hbs!strip"], _.bind(this.onTemplateLoaded, this) );
        },

        affectTransformations:function(){
            var returnObj = {};
            var tran = Config.getVendorPrefix().css+'box-shadow';
            returnObj[tran] = 'inset 0px 0px 0px '+this.tweenObj.progress+'px #efefef';
            this.$shell.css(returnObj);
            //console.log(returnObj);
        },

		render: function() {
            // this.$el.append('What an awesome about page!!');
		}
	});
});
