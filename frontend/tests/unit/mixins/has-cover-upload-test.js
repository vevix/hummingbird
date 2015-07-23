import Ember from 'ember';
import {module, test} from 'qunit';
import HasCoverUploadMixin from 'frontend/mixins/has-cover-upload';

module('HasCoverUploadMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var HasCoverUploadObject = Ember.Object.extend(HasCoverUploadMixin);
  var subject = HasCoverUploadObject.create();
  assert.ok(subject);
});
