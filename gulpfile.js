var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nodemon     = require('gulp-nodemon');

gulp.task('nodemon', function(callback) {
  var called = false;
  return nodemon({
    script: 'server.js',
    watch: ['server.js']
  })
  .on('start', function() {
    if (!called) {
      called = true;
      callback();
    }
  })
  .on('restart', function() {
    setTimeout(function() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

gulp.task('browser-sync', ['nodemon', 'sass'], function() {
  var port = process.env.PORT || 3000;
  browserSync.init({
    files: ['src/index.html', 'src/css/**/*.css', 'src/js/**/*.js'],
    proxy: 'http://localhost:' + port,
    port: port + 1,
    browser: ['google chrome']
  })
});

gulp.task('sass', function() {
  return gulp.src("src/sass/*.sass")
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch("src/sass/*.sass", ['sass']);
});



gulp.task('dev', ['sass', 'nodemon', 'browser-sync', 'sass:watch']);

gulp.task('prod', ['sass']);

gulp.task('default', ['prod']);

