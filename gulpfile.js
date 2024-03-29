const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');



function buildStyles(){
    return src('sassLib/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded'}))
        .pipe(purgecss({ content: ['html/**/*.html', '*.html'] }))
        .pipe(dest('css'));
        
}


function watchTask(){
    watch(['sassLib/**/*.scss', '*.html'], buildStyles)
}


exports.default = series(buildStyles, watchTask);