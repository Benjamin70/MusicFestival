const {src, dest, watch, parallel} = require("gulp");

//Dependencias de CSS:
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//Dependencia de Imagenes:
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src('src/scss/**/*.scss') //Identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass()) //Compilar el Archivo de SASS
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
        .pipe( avif(opciones) )
        .pipe(dest('build/img'))


    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);