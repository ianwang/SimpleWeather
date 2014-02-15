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
    });

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('publish', ['copy', 'gh-pages']);

};
