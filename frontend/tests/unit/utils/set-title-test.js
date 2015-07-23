import setTitle from 'frontend/utils/set-title';

import {module, test} from 'qunit';

module('setTitle');

// Replace this with your real tests.
test('it works', function(assert) {
  setTitle();
  assert.equal(document.title, 'Hummingbird');
  setTitle("");
  assert.equal(document.title, 'Hummingbird');
  setTitle("Test");
  assert.equal(document.title, 'Test | Hummingbird');
});
