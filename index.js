const autoprefixer     = require('autoprefixer');
const del              = require('del');
const gulpif           = require('gulp-if');
const perfectionist    = require('perfectionist');
const postcss          = require('gulp-postcss');
const postcssImport    = require('postcss-easy-import');
const postcssPresetEnv = require('postcss-preset-env');
const precss           = require('precss');
const rename           = require('gulp-rename');
const sourcemaps       = require('gulp-sourcemaps');
const strip            = require('gulp-strip-comments');
const stylelint        = require('gulp-stylelint');
const tailwindcss      = require('tailwindcss');

// const error      = require('./core').error;

let gulp = null;
let config = {};
let tasks = [];
let browserSync = null;

/**
 * Compile
 */
function twCompile() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport(),
      tailwindcss(config.twConfig),
      postcssPresetEnv(),
      precss(),
      autoprefixer(),
      perfectionist({ format: config.outputStyle })
    ]))
    .pipe(rename(config.destName))
    .pipe(gulpif(config.removeComments, strip.text()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
}
twCompile.description = 'Compile Tailwind & scss to css using postcss, sourcemaps, and autoprefixer.';

/**
 * Clean
 */
function twClean() {
  return del([
    config.dest
  ], { force: true });
}
twClean.description = 'Delete compiled css files.';

/**
 * Validate
 */
function twValidate() {
  return gulp.src(config.lintSrc)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [{
        formatter: 'string', console: true
      }]
    }));
}
twValidate.description = 'Validate (lint) css for errors.';

/**
 * Reload
 */
function twReload(done) {
  if (browserSync) {
    browserSync.reload();
  }
  done();
}
twReload.description = 'Reload browsers.';

/**
 * Watch
 */
function twWatch() {
  const watchSrc = [
    config.src,
    config.twConfig,
    config.lintSrc
  ];
  const watchTasks = [twCompile];

  if (config.lint) {
    watchTasks.push(twValidate);
  }

  return gulp.watch(watchSrc, gulp.series(gulp.parallel(watchTasks), twReload));
}
twWatch.description = 'Watch Tailwind files for changes.';

module.exports = (options) => {
  gulp = options.gulp;
  config = options.config;
  tasks = options.tasks;
  browserSync = options.browserSync;

  gulp.task('compile:tw', twCompile);
  tasks.compile.push('compile:tw');

  gulp.task('clean:tw', twClean);
  tasks.clean.push('clean:tw');

  if (config.lint) {
    gulp.task('validate:tw', twValidate);
    tasks.validate.push('validate:tw');
  }

  gulp.task('watch:tw', twWatch);
  tasks.watch.push('watch:tw');
}
