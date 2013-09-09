grunt-git-init-and-deploy
=========================

> Creates an empty git repository, commit/push all changes to the provided git remote/branch.

## Getting Started
_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

From the same directory as your project's Gruntfile and package.json, install this plugin with the following command:

```bash
npm install grunt-git-init-and-deploy
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-git-init-and-deploy');
```

## Overview

Inside your `Gruntfile.js` file add a section named `gitInitAndDeploy`. This section specifies the
options to provide remote repository, branch and commit message.


## Config Example

Example to deploy the **deploy** folder to Heroku:

```javascript
gitInitAndDeploy: {
    dist: {
        options: {
            repository: 'git@heroku.com:' + process.env.HEROKU_APP_NAME + '.git',
            message: 'deployment for v.' + process.env.BUILD_NUMBER + '-' + process.env.ENVIRONMENT,
            branch: 'master' // optional: default is 'master'
        },
        src: 'deploy'
    }
}
```

License
-------

Copyright (c) 2013 Juan Pablo Garcia
Licensed under the MIT license.
