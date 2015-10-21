var gulp  = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
  Server = require('karma').Server,
  jshint = require('gulp-jshint'),
  nodemon = require('gulp-nodemon');

var staticFiles = {
  js: [
    'public/libs/angular/angular.min.js',
    'public/libs/angular-animate/angular-animate.min.js',
    'public/libs/angular-aria/angular-aria.min.js',
    'public/libs/angular-material/angular-material.min.js',
    'public/libs/angular-messages/angular-messages.min.js',
    'public/libs/angular-resource/angular-resource.min.js',
    'public/libs/ngstorage/ngStorage.js',
    'public/libs/angular-ui-router/release/angular-ui-router.min.js',
    'public/libs/angular-material-icons/angular-material-icons.min.js'
  ]
};

// configure task to del build
gulp.task('clean', function() {
 del(['public/build/']).then(function(path){
  console.log("cleaned successfully");
 });
});

// configure task to minify static js files
gulp.task('script', function(cb) {
  return gulp.src(staticFiles.js)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/build/js/'));
    cb(null);
});

//configure task to check for errors
gulp.task('lint', function () {
  gulp.src('public/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
 
//configure nodemon task
gulp.task('nodemon', ['script'], function () {
  nodemon({ 
    script: 'server.js',
    ext: 'js',
    ignore: ['package.json']
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

// Run test
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

// configure for default task
gulp.task('default', ['lint', 'script', 'nodemon']);
