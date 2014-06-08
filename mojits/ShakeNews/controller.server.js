/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('shakenews', function(Y, NAME) {

/**
 * The shakenews module.
 *
 * @module shakenews
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */

     api_get: function(ac) {
         var emotion = ac.params.getFromUrl('emotion');
         var callback_name = ac.params.getFromUrl('callback');
         ac.models.get('model').getData(emotion, function(err, data) {
             if (err) {
                 ac.error(err);
                 return;
             }
             http = ac.http.getRequest();
             ac.http.setHeader('Content-Type', 'application/json; charset=utf-8');
             console.log(http);

             //data= JSON.stringify(data);
             console.log(data);
             ac.done({
                 callback: callback_name,
                 data: data
             },  { name: "api_get" });
         });
     },


        index: function(ac) {
            var emotion = ac.params.getFromUrl('emotion');
            ac.models.get('model').getData(emotion, function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');

                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-params-addon','mojito-http-addon']});
