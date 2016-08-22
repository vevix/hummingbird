import EObject from 'ember-object';
import CanonicalUrlRedirectMixin from 'client/mixins/canonical-url-redirect';
import { module, test } from 'qunit';

module('Unit | Mixin | canonical url redirect');

test('It should replace the URL segment with the correct value', function(assert) {
  assert.expect(2);
  const CanonicalUrlRedirectObject = EObject.extend(CanonicalUrlRedirectMixin, {
    routeName: 'test.route',

    paramsFor() {
      return { my_key: 'hello' };
    },

    replaceWith(routeName, value) {
      assert.equal(routeName, 'test.route');
      assert.equal(value, 'world');
    }
  });
  const subject = CanonicalUrlRedirectObject.create();
  subject.redirect({ my_key: 'world' });
});
