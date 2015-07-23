import escapeHtml from 'frontend/utils/escape-html';

import {module, test} from 'qunit';

module('escapeHtml');

test('escapes HTML', function(assert) {
  assert.equal(escapeHtml('<p>Test!&"/</p>'), '&lt;p&gt;Test!&amp;&quot;&#x2F;&lt;&#x2F;p&gt;');
});
