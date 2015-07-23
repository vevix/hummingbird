import Ember from 'ember';
import {module, test} from 'qunit';
import { initialize } from 'frontend/initializers/message-bus';

var application, registry;

module('MessageBusInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(registry, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
