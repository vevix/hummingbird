import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('notification', 'Notification', {
  // Specify the other units that are required for this test.
  needs: ['model:model']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
