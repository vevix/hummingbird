import {
  formatTime
} from 'frontend/helpers/format-time';

import {module, test} from 'qunit';

module('FormatTimeHelper');

test('it works', function(assert) {
  var result = formatTime(new Date(1994, 1, 18), "YYYY-MM-DD");
  assert.equal(result, '1994-02-18');
});
