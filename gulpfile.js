const   gulp = require('gulp'),
        template = require('gulp-template-html'),
        sass = require('gulp-sass'),
        uglify = require('gulp-uglify-es').default,
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin');

/*GULP TOP LEVEL FUNCTIONS
    gulp.task = Define task
    gulp.src = Point to files to use
    gulp.dest = Points to folder to output
    gulp.watch = Watch files and folders for changes
 */

//LOG message to console to test if Gulp is running
//NOTE: this functions runs but returns an error. Unless I add 'async', then it works. I still need to learn why...
gulp.task('message', async () => {
    return console.log('Gulp is running...');
});

// Optimize Images
//syntax for including sub folders is **
gulp.task('imagemin', async () =>
    gulp.src('src/i/**')
        .pipe(imagemin())
        .pipe(gulp.dest('public/i'))
);

//TEMPLATE COMPILER: This function will create the corresponding pages from all template files.
gulp.task('template', async () =>
    gulp.src('src/content/*.html')
        .pipe(template('src/templates/template.html'))
        .pipe(gulp.dest('public'))
);

//SASS COMPILER: This function will compile and concatinate all .sass files into one CSS file \public\c\main.css
gulp.task('sass', async () =>
    gulp.src('src/sass/*.scss')
        .pipe(concat('main.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/c'))
);

// JAVASCRIPTS COMPILER: Concatinate all .js files into one main.js file
gulp.task('scripts', () =>
    gulp.src('src/j/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/j'))
);

//Run all tasks manually
gulp.task('default', gulp.series('message', 'imagemin', 'sass', 'scripts', 'template'));

//OR

//Runn all tasks automaticvally by Watching for changes in any of the files.
gulp.task('watch', () => {
    gulp.watch('src/i/**', gulp.series('imagemin')),
    gulp.watch('src/sass/*.scss', gulp.series('sass')),
    gulp.watch('src/j/*.js', gulp.series('scripts')),
    gulp.watch('src/templates/template.html', gulp.series('template')),
    gulp.watch('src/content/*.html', gulp.series('template'));
});