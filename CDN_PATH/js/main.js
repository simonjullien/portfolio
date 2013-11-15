define([
    "jquery",
    "underscore",
    "config",
    "router",
    "controller/app_controller",
    "controller/loader_controller",
    "model/app_model",
    "model/loader_model",
    "view/common/transitioner",
    "view/modules/Shell"

],function(
    $,
    _,
    Config,
    Router,
    AppController,
    LoaderController,
    AppModel,
    LoaderModel,
    Transitioner,
    Shell

) {


    "use strict";

    Router.setRoutes([
        ["", AppModel.PAGES.HOME],
        ["home", AppModel.PAGES.HOME],
        ["about", AppModel.PAGES.ABOUT]
    ]);



LoaderModel.add([
    { src: '/css/all.css' }
]);

return {

    rootNode: $('#rootNode'),
    transitioner: null,
    shell:null,

    start: function () {
        _.bindAll(this,
            "startMain"
        );
        this.transitioner = new Transitioner({el: this.rootNode });

        window.onresize = _.bind(this.onResize, this);
        LoaderModel.on('complete', this.onLoaderComplete, this);

        LoaderController.start();
        Router.start();

    },

    onLoaderComplete: function () {
        TweenMax.to(this, 1.3, {onComplete:this.startMain});
        window.killPreloader();
    },

    startMain: function () {
        this.shell = new Shell({el: $('#shellNode') });
        var postLoaderPage = AppModel.get('postLoaderPage');
        AppModel.unset('postLoaderPage');
        AppModel.set('page', postLoaderPage);

        this.transitioner.startBg();
    },

    onResize: function (evt) {
        this.transitioner.onResize(evt);
    }



};

});