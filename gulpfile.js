var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('public/styles/sass/blocks/*.SCSS')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('public/styles/sass/'))
});

gulp.task('default', function(){
    gulp.watch('public/styles/sass/blocks/*.SCSS', gulp.series('sass'));
});