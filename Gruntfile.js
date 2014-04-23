module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.registerTask('build', ['clean', 'less', 'html2js', 'concat', 'copy']);
	grunt.registerTask('default', ['build']);

    /* ---------------------------------------------------
     *  Init Configuration
     * --------------------------------------------------- */

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    app: {
	    	dist: 'target-grunt/dist/',
	    	build: 'target-grunt/build/',
	    	components: {
	    		tpl: '<%= pkg.name %>-tpl.js',
	    		base: 'target-grunt/bower_components/',
	    		angular: ['<%= app.components.base %>angular/angular.js', '<%= app.components.base %>angular-route/angular-route.js'],
	    		bootstrap: {
	    			js: '<%= app.components.base %>bootstrap/dist/js/bootstrap.js',
	    			fonts: '<%= app.components.base %>bootstrap/dist/fonts'
	    		},
	    		jquery: '<%= app.components.base %>jquery/jquery.js'
	    	},
	    	src: {
	    		base: 'src/main/webapp/',
	    		lessBase: 'src/main/less/',
	    		less: 'src/main/less/app.less',
	    		js: 'src/main/webapp/**/*.js',
	    		html: {
	    			app: 'src/main/webapp/index.html',
	    			tpl: 'src/main/webapp/**/*.tpl.html'
	    		}
	    	},
	    	res: {
	    		base: 'src/main/webapp-resources/'
	    	}
	    },

	    clean: ['<%= app.dist %>', '<%= app.build %>'],

	    /* ---------------------------------------------------
	     *  Styles
	     * --------------------------------------------------- */

	    less: {
	    	compile: {
	    		options: {
	    			strictMath: true,
	    			sourceMap: true,
	    			outputSourceFiles: true,
	    			sourceMapURL: 'custom-bootstrap.css.map',
	    			sourceMapFilename: '<%= app.build %><%= pkg.name %>.css.map'
	    		},
	    		files: {
	    			'<%= app.build %><%= pkg.name %>.css': '<%= app.src.less %>'
	    		}
	    	}
	    },

	    /* ---------------------------------------------------
	     *  HTML Templates
	     * --------------------------------------------------- */

	    html2js: {
	    	compile: {
		    	options: {
		    		base: '<%= app.src.base %>'
		    	},
		    	src: '<%= app.src.html.tpl %>',
		    	dest: '<%= app.build %><%= app.components.tpl %>',
		    	module: '<%= pkg.name %>.templates'
	    	}
	    },

	    /* ---------------------------------------------------
	     *  Concatenation
	     * --------------------------------------------------- */

	    concat: {
	    	app: {
	    		src: ['<%= app.src.js %>'],
	    		dest: '<%= app.build %><%= pkg.name %>.js'
	    	},
	    	index: {
	    		src: ['<%= app.src.html.app %>'],
	    		dest: '<%= app.build %>index.html',
	    		options: {
	    			process: true
	    		}
	    	},
	    	lib: {
	    		src: ['<%= app.components.jquery %>', '<%= app.components.angular %>', '<%= app.components.bootstrap.js %>'],
	    		dest: '<%= app.build %><%= pkg.name %>-lib.js'
	    	}
	    },

	    /* ---------------------------------------------------
	     *  Package
	     * --------------------------------------------------- */

	    copy: {
	    	assets: {
	    		files: [{
	    			cwd: '<%= app.res.base %>',
	    			src : '**',
	    			expand: true,
	    			dest: '<%= app.build %>/assets'
	    		}]
	        },
	        components: {
	        	files: [{
	    			cwd: '<%= app.components.bootstrap.fonts %>',
	    			src : '**',
	    			expand: true,
	    			dest: '<%= app.build %>/fonts'
	    		}]
	        },
	        dist: {
	        	files: [{
	        		cwd: '<%= app.build %>',
	        		src: '**',
	        		expand: true,
	        		dest: '<%= app.dist %>'
	        	}]
	        }
	    },

	    /* ---------------------------------------------------
	     *  Development Workflow
	     * --------------------------------------------------- */

	    watch: {
	    	options: {
	    		livereload: true
	    	},
	    	styles: {
	    		files: ['<%= app.src.lessBase %>**/*'],
	    		tasks: ['less', 'copy:dist']
	    	},
	    	html: {
	    		files: ['**/*.html'],
	    		tasks: ['html2js', 'concat:index', 'copy:dist']
	    	},
	    	gruntfile: {
	    		files: ['Gruntfile.js'],
	    		tasks: ['build']
	    	},
	    	scripts: {
	    		files: ['<%= app.src.js %>'],
	    		tasks: ['concat', 'copy:dist']
	    	}
	    }
	});

};