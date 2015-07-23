import wilsonScore from 'frontend/utils/wilson-score';

import {module, test} from 'qunit';

module('wilsonScore');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(wilsonScore(0, 0), 0);
  assert.equal(wilsonScore(0, 100), 0);
  assert.ok(wilsonScore(100000, 100000) > 0.99);
});
