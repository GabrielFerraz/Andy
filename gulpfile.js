'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var watch = require('gulp-watch');
var del = require('del');
var rename = require('gulp-rename');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");

// gulp.task('default', ['watch']);

gulp.task('styles', function () {
  return gulp.src('./style.css')
    // Minify the file
    .pipe(csso())
    // Output
	  .pipe(gulp.dest('./style.min.css'))
});

function typescript() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./"));
}

function watch() {
	return gulp.watch('./style.css', 'styles')
}

gulp.task('clean', function () {
	return (del('./style.min.css'));
})

gulp.task('watch', function () {
	// return gulp.watch('./style.css', gulp.series('clean', 'styles'))
	return gulp.watch(['./app.ts', './**/*.ts'], typescript)
});