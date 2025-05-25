const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const ignore = require('gulp-ignore');
const path = require('path');

// Paths configuration
const paths = {
  html: {
    src: 'src/',
    partials: 'src/partials/',
    dest: 'public_html/',
  },
};


// HTML builder
function html() {
  return gulp.src([path.join(paths.html.src, '**/*.html')])
    .pipe(ignore.exclude('**/partials/**/*')) // Wyklucza folder partials z kopiowania
    .pipe(fileInclude({
      prefix: '@@',
      basepath: paths.html.partials,
    }))
    .pipe(gulp.dest(paths.html.dest));
}

// Watcher
function watchFiles() {
  gulp.watch('src/**/*.html', html);
  gulp.watch('src/partials/*.html', html);
}

exports.default = gulp.series(html);
exports.watch = watchFiles;
exports.build = gulp.series(html);
