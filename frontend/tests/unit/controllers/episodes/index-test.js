import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:episodes/index', 'EpisodesIndexController', {
  // Specify the other units that are required for this test.
  needs: ['controller:anime']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});
