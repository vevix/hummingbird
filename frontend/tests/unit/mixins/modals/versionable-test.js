import Ember from 'ember';
import {module, test} from 'qunit';
import ModalsVersionableMixin from 'frontend/mixins/modals/versionable';

module('ModalsVersionableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModalsVersionableObject = Ember.Object.extend(ModalsVersionableMixin);
  var subject = ModalsVersionableObject.create();
  assert.ok(subject);
});
