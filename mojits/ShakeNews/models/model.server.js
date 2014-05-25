/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('shakenews-model', function(Y, NAME) {

    ////**
    /// * The shakenews-model module.
    /// *
    /// * @module shakenews
    /// */
   ///
   ///    /**
   ///     * Constructor for the ShakeNewsModel class.
   ///     *
   ///     * @class ShakeNewsModel
   ///     * @constructor
   ///     */
  ///    Y.namespace('mojito.models')[NAME] = {
      ///
      ///        init: function(config) {
          ///            this.config = config;
          ///        },
          ///
          ///        /**
          ///         * Method that will be invoked by the mojit controller to obtain data.
          ///         *
          ///         * @param callback {function(err,data)} The callback function to call when the
          ///         *        data has been retrieved.
          ///         */
         ///        getData: function(callback) {
             ///            callback(null, { some: 'data' });
             ///        }
             ///
         ///    };
         ///  // Replace '{your_flickr_api_key}' with your own Flickr
         Y.namespace('mojito.models')[NAME] = {
             init: function(config) {
                 this.config = config;
             },
             getData: function(callback) {
                 // Handle empty.
                 var url = 'https://tw.news.yahoo.com/sentiment/angry/';
                 var xpath = '//*[@id="mediasentimentlisttemp"]/div/ul/li/div/div';

                 var select = "select * from html where url='"+url+"' and xpath='"+xpath+"'";

                 // Execute against YQL
                 Y.YQL (select, function(rawYql) {
                     if (null == rawYql) {
                     callback ([]);
                 }
                 console.log(rawYql.query.results);
                 output = {};

                 image = '';
                 j = 0;
                 for (i in rawYql.query.results.div) {

                     row = rawYql.query.results.div[i];
                      if ( row.a != undefined) {
                          image = row.a.img.style;
                          ret = image.match(/'(.*)'/g);
                          image  = ret[0];
                          image = image.replace("'", "");
                          console.log(image);
                      }
                      if ( row.p != undefined) {
                          template = {};
                          rowP = row.p;
                          content = rowP.content;
                          title = rowP.a.span;
                          href = rowP.a.href;
                          href = href.match(/-(.*).html/gi);
                          tmp = title.replace(" ", "-");

                          href = 'https://tw.news.yahoo.com/'+tmp+ href;
                            console.log(image);

                          template = {
                              content: content,
                              title: title,
                              href: href,
                              image: image
                          };

                          output[j] = template;
                          image = '';
                          j++;
                          if (j >= 3) {
                              break;
                          }
                      }
                  }
                  console.log(output);
                  callback (null, output);
              });
          }
      };



  }, '0.0.1', {requires: ['mojito','yql']});
