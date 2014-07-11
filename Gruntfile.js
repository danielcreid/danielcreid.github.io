module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'styles.css': 'scss/import.scss'
                }
            }
        },
        jekyll: {
            serve: {
                options: {
                    watch: true
                }
            }
        },
        watch: {
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['sass', 'watch']);

};