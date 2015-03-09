var gulp = require('gulp'),
    react = require('gulp-react'),
    livereload = require('gulp-livereload');
 
gulp.task('jsx', function () {
  return gulp.src('src/app.jsx')
      .pipe(react({ harmony: true }))
      .pipe(gulp.dest('dist'))
      .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/*.jsx', ['jsx']);
});
