/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, node:true */
"use strict";

// dependencies
var gulp = require('gulp'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    prompt = require('gulp-prompt'),
    tag_version = require('./index.js');

// config
var paths = {
    scripts       : ['src/*.js'],
    versionToBump : ['./package.json'],
    versionToCheck: 'package.json',
    dest          : './'
};

/**
 * Bumping version number.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes 0.1.0 → 0.1.1
 *     gulp feature   # makes 0.1.1 → 0.2.0
 *     gulp release   # makes 0.2.1 → 1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance, cake_mustnt_be_a_lie) {
    var process = gulp.src(paths.versionToBump);
    if (cake_mustnt_be_a_lie === true) {
        /* never ever do a big release without proper celebration, it's a company Hoshin thing */
        process.pipe(prompt.confirm('Has cake been served to celebrate the release?'));
    }
    process.pipe(bump({type: importance}))
        .pipe(gulp.dest(paths.dest))
        .pipe(filter(paths.versionToCheck))
        .pipe(tag_version());
}

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major', true); });