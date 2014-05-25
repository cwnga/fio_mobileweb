var test = require('tap').test,
    resolve = require('path').resolve,
    rimraf = require('rimraf'),

    log = require('../lib/log'),
    fn = require('../docs');

log.pause();

test('makeDocs()', function(t) {
    var env = {
            cwd: __dirname,
            args: [],
            opts: {
                exclude:[],
                directory: resolve(__dirname, 'artifacts'),
                quiet: true
            },
            app: {},
            mojito: {}
        };

    function cb(err, msg) {
        t.ok(!err);
        t.equal(msg.slice(0, 4), 'Done');
    }

    t.plan(2);
    fn.makeDocs('yoyo', __dirname, env, cb);
});

test('mojito docs (no args) // now same as `mojito doc app`', function(t) {
    var dir = resolve(__dirname, 'fixtures/newsboxes'),
        env = {
            cwd: __dirname,
            args: [],
            opts: {
                loglevel: 'silly',
                remove: true
            },
            app: {path: dir},
            mojito: {}
        };

    function cb(err, msg) {
        t.ok(!err);
        t.equal(msg.slice(0, 4), 'Done');
    }

    t.plan(2);
    fn(env, cb)
});

test('mojito docs app MYAPP', function(t) {
    var dir = resolve(__dirname, 'fixtures/newsboxes'),
        env = {
            cwd: __dirname,
            args: ['app', 'MYAPP'],
            opts: {
                remove: true
            },
            app: {path: dir},
            mojito: {}
        };

    function cb(err, msg) {
        t.ok(!err);
        t.equal(msg.slice(0, 4), 'Done');
    }

    t.plan(2);
    fn(env, cb)
});

test('mojito docs mojit Shelf', function(t) {
    var dir = resolve(__dirname, 'fixtures/newsboxes'),
        env = {
            cwd: dir,
            args: ['mojit', resolve(dir, 'mojits/Shelf')],
            opts: {
                remove: true,
                directory: resolve(__dirname, 'artifacts')
            },
            app: {path: dir},
            mojito: {}
        };

    function cb(err, msg) {
        t.ok(!err);
        t.equal(msg, 'Done, open ' + resolve(env.opts.directory, 'Shelf/index.html'));
    }

    t.plan(2);
    fn(env, cb)
});

test('mojito docs mojito', function(t) {
    var dir = resolve(__dirname, 'fixtures/newsboxes'),
        env = {
            cwd: __dirname,
            args: ['mojito'],
            opts: {},
            app: {},
            mojito: {path: dir}
        };

    function cb(err, msg) {
        t.equal(err, null);
        t.equal(msg, 'Done, open ' + resolve(__dirname, 'artifacts/docs/Mojito/index.html'));
    }

    t.plan(2);
    fn(env, cb)
});
