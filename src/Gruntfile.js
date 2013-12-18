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
                    '../build/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['js/metaframe.js']
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

        compress: {
            nocomments: {
                options: {
                  archive: '../install/metaframe-nocomments.zip',
                },
                files: [
                  {src: ['images/**'], cwd: '../build/', expand: true },
                  {src: ['js/**'], cwd: '../build/', expand: true },
                  {src: ['css/**'], cwd: '../build/', expand: true },
                ]
            },
            phpcomments: {
                options: {
                  archive: '../install/metaframe-php-comments.zip',
                },
                files: [
                  {src: ['images/**'], cwd: '../build/', expand: true },
                  {src: ['js/**'], cwd: '../build/', expand: true },
                  {src: ['css/**'], cwd: '../build/', expand: true },
                ]
            },
            aspxcomments: {
                options: {
                  archive: '../install/metaframe-aspx-comments.zip',
                },
                files: [
                  {src: ['images/**'], cwd: '../build/', expand: true },
                  {src: ['js/**'], cwd: '../build/', expand: true },
                  {src: ['css/**'], cwd: '../build/', expand: true },
                  {src: ['metaframe-form-submit.aspx*'], cwd: '../build/', expand: true },
                ]
            }
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
                files: ['*.html'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: ['js/*.js'],
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
    grunt.registerTask('package', ['buildcss', 'buildjs', 'compress']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
