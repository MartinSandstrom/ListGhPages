var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src('./scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('./styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['compress', 'minify-css']);
gulp.task('publish', ['build', 'deploy']);
