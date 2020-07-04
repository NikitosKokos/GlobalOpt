const project_folder = "dist";
const source_folder = "src";

let fs =require('fs');

let path= {
    build:{
        html: `${project_folder}/`,
        css:    `${project_folder}/css/`,
        js:    `${project_folder}/js/`,
        img:    `${project_folder}/img/`,
        fonts:    `${project_folder}/fonts/`,
    },
    src:{
        html: [source_folder + '/*.html', "!" + source_folder + '/_*.html' ],
        css:    `${source_folder}/sass/style.scss`, 
        js:    `${source_folder}/js/script.js`,
        img:    `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
        fonts:    `${source_folder}/fonts/*.ttf`,
    },
    watch:{
        html: `${source_folder}/**/*.html`,
        css:    `${source_folder}/sass/**/*.scss`,
        js:    `${source_folder}/js/**/*.js`,
        img:    `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    },
    clean: `./${project_folder}/`
}

let {src,dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass= require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    group_media = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webpcss'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter');

function browserSync() {
    browsersync.init({
        server:{
            baseDir: `./${project_folder}/`
        },
        port: 3000,
        notify: false
    });

}


function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function images(){
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false}],
            interlaced: true,
            optimizationLavel: 3 // 0 to 7
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(uglify())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function css(){
    return src(path.src.css)
    .pipe( sass({
        outputStyle: 'expanded'
    }))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade:true
        }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}
function fonts() {
    src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(){
    return del(path.clean);
}

function fontsStyle(){
    
}

function cb(){

}

gulp.task('otf2ttf', function() {
    return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'))
})

let build = gulp.series(clean,gulp.parallel(js,css,html,images,fonts),fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;



