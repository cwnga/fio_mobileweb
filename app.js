/*jslint nomen:true, node:true*/

var express = require('express'),
    libmojito = require('mojito'),
    app;

app = express();

// Set the port to listen on.
app.set('port', process.env.PORT || 8666);

// Create a new Mojito instance and attach it to `app`.
// Options can be passed to `extend`.
libmojito.extend(app, {
    context: {
        environment: "development"
    }
});

// Load the built-in middleware or any middleware
// configuration specified in application.json
app.use(libmojito.middleware());




///sock
var io = require('socket.io').listen(3000);
io.on('connection', function(socket){
    console.log('a user connected');
});





// Load routes configuration from routes.json
app.mojito.attachRoutes();

// Allow anonymyous mojit instances w/ actions to be dispatched
app.get('/flickr', libmojito.dispatch('frame.index'));
app.get('/hack/api_emotions_news', libmojito.dispatch("api_emotions_news.api_get"))

app.get('/hack/shake_news', libmojito.dispatch("shake_news.index"))

app.get('/:mojit/:action', libmojito.dispatch("{mojit}.{action}"));

app.get('/', libmojito.dispatch('tribframe.index'));

app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port') + ' ' +
                   'in ' + app.get('env') + ' mode');
});


