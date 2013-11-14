/**
 * ...
 * @author emlyn@resn.co.nz
 */

module.exports = function(grunt) {

	var exec = require('child_process').exec;

	grunt.registerTask('git_version', 'Set build version from git', function() {
		var done = this.async();
		// http://stackoverflow.com/questions/468370/a-regex-to-match-a-sha1
		exec('git log',{maxBuffer: 5000 * 1024}, function(err,stdout,stderr){
			if(err){grunt.fail.fatal(err);}
			var findVersion = /\b[0-9a-f]{5,40}\b/;
			var result = findVersion.exec(stdout);
			if(result) {
				var buildVersion = result[0];
				grunt.log.writeln("Version set: "+buildVersion.toString().cyan);
				grunt.config.set('buildinfo.version_minor','sha_'+buildVersion.substring(0,8));
			} else {
				grunt.fail.fatal(err = "Couldn't find Git version number");
			}
			done(err === null);
		});
	});

};
