'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/styles/'))
});
gulp.task('watch', () => {
    gulp.watch('./dev/styles/**/*.scss', ['styles']);
});
