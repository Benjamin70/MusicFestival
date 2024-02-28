const {src, dest, watch, parallel} = require("gulp");

//Dependencias de CSS:
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Dependencia de Imagenes:
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser-js');

function css(done){
    src('src/scss/**/*.scss') //Identificar el archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilar el Archivo de SASS
        .pipe(postcss([autoprefixer(), cssnano()])) //Compilar el Archivo de SASS
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css")); //Almacenar en el disco duro

    done(); //Callback avisa cuando Gulp Llega al final
}

function imagenes(done){

    const opciones ={
        optimizationLevel: 3
    }

    src('src/img/**/*.{jpg,png}')
        .pipe( cache(imagemin(opciones)) )
        .pipe(dest('build/img'))    
    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones) )
        .pipe(dest('build/img'))


    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}')
        .pipe(sourcemaps.init())
        .pipe( avif(opciones) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/img'))


    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);