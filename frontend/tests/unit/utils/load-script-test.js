import loadScript from 'frontend/utils/load-script';

import {module, test} from 'qunit';

module('loadScript');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = loadScript("/assets/frontend.js");
  andThen(function() {
    assert.ok(result);
  });
});
