var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src('styles/styles.scss')
        .pipe(plugins.rubySass())
        .pipe(gulp.dest(''))
        .pipe(plugins.notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('styles/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);