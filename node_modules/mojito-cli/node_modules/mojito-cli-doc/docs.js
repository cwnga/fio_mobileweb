/*
 * Copyright (c) 2011-2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
'use strict';

var EOL = require('os').EOL,
    path = require('path'),
    mkdirp = require('mkdirp').sync,
    rimraf = require('rimraf').sync,

    log = require('./lib/log'),
    util = require('./lib/utils'),
    yuidoc = require('yuidocjs'),

    excludes = require('./config').exclude,
    usage;


function makeDocs(name, source, env, cb) {
    var dest,
        json,
        builder,
        docopts;

    // BC.. remove?
    dest = path.resolve(env.opts.directory, name.replace(/[^\w]+/g, '_'));

    if (env.opts.remove) {
        rimraf(dest);
    }
    mkdirp(dest);

    docopts = {
        paths: [ source ],
        outdir: dest,
        exclude: env.opts.exclude.join(),
        name: name,
        port: +env.opts.port || 3000,
        external: false,
        quiet: env.opts.quiet
    };
    log.debug('yuidocjs options', docopts);

    if (env.opts.server || env.opts.port) {
        yuidoc.Server.start(docopts);

    } else {
        json = (new yuidoc.YUIDoc(docopts)).run();
        builder = new yuidoc.DocBuilder(docopts, json);
        builder.compile(function() {
            cb(null, 'Done, open ' + dest + '/index.html');
        });
    }
}

function makeAppDocs(name, env, cb) {
    var source = env.app && env.app.path;

    if (!util.exists(source)) {
        cb(util.errorWithUsage(5, 'Not an application directory'), usage);
        return;
    }

    if (!name) {
        name = env.app.name || 'app';
        log.info('No name specified, using:', name);
    }

    makeDocs(name, source, env, cb);
}

function makeMojitDocs(name, env, cb) {
    var source = util.findInPaths(['mojits', '.'], name),
        err;

    if (!name) {
        err = 'Please specify mojit name or path.';

    } else if (!source) {
        err = 'Cannot find mojit ' + name;
    }

    if (err) {
        cb(util.errorWithUsage(5, err, usage));

    } else {
        makeDocs(path.basename(name), source, env, cb);
    }
}

function makeMojitoDocs(name, env, cb) {
    var source = env.mojito && env.mojito.path;

    if (!util.exists(source)) {
        cb(util.error(7, 'Cannot find the Mojito library'));

    } else {
        makeDocs(name, env.mojito.path, env, cb);
    }
}

function main(env, cb) {
    var type = (env.args.shift() || 'app').toLowerCase(),
        name = env.args.shift() || '',
        exclude = env.opts.exclude || [];

    if (env.opts.loglevel) {
        log.level = env.opts.loglevel;
    }

    // output dir
    if (!env.opts.directory) {
        env.opts.directory = path.resolve(env.cwd, 'artifacts/docs');
    }

    // directories to exclude
    env.opts.exclude = exclude.concat(excludes.always, excludes[type] || []);

    // exec
    switch (type) {
    case 'app':
        makeAppDocs(name, env, cb);
        break;

    case 'mojit':
        makeMojitDocs(name, env, cb);
        break;

    case 'mojito':
        makeMojitoDocs(name || 'Mojito', env, cb);
        break;

    default:
        cb(util.errorWithUsage(3, 'Unknown type', usage));
    }
}


module.exports = main;

module.exports.makeDocs = makeDocs;

module.exports.usage = usage = [
    'Usage: mojito doc [options] <type> [name]',
    '  <type>  "mojito", "app" or "mojit", required',
    '  [name]  name for docs, required for type "mojit"',
    '',
    'Examples:',
    '  mojito docs app foo',
    '  (creates directory "artifacts/docs/app/foo" containing that apps\'s docs)',
    '',
    '  mojito doc',
    '  (same as above, uses name in package.json for app name)',
    '',
    '  mojito doc mojit Bar --directory ~/mydocs --exclude lib/vendor',
    '  (creates directory ~/mydocs/mojits/Bar containing docs for mojit Bar)',
    '',
    'Options:',
    '  --directory <path>  Destination directory to save documentation in.',
    '  --exclude <pattern> Exclude files or directories. Repeatable.',
    '  --server            Launch YUIDoc server instead of writing to disk.',
    '  --port <number>     Port number to start YUIDoc server on. Default is 3000.'
].join(EOL);

module.exports.options = [
    {shortName: 'd', hasValue: true, longName: 'directory'},
    {shortName: 'e', hasValue: [String, Array],  longName: 'exclude'},
    {shortName: 'p', hasValue: true, longName: 'port'},
    {shortName: 'r', hasValue: false, longName: 'remove'},
    {shortName: 's', hasValue: false, longName: 'server'}
];
