var gulp                   = require('gulp'),
    angularTemplateCache   = require('gulp-angular-templatecache'),
    angularFilesort		   = require('gulp-angular-filesort'),
    concat                 = require('gulp-concat'),
    expect                 = require('gulp-expect-file'),
    gutil 				   = require('gulp-util'),
    minifyHTML             = require('gulp-minify-html'),
    minifyCSS              = require('gulp-minify-css'),
    inject                 = require('gulp-inject'),
    uglify                 = require('gulp-uglify'),
    karma 				   = require('gulp-karma'),
    runSequence            = require('run-sequence'),
    ngAnnotate             = require('gulp-ng-annotate');
   
var BUILD_BASE_DIR = "./";
var DEV_SRC = "app/**/*.js";
var TEMPLATE_SRC = "templates/**/*.html";
var TEST_SRC = "test/**/*.spec.js";
var VERSION = '1.0.0';
var VENDOR_FILES = require('./vendor.json');
var APP_NAME = 'ordering.tool';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Concatenate & Minify templates
gulp.task('templates', function() {
    return gulp.src(TEMPLATE_SRC)
        .pipe(angularTemplateCache("templates.js", {module: APP_NAME}))
        .pipe(gulp.dest('app'));
});


gulp.task('build:dev', function(callback) {
  	return runSequence('templates', ['concat', 'scripts:vendor'], 'test', callback);
});

/**
 * Execute karma tests
 */
gulp.task('test', function(callback) {
  return gulp.src('./dummyfile.doesntexist')
  		.pipe(karma({
		      configFile: BUILD_BASE_DIR + 'karma.conf.js',
		      action: 'run'
		    })
		)
		.on('error', handleError);
  	  
});

gulp.task('default', ['build:dev'], function() {
	gulp.watch([DEV_SRC, TEMPLATE_SRC, TEST_SRC], ['build:dev']);
});

gulp.task('concat', function() {
  return gulp.src(DEV_SRC)
  	.pipe(angularFilesort())
    .pipe(concat(APP_NAME + '.' + VERSION + '.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist'));
});

/**
 * Combines all vendor/third-party scripts into a single minified vendor file
 */
gulp.task('scripts:vendor', function() {
  return gulp.src(VENDOR_FILES)
      .pipe(expect(VENDOR_FILES))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('dist'));
});