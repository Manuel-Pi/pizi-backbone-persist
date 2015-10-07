module.exports = function(grunt) {
	grunt.initConfig({
		srcFile: 'src/',
		build: 'build/',
		testFile: 'tests/',
		serverFolder: 'C:/Users/e_na/Documents/GitHub/pizi-express-server/Apps/pizi-backbone-persist/',
		jshint: {
			all: {
				options: {
					devel: true,
					esnext: true
				},
				src: '<%= srcFile %>'
			}
		},
		copy: {
			deployDev : {
					files : [
						{
							expand: true,
							cwd: '<%= srcFile %>',
							src: ['**'],
							dest: '<%= serverFolder %>'
						},
						{
							expand: true,
							cwd: '<%= testFile %>',
							src: ['**'],
							dest: '<%= serverFolder %>'
						}
					]
			},
			deployDevBabel : {
				files : [
					{
						expand: true,
						cwd: '<%= build %>',
						src: ['**'],
						dest: '<%= serverFolder %>'
					},
					{
						expand: true,
						cwd: '<%= testFile %>',
						src: ['**'],
						dest: '<%= serverFolder %>'
					},
					{
						expand: true,
						cwd: 'node_modules/',
						src: [
							'backbone/backbone.js',
							'backbone/node_modules/underscore/underscore.js',
							'jquery/dist/jquery.js',
							'pizi-backbone-indexedDB/node_modules/pizi-indexedDB/build/pizi-indexedDB.js',
							'pizi-backbone-indexedDB/build/pizi-backbone-indexedDB.js',
							'pizi-backbone-localStorage/node_modules/pizi-localStorage/build/pizi-localStorage.js',
							'pizi-backbone-localStorage/build/pizi-backbone-localStorage.js'
						],
						dest: '<%= serverFolder %>',
						flatten: true
					}
				]
			}
		},
		clean: {
			options :{
				force : true
			},
			deployDev: '<%= serverFolder %>',
			build: '<%= build %>'
		},
		babel: {
			options: {
				sourceMap: false,
				"experimental": true,
        		"modules": "umd"
			},
			dist: {
				files: [{
					"expand": true,
					"cwd": '<%= srcFile %>',
					"src": ["**/*.js"],
					"dest": '<%= build %>',
					"ext": ".js"
				}]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-babel');
	
	grunt.registerTask('build', ['jshint', 'clean:build', 'babel']);
	grunt.registerTask('deployDev', ['jshint', 'clean:deployDev', 'copy:deployDev']);
	grunt.registerTask('deployBuild', ['build', 'clean:deployDev', 'copy:deployDevBabel']);
};