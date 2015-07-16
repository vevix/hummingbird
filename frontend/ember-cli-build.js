/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    fingerprint: {enabled: false}
  });

  app.import('vendor/awesome-rating.js');
  app.import('vendor/message-bus.js');
  app.import('vendor/spoiler.js');
  app.import('vendor/htmldiff.js');
  app.import('vendor/dragsort.js');
  app.import('vendor/react-library.js');
  app.import('vendor/messenger/messenger.js');
  app.import('vendor/messenger/messenger-theme-flat.js');
  app.import('vendor/scroll-on-page.js');
  app.import('vendor/customevent-polyfill.js');
  app.import('bower_components/moment/moment.js');
  app.import('bower_components/jquery-autosize/jquery.autosize.js');
  app.import('bower_components/pace/pace.js');
  app.import('bower_components/typeahead.js/dist/typeahead.bundle.js');
  app.import('bower_components/Chart.js/Chart.js');
  app.import('bower_components/Chart.js/Chart.js');
  app.import('bower_components/Jcrop/js/jquery.Jcrop.js');
  app.import('bower_components/masonry/dist/masonry.pkgd.js');
  app.import('bower_components/imagesloaded/imagesloaded.pkgd.js');
  app.import('bower_components/jquery-textcomplete/dist/jquery.textcomplete.js')

  // bootstrap js
  app.import('bower_components/bootstrap/js/transition.js');
  app.import('bower_components/bootstrap/js/dropdown.js');
  app.import('bower_components/bootstrap/js/tooltip.js');
  app.import('bower_components/bootstrap/js/modal.js');

  return app.toTree();
};
