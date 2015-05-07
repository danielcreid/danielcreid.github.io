var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    rubySass = require('gulp-ruby-sass');

gulp.task('styles', function() {
    gulp.src('source/styles.scss')
        .pipe(rubySass({style: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    gulp.src('source/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('jekyll', function () {
    require('child_process').exec('jekyll serve');
});

gulp.task('copyfonts', function() {
    gulp.src('source/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(['_drafts/**', '_includes/**', '_layouts/**', '_posts/**', 'index.html'], ['jekyll']);
    gulp.watch('source/js/*.js', ['scripts']);
    gulp.watch('source/**/*.scss', ['styles']);
});

gulp.task('default', ['copyfonts', 'scripts', 'styles', 'jekyll', 'watch']);