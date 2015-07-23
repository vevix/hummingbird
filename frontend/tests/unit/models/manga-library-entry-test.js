import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('manga-library-entry', 'MangaLibraryEntry', {
  // Specify the other units that are required for this test.
  needs: ['model:manga']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
