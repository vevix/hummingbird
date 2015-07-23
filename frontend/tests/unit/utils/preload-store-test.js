import PreloadStore from 'frontend/utils/preload-store';

import {module, test} from 'qunit';

module('preloadStore');

test('#get', function(assert) {
  window.genericPreload = {
    "foo": "bar"
  };

  assert.equal(PreloadStore.get('foo'), 'bar');
  assert.equal(PreloadStore.get('baz'), null);
  assert.equal(PreloadStore.get('baz', function() { return 'foobar'; }), 'foobar');

  delete window['genericPreload'];
});

test('#pop', function(assert) {
  window.genericPreload = {
    "foo": "bar"
  };

  assert.equal(PreloadStore.pop('foo'), 'bar');
  assert.equal(PreloadStore.pop('foo'), null);
  assert.equal(PreloadStore.get('baz', function() { return 'foobar'; }), 'foobar');
  assert.equal(PreloadStore.pop('baz'), null);

  delete window['genericPreload'];
});
