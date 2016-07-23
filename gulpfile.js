var gulp = require('gulp'),
    uglify = require('gulp-uglify'),        // minify js
    minify_css = require('gulp-minify-css'),
    browserSync = require('browser-sync'),    //  livereload
    reload = browserSync.reload,
    complexity = require('gulp-complexity'),   //Analize the complexity and maintainability of code
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),      // for preventing pipe breake
    del = require('del'),           // for removing files
    rigger = require('gulp-rigger'),    // for concating files
    imagemin = require('gulp-imagemin'),        // for compressing images
    pngquant = require('imagemin-pngquant'),  //extension for imagemin
    uncss = require('gulp-uncss'),      //remove unused css
    compass = require('gulp-compass');


gulp.task('scripts', function() {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(rigger())
        .pipe(plumber())
        .pipe(complexity())
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});

gulp.task('images', function () {
    gulp.src('app/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/images/'))
        .pipe(reload({stream:true}));
});

gulp.task('compass', function() {
    gulp.src('app/scss/all.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/scss',
            require: ['susy']
        }))
        .pipe(minify_css())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css/'))
        .pipe(uncss({
            html: ['app/index.html', 'app/partials/**/*.html']
        }))
        .pipe(reload({stream:true}));
});

gulp.task('html', function(){
    gulp.src('app/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream:true}));
});

gulp.task('fonts', function() {
    gulp.src('app/fonts/**/*.*')
        .pipe(reload({stream:true}));
});

/*watcher*/

gulp.task('watch', function(){
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/scss/**/*.scss', ['compass']);
    gulp.watch('app/**/*.html', ['html']);
});


/*build clean*/

gulp.task('build:clean', function(){
    del([
        'build/**'
    ])
});

/*livereload tasks*/

gulp.task('browser-sync', function(){
   browserSync({
       server:{
           baseDir: "./build/"
       }
   });
});

gulp.task('default', ['html', 'images', 'fonts', 'scripts', 'compass', 'browser-sync', 'watch']);