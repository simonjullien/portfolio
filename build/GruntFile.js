/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  var gruntConfig = {
	buildinfo: {
		deploy: 'deploy',
		dist: 'dist',
		debug: false,
		temp: 'temp',
		env: 'local',
		version_major: "1.0",
		version_minor: ".0",
		CDN_FOLDER: "CDN_PATH",
		CDN_URL: "./"
	},
	compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
	clean: {
		"temp": "<%= buildinfo.temp %>",
		"release": "release"
	},
	copy: {
		temp: {expand: true, cwd: 'deploy/', src: ['**'], dest: '<%= buildinfo.temp %>/'},
		"release_main": {
			expand: true,
			cwd: 'dist/',
			src: ['*','templates/**'],
			dest: 'release/main',
			filter: 'isFile'
		},
		"release_cdn": {
			expand: true,
			cwd: 'dist/CDN_PATH',
			src: ['**'],
			dest: "release/cdn/<%= buildinfo.CDN_FOLDER %>"
		}
	},
	replace: {
		/**
		 * Set the environment variable in JS
		 */
		setenv: {
			src: ["<%= buildinfo.temp %>/CDN_PATH/js/config.js"],
			overwrite: true,
			replacements: [{
				from: /ENV:\s*"local"/,
				to: 'ENV:"<%= buildinfo.env %>"'
			}]
		},
		/**
		 * Insert version information into page
		 */
		insertversion: {
			src: ["<%= buildinfo.temp %>/index.html"],
			overwrite: true,
			replacements: [{
				from: new RegExp("</body>","i"),
				to: "<!-- version: <%= buildinfo.version_major %><%= buildinfo.version_minor %> -->\n</body>"
			}]
		},
		/**
		 * Replace CDN_PATH with cdn deploy location
		 */
		cdn_path: {
			src: ["<%= buildinfo.temp %>/**/*.html","<%= buildinfo.temp %>/**/*.css","<%= buildinfo.temp %>/CDN_PATH/js/**/*.js"],
			overwrite: true,
			replacements: [{
				from: 'CDN_PATH',
				to: '<%= buildinfo.CDN_URL %><%= buildinfo.CDN_FOLDER %>'
			}]
		}
	},
	requirejs: {
		compile: {
			  options: {
				  appDir: "<%= buildinfo.temp %>",
				  dir: "<%= buildinfo.dist %>",
				  modules: [
					  {
						  name: "loader"
					  }
				  ],
				  baseUrl: "CDN_PATH/js",
				  mainConfigFile: "<%= buildinfo.temp %>/CDN_PATH/js/loader.js",
				  closure: {
					  CompilerOptions: {},
					  CompilationLevel: 'SIMPLE_OPTIMIZATIONS',
					  loggingLevel: 'WARNING'
				  },
				  pragmas: {
					  optimize: true
				  },
				  optimizeCss: "standard"
			  }
		}
	},
	jshint: {
	  options: {
		curly: true,
		eqeqeq: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		sub: true,
		undef: true,
		boss: true,
		eqnull: true,
		white: false,
		smarttabs: true,
		browser: true,
		  globals: {
			  jQuery: true,
			  ga: true,

			  /* RequireJS globals */
			  require: true,
			  requirejs: true,
			  define: true,

			  /* Jasmine globals */
			  describe:true,
			  it:true,
			  waitsFor:true
		  }

	  },
		files: [
			'deploy/CDN_PATH/js/**/*.js',
			'!deploy/CDN_PATH/js/libs/**'
		]
	},
	uglify: {},
	connect: {
        server: {
            options: {
                host: '*',
                port: 8000,
                base: 'deploy',
                keepalive: true
            }
        },
        dist: {
            options: {
                host: '*',
                port: 8001,
                base: 'dist',
                keepalive: true
            }
        }
    }
  };

  var nconf = require('nconf');
  nconf.argv().env();

	//# Load deploy related config options
	nconf.file('deploy_config.json');

  nconf.defaults( { "config": gruntConfig });


  grunt.initConfig( nconf.get('config') );

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadTasks('tasks');

	//# Default task.
	grunt.registerTask('default', [
		'compass:dist',
		'clean:temp',
		'copy:temp',
		'git_version',
		'replace:setenv',
		'replace:insertversion',
		'replace:cdn_path',
		'jshint',
		'requirejs',
		'clean:temp'
	]);

	grunt.registerTask('dev', function() {
		grunt.config.set('buildinfo.env','dev');
		grunt.task.run([
			'clean:release',
			'git_version',
			'set_cdn:://cdn.dev.clientwebsite.com/',
			'default',
			'copy:release_main',
			'copy:release_cdn',
			'release_msg'
		]);
	});

	/**
	 * This builds for staging deploy
	 */
	grunt.registerTask('staging', function() {
		grunt.config.set('buildinfo.env','staging');
		grunt.task.run([
			'clean:release',
			'git_version',
			'set_cdn:://cdn.stage.clientwebsite.com/',
			'default',
			'copy:release_main',
			'copy:release_cdn',
			'release_msg'
		]);
	});

	/**
	 * This builds for a live deploy
	 */
	grunt.registerTask('live', function() {
		grunt.config.set('buildinfo.env','live');
		grunt.task.run([
			'clean:release',
			'git_version',
			'set_cdn:://cdn.www.clientwebsite.com/',
			'default',
			'copy:release_main',
			'copy:release_cdn',
			'release_msg'
		]);
	});

	/**
	 * This loads the auth details for logging into servers.
	 * The file .ftppass is not in version control, and must be created from details in keypass.
	 */
	grunt.registerTask('loadauth', function() {
		if(grunt.config.get('auth') == null) {
			grunt.log.verbose.writeln("Loading auth from .ftppass");
			grunt.config.set( 'auth', grunt.file.readJSON('.ftppass') );
		}
	});

	/**
	 * Deploy a build to a hosted environment.
	 * deploy:staging
	 * deploy:live
	 */
	grunt.registerTask('deploy', function( environment ) {

		grunt.task.run([
			'loadauth',                         //# Load auth data
			environment,                        //# Compile build
			'sftp:'+environment+'_cdn',         //# Copy cdn files
			'sftp:'+environment+'_main'         //# Copy main web files
		]);
	});

};
