mojito-cli-doc
==========

[![Build Status](https://travis-ci.org/yahoo/mojito-cli-doc.png?branch=develop)](https://travis-ci.org/yahoo/mojito-cli-doc)

`mojito-cli-docs` provides the `doc` command for `mojito-cli`, that you can install with: `npm install -g mojito-cli`.

The `doc` command generates, or serves, API documentation for Mojito, Mojito apps, 
or mojits.


    npm install -g mojito-cli

Usage
-----

To generate documentation for a mojito application, including all the mojits in it's `mojits/` subdirectory, 
run the following from the application directory:

    $ mojito docs app [name]

Optional `name` if provided, is used as the sub-directory name to save the generated API docs. See Options below.

To generate documentation for a specific mojit, run the following from the application directory:

    $ mojito docs mojit <mojit-name>

To generate documentation for the Mojito framework itself:

    $ mojito docs mojito

### Options

Specify output directory (if `--port` or `--server` are not used):

    --directory <path>
    -d <path>

By default, the generated files are saved in `./artifacts/docs/`, or if a `name` argument is provided, `./artifacts/docs/<name>`.

Exclude some files or directories from being processed:

    --exclude <pattern>
    -e <pattern>

This option can be repeated, for example `mojito doc --exclude middleware --exclude build` will exclude files or directories with "middleware" or "build" in their names.

Serve the API docs over HTTP, without rendering them to the file system (assumes `--port 3000`):

    --server
    -s


Serve the API docs over HTTP, like option `--server`, using the specified port number:

    --port <number>
    -p <number>


Discussion/Forums
-----------------

http://developer.yahoo.com/forum/Yahoo-Mojito

Licensing and Contributions
---------------------------

`mojito-cli-doc` is licensed under a BSD license (see LICENSE.txt). To contribute to the Mojito project, 
please see [Contributing](https://github.com/yahoo/mojito/wiki/Contributing-Code-to-Mojito).

The Mojito project is a [meritocratic, consensus-based community project](https://github.com/yahoo/mojito/wiki/Governance-Model),
which allows anyone to contribute and gain additional responsibilities.
