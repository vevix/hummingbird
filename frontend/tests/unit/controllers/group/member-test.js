import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:group/members', 'GroupMembersController', {
  // Specify the other units that are required for this test.
  needs: ['controller:group']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});
