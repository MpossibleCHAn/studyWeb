const gulp = require('gulp');
const lessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new lessAutoprefix({
  browsers:['last 2 versions']
});
const browsersSync = require('browser-sync');
var reload = browsersSync.reload;

// 未成功
// const server = require('gulp-server-livereload');
// var serverParam = {
//   livereload: true,
//   directoryListing: true,
//   open: true
// }

const SRC = './src',
      DEST = './dest',
      LESS_SRC = SRC + '/**/*.less',
      JS_SRC = SRC + '/**/*.js',
      HTML = SRC + '/**/*.html';

const less = require('gulp-less');


gulp.task('less',function() {
   gulp.src([LESS_SRC])
       .pipe(less({
         plugins:[autoprefix]
       }))
       .pipe(gulp.dest(DEST))
})

gulp.task('html',function() {
   gulp.src([HTML])
       .pipe(gulp.dest(DEST))
})

gulp.task('default',['less','html'],function() {
  browsersSync.init(null, {
    server: {
      baseDir:'./',
      index:'src/index.html'
    },
    port:8050
  });
  gulp.start(['less']);
  gulp.watch(LESS_SRC,['less',reload]);
  gulp.watch(JS_SRC,['js',reload]);
  gulp.watch(HTML,['html',reload]);
  // gulp.watch(HTML,reload);
})
