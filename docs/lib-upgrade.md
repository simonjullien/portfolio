# upgrading old versions of libraries

We're upgrading our js libraries. To avoid drama, we're going to keep the old versions in 

	CDN_PATH/js/libs/old

for a while. If you run into trouble with a library, add the path to the old one.

e.g: With Modernizr
new
	<script src="CDN_PATH/js/libs/modernizr-2.5.6.min.js"></script>
old
	<script src="CDN_PATH/js/libs/old/modernizr-2.5.3.min.js"></script>


## libs that have changed

- Modernizr 2.5.3 -> 2.6.3
- jquery 1.8.3 -> 1.10.2 (including jquery migrate)
- backbone 0.9.2 -> 1.1.0
- handlebars 1.0.3 -> 1.1.2
- underscore 1.4.3 -> 1.5.2
- createjs to latest versions (including preloadjs.NEXT, which fixes an ie8 problem)
- require.js 2.0.6 -> 2.1.9

## jquery migrate plugin
It logs stuff which has changed in jquery 1.9