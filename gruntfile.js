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
                src: 'src/**/*',
                dest: 'build/',
            },
        },
    });

    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('publish', ['copy', 'gh-pages']);

    grunt.registerTask('copy', ['copy']);

};
