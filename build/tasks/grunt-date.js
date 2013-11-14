module.exports = function(grunt){
	grunt.registerTask('date', 'Show current date', function(){
		grunt.log.writeln('finished at ' , (new Date()).toString().magenta );
	});

	grunt.registerTask('set_timestamp', 'Show current date', function(){
		grunt.config.set('buildinfo.timestamp',(new Date()).getTime());
	});
};