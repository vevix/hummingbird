import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('group', 'Group', {
  // Specify the other units that are required for this test.
  needs: ['model:group-member', 'model:user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
