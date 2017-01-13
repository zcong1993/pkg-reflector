const gulp = require('gulp')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const path = require('path')
const chmod = require('gulp-chmod')

const src = path.join(__dirname, 'src/**/*.js')
const dist = path.join(__dirname, 'dist')
const binSrc = path.join(__dirname, 'bin/*')

gulp.task('trans', () => {
  gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest(dist))
})

gulp.task('lint', () => {
  gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
})

gulp.task('bin', () => {
  gulp.src(binSrc)
    .pipe(babel())
    .pipe(chmod(0o755))
    .pipe(gulp.dest(path.join(dist, 'bin')))
})

gulp.task('watch', () => {
  gulp.watch(src, ['lint', 'trans'])
  gulp.watch(binSrc, ['bin'])
})

gulp.task('default', ['lint', 'trans', 'bin'])
