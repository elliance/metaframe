module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {                  // Task
            dev: {                    // Another target
                options: {
                    environment: 'development'
                }
            },
            dist: {
                options: {
                    environment: 'production'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'js/metaframe.js': ['dist/metaframe-1.1.min.js']
                }
            }
        },

        jshint: {
            all: ['js/metaframe.js']
        },
        
        watch: {
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['buildcss'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: ['html'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: ['js'],
                tasks: ['buildjs'],
                options: {
                    livereload: true,
                }
            }
        }
    });

    grunt.registerTask('buildcss', ['compass']);
    grunt.registerTask('buildjs', ['uglify']);
    grunt.registerTask('default', ['buildcss', 'buildjs']);
};
