## How to use this project
### Intro
The idea behind this project is to build simple static websites quickly. Now you can setup a website in a few minutes rather than hours or days.\
This project uses `Gulp` for compiling all `HTML`, `CSS` and `JavaScript` files into static output files in the `public` folder.\
The `public` folder can be simply uploaded to your hosting provider. 

###Development dependencies
The project requires the use of `NodeJS` and `NPM` which is included in the `NodeJS` application. Additionaly we will install Gulp and various Gulp plugins.  
* **NodeJS:** Because NodeJS wil save the world.
* **Gulp:** Our awesome script builder to simplify and organise our work. 
* **Gulp-imagemin:** For compressing image assets.
* **gulp-uglify-es:** For minifying our JavaScript files. Use gulp-uglify-es and NOT gulp-uglify, because -es supports ES6 syntax. 
* **Gulp-sass:** For creating our CSS output using SASS.
* **Gulp-concat:** For concatinating all our JavaScript files. This means we can write multiple files for smaller functions and join them all together into `main.js` which will be loaded into the page.
* **Gulp-template-html:** For very basic templating to not repeat all our code.    

###Setup and install
* Clone the project from into your working directory: https://github.com/Mo0nrocket/webstarter-gulp.git
* Install the rest of the `Gulp` plugins as dev dependencies.
```sh
npm i --save-dev gulp-imagemin
npm i --save-dev gulp-uglify-es
npm i --save-dev gulp-sass
npm i --save-dev gulp-concat
npm i --save-dev gulp-template-html
npm i --save-dev bootstrap
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
* Install NodeJS: To install `NodeJS` visit: https://nodejs.org/en/download/
    * Once installed, open your favorite command line editor such as CMD, GitBash or Terminal.
    * Navigate to your working directory by typing example: 
```sh
cd \Projects\MyWebsite-1
```
* Run the following command by typing in the terminal:
```sh
npm init -y
```
This will create a `package.json` file where all your NodeJs development packages will be stored.  
```sh
        ├───package.json
``` 
* Install `Gulp` ***globaly*** using NPM by typing the following:
```sh
$ npm i -g gulp
```
* Install `Gulp` ***locally*** as a dev dependency: 
```sh
$ npm i --save-dev gulp
```
This will create a new folder `node_modules` where all your node packages for your project will be installed. 
```sh
        ├───node_modules
``` 
* Install the rest of the `Gulp` plugins as dev dependencies.
```sh
npm i --save-dev gulp-imagemin
npm i --save-dev gulp-uglify
npm i --save-dev gulp-sass
npm i --save-dev gulp-concat
npm i --save-dev gulp-template-html
```

####Creating your first web page
We will create all of our web HTML pages in the `src` folder. We will also create a template using `gulp-template-html` to avoid repeating multiple pieces of code such as the navigation and footer. 
In the `src` folder we will create two sub folders. One for storing our template and another for storing our content. 
This templating plugin is very simple, and aimed at creating static pages without any logic or data. For more complex templating please feel free to use something more advance like Jade or Handlebars.
In the `src` folder, create two new folders `template` and `content`. 
```sh
        └───src
            └───content
            └───templates
``` 
In the `src\templates` folder create a `template.html` file.
We add our default HTML layout.
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
Now in the `src\content` folder we create our `index.html` page with the content we would like to inject. 
```html
<!-- build:title -->Homepage title<!-- /build:title -->
<!-- build:header -->Welcome<!-- /build:header -->
<!-- build:content -->
<p>My Homepage content here</a></p>
<!-- /build:content -->
```
Now we are finally ready to create our compiled output page which will be in the `public` folder. The `public` folder is the folder that will contain all our compiled and concatinated files, ready for deployment to the server. 
To generate the compiled page we need to tell `Gulp` to do some work. 

The `Gulp` build process is already created in `gulpfile.js`, all we need to do is run it. Open the terminal and type the following command:
```shell script
gulp template
```
You should receive the following similar response indicating that the template has been created: 
```shell script
[13:32:25] Using gulpfile ~\Projects\Website-1\gulpfile.js
[13:32:25] Starting 'template'...
[13:32:25] Finished 'template' after 17 ms
```
You will now notice that in the `public` folder there is a new `index.html` file which has been compiled from the `template` and `content` files in the `src` folder.  
 
####Adding CSS using Sass
Because of the variables usage in `Sass` we will save a lot of time when duplicating this project for another purpose or website. 
We can for example change the theme colors, font etc all in our `Sass` variables and therefore save a lot of time. We will also use `Bootstrap` to speed up our `CSS` development and save time on responsive layouts.
Let's start by creating our `Sass` folder that will contain all our `.scss` files.
```sh
        └───src
            └───content
            └───sass
            └───templates
``` 
