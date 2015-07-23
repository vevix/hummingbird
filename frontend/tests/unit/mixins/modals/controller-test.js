import Ember from 'ember';
import {module, test} from 'qunit';
import ModalsControllerMixin from 'frontend/mixins/modals/controller';

module('ModalsControllerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModalsControllerObject = Ember.Object.extend(ModalsControllerMixin);
  var subject = ModalsControllerObject.create();
  assert.ok(subject);
});
