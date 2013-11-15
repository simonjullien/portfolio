/**
	matt test r194
 * ...
 * @author emlyn@resn.co.nz
 */

define(["jquery","libs/jquery-swfobject", "libs/jquery-migrate-1.2.1", "console"],function($) {
	
	var config = {
		SITE_URL: "http://",
		APP_URL: "https://apps.facebook.com/",
		CDN: "CDN_PATH",
		ENV: "local",
		IPAD: navigator.userAgent.match(/ipad/i),
		MOBILE: navigator.userAgent.match(/(iphone|itouch|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i),
		NON_IOS_TABLET: navigator.userAgent.match(/(android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk|nook)/i),
		FLASH_VESRION: "11.0.0",
		FLASH: null,
		FLASH_BYPASS:window.location.href.match(/bypass/),
		FACEBOOK_APP_IDS: {
		  live: "",
		  staging: "",
		  dev: "",
		  local: "205547496221381"
		},
		getFBID: function() {
			return this.FACEBOOK_APP_IDS[this.ENV];
		},
		API_URL: {
		  live: "",
		  staging: "",
		  dev: "",
		  local: ""
		},		
		getAPI: function() {
			return this.API_URL[this.ENV];
		},
		getVendorPrefix: function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice.call(styles).join('') .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
          return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
          };
        }

  };

    config.FLASH = $.flash.hasVersion(config.FLASH_VESRION);
    config.BASE_URL = window.location.pathname.substring( 0, window.location.pathname.lastIndexOf('/')+1 );

    return config;
	
});