import Ember from 'ember';
import {module, test} from 'qunit';
import PaginatedMixin from 'frontend/mixins/paginated';

module('PaginatedMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PaginatedObject = Ember.Object.extend(PaginatedMixin);
  var subject = PaginatedObject.create();
  assert.ok(subject);
});
