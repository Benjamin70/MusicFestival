const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');


function css(done){
    src('src/scss/**/*.scss') //Identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass()) //Compilar el Archivo de SASS
        .pipe(dest("build/css")); //Almacenar en el disco duro

    done(); //Callback avisa cuando Gulp Llega al final
}

function dev(done){
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.dev = dev;