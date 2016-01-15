var gulp = require('gulp'),
	  connect = require('gulp-connect'),
	  source = require('vinyl-source-stream'),
	  buffer = require('vinyl-buffer'),
	  browserify = require('browserify'),
	  watchify = require('watchify'),
	  babel = require('babelify'),
	  path = require('path'),
	  fs = require('fs');

gulp.task('compile', function() {
  var bundler = watchify(browserify('./src/*.js')
      .transform(
        babel.configure({
          sourceMapRelative: path.resolve(__dirname, 'src'),
          presets: ['es2015']
        })
      ));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./build'));
  }

  bundler.on('update', function() {
    console.log('-> bundling...');
    rebundle();
  });

  rebundle();
});
 
gulp.task('connectDev', function () {
  connect.server({
    root: ['src'],
    port: 4000,
    livereload: true
  });
});
 
gulp.task('connectDist', function () {
  connect.server({
    root: 'build',
    port: 4001,
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./index.html'], ['html']);
  gulp.watch(['./src/*.js'], ['compile'] );
});
 
gulp.task('default', ['connectDist', 'connectDev', 'watch']);