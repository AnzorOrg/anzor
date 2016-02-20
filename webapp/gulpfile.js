var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var typescript = require('gulp-typescript');

var transpile = function () {
    console.log("Transpiling TS...");
    gulp.src(['src/**/*.ts'])
        .pipe(typescript({
            target: 'ES5',
            module: 'system',
            moduleResolution: 'node',
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            removeComments: false,
            noImplicitAny: false
        }))
        .pipe(gulp.dest('dist'));
    console.log('Finished transpiling TS!')
};

var deleteDist = function () {
    console.log("Deleting dist folder");
    del.sync(['dist']);
};

var bundleCSS = function () {
    console.log("Bundling CSS...");
    gulp.src('src/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
    console.log("Finished bundling CSS!");
};

var copyResources = function () {
    console.log('Updating resources...');
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
    gulp.src('src/**/*.png')
        .pipe(gulp.dest('dist/'));
    console.log('Finished updating resources!');
};

gulp.task('delete', deleteDist);

gulp.task('default', function () {
    deleteDist();
    transpile();
    bundleCSS();
    copyResources();

    gulp.watch('src/**/*.ts', transpile);
    gulp.watch('src/sass/**/*.scss', bundleCSS);
    gulp.watch('src/**/*.html', copyResources);
});

gulp.task('build', function () {
    deleteDist();
    transpile();
    bundleCSS();
    copyResources();
    console.log("Finish Building!");
});
