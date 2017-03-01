var gulp = require('gulp');
var connect = require('gulp-connect');

//Ports used for running the application
var ports = {
    dev: '7083',
    dist: '8888'
};

//Creating server for development testing
gulp.task('run', function() {
    connect.server({
        root: __dirname + '/',
        livereload: true,
        port: ports.dev
    });
});
