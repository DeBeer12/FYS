var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('fase_2_mockup/styles/sass/blocks/*.SCSS')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('fase_2_mockup/styles/sass/'))
});

gulp.task('default', function(){
    gulp.watch('fase_2_mockup/styles/sass/blocks/*.SCSS', ['sass']);
});

