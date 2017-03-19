var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    templateCache = require('gulp-angular-templatecache'),
    browserSync = require('browser-sync').create();

var paths = {
    build: "./build/**/*",
    jQuery: "./bower_components/jquery/dist/jquery.js",
    bootstrapCss: "./bower_components/bootstrap/dist/css/bootstrap.css",
    bootstrapJs: "./bower_components/bootstrap/dist/js/bootstrap.js",
    glyphicons: "./bower_components/bootstrap/dist/fonts/*",
    angular: "./bower_components/angular/angular.js",
    vendorStyles: "./src/vendor/css/**/*.css",
    vendorScripts: "./src/vendor/js/**/*.js",
    fonts: "./src/vendor/fonts/*",
    images: "./src/images/*",
    templates: "src/templates/**/*.html",
    styles: "./src/scss/**/*.scss",
    scripts: "./src/js/**/*.js"
};

gutil.env.type = 'production';

gulp.task('default', ['watch']);

gulp.task('clean', function(){
    return gulp.src(paths.build)
        .pipe(clean({force: true}));
});

gulp.task('jQuery', function(){
    return gulp.src(paths.jQuery)
        .pipe(concat('jquery.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/vendor/js/'));
});

gulp.task('bootstrapCss', function(){
    return gulp.src(paths.bootstrapCss)
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/vendor/css/'));
});

gulp.task('bootstrapJs', function(){
    return gulp.src(paths.bootstrapJs)
        .pipe(concat('bootstrap.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/vendor/js/'));
});

gulp.task('glyphicons', function(){
    return gulp.src(paths.glyphicons)
        .pipe(gulp.dest('./src/vendor/fonts/'));
});

gulp.task('angular', function(){
    return gulp.src(paths.angular)
        .pipe(gulp.dest('./src/vendor/js/'));
});

gulp.task('vendorStyles', ['bootstrapCss', 'glyphicons'], function(){
    return gulp.src(paths.vendorStyles)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/vendor/css/'));
});
gulp.task('vendorScripts', ['jQuery', 'bootstrapJs', 'angular'], function(){
    return gulp.src(paths.vendorScripts)
        .pipe(order([
            'jquery.min.js',
            'bootstrap.min.js',
            'angular.js'
        ]))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/vendor/js/'));
});
gulp.task('fonts', function(){
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./build/vendor/fonts/'));
});
gulp.task('vendor', ['fonts', 'vendorStyles', 'vendorScripts'], function(){
    console.log('Compiling dependencies...');
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

gulp.task('templates', function(){
    var options = {
        module: 'UC'
    };
    return gulp.src(paths.templates)
        .pipe(templateCache('templates.js', options))
        .pipe(gulp.dest('./src/js/'));
});

gulp.task('css', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sass())
        .pipe(concat('all.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'));
});

gulp.task('jshint', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint({
            validthis: true
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['jshint'], function () {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'));
});

gulp.task('dev-css', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sass())
        .pipe(concat('css/app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/'));
});

gulp.task('dev-js', ['jshint', 'templates'], function () {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('dev.min.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/'));
});

gulp.task('watch', function (done) {
    gulp.watch('src/scss/**/*.scss', ['dev-css']);
    gulp.watch('src/js/**/*.js', ['jshint', 'dev-js']);
    browserSync.reload();
    done();
});

gulp.task('serve', ['watch'], function(){
    browserSync.init({
        proxy: "uc.local"
    });

    gulp.watch('./src', ['watch']);
});

gulp.task('build', ['vendor', 'images', 'css', 'js'], function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build/'));
});
