module.exports = function (grunt) {

    grunt.initConfig({
        'gh-pages': {
            options: {
                base: 'build'
            },
            src: '**/*'
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'build/',
                filter: 'isFile',
            },
        },
        jade: {
            compile: {
                options:{
                    pretty: true
                },
                files: {
                    'src/index.html': 'src/views/index.jade'
                }
            }
        },
        watch: {
            jade: {
                files: ['src/views/**/*.jade'],
                tasks: ['jade'],
                options: {
                    //
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('publish', ['copy', 'gh-pages']);

};
