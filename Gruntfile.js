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
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['js/metaframe.js']
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
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
    grunt.registerTask('buildjs', ['uglify', 'jshint']);
    grunt.registerTask('default', ['buildcss', 'buildjs']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
