const   gulp = require('gulp'),
        template = require('gulp-template-html');

/*GULP TOP LEVEL FUNCTIONS
    gulp.task = Define task
    gulp.src = Point to files to use
    gulp.dest = Points to folder to output
    gulp.watch = Watch files and folders for changes
 */

//LOG message to console to test if Gulp is running
//NOTE: this functions runs but returns an error. Unless I add 'async', then it works. I still need to learn why...
gulp.task('default', async function(){
    return console.log('Gulp is running...');
});

//TEMPLATE COMPILER: This function will create the corresponding pages from all template files.
gulp.task('template', async function () {
    return gulp.src('src/content/*.html')
        .pipe(template('src/templates/template.html'))
        .pipe(gulp.dest('public'));
});
