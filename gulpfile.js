var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var runSequence = require('run-sequence');
var useref= require('gulp-useref');

gulp.task('default', function(callback) {
  runSequence('clean', 'watch', 'connect', 'livereload', 'partials', 'images', 'vendors', 'fonts', 'sass', 'scripts', callback);
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('build/src/fonts'));
});

gulp.task('vendors', function() {
  var assets = useref.assets();
  return gulp.src('./index.html')
  .pipe(assets)
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src('./src/img/**')
  .pipe(gulp.dest('build/src/img'))
});

gulp.task('partials', function() {
  return gulp.src('./src/partials/**')
  .pipe(gulp.dest('build/src/pages'))
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/src/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/css/_scss/*.scss')
  .pipe(sass())
  .pipe(minify())
  .pipe(gulp.dest('build/src/css/'));
});

gulp.task('clean', function (cb) {
  return del(['build/**',], cb);
});

gulp.task('connect', function() {
  return connect.server({
    root: 'build',
    port: 9000,
    livereload: true
  });
});

gulp.task('livereload', function () {
  return gulp.src('build/**')
    .pipe(connect.reload());
});

gulp.task('watch',function() {
  gulp.watch('index.html', ['vendors']);
  gulp.watch('./src/fonts/**', ['fonts']);
  gulp.watch('./src/css/_scss/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['scripts']);
});