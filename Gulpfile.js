const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('clean:dist', function() {
	return del([
		'dist'
	]);
});
gulp.task('babeljs', () => {
	return gulp.src('public/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('app.js'))
		.pipe(minify())
		.pipe(gulp.dest('dist/public'));
});
gulp.task('copystyles', () => {
	return gulp.src('public/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('dist/public'));
});
gulp.task('copyimages', () => {
	return gulp.src('public/images/**/*')
		.pipe(gulp.dest('dist/public/images'));
});
gulp.task('copymisc', () => {
	return gulp.src('public/*.manifest')
		.pipe(gulp.dest('dist/public/'));
});
gulp.task('copyviews', () => {
	return gulp.src(['public/*.html'])
		.pipe(gulp.dest('dist/public'));
});
gulp.task('copysrc', () => {
	return gulp.src(['index.js', 'package.json', '.gitignore'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', function(callback) {
	runSequence('clean:dist', [
		'clean:dist',
		'babeljs',
		'copystyles',
		'copyimages',
		'copymisc',
		'copysrc',
		'copyviews'],
		callback);
});