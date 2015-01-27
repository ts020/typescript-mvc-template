var gulp    = require("gulp");
var tsc     = require("gulp-tsc");
var less    = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task("tsc", function() {
    gulp.src(["dev/ts/App.ts"])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(tsc({
            target : "ES5",
            removeComments : true,
            out:"App.js"
        }))
        .pipe(gulp.dest("pub/resource/"));
});

gulp.task('less', function() {
    return gulp.src(['dev/less/*.less','!dev/less/_*.less'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('pub/resource/'));
});


gulp.task('watch',function(){
    gulp.watch('dev/ts/**/*.ts',function(event){
        gulp.run('tsc');
    });

    gulp.watch('dev/less/**/*.less',function(event){
        gulp.run('less');
    });
});

gulp.task('default',function(){
    gulp.run('watch');
});