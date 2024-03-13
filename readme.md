## Update: This project is depricated and no longer supported. 
#### I built this project originally on Bitbucket before libraries like React started gaining traction. You are of course free to use this webstarter but I highly suggest building your websites and webapps using something like React, Angular, VueJS etc. This project is way to old-school for today's web landscape. 

## How to use this project
### Intro
The idea behind this project is to build simple static websites quickly if you lack the knowledge to build apps using React, Angular or Vue. 
It serves as a template to help you setup a website template in a few minutes rather than hours or days.
This project uses `Gulp` for compiling all `HTML`, `CSS` and `JavaScript` files into static output files in the `public` folder.\
The `public` folder can be simply uploaded to your hosting provider. 

### Development dependencies
The project requires the use of `NodeJS` and `NPM` which is included in the `NodeJS` application. Additionaly we will install Gulp and various Gulp plugins.  
* **NodeJS:** Because NodeJS wil save the world.
* **Gulp:** Our awesome script builder to simplify and organise our work. 
* **Gulp-imagemin:** For compressing image assets.
* **gulp-uglify-es:** For minifying our JavaScript files. Use gulp-uglify-es and NOT gulp-uglify, because -es supports ES6 syntax. 
* **Gulp-sass:** For creating our CSS output using SASS.
* **Gulp-concat:** For concatinating all our JavaScript files. This means we can write multiple files for smaller functions and join them all together into `main.js` which will be loaded into the page.
* **Gulp-template-html:** For very basic templating to not repeat all our code.    

### Setup and install
* Install NodeJS: To install `NodeJS` visit: https://nodejs.org/en/download/
* Clone the project from into your working directory: https://github.com/Mo0nrocket/webstarter-gulp.git
* Install the rest of the `Gulp` plugins as dev dependencies using npm.
```sh
npm i --save-dev gulp-imagemin -- # To minify and compress all your images for production.
npm i --save-dev gulp-uglify-es -- # To minify all your code and remove line spacings
npm i --save-dev gulp-sass -- # To be able to use sass with Gulp
npm i --save-dev gulp-concat -- # To concatenate multiple files into one. For example all .js files will we written to main.js together
npm i --save-dev gulp-template-html -- # To build very basic web templating
npm i --save-dev bootstrap -- # To use Bootstrap CSS if you want. This is imported into the main.sass file but can be commented if you choose not to use it. 
npm i --save-dev gulp-wrapper -- # To prepent or append anything in any of your files. For example "use strict"; can be added to the top of your JavaScript file
```
* All `Gulp` processes have already been cofigured `gulpfile.js`.
* The folder structure is as follows: 
```bash
└───YourProject
    ├───public
    ├───src
        └───content
        └───js
        └───sass
        └───templates
    ├───gulpfile.js
    ├───package.json
``` 

### Creating your first web page
The `gulpfile.js` is already configured to run and create your index.html page. 

It uses the template `src\templates/template.html` file to grab content from the `src\content` and generate your pages in the `public` folder. 

Template example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><!-- build:title --></title>
    <link rel="icon" type="image/png" href="i/favicon.png">
    <link rel="stylesheet" href="">
</head>
<body>
    <div id="content"><!-- build:content --></div>
    <div id="footer">_________________________</div>
</body>
</html>
```
The `build` comments (example: `\<!--build:content-->`) in the template is where we will inject our content for each individual page. 
Now content in `src\content` folder will be injected into the various areas of the template where `build` comments match. 
```html
<!-- build:title -->Homepage title<!-- /build:title -->
<!-- build:header -->Welcome<!-- /build:header -->
<!-- build:content -->
<p>My Homepage content here</a></p>
<!-- /build:content -->
```
 
To generate the compiled pages we need to tell `Gulp` to do some work. 
Open the terminal and run `gulp template`:
```sh
gulp template
```
You should receive the following similar response indicating that the template has been created: 
```shell script
$ gulp
[12:05:44] Using gulpfile ~\Projects\WebsiteName\gulpfile.js
[12:12:20] Starting 'template'...
[12:12:20] Finished 'template' after 16 ms
```
You will now notice that in the `public` folder there is a new `index.html` file which has been compiled from the `template` and `content` files in the `src` folder.  
 
### Working with Sass
The project uses `sass/bootstrap` for speeding up creation of templates. All `Bootstrap` variables can be overwritten in your `Sass` files customize UI and design elements. For a list of all Bootstrap variables see `\node_modules\bootstrap\scss\_variables.scss`.
### gulpfile.js explained
The gulp compile functions can be run together or individually. The functions are explained below:
```javascript
//Import all necessary packages
const   gulp = require('gulp'),
        template = require('gulp-template-html'),
        sass = require('gulp-sass'),
        uglify = require('gulp-uglify-es').default,
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin');

/*GULP TOP LEVEL FUNCTIONS EXPLAINED
    gulp.task = Define task
    gulp.src = Point to files to use
    gulp.dest = Points to folder to output
    gulp.watch = Watch files and folders for changes
 */

//LOG message to console to test if Gulp is running
gulp.task('message', async () => {
    return console.log('Gulp is running...');
});

// Optimize Images
//syntax for including sub folders is **, for one folder without sub folders is *
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
```
To run all tasks at once use `gulp`, to run the defualt task:
```sh 
gulp
```
To run tasks individually use `gulp {task name}`:
```sh 
gulp sass
```
To `WATCH` tasks for changes use `gulp watch`. This will constantly run the default task in the background and update your files when you save to avoid having to manually run gulp tasks after every change.
```sh 
gulp watch
```
Note that this doesn't work with imagemin. I still don't know why. if you know please contact me :) 
