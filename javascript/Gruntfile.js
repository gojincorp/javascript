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
		},
		eslint: {
			target: ['Resources/Public/es6/*.js', 'Resources/Private/es6/*.js']
		}
	});
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.registerTask('default', ['eslint', 'browserify:dist']);
};