var gulp = require('gulp'),
    rubySass = require('gulp-ruby-sass'),
    del = require('del');

gulp.task('styles', function() {
    gulp.src('source/styles.scss')
        .pipe(rubySass())
        .pipe(gulp.dest('dist'));
});

gulp.task('jekyll', function () {
    require('child_process').exec('jekyll serve --watch');
});

gulp.task('clean', function(cb) {
    del(['dist/*'], cb);
});

gulp.task('copyfonts', function() {
    gulp.src('source/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(['_drafts/**', '_includes/**', '_layouts/**', '_posts/**', 'index.html'], ['jekyll']);
    gulp.watch('source/**/*.scss', ['styles']);
});

gulp.task('default', ['clean', 'copyfonts', 'styles', 'jekyll', 'watch']);