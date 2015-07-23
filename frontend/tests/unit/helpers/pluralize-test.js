import {
  pluralize
} from 'frontend/helpers/pluralize';

import {module, test} from 'qunit';

module('PluralizeHelper');

test('it works', function(assert) {
  assert.equal(pluralize(1, 'duck', 'ducks'), '1 duck');
  assert.equal(pluralize(0, 'duck', 'ducks'), '0 ducks');
  assert.equal(pluralize(42, 'duck', 'ducks'), '42 ducks');
});
