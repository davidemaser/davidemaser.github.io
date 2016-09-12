/**
 * Created by david-maser on 12/09/16.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'pgd/clone/js/*.js', 'assets/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'pgd/clone/dist/js/app.min.js': 'pgd/clone/js/app3.0.js'
                }
            }
        },
        jsonlint: {
            all: {
                src: [ 'pgd/clone/data/help.json','pgd/clone/schema/layout.json','pgd/clone/data/language/fr_FR.json' ],
                options: {
                    format: true,
                    indent: 2
                }
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'pgd/clone/css/globals.css': 'pgd/clone/css/scss/global.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: '**/*.js',
                tasks: ['jshint','uglify'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('default', ['jshint']);
    grunt.registerTask('default', ['uglify','jsonlint','sass','watch']);
};