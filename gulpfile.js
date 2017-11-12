var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', sass.logError)
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(sourcemaps.write())
    //.pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch("./www/scss/**/*.scss", ['sass']);
  gulp.watch('./app/**/*.js', ['build-controllers', 'build-directives', 'build-services']);
  gulp.watch('./app/**/*.html', ['mv-html']);
});

gulp.task('build-controllers', function(){
  return gulp.src('./app/**/controllers/*.controller.js')
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('build-services', function(){
  return gulp.src('./app/**/services/*.service.js')
    .pipe(concat('services.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('build-directives', function(){
  return gulp.src('./app/**/directives/*.directive.js')
    .pipe(concat('directives.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('mv-html', function(){
  return gulp.src('./app/**/views/*.html')
    .pipe(gulp.dest('./www/templates/'));
});

gulp.task('build', ['build-controllers', 'build-directives', 'build-services', 'mv-html']);

