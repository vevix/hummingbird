import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('casting', 'Casting', {
  // Specify the other units that are required for this test.
  needs: ['model:person', 'model:character']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
