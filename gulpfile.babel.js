import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import nodemon from 'gulp-nodemon'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import watchify from 'watchify'
import livereload from 'gulp-livereload'
import env from 'gulp-env'
import envify from 'envify/custom'
import fs from 'fs'
import sass from 'gulp-sass'

const ENV_FILE = '.env.json'
const JS_SOURCE_FILE = 'app/main.jsx'
const JS_DEST_FILE = 'bundle.js'
const DEST_PATH = 'public'
const SERVER_PATH = 'server'
const CSS_WATCH = 'app/stylesheets/**/*.scss'
const ASSET_WATCH = 'app/assets/**/**'

// Read environment variables from file
try {
    fs.accessSync(ENV_FILE, fs.F_OK)
    env(ENV_FILE)
    gutil.log('Read environment variables from', ENV_FILE)
} catch (e) {
    // Leave it alone if no env file
}

// Print message on error
function handleError(err) {
    if (err instanceof SyntaxError) {
        gutil.log(gutil.colors.red('Syntax Error'))
        console.log(err.message)
        console.log(err.codeFrame)
    } else {
        gutil.log(gutil.colors.red('Error'), err.message)
    }
    this.emit('end')
}

// Bundle js[x] files
const bundle = (watch) => {
    let bundler = browserify({
        entries: [JS_SOURCE_FILE],
        extensions: ['.js', '.jsx'],
        debug: true,
        fullPaths: watch,
        cache: {},
        packageCache: {}
    })
    .transform(babelify, {presets: ['es2015', 'react', 'stage-2']})
    .transform(envify(Object.assign({}, process.env)))

    if (watch) bundler = watchify(bundler)

    let rebundle = () => bundler
        .bundle()
        .on('error', handleError)
        .pipe(source(JS_DEST_FILE))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST_PATH))
        .pipe(livereload())

    bundler.on('update', rebundle)

    return rebundle()
}

gulp.task('bundle', () => {
    return bundle(false)
})

gulp.task('bundle:watch', () => {
    return bundle(true)
})

gulp.task('livereload', () => {
    gutil.log('Starting livereload server')
    return livereload.listen()
})

gulp.task('copy', () => {
    return gulp.src([ ASSET_WATCH ])
        .pipe(gulp.dest(DEST_PATH))
})

gulp.task('copy:watch', ['copy'], () => {
    return gulp.watch([ ASSET_WATCH ], ['copy'])
})

gulp.task('sass', () => {
    return gulp.src(CSS_WATCH)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST_PATH))
        .pipe(livereload())
})

gulp.task('sass:watch', ['sass'], () => {
    return gulp.watch(CSS_WATCH, ['sass'])
})

gulp.task('start:watch', () => {
    return nodemon({
        exec: 'npm start',
        watch: SERVER_PATH
    })
})

gulp.task('build', ['copy', 'bundle', 'sass'])
gulp.task('watch', [
    'copy:watch',
    'start:watch',
    'livereload',
    'bundle:watch',
    'sass:watch'
])
gulp.task('default', ['build'])
