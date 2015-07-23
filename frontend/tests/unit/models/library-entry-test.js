import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('library-entry', 'LibraryEntry', {
  // Specify the other units that are required for this test.
  needs: ['model:anime']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
