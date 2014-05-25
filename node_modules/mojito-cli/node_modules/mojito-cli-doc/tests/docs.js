var test = require('tap').test,
    fn = require('../docs');


function getEnv(args, opts) {
    return {
        cwd: '.',
        args: args || [],
        opts: opts || {},
        app: {},
        mojito: {}
    };
}

test('mojito docs (no args) // now same as `mojito doc app`', function(t) {

    function cb(err, msg) {
        t.ok(err.message.match(/Not an application dir/));
    }

    t.plan(1);
    fn(getEnv(), cb)
});

test('mojito docs app (not an app dir)', function(t) {

    function cb(err, msg) {
        t.ok(err.message.match(/Not an application dir/));
    }

    t.plan(1);
    fn(getEnv(['app']), cb)
});

test('mojito docs mojit (no name)', function(t) {

    function cb(err, msg) {
        t.ok(err.message.match(/Please specify mojit name/));
    }

    t.plan(1);
    fn(getEnv(['mojit']), cb)
});

test('mojito docs nonesuch', function(t) {

    function cb(err, msg) {
        t.ok(err.message.match(/Unknown type/));
    }

    t.plan(1);
    fn(getEnv(['nonesuch']), cb)
});

test('mojito docs mojit nonesuch', function(t) {

    function cb(err, msg) {
        t.ok(err.message.match(/Cannot find mojit nonesuch/));
    }

    t.plan(1);
    fn(getEnv(['mojit', 'nonesuch']), cb)
});

test('mojito docs mojito', function(t) {

    function cb(err, msg) {
        console.log(err);
        t.ok(err.message.match(/Cannot find the Mojito library/));
    }

    t.plan(1);
    fn(getEnv(['mojito']), cb)
});

