
// "use strict";
//import gulp from 'gulp';
var gulp=require('gulp');
var browserSync=require('browser-sync').create();
var compass = require('gulp-compass');
var cleanCSS = require('gulp-clean-css');
var sass=require('gulp-sass');
var compaimport = require('compass-importer');
//const autoprefixer=require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');
const uglify=require('gulp-uglify');
// const concat=require('gulp-concat');

//compass files

gulp.task('compass', function() {
  gulp.src('app/sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'docs/css',
      sass: 'app/sass'    //'../app/sass'
    }))
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.stream());
});






// optimize Images 
gulp.task('imageMin',()=>
gulp.src('app/images/*')
.pipe(imagemin())
.pipe(gulp.dest('docs/images'))
);

//minify js   


gulp.task('minify',function(){
    gulp.src('app/js/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('docs/js'));
});

//compile sass


// gulp.task('sass',function(){
// return gulp.src(['app/sass/*.scss'])
// .pipe(sass({importer:compass}).on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.stream());
// });



gulp.task('copyHtml',function(){

    return gulp.src(['app/*.html'])
            .pipe(gulp.dest('docs'))
            // .pipe(gulp.dest('./'))
            .pipe(browserSync.stream());
    });

    
// Watch Sass & Serve
gulp.task('serve', ['compass','copyHtml'], function() {
    browserSync.init({
        server: "./docs"  
    });
    // gulp.watch(['app/sass/*.scss'], ['sass']);
    gulp.watch(['app/sass/*.scss'], ['compass']);
    gulp.watch(['app/*.html'], ['copyHtml']);
    gulp.watch(['app/images/*'], ['imageMin']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve', 'compass','copyHtml','imageMin']);