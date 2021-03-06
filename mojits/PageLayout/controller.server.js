YUI.add('pagelayout', function(Y, NAME) {

  /**
  * The pagelayout module.
  *
  * @module pagelayout
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
    index: function(ac) {
      ac.composite.done({
        title: "Trib - YUI/Mojito Developer Dashboard"
      });
    }
  };
}, '0.0.1', {requires: ['mojito','mojito-composite-addon']});
