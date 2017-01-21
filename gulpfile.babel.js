import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import path from 'path'
import chmod from 'gulp-chmod'
import watch from 'gulp-watch'
import del from 'del'

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

gulp.task('clean', (cb) => del([dist], cb))

gulp.task('watch', () => {
  watch(src, () => gulp.start(['lint', 'trans']))
  watch(binSrc, () => gulp.start('bin'))
})

gulp.task('build', ['clean'], () => {
  gulp.start(['lint', 'trans', 'bin'])
})

gulp.task('default', ['build'])
