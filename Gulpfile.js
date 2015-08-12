var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// ----------------- //

gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(sass()).on('error', errorHandler)
    .pipe(minifyCss()).on('error', errorHandler)
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
  gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*')
    .pipe(gulp.dest('dist/fonts/bootstrap'));
});

gulp.task('scripts', function () {
  gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'bower_components/jquery.easing/js/jquery.easing.min.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js', function () {
  gulp.src('js/*.js')
    .pipe(uglify()).on('error', errorHandler)
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  gulp.src('html/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function() {
  gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function(){
  gulp.watch('js/*.js', ['js']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('html/*.html', ['html']);
  gulp.watch('images/*', ['imagemin']);
});

gulp.task('server', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch('js/*.js', ['js']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('html/*.html').on('change', browserSync.reload);
  gulp.watch('images/*').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'fonts', 'scripts', 'js', 'html', 'imagemin', 'server']);

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}