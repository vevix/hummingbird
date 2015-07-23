import Ember from 'ember';
import {module, test} from 'qunit';
import ModelTruncatedDetailsMixin from 'frontend/mixins/model-truncated-details';

module('ModelTruncatedDetailsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModelTruncatedDetailsObject = Ember.Object.extend(ModelTruncatedDetailsMixin);
  var subject = ModelTruncatedDetailsObject.create();
  assert.ok(subject);
});
