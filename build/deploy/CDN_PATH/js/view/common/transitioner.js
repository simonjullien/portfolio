define([
	"jquery",
	"underscore",
	"config",
	"backbone",
	"controller/app_controller",
	"controller/loader_controller",
	"model/app_model",
	"model/loader_model",
	"view/pages/Loader",
    "view/pages/Home",
	"view/pages/About",
    "view/common/Bg"

], function (
    $,
    _,
    Config,
    Backbone,
    AppController,
    LoaderController,
    AppModel,
    LoaderModel,
    LoaderView,
    HomeView,
    AboutView,
    Bg
	) {

	"use strict";

	var viewMap = {};
	viewMap[AppModel.PAGES.LOADER] = LoaderView;
	viewMap[AppModel.PAGES.HOME] = HomeView;
	viewMap[AppModel.PAGES.ABOUT] = AboutView;


    return Backbone.View.extend({

        currentSection: null,
        bg: null,

        initialize: function () {

            AppModel.on("change:page", this.onAppModelPage, this);
        },

        onResize: function (evt) {
            if (this.currentSection) {
                this.currentSection.onResize(evt);
            }
        },

        triggerOver: function(){
            this.bg.triggerOver();
        },

        triggerOut: function(){
            this.bg.triggerOut();
        },

        startBg: function(){
            this.bg = new Bg({el:$('.bg-container-js')});
        },

        triggerAbout: function(){
            this.bg.hideCubes();
        },

        triggerHome: function(){
            this.bg.showCubes();
        },

        onAppModelPage: function (model, page) {

            this.$el.empty();

            var pageId = page;
            var view;

            if (page !== AppModel.PAGES.LOADER && !LoaderModel.hasLoaded()) {
                AppModel.set('postLoaderPage', pageId);
                AppModel.set('page', AppModel.PAGES.LOADER);
                return;
            }

            //# If the view is already displayed, abort.
            if (this.currentViewId === pageId) {
                return;
            }

            var ViewClass = viewMap[pageId];

            if (ViewClass) {

                this.currentViewId = pageId;

                this.currentSection = new ViewClass();
                this.$el.append(this.currentSection.el);

                this.currentSection.render();
                this.currentSection.onResize();

                this.currentSection.on('HOME:OVER', this.triggerOver, this);
                this.currentSection.on('HOME:OUT', this.triggerOut, this);
                this.currentSection.on('HOME:ABOUT', this.triggerAbout, this);
                this.currentSection.on('HOME:HOME', this.triggerHome, this);
            }
        }
	});
});
