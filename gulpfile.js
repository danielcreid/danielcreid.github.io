var gulp = require('gulp'),
    rubySass = require('gulp-ruby-sass'),
    jekyll = require('gulp-jekyll'),
    del = require('del');

gulp.task('styles', function() {
    gulp.src('assets/source/scss/styles.scss')
        .pipe(rubySass())
        .pipe(gulp.dest('assets/build'));
});

gulp.task('jekyll', function () {
    require('child_process').exec('jekyll serve --watch');
});

gulp.task('clean', function(cb) {
    del(['assets/build/**/*.*'], cb);
});

gulp.task('copyfonts', function() {
    gulp.src('assets/source/fonts/**/*.*')
        .pipe(gulp.dest('assets/build/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(['./_drafts/**', './_includes/**', './_layouts/**', './_posts/**', 'index.html'], ['jekyll']);
    gulp.watch('assets/source/scss/**/*.scss', ['styles']);
});

gulp.task('default', ['clean', 'jekyll', 'copyfonts', 'styles', 'watch']);