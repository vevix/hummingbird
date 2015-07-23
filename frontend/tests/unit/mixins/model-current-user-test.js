import Ember from 'ember';
import {module, test} from 'qunit';
import ModelCurrentUserMixin from 'frontend/mixins/model-current-user';

module('ModelCurrentUserMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModelCurrentUserObject = Ember.Object.extend(ModelCurrentUserMixin);
  var subject = ModelCurrentUserObject.create();
  assert.ok(subject);
});
