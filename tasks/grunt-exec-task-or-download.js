/*
 * grunt-git-init-and-deploy
 * https://github.com/Ideame/grunt-git-init-and-deploy
 *
 * Copyright (c) 2013 Ideame
 */
module.exports = function (grunt) {
    grunt.registerMultiTask("gitInitAndDeploy", "Creates an empty git repository, commit/push all changes to the provided git remote/branch", function () {
        var done = this.async();
        var deployFolder = this.filesSrc[0];

        var revBase = null;

        var options = this.options({
            branch: 'master',
            message: 'deployment ' + new Date().toISOString()
        });

        grunt.util.async.series([
            function (callback) {
                grunt.log.writeln('Initializing a new repo');
                grunt.util.spawn({ cmd: 'git', args: [ 'init', '.' ], opts: { cwd: deployFolder } }, callback);
            },
            function (callback) {
                grunt.log.writeln('Adding all files');
                grunt.util.spawn({ cmd: 'git', args: [ 'add', '.' ], opts: { cwd: deployFolder } }, callback);
            },
            function (callback) {
                grunt.log.writeln('Commiting all files');
                grunt.util.spawn({ cmd: 'git', args: [ 'commit', '-am', options.message ], opts: { cwd: deployFolder } }, callback);
            },
            function (callback) {
                grunt.log.writeln('Getting HEAD\'s commit #');

                grunt.util.spawn({ cmd: 'git', args: [ 'rev-parse', 'HEAD' ], opts: { cwd: deployFolder } }, function (err, result){
                    if (err) { callback(err); }
                    revBase = result.stdout;
                    callback();
                });
            },
            function (callback) {
                grunt.log.writeln('Pushing to %s', options.repository);
                var branch = revBase + ':' + options.branch;
                grunt.util.spawn({ cmd: 'git', args: [ 'push', '-f', options.repository, branch ], opts: { cwd: deployFolder } }, callback);
            },
        ], done);
    });
};
