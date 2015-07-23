import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('transform:array', 'ArrayTransform', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test("#serialize", function(assert) {
  var transform = this.subject();

  assert.deepEqual(transform.serialize(null), []);
  assert.deepEqual(transform.serialize(undefined), []);
  assert.deepEqual(transform.serialize([1,2,3]), [1,2,3]);
});

test("#deserialize", function(assert) {
  var transform = this.subject();

  assert.equal(transform.deserialize(null), null);
  assert.equal(transform.deserialize(undefined), undefined);
  assert.deepEqual(transform.deserialize([1,2,3]), [1,2,3]);
});
