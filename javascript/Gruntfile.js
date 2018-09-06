module.exports = function(grunt) {
	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					'Resources/Public/dist/final.js': 'Resources/Public/es6/*.js',
					'Resources/Private/dist/final.js': 'Resources/Private/es6/*.js'
				},
				options: {
					transform: [['babelify', {presets: "es2015"}]],
					browserifyOptions: {
						debug: true
					}
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify:dist']);
};